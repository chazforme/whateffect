"use client";

import { AMOUNT, BTN, LABEL } from "./common";

function Mini({ r, caption }: { r: number; caption: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: 124, background: "#fff", borderRadius: r, padding: "14px 12px", textAlign: "left" }}>
        <div style={{ fontSize: 10.5, color: "#6B7180", fontWeight: 600 }}>{LABEL}</div>
        <div style={{ fontSize: 17, fontWeight: 800, color: "#1B2236", letterSpacing: "-.02em", marginTop: 2 }}>{AMOUNT}</div>
        <div
          style={{
            marginTop: 10,
            background: "#3A5BEF",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            textAlign: "center",
            padding: "6px 0",
            borderRadius: r === 0 ? 0 : 999,
          }}
        >
          {BTN}
        </div>
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7180", marginTop: 8 }}>{caption}</div>
    </div>
  );
}

// 같은 카드를 각지게 vs 둥글게 나란히
export default function RoundedCorners() {
  return (
    <div style={{ display: "flex", gap: 16, whiteSpace: "nowrap" }}>
      <Mini r={0} caption="각진 모서리 0px" />
      <Mini r={22} caption="둥근 모서리 22px" />
    </div>
  );
}
