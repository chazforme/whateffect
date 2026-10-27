"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const io = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

// 3.6초 주기: 커서가 버튼 위로 올라감 → 버튼이 채워지며 살짝 떠오름 → 커서가 떠나면 원래대로
export default function HoverEffect() {
  const t = useLoop(3600);

  const go = io(seg(t, 0, 900));
  const back = io(seg(t, 2500, 3300));
  const x = 250 + (150 - 250) * go + (250 - 150) * back;
  const y = 160 + (90 - 160) * go + (165 - 90) * back;
  const cursorO = seg(t, 0, 200) * (1 - seg(t, 3200, 3500));
  const h = ease(seg(t, 750, 1000)) * (1 - ease(seg(t, 2450, 2700)));

  return (
    <div style={{ position: "relative", width: 280, height: 170 }}>
      <div
        style={{
          position: "absolute",
          left: 55,
          top: 62,
          width: 170,
          height: 46,
          borderRadius: 12,
          border: "2px solid var(--color-accent)",
          background: "#fff",
          overflow: "hidden",
          transform: `translateY(${-3 * h}px)`,
          boxShadow: `0 ${4 + 8 * h}px ${10 + 14 * h}px rgba(58,91,239,${0.08 + 0.25 * h})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            fontWeight: 800,
            color: "var(--color-accent)",
          }}
        >
          🛒 장바구니 담기
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            fontWeight: 800,
            color: "#fff",
            background: "var(--color-accent)",
            opacity: h,
          }}
        >
          🛒 장바구니 담기
        </div>
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
