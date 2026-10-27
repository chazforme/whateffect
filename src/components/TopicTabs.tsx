import Link from "next/link";
import { categories } from "@/lib/data";
import type { CategoryId } from "@/lib/types";

/** 주제 페이지 상단: 10개 주제 사이를 오가는 탭 (모바일에선 옆으로 밀어서 봄) */
export default function TopicTabs({ current }: { current: CategoryId }) {
  return (
    <nav className="-mx-4 mb-6 overflow-x-auto px-4">
      <div className="flex w-max gap-1.5">
        {categories.map((c, i) => {
          const on = c.id === current;
          return (
            <Link
              key={c.id}
              href={`/category/${c.id}`}
              aria-current={on ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-[13px] font-bold whitespace-nowrap ${
                on ? "bg-ink text-white" : "bg-white text-sub"
              }`}
            >
              {i + 1}. {c.name_ko}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
