import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MarkdownBody } from "../components/MarkdownBody";
import { useLayout } from "../components/layout/LayoutContext";
import { extractToc, getContent, loadContentBody } from "../lib/content";
import type { ContentMeta } from "../types";

const TYPE_LABELS: Record<string, string> = {
  article: "文章",
  playbook: "手册",
  lab: "Lab",
  agent: "Agent",
  "podcast-card": "播客",
  meta: "元信息",
};

const STATUS_LABELS: Record<string, string> = {
  exploring: "探索中",
  stable: "稳定",
  archived: "归档",
  draft: "草稿",
};

export function ContentPage() {
  const { slug } = useParams<{ slug: string }>();
  const { setToc } = useLayout();
  const [body, setBody] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const meta = slug ? getContent(slug) : undefined;

  useEffect(() => {
    setToc([]);
    setBody(null);
    if (!slug) return;

    let cancelled = false;
    setLoading(true);

    loadContentBody(slug).then((text) => {
      if (cancelled) return;
      if (text) {
        setBody(text);
        setToc(extractToc(text));
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [slug, setToc]);

  if (!meta) {
    return (
      <div className="content-page content-page--empty">
        <h1>未找到内容</h1>
        <p>
          <Link to="/">返回首页</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="content-page">
      <header className="content-page__header">
        <div className="content-page__meta-row">
          <span className="content-page__section">
            {meta.sectionIcon} {meta.sectionLabel}
          </span>
          <span className="content-page__type">{TYPE_LABELS[meta.type] ?? meta.type}</span>
          <span className={`content-page__status content-page__status--${meta.status}`}>
            {STATUS_LABELS[meta.status] ?? meta.status}
          </span>
        </div>
        <h1 className="content-page__title">{meta.title}</h1>
        {meta.summary && <p className="content-page__summary">{meta.summary}</p>}
        <ContentMetaBar meta={meta} />
      </header>

      {loading && <p className="content-page__loading">加载中…</p>}
      {meta.slug === "labs--project-incubator-readme" && (
        <img
          className="content-page__case-image"
          src={`${import.meta.env.BASE_URL}project-incubator-flow.png`}
          alt="Project Incubator 八阶段决策工作流"
        />
      )}
      {!loading && body && <MarkdownBody markdown={body} />}
      {!loading && !body && <p className="content-page__error">正文加载失败</p>}
    </div>
  );
}

function ContentMetaBar({ meta }: { meta: ContentMeta }) {
  return (
    <div className="content-page__details">
      {meta.date && <time dateTime={meta.date}>{meta.date}</time>}
      {meta.tags.length > 0 && (
        <ul className="content-page__tags">
          {meta.tags.map((tag) => (
            <li key={tag} className="content-page__tag">
              {tag}
            </li>
          ))}
        </ul>
      )}
      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="content-page__takeaways">
          <strong>Takeaways</strong>
          <ol>
            {meta.takeaways.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ol>
        </div>
      )}
      {meta.links && (
        <div className="content-page__links">
          {meta.links.xiaoyuzhou && (
            <a href={meta.links.xiaoyuzhou} target="_blank" rel="noreferrer">
              小宇宙
            </a>
          )}
          {meta.links.apple && (
            <a href={meta.links.apple} target="_blank" rel="noreferrer">
              Apple Podcasts
            </a>
          )}
          {meta.links.spotify && (
            <a href={meta.links.spotify} target="_blank" rel="noreferrer">
              Spotify
            </a>
          )}
          {meta.links.youtube && (
            <a href={meta.links.youtube} target="_blank" rel="noreferrer">
              YouTube
            </a>
          )}
        </div>
      )}
    </div>
  );
}
