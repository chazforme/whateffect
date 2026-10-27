"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

// 3.2초 주기: 가운데서 작게 시작해 원래 크기로 커지며 등장 → 유지 → 살짝 작아지며 사라짐
export default function ScaleIn() {
  const t = useLoop(3200);
  let s = 0.3 + 0.7 * ease(seg(t, 200, 800));
  let o = seg(t, 200, 450);
  if (t >= 2600) {
    const p = seg(t, 2600, 3000);
    s = 1 - 0.15 * p;
    o = 1 - p;
  }
  return (
    <div
      style={{
        width: 170,
        background: "#fff",
        borderRadius: 18,
        padding: "18px 0 16px",
        textAlign: "center",
        boxShadow: "0 6px 18px rgba(27,34,54,.1)",
        opacity: o,
        transform: `scale(${s})`,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "var(--color-accent)",
          color: "#fff",
          fontSize: 24,
          fontWeight: 800,
          lineHeight: "44px",
          margin: "0 auto",
        }}
      >
        ✓
      </div>
      <div style={{ fontSize: 17, fontWeight: 800, color: "var(--color-ink)", marginTop: 10 }}>주문 완료</div>
      <div style={{ fontSize: 12, color: "#6B7180", marginTop: 3 }}>내일 도착 예정이에요</div>
    </div>
  );
}
