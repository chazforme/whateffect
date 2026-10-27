"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";

const BEAT = 1400;

// 계속 흐름: 1.4초마다 버튼 둘레로 고리가 퍼져 나가며 "지금 진행 중"을 알림
export default function Pulse() {
  const t = useLoop(BEAT * 2);
  const local = t % BEAT;
  const r1 = seg(local, 0, 1100);
  const r2 = seg((local + BEAT / 2) % BEAT, 0, 1100);
  const breathe = 1 + 0.04 * Math.sin((local / BEAT) * Math.PI * 2);
  const ring = (p: number) => ({
    position: "absolute" as const,
    inset: 0,
    borderRadius: 999,
    background: "rgba(239,68,68,.35)",
    transform: `scale(${1 + p * 0.45}, ${1 + p * 1.1})`,
    opacity: 0.7 * (1 - p),
  });
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <div style={ring(r1)} />
        <div style={ring(r2)} />
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 20px",
            borderRadius: 999,
            background: "#EF4444",
            color: "#fff",
            fontSize: 16,
            fontWeight: 800,
            transform: `scale(${breathe})`,
            boxShadow: "0 6px 16px rgba(239,68,68,.3)",
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
          라이브 방송 중
        </div>
      </div>
      <div style={{ fontSize: 12, color: "#6B7180", marginTop: 18 }}>지금 들어오면 20% 할인</div>
    </div>
  );
}
