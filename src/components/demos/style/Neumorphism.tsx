"use client";

import { AMOUNT, BTN, LABEL, frame } from "./common";

const BG = "#E3E7EE";
const OUT = "9px 9px 18px #BCC2CE, -9px -9px 18px #FFFFFF";
const IN = "inset 4px 4px 8px #BCC2CE, inset -4px -4px 8px #FFFFFF";

// 배경과 같은 색인데, 밝은 그림자·어두운 그림자로 볼록 튀어나와 보인다
export default function Neumorphism() {
  return (
    <div style={{ ...frame, background: BG }}>
      <div style={{ width: 210, background: BG, borderRadius: 22, padding: "16px 18px", boxShadow: OUT, display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: "#8A92A3" }}>{LABEL}</div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.02em", color: "#4A5263", marginTop: 2 }}>{AMOUNT}</div>
          {/* 눌린 버튼: 안쪽 그림자 */}
          <div
            style={{
              marginTop: 12,
              display: "inline-block",
              background: BG,
              boxShadow: IN,
              color: "#3A5BEF",
              fontSize: 11.5,
              fontWeight: 700,
              padding: "7px 14px",
              borderRadius: 999,
            }}
          >
            {BTN}
          </div>
        </div>
        {/* 볼록한 동그란 버튼 */}
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 999,
            background: BG,
            boxShadow: "4px 4px 8px #BCC2CE, -4px -4px 8px #FFFFFF",
            color: "#8A92A3",
            fontSize: 16,
            fontWeight: 700,
            lineHeight: "38px",
            textAlign: "center",
          }}
        >
          ＋
        </div>
      </div>
    </div>
  );
}
