"use client";

import { AMOUNT, BTN, LABEL, frame } from "./common";

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

// 굵은 검정 테두리, 각진 모서리, 번지지 않는 딱딱한 그림자
export default function Brutalism() {
  return (
    <div style={{ ...frame, background: "#F2EEE3" }}>
      <div
        style={{
          width: 214,
          background: "#FFE14D",
          border: "3px solid #111",
          boxShadow: "7px 7px 0 #111",
          padding: "12px 14px",
          color: "#111",
          fontFamily: MONO,
          marginLeft: -6,
          marginTop: -6,
        }}
      >
        <div style={{ fontSize: 11.5, fontWeight: 800, borderBottom: "3px solid #111", paddingBottom: 6 }}>{LABEL} ▸ 10월</div>
        <div style={{ fontSize: 27, fontWeight: 900, letterSpacing: "-.04em", marginTop: 6 }}>{AMOUNT}</div>
        <div
          style={{
            marginTop: 8,
            display: "inline-block",
            background: "#FF6AA8",
            border: "3px solid #111",
            boxShadow: "3px 3px 0 #111",
            fontSize: 12,
            fontWeight: 900,
            padding: "4px 12px",
          }}
        >
          {BTN} →
        </div>
      </div>
    </div>
  );
}
