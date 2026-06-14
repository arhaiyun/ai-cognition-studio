#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const DEFAULT_PARENT_WIKI_URL = "https://my.feishu.cn/wiki/OvV5wE1d8ieCVokpQUYcyEGdnLf";
const BASE_URL = "https://open.feishu.cn/open-apis";

const usage = () => `Usage:
  node write-feishu-doc.mjs --title "Title" --content-file /path/doc.md [--parent-url URL] [--env-file /path/.env] [--dry-run]
`;

const parseArgs = (argv) => {
  const out = { dryRun: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") {
      out.dryRun = true;
      continue;
    }
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) throw new Error(`Missing value for ${arg}`);
    if (arg === "--title") out.title = next;
    else if (arg === "--content-file") out.contentFile = next;
    else if (arg === "--parent-url") out.parentUrl = next;
    else if (arg === "--env-file") out.envFile = next;
    else throw new Error(`Unknown argument: ${arg}`);
    i += 1;
  }
  return out;
};

const parseDotEnv = (text) =>
  Object.fromEntries(
    text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const separator = line.indexOf("=");
        if (separator === -1) return [line, ""];
        const key = line.slice(0, separator).trim();
        const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
        return [key, value];
      }),
  );

const readEnvFile = async (filePath) => {
  if (!filePath || !existsSync(filePath)) return {};
  return parseDotEnv(await readFile(filePath, "utf8"));
};

const loadConfig = async (args) => {
  const defaultEnvPath = path.join(os.homedir(), ".config", "feishu-doc-writer", ".env");
  const homeEnv = await readEnvFile(defaultEnvPath);
  const explicitEnv = await readEnvFile(args.envFile);
  const env = { ...process.env, ...homeEnv, ...explicitEnv };
  const missing = ["FEISHU_APP_ID", "FEISHU_APP_SECRET"].filter((key) => !env[key]);
  if (missing.length) throw new Error(`Missing Feishu config: ${missing.join(", ")}`);
  return {
    appId: env.FEISHU_APP_ID,
    appSecret: env.FEISHU_APP_SECRET,
    parentUrl: args.parentUrl || env.FEISHU_PARENT_WIKI_URL || DEFAULT_PARENT_WIKI_URL,
  };
};

