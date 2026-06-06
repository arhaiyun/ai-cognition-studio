import { Link } from "react-router-dom";
import { content } from "../lib/content";

export function HomePage() {
  const count = content.contents.length;
  const sections = content.sections.filter((s) =>
    content.contents.some((c) => c.section === s.id),
  );

  return (
    <div className="home">
      <header className="home__hero">
        <p className="home__eyebrow">个人 AI 认知知识库</p>
        <h1 className="home__title">AI Cognition Studio</h1>
        <p className="home__lead">
          沉淀认知框架、深度思考与实践手册。把 AI 当副驾——能力靠 Context + Tools + 人审组合。
        </p>
      </header>

      <div className="home__stats">
        <div className="home__stat">
          <span className="home__stat-num">{count}</span>
          <span className="home__stat-label">篇内容</span>
        </div>
        <div className="home__stat">
          <span className="home__stat-num">{sections.length}</span>
          <span className="home__stat-label">个分类</span>
        </div>
      </div>

      <section className="home__sections">
        <h2 className="home__sections-title">开始阅读</h2>
        <div className="home__grid">
          {sections.map((section) => {
            const items = content.contents.filter((c) => c.section === section.id);
            const featured = items[0];
            if (!featured) return null;
            return (
              <Link key={section.id} to={`/c/${featured.slug}`} className="home__card">
                <span className="home__card-icon">{section.icon}</span>
                <h3 className="home__card-title">{section.label}</h3>
                <p className="home__card-meta">{items.length} 篇</p>
                <p className="home__card-preview">{featured.title}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
