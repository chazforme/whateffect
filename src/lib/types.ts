export type CategoryId =
  | "text"
  | "motion"
  | "scroll"
  | "micro"
  | "navigation"
  | "form"
  | "feedback"
  | "overlay"
  | "layout"
  | "style";

export type DemoKind = "loop" | "simulate" | "mini-ui" | "static";

export type Category = {
  id: CategoryId;
  name_ko: string;
  default_demo: DemoKind;
};

export type Term = {
  slug: string;
  no: number;
  category: CategoryId;
  name_ko: string;
  name_en: string;
  summary: string;
  demo: DemoKind;
  desc: [string, string] | null;
  uses: [string, string, string] | null;
  tags: string[] | null;
  aliases?: string[];
  prompt_vague: string | null;
  prompt_exact: string | null;
  related: string[];
  status: "final" | "todo";
};
