"use client";

import { useLoop } from "@/hooks/useLoop";
import { big } from "./shared";

const glow = (c: string, k: number) =>
  `0 0 ${4 * k}px #fff, 0 0 ${10 * k}px ${c}, 0 0 ${22 * k}px ${c}, 0 0 ${40 * k}px ${c}`;

// 3초 주기: 켜질 때 두 번 깜빡이고, 나머지는 숨 쉬듯 은은하게
export default function NeonGlow() {
  const t = useLoop(3000);
  const flicker = (t > 250 && t < 330) || (t > 420 && t < 480);
  const k = flicker ? 0.15 : 0.85 + 0.15 * Math.sin((t / 3000) * Math.PI * 2);
  return (
    <div style={{ background: "#141826", borderRadius: 14, padding: "16px 30px", textAlign: "center" }}>
      <div style={{ ...big, fontSize: 40, color: flicker ? "#8A6B85" : "#FFE9F7", textShadow: glow("#FF4FD8", k) }}>OPEN</div>
      <div
        style={{
          ...big,
          fontSize: 13,
          fontWeight: 700,
          marginTop: 4,
          color: "#DFFBFF",
          textShadow: glow("#2FD8FF", 0.6),
        }}
      >
        밤 12시까지
      </div>
    </div>
  );
}
