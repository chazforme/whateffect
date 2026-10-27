"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const R = 40;
const C = 2 * Math.PI * R;
const comma = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// 4초 주기: 0 → 72%까지 테두리가 차오름 → 유지 → 사라짐
export default function ProgressRing() {
  const t = useLoop(4000);
  const p = 0.72 * ease(seg(t, 200, 1700));
  const o = t < 3600 ? 1 : 1 - seg(t, 3600, 4000);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: o }}>
      <div style={{ position: "relative", width: 100, height: 100 }}>
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={R} fill="none" stroke="#E3E6EE" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - p)}
            transform="rotate(-90 50 50)"
            opacity={p > 0.005 ? 1 : 0}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 800, color: "var(--color-ink)", lineHeight: 1 }}>
            {Math.round(p * 100)}%
          </div>
          <div style={{ fontSize: 10, color: "#6B7180", marginTop: 3 }}>목표 달성</div>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 12, color: "#6B7180", marginBottom: 2 }}>👟 오늘 걸음</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "var(--color-ink)" }}>
          {comma(Math.round(p * 10000))}보
        </div>
        <div style={{ fontSize: 11, color: "#6B7180" }}>목표 10,000보</div>
      </div>
    </div>
  );
}
