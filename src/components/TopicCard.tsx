import Link from "next/link";
import { categories, terms } from "@/lib/data";
import type { TopicMeta } from "@/lib/topics";
import DemoBox from "./DemoBox";
import { demos } from "./demos";

/** 홈 주제 카드: 대표 데모 미리보기 + 한 줄 소개 + 왜 필요한지 + 어디에 쓰는지 */
export default function TopicCard({ meta, index }: { meta: TopicMeta; index: number }) {
  const cat = categories.find((c) => c.id === meta.id)!;
  const list = terms.filter((t) => t.category === meta.id).sort((a, b) => a.no - b.no);
  const thumbSlug = demos[meta.thumb] ? meta.thumb : list.find((t) => demos[t.slug])?.slug;
  const Thumb = thumbSlug ? demos[thumbSlug] : null;
  // 대표 용어: 지정한 것 중 실제로 있는 것, 모자라면 앞에서부터 채움
  const named = meta.examples.map((s) => list.find((t) => t.slug === s)).filter((t) => t !== undefined);
  const examples = [...named, ...list.filter((t) => !named.includes(t))].slice(0, 4);

  return (
    <Link
      href={`/category/${meta.id}`}
      className="flex flex-col gap-3.5 rounded-[22px] bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,.03)] hover:shadow-[0_6px_20px_rgba(27,34,54,.08)]"
    >
      <div className="flex items-baseline gap-2">
        <span className="text-[22px] font-extrabold text-accent">{index + 1}</span>
        <span className="text-[21px] font-extrabold tracking-[-.02em]">{cat.name_ko}</span>
        <span className="ml-auto rounded-full bg-[#F4F3EF] px-[9px] py-1 text-[11px] font-semibold text-sub">
          {list.length > 0 ? `${list.length}개` : "준비 중"}
        </span>
      </div>
      <p className="-mt-1 text-[14.5px] font-semibold break-keep text-[#3A4152]">{meta.tagline}</p>

      <DemoBox index={index}>{Thumb && <Thumb />}</DemoBox>

      <p className="text-[13.5px] leading-[1.6] break-keep text-[#3A4152]">{meta.why}</p>

      {examples.length > 0 && (
        <div>
          <div className="mb-[7px] text-[11.5px] font-bold tracking-[.02em] text-sub">대표 효과</div>
          <div className="flex flex-wrap gap-1.5">
            {examples.map((t) => (
              <span key={t.slug} className="rounded-full bg-[#F4F3EF] px-[9px] py-1 text-xs font-semibold text-ink">
                {t.name_ko}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-1.5 border-t border-line pt-3.5">
        <span className="mr-0.5 text-[11.5px] font-bold text-sub">이럴 때 필요해요</span>
        {meta.useFor.map((u) => (
          <span key={u} className="rounded-full bg-[#F0F3FE] px-[9px] py-1 text-xs font-medium text-accent">
            #{u}
          </span>
        ))}
      </div>
    </Link>
  );
}
