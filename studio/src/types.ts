/** 内容类型：由 section 默认推断，可在 front matter 中覆盖 */
export type ContentType =
  | "article"
  | "playbook"
  | "lab"
  | "agent"
  | "podcast-card"
  | "meta";

export type ContentStatus = "draft" | "exploring" | "stable" | "archived";

export interface PodcastLinks {
  xiaoyuzhou?: string;
  apple?: string;
  spotify?: string;
  youtube?: string;
}

export interface ContentRelations {
  essays?: string[];
  labs?: string[];
}

export interface PortfolioMeta {
  order: number;
  label: string;
  outcome: string;
  capabilities: string[];
}

export type SeriesSlot = "pillar" | "practice" | "handbook" | "input" | "recap";

export interface SeriesMeta {
  id: string;
  title: string;
  part: number;
  week: string;
  slot: SeriesSlot;
}

export interface PlannedArticle {
  sourcePath: string;
  part: number;
  slot: SeriesSlot | string;
  title: string;
  status?: string;
  slug?: string;
  sectionLabel?: string;
}

export interface PublishingWeek {
  week: string;
  theme: string;
  status: string;
  phase?: string;
  articles: PlannedArticle[];
}

export interface PublishingLine {
  activeSeries: {
    id: string;
    title: string;
    tagline: string;
    currentWeek: string;
  };
  cadence?: {
    minArticles: number;
    maxArticles: number;
    publishDays: string[];
  };
  phases?: Array<{ id: string; title: string; weeks: number; goal: string }>;
  currentWeek?: PublishingWeek;
  seriesContents: ContentMeta[];
}

export interface DiagramMeta {
  src: string;
  title: string;
  height: number;
}

export interface SourceMeta {
  title?: string;
  url?: string;
  author?: string;
}

export interface ContentMeta {
  slug: string;
  type: ContentType;
  section: string;
  sectionLabel: string;
  sectionIcon: string;
  title: string;
  date: string | null;
  status: ContentStatus;
  audience: string[];
  tags: string[];
  summary: string;
  sourcePath: string;
  portfolio?: PortfolioMeta;
  series?: SeriesMeta;
  diagram?: DiagramMeta;
  source?: SourceMeta;
  /** 构建时生成的全文搜索索引（title + summary + tags + body 纯文本） */
  searchText: string;
  /** podcast-card 专用 */
  takeaways?: string[];
  links?: PodcastLinks;
  hosts?: string[];
  guests?: string[];
  durationMin?: number | null;
  related?: ContentRelations;
}

export interface SectionMeta {
  id: string;
  label: string;
  icon: string;
  defaultType: ContentType;
}

export interface ContentIndex {
  schemaVersion: number;
  generatedAt: string;
  sections: SectionMeta[];
  contents: ContentMeta[];
  publishingLine?: PublishingLine;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}
