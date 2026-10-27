"use client";

import type { CSSProperties } from "react";
import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const io = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const line: CSSProperties = {
  position: "absolute",
  left: 16,
  top: 30,
  width: 32,
  height: 4,
  borderRadius: 2,
  background: "var(--color-ink)",
};
const CLICKS = [800, 2500];

// 3.6초 주기: 커서가 누르면 줄 세 개(≡)가 X로 바뀜 → 다시 누르면 ≡로
export default function IconMorph() {
  const t = useLoop(3600);
  const go = io(seg(t, 0, 650));
  const back = io(seg(t, 3000, 3500));
  const x = 245 + (152 - 245) * go + (245 - 152) * back;
  const y = 160 + (82 - 160) * go + (165 - 82) * back;
  const cursorO = seg(t, 0, 200) * (1 - seg(t, 3250, 3500));
  const m = ease(seg(t, 820, 1150)) * (1 - ease(seg(t, 2520, 2850)));
  const hover = seg(t, 450, 650) * (1 - seg(t, 2950, 3150));

  return (
    <div style={{ position: "relative", width: 280, height: 170 }}>
      <div
        style={{
          position: "absolute",
          left: 108,
          top: 34,
          width: 64,
          height: 64,
          borderRadius: 16,
          background: hover > 0.5 ? "#EEF1F7" : "#fff",
          boxShadow: "0 3px 10px rgba(27,34,54,.08)",
        }}
      >
        <div style={{ ...line, transform: `translateY(${-10 * (1 - m)}px) rotate(${45 * m}deg)` }} />
        <div style={{ ...line, opacity: 1 - m, transform: `scaleX(${1 - m})` }} />
        <div style={{ ...line, transform: `translateY(${10 * (1 - m)}px) rotate(${-45 * m}deg)` }} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 110,
          height: 20,
          textAlign: "center",
          fontSize: 14,
          fontWeight: 800,
        }}
      >
        <span style={{ position: "absolute", left: 0, right: 0, color: "var(--color-ink)", opacity: 1 - m }}>메뉴</span>
        <span style={{ position: "absolute", left: 0, right: 0, color: "var(--color-accent)", opacity: m }}>닫기</span>
      </div>
      {CLICKS.map((c) => {
        const k = seg(t, c, c + 400);
        return (
          <div
            key={c}
            style={{
              position: "absolute",
              left: x - 14,
              top: y - 14,
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: "2px solid var(--color-accent)",
              boxSizing: "border-box",
              opacity: k > 0 && k < 1 ? 1 - k : 0,
              transform: `scale(${0.4 + k})`,
            }}
          />
        );
      })}
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
