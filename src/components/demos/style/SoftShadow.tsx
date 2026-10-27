"use client";

import { AMOUNT, BTN, LABEL, SUB, frame } from "./common";

// 넓게 퍼지고 아주 옅은 그림자 → 카드가 살짝 떠 보임
export default function SoftShadow() {
  return (
    <div style={{ ...frame, background: "#F3F4F8" }}>
      <div
        style={{
          width: 210,
          background: "#fff",
          borderRadius: 16,
          padding: "15px 18px",
          boxShadow: "0 22px 40px -12px rgba(27,34,54,.28), 0 3px 8px rgba(27,34,54,.05)",
          marginTop: -12,
        }}
      >
        <div style={{ fontSize: 11.5, color: "#6B7180", fontWeight: 600 }}>{LABEL}</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#1B2236", letterSpacing: "-.02em", marginTop: 2 }}>{AMOUNT}</div>
        <div style={{ fontSize: 10.5, color: "#6B7180", marginTop: 1 }}>{SUB}</div>
        <div
          style={{
            marginTop: 10,
            display: "inline-block",
            background: "#3A5BEF",
            color: "#fff",
            fontSize: 11.5,
            fontWeight: 700,
            padding: "6px 13px",
            borderRadius: 8,
            boxShadow: "0 6px 14px -4px rgba(58,91,239,.45)",
          }}
        >
          {BTN}
        </div>
      </div>
    </div>
  );
}
