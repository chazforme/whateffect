"use client";

import { AMOUNT, BTN, LABEL, frame } from "./common";

const DARK = "#2A1B6B";
const LIGHT = "#FF7AA8";

// 사진과 글자 전부를 두 가지 색으로만
export default function Duotone() {
  return (
    <div style={{ ...frame, background: LIGHT, justifyContent: "flex-start" }}>
      <svg width="128" height="170" viewBox="0 0 128 170" style={{ display: "block", flexShrink: 0 }}>
        <rect width="128" height="170" fill={LIGHT} />
        <circle cx="82" cy="52" r="20" fill={DARK} opacity=".35" />
        <path d="M0 112 L34 70 L58 98 L84 62 L128 116 V170 H0Z" fill={DARK} opacity=".55" />
        <path d="M0 132 L26 108 L52 126 L88 96 L128 130 V170 H0Z" fill={DARK} opacity=".8" />
        <path d="M0 150 Q64 132 128 152 V170 H0Z" fill={DARK} />
        {/* 사람 실루엣 */}
        <circle cx="46" cy="114" r="5" fill={DARK} />
        <path d="M40 140 Q46 118 52 140Z" fill={DARK} />
      </svg>
      <div style={{ padding: "0 16px", color: DARK }}>
        <div style={{ fontSize: 11.5, fontWeight: 700 }}>{LABEL}</div>
        <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-.02em", marginTop: 2 }}>{AMOUNT}</div>
        <div
          style={{
            marginTop: 12,
            display: "inline-block",
            background: DARK,
            color: LIGHT,
            fontSize: 11.5,
            fontWeight: 800,
            padding: "7px 13px",
            borderRadius: 999,
          }}
        >
          {BTN}
        </div>
      </div>
    </div>
  );
}