const extractFeishuTokenFromUrl = (value) => {
  const url = new URL(value);
  const match = url.pathname.match(/\/(wiki|docx|docs|drive\/folder)\/([^/?#]+)/);
  if (!match) throw new Error("Cannot extract Feishu token from URL");
  const [, rawType, token] = match;
  return { type: rawType === "drive/folder" ? "folder" : rawType, token };
};

const splitLongText = (text, maxBlockChars) => {
  if (text.length <= maxBlockChars) return [text];
  const parts = [];
  for (let index = 0; index < text.length; index += maxBlockChars) {
    parts.push(text.slice(index, index + maxBlockChars));
  }
  return parts;
};

const textBlock = (content) => ({
  block_type: 2,
  text: { elements: [{ text_run: { content } }] },
});

const richTextBlock = (blockType, field, content) => ({
  block_type: blockType,
  [field]: {
    elements: [
      {
        text_run: {
          content: content.replaceAll(/\*\*([^*]+)\*\*/g, "$1").replaceAll(/`([^`]+)`/g, "$1"),
        },
      },
    ],
  },
});

const headingBlock = (level, content) => richTextBlock(Math.min(Math.max(level, 1), 9) + 2, `heading${Math.min(Math.max(level, 1), 9)}`, content);
const bulletBlock = (content) => richTextBlock(12, "bullet", content);
const orderedBlock = (content) => richTextBlock(13, "ordered", content);
const codeBlock = (content) => richTextBlock(14, "code", content);
const quoteBlock = (content) => richTextBlock(15, "quote", content);

const markdownToFeishuBlocks = (markdown, { maxBlockChars = 1800 } = {}) => {
  const blocks = [];
  let paragraph = [];
  let codeLines = null;

  const flush = () => {
    const content = paragraph.join("\n").trim();
    paragraph = [];
    if (!content) return;
    for (const part of splitLongText(content, maxBlockChars)) blocks.push(textBlock(part));
  };

  for (const rawLine of markdown.replaceAll("\r\n", "\n").split("\n")) {
    const trimmed = rawLine.trim();
    if (trimmed.startsWith("```")) {
      if (codeLines) {
        blocks.push(codeBlock(codeLines.join("\n")));
        codeLines = null;
      } else {
        flush();
        codeLines = [];
      }
      continue;
    }
    if (codeLines) {
      codeLines.push(rawLine);
      continue;
    }
    if (!trimmed) {
      flush();
      continue;
    }
    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flush();
      blocks.push(headingBlock(heading[1].length, heading[2]));
      continue;
    }
    const bullet = trimmed.match(/^-\s+(.+)$/);
    if (bullet) {
      flush();
      blocks.push(bulletBlock(bullet[1]));
      continue;
    }
    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      flush();
      blocks.push(orderedBlock(ordered[1]));
      continue;
    }
    const quote = trimmed.match(/^>\s?(.+)$/);
    if (quote) {
      flush();
      blocks.push(quoteBlock(quote[1]));
      continue;
    }
    paragraph.push(trimmed);
  }

  if (codeLines) blocks.push(codeBlock(codeLines.join("\n")));
  flush();
  return blocks;
};

const request = async (apiPath, { method = "GET", token, body } = {}) => {
  const response = await fetch(`${BASE_URL}${apiPath}`, {
    method,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.code) {
    throw new Error(payload.msg || `Feishu API request failed: ${method} ${apiPath}`);
  }
  return payload;
};

const getTenantAccessToken = async ({ appId, appSecret }) => {
  const payload = await request("/auth/v3/tenant_access_token/internal", {
    method: "POST",
    body: { app_id: appId, app_secret: appSecret },
  });
  return payload.tenant_access_token;
};

const getWikiNode = async ({ token, nodeToken }) => {
  const payload = await request(`/wiki/v2/spaces/get_node?token=${encodeURIComponent(nodeToken)}&obj_type=wiki`, { token });
  return payload.data.node;
};

const createWikiNode = async ({ token, spaceId, parentNodeToken, title }) => {
  const payload = await request(`/wiki/v2/spaces/${spaceId}/nodes`, {
    method: "POST",
    token,
    body: {
      obj_type: "docx",
      node_type: "origin",
      parent_node_token: parentNodeToken,
      title,
    },
  });
  return payload.data.node;
};

const createBlockChildren = async ({ token, documentId, children }) => {
  const payload = await request(`/docx/v1/documents/${documentId}/blocks/${documentId}/children`, {
    method: "POST",
    token,
    body: { index: -1, children },
  });
  return payload.data;
};

const chunk = (items, size) => {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) chunks.push(items.slice(index, index + size));
  return chunks;
};

const main = async () => {
  const args = parseArgs(process.argv.slice(2));
  if (!args.title || !args.contentFile) throw new Error(usage());
  const contentPath = path.resolve(args.contentFile);
  const markdown = await readFile(contentPath, "utf8");
  const blocks = markdownToFeishuBlocks(markdown);
  const config = await loadConfig(args);
  const target = extractFeishuTokenFromUrl(config.parentUrl);
  if (target.type !== "wiki") throw new Error("--parent-url must be a Feishu Wiki URL");

  if (args.dryRun) {
    console.log(JSON.stringify({
      status: "dry-run",
      title: args.title,
      parentUrl: config.parentUrl,
      contentFile: contentPath,
      blockCount: blocks.length,
    }, null, 2));
    return;
  }

  const token = await getTenantAccessToken(config);
  const parent = await getWikiNode({ token, nodeToken: target.token });
  const node = await createWikiNode({
    token,
    spaceId: parent.space_id,
    parentNodeToken: parent.node_token,
    title: args.title,
  });
  for (const children of chunk(blocks, 50)) {
    await createBlockChildren({ token, documentId: node.obj_token, children });
  }
  console.log(JSON.stringify({
    status: "ok",
    title: args.title,
    url: `https://my.feishu.cn/wiki/${node.node_token}`,
    nodeToken: node.node_token,
    documentId: node.obj_token,
    blockCount: blocks.length,
  }, null, 2));
};

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
