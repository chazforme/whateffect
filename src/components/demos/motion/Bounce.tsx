"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";

/** 바닥에 튕기며 멈추는 곡선 (easeOutBounce) */
function bounce(x: number) {
  const n = 7.5625;
  const d = 2.75;
  if (x < 1 / d) return n * x * x;
  if (x < 2 / d) {
    const k = x - 1.5 / d;
    return n * k * k + 0.75;
  }
  if (x < 2.5 / d) {
    const k = x - 2.25 / d;
    return n * k * k + 0.9375;
  }
  const k = x - 2.625 / d;
  return n * k * k + 0.984375;
}

const DROP = 92;

// 3.4초 주기: 상자가 떨어져 바닥에 통·통·통 튕기다 멈춤 → 글자 등장 → 사라짐
export default function Bounce() {
  const t = useLoop(3400);
  const p = bounce(seg(t, 150, 1250));
  const y = -DROP * (1 - p);
  const fade = 1 - seg(t, 2800, 3200);
  const near = 1 - (1 - p) * 0.8; // 바닥에 가까울수록 그림자가 진하고 큼
  return (
    <div style={{ position: "relative", width: 220, height: 160, opacity: fade }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 99,
          width: 56,
          height: 8,
          borderRadius: "50%",
          background: "rgba(27,34,54,.18)",
          transform: `translateX(-50%) scale(${0.4 + 0.6 * near})`,
          opacity: 0.3 + 0.7 * near,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 60,
          fontSize: 42,
          lineHeight: 1,
          transform: `translateX(-50%) translateY(${y}px)`,
        }}
      >
        📦
      </div>
      <div
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          top: 105,
          height: 2,
          borderRadius: 1,
          background: "#D5D9E2",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 122,
          textAlign: "center",
          fontSize: 15,
          fontWeight: 800,
          color: "var(--color-ink)",
          opacity: seg(t, 1300, 1700),
        }}
      >
        택배가 도착했어요
      </div>
    </div>
  );
}
