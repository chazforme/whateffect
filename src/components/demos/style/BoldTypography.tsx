"use client";

import { AMOUNT, frame } from "./common";

// 숫자 하나를 화면을 꽉 채울 만큼 크게
export default function BoldTypography() {
  return (
    <div style={{ ...frame, background: "#fff", justifyContent: "flex-start", padding: "0 20px" }}>
      <div style={{ lineHeight: 1.05 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#1B2236", letterSpacing: "-.02em" }}>이번 달 지출</div>
        <div style={{ fontSize: 50, fontWeight: 900, color: "#3A5BEF", letterSpacing: "-.05em", margin: "4px 0 6px -2px" }}>
          {AMOUNT}
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#1B2236", letterSpacing: "-.03em" }}>
          12% <span style={{ color: "#9AA0AC" }}>덜 썼어요</span>
        </div>
      </div>
    </div>
  );
}
