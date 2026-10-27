"use client";

import { AMOUNT, BTN, LABEL, frame } from "./common";

// 매끈한 그라디언트 위에 자글자글한 점을 덮어 종이·필름 느낌
export default function GrainTexture() {
  return (
    <div style={{ ...frame, background: "linear-gradient(135deg,#FF9A62,#FF5E8A 55%,#8B5CF6)" }}>
      <svg width="280" height="170" style={{ position: "absolute", inset: 0, mixBlendMode: "overlay" }} aria-hidden>
        <filter id="hy-style-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="280" height="170" filter="url(#hy-style-grain)" opacity="0.9" />
      </svg>
      <div style={{ position: "relative", color: "#fff", textAlign: "center" }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, opacity: 0.9 }}>{LABEL}</div>
        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-.03em" }}>{AMOUNT}</div>
        <div
          style={{
            marginTop: 8,
            display: "inline-block",
            background: "#fff",
            color: "#C2335F",
            fontSize: 11.5,
            fontWeight: 800,
            padding: "6px 14px",
            borderRadius: 999,
          }}
        >
          {BTN}
        </div>
      </div>
    </div>
  );
}
