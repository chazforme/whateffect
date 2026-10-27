"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const GREEN = "#1FAE6B";

// 4.2초 주기: 고르지 않게 차오름(중간에 잠깐 멈칫) → 100% 초록 → 사라짐
export default function ProgressBar() {
  const t = useLoop(4200);
  const p = 0.6 * ease(seg(t, 200, 1200)) + 0.4 * ease(seg(t, 1600, 2600));
  const done = t >= 2600;
  const o = t < 3900 ? 1 : 1 - seg(t, 3900, 4200);

  return (
    <div
      style={{
        width: 250,
        background: "#fff",
        borderRadius: 14,
        padding: "16px 16px 14px",
        boxShadow: "0 2px 8px rgba(27,34,54,.06)",
        opacity: o,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: "#FDE8E8",
            color: "#D33",
            fontSize: 9,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          PDF
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "var(--color-ink)" }}>보고서_10월.pdf</div>
          <div style={{ fontSize: 10.5, color: "#6B7180" }}>{(p * 4).toFixed(1)}MB / 4.0MB</div>
        </div>
        <div style={{ fontSize: 15, fontWeight: 800, color: done ? GREEN : "var(--color-accent)" }}>
          {Math.round(p * 100)}%
        </div>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: "#EEF1F7", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${p * 100}%`,
            borderRadius: 4,
            background: done ? GREEN : "var(--color-accent)",
          }}
        />
      </div>
      <div style={{ fontSize: 11.5, fontWeight: 700, marginTop: 9, color: done ? GREEN : "#6B7180" }}>
        {done ? "✓ 업로드 완료" : "올리는 중이에요…"}
      </div>
    </div>
  );
}
