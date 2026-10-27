"use client";

import { useLoop } from "@/hooks/useLoop";
import { rand } from "@/lib/loop";
import { AMOUNT, LABEL, frame } from "./common";

const P = 10000;

// 소수점을 한 자리로 잘라야 서버·브라우저가 그린 위치 값이 똑같이 맞아떨어짐
const r1 = (v: number) => Math.round(v * 10) / 10;
const STARS = Array.from({ length: 26 }, (_, i) => ({
  x: r1(rand(i + 1) * 280),
  y: r1(rand(i + 101) * 110),
  s: r1(1 + rand(i + 201) * 1.4),
}));

const BANDS = [
  { top: 30, color: "#3CF2B0", rot: -14, ph: 0 },
  { top: 52, color: "#4FC3FF", rot: -8, ph: 2 },
  { top: 22, color: "#B57CFF", rot: -20, ph: 4 },
];

// 밤하늘에 초록·보라 빛 커튼이 천천히 일렁인다
export default function AuroraBackground() {
  const t = useLoop(P);
  const a = (t / P) * Math.PI * 2;
  return (
    <div style={{ ...frame, background: "linear-gradient(180deg,#050817,#0D1638 70%,#14204A)" }}>
      {STARS.map((s, i) => (
        <div
          key={i}
          style={{ position: "absolute", left: s.x, top: s.y, width: s.s, height: s.s, borderRadius: 9, background: "#fff", opacity: 0.6 }}
        />
      ))}
      {BANDS.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: -60,
            top: b.top + 8 * Math.sin(a + b.ph),
            width: 400,
            height: 46,
            borderRadius: "50%",
            background: `linear-gradient(90deg, transparent, ${b.color} 30%, ${b.color} 60%, transparent)`,
            filter: "blur(16px)",
            opacity: 0.55 + 0.25 * Math.sin(a * 2 + b.ph),
            transform: `translateX(${22 * Math.sin(a + b.ph)}px) rotate(${b.rot + 5 * Math.cos(a + b.ph)}deg)`,
          }}
        />
      ))}
      <div style={{ position: "relative", textAlign: "center", marginTop: 54 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.75)" }}>{LABEL}</div>
        <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-.02em", color: "#fff" }}>{AMOUNT}</div>
      </div>
    </div>
  );
}
