"use client";

import { useLoop } from "@/hooks/useLoop";

// 1초에 한 바퀴. 점 세 개는 0.5초마다 늘어남 (3초 주기로 맞물림)
export default function Spinner() {
  const t = useLoop(3000);
  const rot = (t / 1000) * 360;
  const dots = (Math.floor(t / 500) % 3) + 1;
  return (
    <div
      style={{
        width: 230,
        background: "#fff",
        borderRadius: 16,
        padding: "20px 0 18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        boxShadow: "0 2px 8px rgba(27,34,54,.06)",
      }}
    >
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="18" fill="none" stroke="#E3E6EE" strokeWidth="5" />
        <circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="34 200"
          transform={`rotate(${rot} 22 22)`}
        />
      </svg>
      <div style={{ fontSize: 15, fontWeight: 800, color: "var(--color-ink)", letterSpacing: "-.02em" }}>
        결제하는 중이에요
        <span style={{ display: "inline-block", width: 18, textAlign: "left" }}>{".".repeat(dots)}</span>
      </div>
      <div style={{ fontSize: 11.5, color: "#6B7180", marginTop: -6 }}>창을 닫지 말고 잠시만 기다려 주세요</div>
    </div>
  );
}
