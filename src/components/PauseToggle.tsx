"use client";

import { usePaused } from "@/hooks/useLoop";

/** 접근성: 모든 데모를 한 번에 멈추는 토글 */
export default function PauseToggle() {
  const [paused, setPaused] = usePaused();
  return (
    <button
      type="button"
      aria-pressed={paused}
      onClick={() => setPaused(!paused)}
      className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink"
    >
      {paused ? "▶ 애니메이션 재생" : "❚❚ 애니메이션 멈춤"}
    </button>
  );
}
