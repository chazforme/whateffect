"use client";

import { AMOUNT, BTN, LABEL, frame } from "./common";

const BARS: [number, string][] = [
  [22, "#CFCFCF"],
  [34, "#AFAFAF"],
  [18, "#CFCFCF"],
  [40, "#8A8A8A"],
  [28, "#AFAFAF"],
  [46, "#111111"],
];

// 검정·흰색·회색 단계만 사용
export default function Monochrome() {
  return (
    <div style={{ ...frame, background: "#E6E6E6" }}>
      <div style={{ width: 232, background: "#fff", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ background: "#111", color: "#fff", fontSize: 11, fontWeight: 700, padding: "7px 14px", letterSpacing: ".04em" }}>
          {LABEL}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "12px 14px" }}>
          <div>
            <div style={{ fontSize: 23, fontWeight: 800, color: "#111", letterSpacing: "-.02em" }}>{AMOUNT}</div>
            <div
              style={{
                marginTop: 8,
                display: "inline-block",
                border: "1.5px solid #111",
                color: "#111",
                fontSize: 11,
                fontWeight: 700,
                padding: "5px 11px",
                borderRadius: 4,
              }}
            >
              {BTN}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 48 }}>
            {BARS.map(([h, c], i) => (
              <div key={i} style={{ width: 8, height: h, background: c, borderRadius: 2 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
