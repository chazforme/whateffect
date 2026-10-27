"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";

// 3.4초 주기: 위에서 내려온 알림 카드가 제자리를 살짝 지나쳤다가 출렁이며 멈춤 (용수철처럼)
export default function Spring() {
  const t = useLoop(3400);
  const d = Math.max(0, t - 200) / 1000;
  let y = t < 200 ? -70 : -70 * Math.exp(-2.6 * d) * Math.cos(2 * Math.PI * 1.4 * d);
  let o = seg(t, 200, 350);
  if (t >= 2700) {
    const p = seg(t, 2700, 3100);
    o = 1 - p;
    y = -12 * p;
  }
  return (
    <div style={{ position: "relative", width: 240, height: 150 }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 46,
          background: "#fff",
          borderRadius: 14,
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 6px 16px rgba(27,34,54,.1)",
          opacity: o,
          transform: `translateY(${y}px)`,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: "#DCE4FD",
            fontSize: 18,
            lineHeight: "34px",
            textAlign: "center",
          }}
        >
          🛒
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "var(--color-ink)" }}>장바구니에 담았어요</div>
          <div style={{ fontSize: 11.5, color: "#6B7180", marginTop: 2 }}>니트 가디건 · ₩29,900</div>
        </div>
      </div>
    </div>
  );
}
