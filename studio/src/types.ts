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
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}
