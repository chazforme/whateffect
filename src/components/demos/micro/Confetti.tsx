"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, rand, seg } from "@/lib/loop";

const T = 700; // 누르는 시각
const OX = 140; // 터지는 자리
const OY = 112;
const G = 430; // 중력 px/s²
const COLORS = ["#3A5BEF", "#FF4D6D", "#FFB020", "#2CC28A", "#9B6BFF"];
const PIECES = Array.from({ length: 30 }, (_, i) => ({
  vx: (rand(i + 1) - 0.5) * 280,
  vy: -(190 + rand(i + 41) * 170),
  rot: rand(i + 81) * 360,
  spin: (rand(i + 121) - 0.5) * 900,
  color: COLORS[i % COLORS.length],
  w: 5 + Math.round(rand(i + 161) * 3),
}));

// 4초 주기: 결제 버튼을 누르면 색종이가 팡 터져 흩날리며 떨어짐
export default function Confetti() {
  const t = useLoop(4000);
  const local = t - T;
  const l = Math.max(0, local) / 1000;
  const done = local >= 0;
  const reset = 1 - seg(t, 3500, 3750);
  const title = ease(seg(local, 100, 500)) * reset;
  const fingerO = seg(local, -400, -150) * (1 - seg(local, 100, 350));
  const press = seg(local, -150, 0) * (1 - seg(local, 80, 220));

  return (
    <div style={{ position: "relative", width: 280, height: 170, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 38,
          textAlign: "center",
          fontSize: 19,
          fontWeight: 800,
          color: "var(--color-ink)",
          opacity: title,
          transform: `translateY(${8 * (1 - title)}px)`,
        }}
      >
        주문이 완료됐어요!
      </div>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 90,
          width: 160,
          height: 44,
          borderRadius: 12,
          background: done && t < 3600 ? "#2CC28A" : "var(--color-accent)",
          color: "#fff",
          fontSize: 14.5,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${1 - 0.05 * press})`,
          boxShadow: "0 6px 14px rgba(27,34,54,.15)",
        }}
      >
        {done && t < 3600 ? "🎉 결제 완료" : "결제하기"}
      </div>
      {done &&
        PIECES.map((p, i) => {
          const x = OX + p.vx * l;
          const y = OY + p.vy * l + 0.5 * G * l * l;
          const o = 1 - seg(l, 2.0, 2.6);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: p.w,
                height: p.w * 1.7,
                borderRadius: 1.5,
                background: p.color,
                opacity: o,
                transform: `rotate(${p.rot + p.spin * l}deg) scaleX(${Math.cos(l * 9 + i)})`,
              }}
            />
          );
        })}
      <div
        style={{
          position: "absolute",
          left: 165 - 13,
          top: 112 - 13,
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "rgba(27,34,54,.22)",
          border: "2px solid rgba(255,255,255,.9)",
          boxSizing: "border-box",
          opacity: fingerO,
          transform: `scale(${1 + 0.3 * press})`,
        }}
      />
    </div>
  );
}
