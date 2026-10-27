import raw from "@/data/terms.json";
import feedback from "@/data/topics/feedback.json";
import form from "@/data/topics/form.json";
import layout from "@/data/topics/layout.json";
import micro from "@/data/topics/micro.json";
import motion from "@/data/topics/motion.json";
import navigation from "@/data/topics/navigation.json";
import overlay from "@/data/topics/overlay.json";
import scroll from "@/data/topics/scroll.json";
import style from "@/data/topics/style.json";
import type { Category, CategoryId, Term } from "./types";

export const categories = raw.categories as Category[];
export const terms = [
  ...raw.terms,
  ...motion,
  ...scroll,
  ...micro,
  ...navigation,
  ...form,
  ...feedback,
  ...overlay,
  ...layout,
  ...style,
] as unknown as Term[];

export function categoryName(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.name_ko ?? id;
}
