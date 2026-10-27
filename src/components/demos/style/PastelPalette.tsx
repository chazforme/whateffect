"use client";

import { AMOUNT, BTN, LABEL, frame } from "./common";

const SWATCH = ["#FFD1DC", "#FFE7B8", "#CFF2E1", "#CFE3FF", "#E5D6FF"];

// 흰색을 많이 섞은 연한 색들로만
export default function PastelPalette() {
  return (
    <div style={{ ...frame, background: "#FFFBF5", flexDirection: "column", gap: 12 }}>
      <div
        style={{
          width: 224,
          background: "#FFE1EA",
          borderRadius: 18,
          padding: "13px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "#A0687C", fontWeight: 700 }}>{LABEL}</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#6B3C4E", letterSpacing: "-.02em" }}>{AMOUNT}</div>
        </div>
        <div style={{ background: "#C9F0DE", color: "#2F6B55", fontSize: 11, fontWeight: 700, padding: "7px 11px", borderRadius: 999 }}>
          {BTN}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {SWATCH.map((c) => (
          <div key={c} style={{ width: 26, height: 26, borderRadius: 999, background: c, border: "2px solid #fff" }} />
        ))}
      </div>
    </div>
  );
}
