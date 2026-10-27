import PauseToggle from "@/components/PauseToggle";
import TopicCard from "@/components/TopicCard";
import { terms } from "@/lib/data";
import { topicMeta } from "@/lib/topics";

const STEPS = [
  ["보고", "움직이는 예시를 보고 원하는 효과를 찾아요"],
  ["고르고", "카드에서 효과의 정확한 이름을 확인해요"],
  ["말하기", "그 이름으로 AI에게 정확하게 시켜요"],
];

export default function Home() {
  return (
    <div className="mx-auto max-w-[1080px]">
      <header className="mb-7 flex flex-wrap items-end gap-3">
        <div>
          <div className="text-[13px] font-bold tracking-[.02em] text-accent">효과사전</div>
          <h1 className="mt-1.5 text-[26px] font-extrabold tracking-[-.02em]">AI에게 이름으로 말하는 웹 효과</h1>
          <p className="mt-1.5 text-sm break-keep text-sub">
            홈페이지·카드뉴스·상세페이지·대시보드·발표자료를 만들 때 · 주제 10개, 효과 {terms.length}개
          </p>
        </div>
        <div className="ml-auto">
          <PauseToggle />
        </div>
      </header>

      <ol className="mb-7 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2.5">
        {STEPS.map(([title, body], i) => (
          <li key={title} className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-[13px] font-extrabold text-white">
              {i + 1}
            </span>
            <span className="text-[13.5px] break-keep text-[#3A4152]">
              <b className="font-extrabold text-ink">{title}</b> · {body}
            </span>
          </li>
        ))}
      </ol>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[18px]">
        {topicMeta.map((meta, i) => (
          <TopicCard key={meta.id} meta={meta} index={i} />
        ))}
      </div>
    </div>
  );
}
