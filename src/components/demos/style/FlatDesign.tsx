"use client";

import { AMOUNT, BTN, LABEL, SUB } from "./common";

// 그림자·그라디언트 없이 단색 면으로만
export default function FlatDesign() {
  return (
    <div
      style={{
        width: 230,
        background: "#3A5BEF",
        borderRadius: 8,
        padding: "16px 18px",
        color: "#fff",
        position: "relative",
        whiteSpace: "nowrap",
      }}
    >
      {/* 단색 도형으로 만든 지갑 아이콘 */}
      <div style={{ position: "absolute", right: 18, top: 16, width: 34, height: 26, background: "#FFC93C", borderRadius: 4 }}>
        <div
          style={{ position: "absolute", right: 0, top: 8, width: 14, height: 10, background: "#FF6B5B", borderRadius: "3px 0 0 3px" }}
        />
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.85 }}>{LABEL}</div>
      <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.02em", marginTop: 2 }}>{AMOUNT}</div>
      <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>{SUB}</div>
      <div
        style={{
          marginTop: 12,
          display: "inline-block",
          background: "#FFC93C",
          color: "#1B2236",
          fontSize: 12,
          fontWeight: 700,
          padding: "7px 14px",
          borderRadius: 6,
        }}
      >
        {BTN}
      </div>
    </div>
  );
}
