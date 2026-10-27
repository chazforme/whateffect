"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { big } from "./shared";

const WORDS = ["커피", "빵", "케이크"];
const STEP = 1400; // 단어 하나 보여주는 시간 (마지막 0.4초가 교체)

export default function RotatingText() {
  const t = useLoop(STEP * WORDS.length);
  const k = Math.floor(t / STEP);
  const p = ease(seg(t % STEP, 1000, 1400));
  const slot = { position: "absolute", left: 0, right: 0, top: 0, textAlign: "center" } as const;

  return (
    <div style={{ ...big, fontSize: 26, display: "flex", alignItems: "center", gap: 6 }}>
      <span>오늘은</span>
      <span
        style={{
          position: "relative",
          display: "inline-block",
          width: "3.2em",
          height: "1.25em",
          overflow: "hidden",
          color: "var(--color-accent)",
        }}
      >
        <span style={{ ...slot, transform: `translateY(${-p * 100}%)`, opacity: 1 - p }}>{WORDS[k]}</span>
        <span style={{ ...slot, transform: `translateY(${(1 - p) * 100}%)`, opacity: p }}>
          {WORDS[(k + 1) % WORDS.length]}
        </span>
      </span>
      <span>어때요?</span>
    </div>
  );
}
