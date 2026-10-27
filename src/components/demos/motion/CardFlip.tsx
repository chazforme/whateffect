"use client";

import type { CSSProperties } from "react";
import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";

const inOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

const face: CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: 16,
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 8px 18px rgba(27,34,54,.12)",
};

// 3.6초 주기: 카드가 세로축을 중심으로 휙 돌아 뒷면이 보임 → 유지 → 다시 앞면
export default function CardFlip() {
  const t = useLoop(3600);
  const deg = 180 * (inOut(seg(t, 500, 1200)) - inOut(seg(t, 2700, 3400)));
  return (
    <div style={{ perspective: 600 }}>
      <div
        style={{
          position: "relative",
          width: 170,
          height: 110,
          transformStyle: "preserve-3d",
          transform: `rotateY(${deg}deg)`,
        }}
      >
        <div style={{ ...face, background: "linear-gradient(135deg,#3A5BEF,#7B93FF)", color: "#fff" }}>
          <div style={{ fontSize: 30, lineHeight: 1 }}>🎁</div>
          <div style={{ fontSize: 15, fontWeight: 800, marginTop: 8 }}>오늘의 깜짝 선물</div>
          <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>뒤집어서 확인하세요</div>
        </div>
        <div style={{ ...face, background: "#fff", transform: "rotateY(180deg)" }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "var(--color-accent)" }}>당첨!</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: "var(--color-ink)", marginTop: 4 }}>☕ 아메리카노 1잔</div>
          <div style={{ fontSize: 11, color: "#6B7180", marginTop: 3 }}>쿠폰함에 넣어 드렸어요</div>
        </div>
      </div>
    </div>
  );
}
