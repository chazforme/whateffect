import { categoryName } from "@/lib/data";
import type { Term } from "@/lib/types";
import DemoBox from "./DemoBox";
import { demos } from "./demos";

export default function Card({ term, index }: { term: Term; index: number }) {
  const Demo = demos[term.slug];
  return (
    <article className="flex flex-col gap-3.5 rounded-[22px] bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,.03)]">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-[22px] font-extrabold text-accent">{term.no}</span>
        <span className="text-[21px] font-extrabold tracking-[-.02em]">{term.name_ko}</span>
        <span className="text-[13px] text-sub">{term.name_en}</span>
        <span className="ml-auto rounded-full bg-[#F4F3EF] px-[9px] py-1 text-[11px] font-semibold text-sub">
          {categoryName(term.category)}
        </span>
      </div>

      {/* 설명은 무조건 2줄: <br>로 강제 줄바꿈 */}
      {term.desc && (
        <p className="-mt-1 text-[14.5px] leading-[1.6] break-keep text-[#3A4152]">
          {term.desc[0]}
          <br />
          {term.desc[1]}
        </p>
      )}

      <DemoBox index={index} label={term.demo === "static" ? "예시" : "LOOP"}>{Demo && <Demo />}</DemoBox>

      {term.uses && (
        <div>
          <div className="mb-[7px] text-[11.5px] font-bold tracking-[.02em] text-sub">이럴 때 써요</div>
          <ul className="flex flex-col gap-[5px]">
            {term.uses.map((u) => (
              <li
                key={u}
                className="relative pl-3.5 text-[13.5px] text-[#3A4152] before:absolute before:top-2 before:left-[2px] before:size-[5px] before:rounded-full before:bg-accent before:opacity-60 before:content-['']"
              >
                {u}
              </li>
            ))}
          </ul>
        </div>
      )}

      {term.tags && (
        <div className="mt-auto flex flex-wrap gap-1.5 border-t border-line pt-3.5">
          {term.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#F0F3FE] px-[9px] py-1 text-xs font-medium text-accent">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
