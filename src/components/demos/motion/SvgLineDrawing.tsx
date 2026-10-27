"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const PTS = [
  [0, 62],
  [36, 50],
  [72, 56],
  [108, 34],
  [144, 40],
  [180, 16],
  [210, 8],
];
const D = PTS.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

// 3.6초 주기: 선이 펜으로 긋듯 왼쪽부터 그려짐 → 끝점·수치 등장 → 유지 → 사라짐
export default function SvgLineDrawing() {
  const t = useLoop(3600);
  const p = ease(seg(t, 200, 1500));
  const end = seg(t, 1400, 1700);
  const o = 1 - seg(t, 3000, 3400);
  const [ex, ey] = PTS[PTS.length - 1];
  return (
    <div
      style={{
        width: 250,
        background: "#fff",
        borderRadius: 14,
        padding: "12px 14px 8px",
        boxShadow: "0 4px 14px rgba(27,34,54,.08)",
        opacity: o,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 12.5, fontWeight: 800, color: "var(--color-ink)" }}>이번 주 방문자</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: "var(--color-accent)", opacity: end }}>▲ 24%</span>
      </div>
      <svg width="222" height="76" viewBox="-6 -4 222 76" style={{ display: "block", marginTop: 6 }}>
        <path
          d={D}
          pathLength={1}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1"
          strokeDashoffset={1 - p}
        />
        <circle cx={ex} cy={ey} r={5 * end} fill="var(--color-accent)" stroke="#fff" strokeWidth="2" />
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9.5, color: "#6B7180", marginTop: 2 }}>
        {DAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}
