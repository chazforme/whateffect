"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const io = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

// 3.8초 주기: 사진 위에 커서가 올라가면 아래에서 설명·버튼이 스르륵 올라옴
export default function HoverReveal() {
  const t = useLoop(3800);
  const go = io(seg(t, 0, 800));
  const back = io(seg(t, 2600, 3400));
  const x = 262 + (150 - 262) * go + (262 - 150) * back;
  const y = 165 + (62 - 165) * go + (168 - 62) * back;
  const cursorO = seg(t, 0, 200) * (1 - seg(t, 3300, 3600));
  const r = ease(seg(t, 700, 1100)) * (1 - ease(seg(t, 2500, 2900)));

  return (
    <div style={{ position: "relative", width: 280, height: 170 }}>
      <div
        style={{
          position: "absolute",
          left: 30,
          top: 12,
          width: 220,
          height: 146,
          borderRadius: 14,
          overflow: "hidden",
          background: "linear-gradient(160deg,#A8DCCF,#4E8F9C)",
          boxShadow: "0 4px 12px rgba(27,34,54,.12)",
        }}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 22, textAlign: "center", fontSize: 50 }}>🏝️</div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 94,
            padding: "8px 12px",
            background: `rgba(15,20,35,${0.35 + 0.4 * r})`,
            transform: `translateY(${62 * (1 - r)}px)`,
            color: "#fff",
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 800 }}>제주 3박 4일</div>
          <div style={{ fontSize: 11.5, marginTop: 6, opacity: r, color: "#D9DEEA" }}>✓ 항공 + 숙소 포함 · ₩389,000부터</div>
          <div
            style={{
              display: "inline-block",
              marginTop: 8,
              padding: "5px 10px",
              borderRadius: 7,
              background: "#fff",
              color: "var(--color-ink)",
              fontSize: 11.5,
              fontWeight: 800,
              opacity: r,
            }}
          >
            자세히 보기 →
          </div>
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
