import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createHeadingIdFactory } from "../lib/heading-id";
import type { ReactNode } from "react";

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: ReactNode } }).props;
    return extractText(props?.children ?? "");
  }
  return "";
}

interface MarkdownBodyProps {
  markdown: string;
}

export function MarkdownBody({ markdown }: MarkdownBodyProps) {
  const headingId = useMemo(() => createHeadingIdFactory(), [markdown]);

  return (
    <article className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1>{children}</h1>,
          h2: ({ children }) => {
            const text = extractText(children);
            const id = headingId(text);
            return <h2 id={id}>{children}</h2>;
          },
          h3: ({ children }) => {
            const text = extractText(children);
            const id = headingId(text);
            return <h3 id={id}>{children}</h3>;
          },
          a: ({ href, children }) => (
            <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {children}
            </a>
          ),
          code: ({ className, children }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return <code className={className}>{children}</code>;
            }
            return <code className="inline-code">{children}</code>;
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
