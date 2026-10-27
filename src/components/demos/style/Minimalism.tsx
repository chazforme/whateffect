"use client";

import { AMOUNT, BTN, LABEL, frame } from "./common";

// 꾸밈을 다 덜어내고 여백·가는 글씨·선 하나만
export default function Minimalism() {
  return (
    <div style={{ ...frame, background: "#fff", justifyContent: "flex-start", padding: "0 34px" }}>
      <div>
        <div style={{ fontSize: 10.5, letterSpacing: ".18em", color: "#9AA0AC" }}>{LABEL}</div>
        <div style={{ fontSize: 30, fontWeight: 300, letterSpacing: "-.01em", color: "#1B2236", marginTop: 8 }}>{AMOUNT}</div>
        <div style={{ width: 180, height: 1, background: "#E3E6EE", margin: "16px 0 10px" }} />
        <div style={{ fontSize: 11, color: "#1B2236", letterSpacing: ".04em" }}>{BTN} →</div>
      </div>
    </div>
  );
}
