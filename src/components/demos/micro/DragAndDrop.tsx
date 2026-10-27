"use client";

import type { CSSProperties } from "react";
import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const io = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const card: CSSProperties = {
  position: "absolute",
  width: 104,
  height: 30,
  borderRadius: 8,
  background: "#fff",
  display: "flex",
  alignItems: "center",
  paddingLeft: 10,
  fontSize: 12,
  fontWeight: 700,
  color: "var(--color-ink)",
  boxSizing: "border-box",
  boxShadow: "0 1px 3px rgba(27,34,54,.08)",
};
const col: CSSProperties = {
  position: "absolute",
  top: 8,
  width: 120,
  height: 154,
  borderRadius: 12,
  background: "#EEF1F7",
};
const head: CSSProperties = { position: "absolute", top: 16, fontSize: 12, fontWeight: 800, color: "#6B7180" };

// 4.4초 주기: 커서가 '할 일' 카드를 집어 '완료' 칸으로 끌어다 놓음
export default function DragAndDrop() {
  const t = useLoop(4400);

  const lift = ease(seg(t, 600, 750)) * (1 - ease(seg(t, 1800, 1950)));
  const move = io(seg(t, 800, 1800));
  let cx = 22 + (154 - 22) * move;
  let cy = 38 + (74 - 38) * move;
  let cardO = 1 - seg(t, 3400, 3600);
  if (t >= 3600) {
    cx = 22;
    cy = 38;
    cardO = seg(t, 3800, 4100);
  }
  const card2Y = t < 3500 ? 74 - 36 * ease(seg(t, 900, 1200)) : 38 + 36 * ease(seg(t, 3500, 3800));
  const slot = seg(t, 900, 1300) * (1 - seg(t, 1800, 1900));

  // 커서: 들어옴 → 카드와 함께 이동 → 놓고 빠짐
  let x: number;
  let y: number;
  if (t < 600) {
    const k = io(seg(t, 0, 600));
    x = 110 + (80 - 110) * k;
    y = 160 + (53 - 160) * k;
  } else if (t < 2000) {
    x = cx + 58;
    y = cy + 15;
  } else {
    const k = io(seg(t, 2000, 2700));
    x = 212 + (250 - 212) * k;
    y = 89 + (160 - 89) * k;
  }
  const cursorO = seg(t, 0, 200) * (1 - seg(t, 2500, 2800));

  return (
    <div style={{ position: "relative", width: 280, height: 170 }}>
      <div style={{ ...col, left: 14 }} />
      <div style={{ ...col, left: 146 }} />
      <div style={{ ...head, left: 24 }}>할 일</div>
      <div style={{ ...head, left: 156 }}>완료 ✓</div>
      <div style={{ ...card, left: 154, top: 38 }}>견적서 보내기</div>
      <div
        style={{
          ...card,
          left: 154,
          top: 74,
          background: "transparent",
          border: "1.5px dashed var(--color-accent)",
          boxShadow: "none",
          opacity: slot,
        }}
      />
      <div style={{ ...card, left: 22, top: card2Y }}>회의록 정리</div>
      <div
        style={{
          ...card,
          left: cx,
          top: cy,
          opacity: cardO,
          border: lift > 0.1 ? "1.5px solid var(--color-accent)" : "none",
          transform: `rotate(${4 * lift}deg) scale(${1 + 0.06 * lift})`,
          boxShadow: `0 ${1 + 9 * lift}px ${3 + 14 * lift}px rgba(27,34,54,${0.08 + 0.14 * lift})`,
        }}
      >
        보고서 제출
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
