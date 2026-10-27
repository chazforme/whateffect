"use client";

import type { CSSProperties } from "react";
import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const ROW_H = 36;
const row: CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  height: ROW_H,
  display: "flex",
  alignItems: "center",
  padding: "0 12px",
  fontSize: 12.5,
  fontWeight: 700,
  color: "var(--color-ink)",
  background: "#fff",
  boxSizing: "border-box",
};
const OPEN = -84;

// 3.8초 주기: 손가락이 알림 한 줄을 왼쪽으로 쓱 밀면 뒤에서 '삭제'가 드러남 → 다시 밀어 닫기
export default function SwipeGesture() {
  const t = useLoop(3800);
  const open = ease(seg(t, 600, 1250));
  const close = ease(seg(t, 2700, 3250));
  const dx = OPEN * open * (1 - close);
  const rowTop = 30 + ROW_H;

  // 손가락: 밀 때는 줄 오른쪽을 잡고, 닫을 때는 줄 가운데를 잡음
  let fx = 0;
  let fo = 0;
  if (t < 1800) {
    fx = 200 + dx;
    fo = seg(t, 300, 550) * (1 - seg(t, 1300, 1550));
  } else {
    fx = 130 + (dx - OPEN);
    fo = seg(t, 2350, 2600) * (1 - seg(t, 3250, 3500));
  }

  return (
    <div style={{ position: "relative", width: 280, height: 170 }}>
      <div
        style={{
          position: "absolute",
          left: 15,
          top: 8,
          width: 250,
          height: 154,
          borderRadius: 14,
          background: "#fff",
          overflow: "hidden",
          boxShadow: "0 3px 10px rgba(27,34,54,.08)",
        }}
      >
        <div style={{ position: "absolute", left: 12, top: 9, fontSize: 12, fontWeight: 800, color: "#6B7180" }}>받은 알림</div>
        <div style={{ ...row, top: 30, borderBottom: "1px solid #EEF1F7" }}>📦 배송이 시작됐어요</div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: rowTop,
            height: ROW_H,
            background: "#FF4D5E",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 24,
            color: "#fff",
            fontSize: 12.5,
            fontWeight: 800,
            boxSizing: "border-box",
          }}
        >
          🗑 삭제
        </div>
        <div style={{ ...row, top: rowTop, transform: `translateX(${dx}px)`, borderBottom: "1px solid #EEF1F7" }}>
          🎁 쿠폰이 도착했어요
        </div>
        <div style={{ ...row, top: 30 + ROW_H * 2 }}>💬 새 댓글이 2개 있어요</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 15 + fx - 13,
          top: 8 + rowTop + ROW_H / 2 - 13,
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "rgba(27,34,54,.22)",
          border: "2px solid rgba(255,255,255,.9)",
          boxSizing: "border-box",
          opacity: fo,
          transform: "scale(1.2)",
        }}
      />
    </div>
  );
}
