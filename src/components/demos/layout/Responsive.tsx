"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const STEPS = [
  { w: 262, cols: 3, label: "PC · 3칸" },
  { w: 176, cols: 2, label: "태블릿 · 2칸" },
  { w: 96, cols: 1, label: "휴대폰 · 1칸" },
];
const PHASE = 2000;
const COLORS = ["#C9D5FA", "#F5D3DC", "#CDEBDD", "#F6E3C2", "#DCD3F5", "#D3E7F5"];

// 화면 폭이 줄면 한 줄에 놓이는 카드 수가 3 → 2 → 1로 바뀜
export default function Responsive() {
  const t = useLoop(PHASE * STEPS.length);
  const i = Math.floor(t / PHASE) % STEPS.length;
  const prev = STEPS[(i + STEPS.length - 1) % STEPS.length];
  const cur = STEPS[i];
  const p = ease(seg(t - i * PHASE, 0, 600));
  const w = prev.w + (cur.w - prev.w) * p;

  return (
    <div style={{ height: 166, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: "var(--color-accent)" }}>{cur.label}</div>
      <div
        style={{
          width: w,
          height: 140,
          background: "#fff",
          borderRadius: 9,
          border: "2px solid #1B2236",
          overflow: "hidden",
          padding: 6,
          display: "grid",
          gridTemplateColumns: `repeat(${cur.cols}, 1fr)`,
          gridAutoRows: 46,
          gap: 5,
        }}
      >
        {COLORS.map((c, k) => (
          <div key={k} style={{ background: "#F4F6FA", borderRadius: 5, padding: 3 }}>
            <div style={{ height: 26, background: c, borderRadius: 4 }} />
            <div style={{ fontSize: 7.5, fontWeight: 700, color: "var(--color-ink)", marginTop: 2 }}>
              상품 {k + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
