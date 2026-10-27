"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

// 가로:세로 비율이 바뀌는 틀 — 높이 140, 폭 250 안에 맞춤
const RATIOS = [
  { r: "1:1", use: "인스타 피드", w: 130, h: 130 },
  { r: "4:5", use: "카드뉴스", w: 112, h: 140 },
  { r: "9:16", use: "릴스·쇼츠", w: 79, h: 140 },
  { r: "16:9", use: "발표 슬라이드", w: 240, h: 135 },
];
const PHASE = 1600;

export default function AspectRatio() {
  const t = useLoop(PHASE * RATIOS.length);
  const i = Math.floor(t / PHASE) % RATIOS.length;
  const prev = RATIOS[(i + RATIOS.length - 1) % RATIOS.length];
  const cur = RATIOS[i];
  const p = ease(seg(t - i * PHASE, 0, 550));
  const w = prev.w + (cur.w - prev.w) * p;
  const h = prev.h + (cur.h - prev.h) * p;

  return (
    <div style={{ width: 260, height: 160, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ height: 140, display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: w,
            height: h,
            background: "linear-gradient(150deg,#C9D5FA,#DCD3F5)",
            borderRadius: 8,
            border: "2px solid #fff",
            boxShadow: "0 2px 8px rgba(27,34,54,.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 800, color: "var(--color-ink)", letterSpacing: "-.02em" }}>
            {cur.r}
          </div>
        </div>
      </div>
      <div style={{ fontSize: 10, fontWeight: 700, color: "var(--color-accent)" }}>{cur.use}</div>
    </div>
  );
}
