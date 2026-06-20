interface DiagramEmbedProps {
  src: string;
  title: string;
  height: number;
}

export function DiagramEmbed({ src, title, height }: DiagramEmbedProps) {
  const base = import.meta.env.BASE_URL;
  const url = src.startsWith("http") ? src : `${base}${src.replace(/^\//, "")}`;

  return (
    <figure className="content-page__diagram">
      <div className="content-page__diagram-toolbar">
        <span className="content-page__diagram-label">交互式架构图</span>
        <a href={url} target="_blank" rel="noreferrer">
          新窗口全屏打开 ↗
        </a>
      </div>
      <iframe
        className="content-page__diagram-frame"
        src={url}
        title={title}
        height={height}
        loading="lazy"
      />
      <figcaption>{title}</figcaption>
    </figure>
  );
}
