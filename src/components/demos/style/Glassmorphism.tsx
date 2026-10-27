"use client";

import { AMOUNT, BTN, LABEL, SUB, frame } from "./common";

// 알록달록한 배경 앞에 반투명 유리 카드. 뒤가 흐릿하게 비친다
export default function Glassmorphism() {
  const blob = (left: number, top: number, size: number, bg: string) => (
    <div style={{ position: "absolute", left, top, width: size, height: size, borderRadius: "50%", background: bg }} />
  );
  return (
    <div style={{ ...frame, background: "linear-gradient(135deg,#7B5CFF,#4FB8F0)" }}>
      {blob(18, 6, 92, "linear-gradient(135deg,#FF6B9A,#FF9F5A)")}
      {blob(176, 78, 110, "linear-gradient(135deg,#FFD84D,#FF8A3D)")}
      {blob(196, -26, 60, "#5CF2C4")}
      <div
        style={{
          position: "relative",
          width: 206,
          padding: "14px 16px",
          borderRadius: 18,
          background: "rgba(255,255,255,.2)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,.55)",
          boxShadow: "0 8px 24px rgba(30,20,90,.2)",
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 11.5, fontWeight: 600, opacity: 0.9 }}>{LABEL}</div>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em", marginTop: 2 }}>{AMOUNT}</div>
        <div style={{ fontSize: 10.5, opacity: 0.9 }}>{SUB}</div>
        <div
          style={{
            marginTop: 10,
            display: "inline-block",
            background: "rgba(255,255,255,.3)",
            border: "1px solid rgba(255,255,255,.6)",
            fontSize: 11.5,
            fontWeight: 700,
            padding: "5px 13px",
            borderRadius: 999,
          }}
        >
          {BTN}
        </div>
      </div>
    </div>
  );
}
