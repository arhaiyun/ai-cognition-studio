import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLayout } from "../components/layout/LayoutContext";
import { content } from "../lib/content";
import { selectPortfolioContents } from "../lib/portfolio.js";

const BUILD_METHOD = [
  ["01", "判断", "定义问题、目标与风险边界"],
  ["02", "设计", "组织 Context 与人机协作流程"],
  ["03", "构建", "组合 Skill、Agent 与 Tool"],
  ["04", "验证", "检查结果、限制与失败路径"],
];

export function HomePage() {
  const { setToc } = useLayout();
  const selectedWork = selectPortfolioContents(content.contents);
  const [featured, ...supporting] = selectedWork;
  const recent = content.contents
    .filter((item) => item.date)
    .slice()
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, 3);
  const sections = content.sections.filter((section) =>
    content.contents.some((item) => item.section === section.id),
  );

  useEffect(() => {
    setToc([]);
  }, [setToc]);

  return (
    <div className="home">
      <header className="home-hero">
        <p className="home-kicker">ARHAIYUN · AI BUILDER</p>
        <h1>用 AI 设计并交付真正可运行的产品与工作流。</h1>
        <p className="home-hero__lead">
          我关注产品判断、Agent 工程和人机协作，把模糊想法转化为可验证、可复用的 AI
          实践。
        </p>
        <div className="home-actions">
          <a className="button button--primary" href="#selected-work">
            查看代表作
          </a>
          <Link className="button button--secondary" to="/c/cognition--00-ai-cognition-map">
            我的 AI 方法
          </Link>
        </div>
        <dl className="home-proof">
          <div>
            <dt>{selectedWork.length}</dt>
            <dd>个精选实践</dd>
          </div>
          <div>
            <dt>{content.contents.length}</dt>
            <dd>篇公开内容</dd>
          </div>
          <div>
            <dt>{sections.length}</dt>
            <dd>个认知与实践分类</dd>
          </div>
        </dl>
      </header>

      {featured && (
        <section className="home-section home-work" id="selected-work">
          <SectionHeading
            eyebrow="Selected work"
            title="从作品判断能力，而不是从工具清单判断。"
            description="每个项目都对应一个真实问题、一组关键判断和可以检查的产物。"
          />
          <div className="home-work__layout">
            <Link className="featured-project" to={`/c/${featured.slug}`}>
              <img
                className="featured-project__image"
                src={`${import.meta.env.BASE_URL}project-incubator-flow.png`}
                alt="Project Incubator 八阶段决策工作流"
              />
              <div className="project-card__body">
                <p className="project-card__label">{featured.portfolio?.label}</p>
                <h3>{featured.title}</h3>
                <p>{featured.portfolio?.outcome}</p>
                <CapabilityList capabilities={featured.portfolio?.capabilities ?? []} />
                <span className="project-card__link">阅读完整案例 <span aria-hidden>→</span></span>
              </div>
            </Link>

            <div className="supporting-projects">
              {supporting.map((item) => (
                <Link className="project-card" key={item.slug} to={`/c/${item.slug}`}>
                  <p className="project-card__label">{item.portfolio?.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.portfolio?.outcome}</p>
                  <CapabilityList capabilities={item.portfolio?.capabilities ?? []} />
                  <span className="project-card__link">查看实践 <span aria-hidden>→</span></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="home-section home-method">
        <SectionHeading
          eyebrow="How I build"
          title="把模型能力组织成可控的交付过程。"
          description="我不把 AI 当作一次性答案生成器，而是把它放进有目标、有边界、有复核的工作流。"
        />
        <ol className="method-grid">
          {BUILD_METHOD.map(([number, title, description]) => (
            <li key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-section home-viewpoint">
        <div>
          <p className="home-kicker">My view of AI</p>
          <h2>AI 是副驾，不是自动驾驶。</h2>
        </div>
        <div>
          <p>
            真正稳定的能力来自 <strong>Context + Tools + 人审</strong>{" "}
            的组合，而不是单点模型魔法。
          </p>
          <Link to="/c/cognition--00-ai-cognition-map">
            阅读 AI 认知地图 <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <section className="home-section home-latest">
        <SectionHeading
          eyebrow="Latest notes"
          title="最近形成的判断与实践记录。"
        />
        <div className="latest-list">
          {recent.map((item) => (
            <Link key={item.slug} to={`/c/${item.slug}`}>
              <span>{item.sectionLabel}</span>
              <strong>{item.title}</strong>
              <time dateTime={item.date ?? undefined}>{item.date}</time>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section home-explore">
        <SectionHeading
          eyebrow="Explore the studio"
          title="继续深入我的认知系统。"
          description="作品集之外，这里保留完整的学习轨迹、工程手册和实验记录。"
        />
        <div className="explore-grid">
          {sections.map((section) => {
            const items = content.contents.filter((item) => item.section === section.id);
            const destination = items[0];
            if (!destination) return null;
            return (
              <Link key={section.id} to={`/c/${destination.slug}`}>
                <span aria-hidden>{section.icon}</span>
                <h3>{section.label}</h3>
                <p>{items.length} 篇内容</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="section-heading">
      <p className="home-kicker">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  );
}

function CapabilityList({ capabilities }: { capabilities: string[] }) {
  return (
    <ul className="capability-list">
      {capabilities.map((capability) => (
        <li key={capability}>{capability}</li>
      ))}
    </ul>
  );
}
