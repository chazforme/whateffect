"use client";

import { AMOUNT, BTN, LABEL, frame } from "./common";

// 진짜 가죽 지갑처럼: 바느질 선, 눌러 찍은 글씨, 반짝이는 금속 버튼
export default function Skeuomorphism() {
  return (
    <div style={{ ...frame, background: "repeating-linear-gradient(90deg,#C9A27A 0 7px,#C29A70 7px 9px,#CDA67E 9px 15px)" }}>
      <div
        style={{
          position: "relative",
          width: 216,
          padding: "18px 20px",
          borderRadius: 14,
          background: "radial-gradient(circle at 30% 20%, #9A6644, #6E4027 70%)",
          boxShadow: "0 10px 18px rgba(40,20,5,.45), inset 0 1px 0 rgba(255,220,180,.35)",
          color: "#F6E2C2",
        }}
      >
        {/* 바느질 */}
        <div style={{ position: "absolute", inset: 6, border: "2px dashed rgba(255,226,180,.55)", borderRadius: 10 }} />
        <div style={{ position: "relative", fontSize: 12, fontWeight: 700, textShadow: "0 -1px 0 rgba(0,0,0,.6)" }}>{LABEL}</div>
        <div
          style={{
            position: "relative",
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: "-.01em",
            marginTop: 2,
            textShadow: "0 -1px 0 rgba(0,0,0,.65), 0 1px 0 rgba(255,220,180,.25)",
          }}
        >
          {AMOUNT}
        </div>
        <div
          style={{
            position: "relative",
            marginTop: 10,
            display: "inline-block",
            background: "linear-gradient(180deg,#FFF1BE,#F0C65A 48%,#D79C22 52%,#EBB94A)",
            border: "1px solid #7A4F0E",
            boxShadow: "0 2px 3px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.8)",
            color: "#5A3608",
            textShadow: "0 1px 0 rgba(255,255,255,.6)",
            fontSize: 11.5,
            fontWeight: 800,
            padding: "6px 14px",
            borderRadius: 7,
          }}
        >
          {BTN}
        </div>
      </div>
    </div>
  );
}
