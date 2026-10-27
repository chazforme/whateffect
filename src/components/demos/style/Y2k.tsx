"use client";

import { AMOUNT, BTN, LABEL, frame } from "./common";

const SPARKS: [number, number, number][] = [
  [20, 18, 18],
  [246, 26, 14],
  [34, 132, 12],
  [238, 128, 20],
  [140, 10, 10],
];

// 2000년대 감성: 무지갯빛 홀로그램, 반짝이 별, 볼록한 젤리 버튼
export default function Y2k() {
  return (
    <div style={{ ...frame, background: "linear-gradient(125deg,#FFC6F1,#C2E2FF 35%,#E6D2FF 60%,#C8FFF0 85%,#FFD6F4)" }}>
      {SPARKS.map(([x, y, s], i) => (
        <div
          key={i}
          style={{ position: "absolute", left: x, top: y, fontSize: s, color: "#fff", textShadow: "0 0 6px #FF5CD6, 0 0 2px #7B5CFF" }}
        >
          ✦
        </div>
      ))}
      <div
        style={{
          position: "relative",
          width: 200,
          padding: "12px 16px 14px",
          borderRadius: 24,
          background: "linear-gradient(180deg,rgba(255,255,255,.85),rgba(232,236,255,.75))",
          border: "2px solid #fff",
          boxShadow: "0 0 0 2px #C9CEF0, 0 10px 22px rgba(123,92,255,.3)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 11.5, fontWeight: 800, color: "#7B5CFF", fontStyle: "italic" }}>☆ {LABEL} ☆</div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 900,
            fontStyle: "italic",
            letterSpacing: "-.03em",
            color: "transparent",
            backgroundImage: "linear-gradient(90deg,#FF3EC8,#7B5CFF 50%,#2EC5FF)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {AMOUNT}
        </div>
        {/* 젤리 버튼: 위쪽에 반짝 하이라이트 */}
        <div
          style={{
            position: "relative",
            marginTop: 6,
            display: "inline-block",
            background: "linear-gradient(180deg,#FF9EE8,#FF3EC8)",
            border: "1.5px solid #D21FA4",
            color: "#fff",
            fontSize: 12,
            fontWeight: 900,
            padding: "6px 18px",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <div
            style={{ position: "absolute", left: 8, right: 8, top: 2, height: 9, borderRadius: 999, background: "rgba(255,255,255,.6)" }}
          />
          <span style={{ position: "relative" }}>{BTN}</span>
        </div>
      </div>
    </div>
  );
}
