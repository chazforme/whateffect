"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const io = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const CX = 140;
const CY = 85;

// 4.4초 주기: 커서가 카드 위를 한 바퀴 돌면 카드가 커서 쪽으로 입체적으로 기울어짐
export default function Tilt3D() {
  const t = useLoop(4400);

  let x: number;
  let y: number;
  if (t < 700) {
    const k = io(seg(t, 0, 700));
    x = 262 + (200 - 262) * k;
    y = 165 + (85 - 165) * k;
  } else if (t < 3500) {
    const a = seg(t, 700, 3500) * Math.PI * 2;
    x = CX + 60 * Math.cos(a);
    y = CY + 34 * Math.sin(a);
  } else {
    const k = io(seg(t, 3500, 4200));
    x = 200 + (262 - 200) * k;
    y = 85 + (165 - 85) * k;
  }
  const k = ease(seg(t, 400, 800)) * (1 - ease(seg(t, 3500, 3900)));
  const nx = (x - CX) / 90;
  const ny = (y - CY) / 56;
  const cursorO = seg(t, 0, 200) * (1 - seg(t, 4100, 4380));

  return (
    <div style={{ position: "relative", width: 280, height: 170, perspective: 500 }}>
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 29,
          width: 180,
          height: 112,
          borderRadius: 14,
          overflow: "hidden",
          background: "linear-gradient(135deg,#3A5BEF,#7A5CF0)",
          color: "#fff",
          padding: "14px 16px",
          boxSizing: "border-box",
          transform: `rotateY(${nx * 20 * k}deg) rotateX(${-ny * 20 * k}deg) scale(${1 + 0.04 * k})`,
          boxShadow: `${-nx * 10 * k}px ${8 - ny * 6 * k}px 20px rgba(27,34,54,.25)`,
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".12em", opacity: 0.85 }}>VIP MEMBERS</div>
        <div style={{ fontSize: 17, fontWeight: 800, marginTop: 20 }}>김효과 님</div>
        <div style={{ fontSize: 11.5, marginTop: 4, opacity: 0.9 }}>적립 12,400P</div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle 90px at ${x - 50}px ${y - 29}px, rgba(255,255,255,.45), rgba(255,255,255,0))`,
            opacity: k,
          }}
        />
      </div>
      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        style={{ position: "absolute", left: x - 1, top: y - 1, opacity: cursorO }}
      >
        <path d="M1 1 L1 16 L5 12 L8 19 L11 18 L8 11 L14 11 Z" fill="#1B2236" stroke="#fff" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
