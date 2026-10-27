"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const DOWN = 500; // 손가락 닿음
const FULL = 1300; // 꾹 누르기 완료 → 메뉴
const UP = 2700; // 손가락 뗌
const FX = 88; // 손가락 자리
const FY = 38;
const C = 2 * Math.PI * 17;

// 4초 주기: 말풍선을 꾹 누르고 있으면 동그라미가 채워지고, 다 차면 메뉴가 뜸
export default function LongPress() {
  const t = useLoop(4000);
  const fingerO = seg(t, DOWN - 300, DOWN - 80) * (1 - seg(t, UP, UP + 250));
  const hold = t >= DOWN && t < UP;
  const prog = seg(t, DOWN, FULL);
  const ringO = hold && t < FULL + 150 ? 1 - seg(t, FULL, FULL + 150) : 0;
  const menu = ease(seg(t, FULL, FULL + 250)) * (1 - seg(t, 3200, 3450));
  const squeeze = hold ? 1 - 0.04 * seg(t, DOWN, DOWN + 200) : 1;

  return (
    <div style={{ position: "relative", width: 280, height: 170 }}>
      <div
        style={{
          position: "absolute",
          left: 20,
          top: 8,
          width: 240,
          height: 154,
          borderRadius: 14,
          background: "#fff",
          boxShadow: "0 3px 10px rgba(27,34,54,.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 34,
          top: 22,
          padding: "8px 12px",
          borderRadius: "14px 14px 14px 4px",
          background: "#EEF1F7",
          fontSize: 13,
          fontWeight: 600,
          color: "var(--color-ink)",
          transform: `scale(${squeeze})`,
          boxShadow: menu > 0 ? `0 0 0 ${2 * menu}px rgba(58,91,239,.35)` : "none",
        }}
      >
        내일 몇 시에 만나?
      </div>
      <div
        style={{
          position: "absolute",
          right: 34,
          bottom: 22,
          padding: "8px 12px",
          borderRadius: "14px 14px 4px 14px",
          background: "var(--color-accent)",
          fontSize: 13,
          fontWeight: 600,
          color: "#fff",
          opacity: 1 - 0.6 * menu,
        }}
      >
        7시 강남역 어때?
      </div>
      <div
        style={{
          position: "absolute",
          left: 34,
          top: 64,
          display: "flex",
          gap: 2,
          padding: 4,
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 6px 18px rgba(27,34,54,.18)",
          opacity: menu,
          transform: `scale(${0.85 + 0.15 * menu})`,
          transformOrigin: "left top",
        }}
      >
        {["📋 복사", "↩ 답장", "🗑 삭제"].map((m) => (
          <div key={m} style={{ padding: "6px 9px", fontSize: 12, fontWeight: 700, color: "var(--color-ink)" }}>
            {m}
          </div>
        ))}
      </div>
      <svg width="44" height="44" style={{ position: "absolute", left: FX - 22, top: FY - 22, opacity: ringO }}>
        <circle cx="22" cy="22" r="17" fill="none" stroke="rgba(58,91,239,.2)" strokeWidth="4" />
        <circle
          cx="22"
          cy="22"
          r="17"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - prog)}
          transform="rotate(-90 22 22)"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: FX - 13,
          top: FY - 13,
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "rgba(27,34,54,.22)",
          border: "2px solid rgba(255,255,255,.9)",
          boxSizing: "border-box",
          opacity: fingerO,
          transform: `scale(${hold ? 1.25 : 1})`,
        }}
      />
    </div>
  );
}
