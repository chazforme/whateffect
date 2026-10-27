"use client";

import { AMOUNT, BTN, LABEL, frame } from "./common";

const clay = (dark: string) =>
  `0 14px 24px ${dark}55, inset -7px -7px 14px ${dark}66, inset 7px 7px 14px rgba(255,255,255,.55)`;

// 찰흙으로 빚은 것처럼 통통하고 말랑한 입체
export default function Claymorphism() {
  return (
    <div style={{ ...frame, background: "#F4EFFF" }}>
      <div
        style={{
          position: "relative",
          width: 214,
          background: "#9F8CFF",
          borderRadius: 30,
          padding: "16px 20px",
          boxShadow: clay("#5A3FD0"),
          color: "#fff",
        }}
      >
        {/* 찰흙 동전 */}
        <div
          style={{
            position: "absolute",
            right: -10,
            top: -14,
            width: 46,
            height: 46,
            borderRadius: 999,
            background: "radial-gradient(circle at 35% 30%, #FFF0B8, #FFC23D 55%, #E2900E)",
            boxShadow: "0 8px 14px rgba(200,120,0,.35), inset -4px -4px 8px rgba(160,90,0,.35)",
            color: "#9A5A00",
            fontSize: 19,
            fontWeight: 900,
            lineHeight: "46px",
            textAlign: "center",
          }}
        >
          ₩
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.92 }}>{LABEL}</div>
        <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-.02em", marginTop: 2 }}>{AMOUNT}</div>
        <div
          style={{
            marginTop: 12,
            display: "inline-block",
            background: "#FF9EC4",
            boxShadow: clay("#D0407A"),
            fontSize: 12,
            fontWeight: 800,
            padding: "8px 16px",
            borderRadius: 999,
          }}
        >
          {BTN}
        </div>
      </div>
    </div>
  );
}
