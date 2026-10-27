"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const io = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

// 3.2초 주기: 손가락이 버튼을 꾹 누르면 버튼이 살짝 작아지고 어두워짐 → 떼면 원래대로
export default function PressState() {
  const t = useLoop(3200);
  const go = io(seg(t, 0, 850));
  const back = io(seg(t, 1800, 2600));
  const fx = 232 + (150 - 232) * go + (240 - 150) * back;
  const fy = 160 + (86 - 160) * go + (165 - 86) * back;
  const p = ease(seg(t, 900, 1050)) * (1 - ease(seg(t, 1550, 1750)));
  const fingerO = seg(t, 0, 250) * (1 - seg(t, 2200, 2600));

  return (
    <div style={{ position: "relative", width: 280, height: 170 }}>
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 58,
          width: 200,
          height: 54,
          borderRadius: 14,
          overflow: "hidden",
          background: "var(--color-accent)",
          color: "#fff",
          fontSize: 15.5,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${2 * p}px) scale(${1 - 0.06 * p})`,
          boxShadow: `0 ${8 - 6 * p}px ${18 - 14 * p}px rgba(58,91,239,${0.35 - 0.15 * p})`,
        }}
      >
        주문하기 · ₩23,500
        <div style={{ position: "absolute", inset: 0, background: "#0B1440", opacity: 0.22 * p }} />
      </div>
      <div
        style={{
          position: "absolute",
          left: fx - 13,
          top: fy - 13,
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "rgba(27,34,54,.22)",
          border: "2px solid rgba(255,255,255,.9)",
          boxSizing: "border-box",
          opacity: fingerO,
          transform: `scale(${1 + 0.35 * p})`,
        }}
      />
    </div>
  );
}
