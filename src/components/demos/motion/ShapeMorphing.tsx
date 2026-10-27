"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";

const inOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

// 재생(▶) 모양 두 조각 ↔ 일시정지(⏸) 막대 두 개. 꼭짓점 수를 맞춰서 점끼리 이어 바뀐다
type P = [number, number][];
const PLAY: [P, P] = [
  [[4, 0], [52, 25], [52, 75], [4, 100]],
  [[52, 25], [100, 50], [100, 50], [52, 75]],
];
const PAUSE: [P, P] = [
  [[10, 0], [40, 0], [40, 100], [10, 100]],
  [[60, 0], [90, 0], [90, 100], [60, 100]],
];

const shape = (a: P, b: P, p: number) =>
  a.map(([x, y], i) => `${x + (b[i][0] - x) * p},${y + (b[i][1] - y) * p}`).join(" ");

// 3.6초 주기: 재생 버튼 모양이 녹아내리듯 일시정지 모양으로 바뀜 → 유지 → 다시 재생 모양
export default function ShapeMorphing() {
  const t = useLoop(3600);
  const p = inOut(seg(t, 600, 1200)) - inOut(seg(t, 2400, 3000));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "var(--color-accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 16px rgba(58,91,239,.3)",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 100 100" style={{ marginLeft: 4 * (1 - p) }}>
          <polygon points={shape(PLAY[0], PAUSE[0], p)} fill="#fff" />
          <polygon points={shape(PLAY[1], PAUSE[1], p)} fill="#fff" />
        </svg>
      </div>
      <div>
        <div style={{ fontSize: 11.5, color: "#6B7180", fontWeight: 600 }}>오늘의 플레이리스트</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: "var(--color-ink)", marginTop: 2 }}>
          {p > 0.5 ? "재생 중" : "일시정지"}
        </div>
      </div>
    </div>
  );
}
