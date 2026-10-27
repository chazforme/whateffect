"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";

// 3.2초 주기: 제자리에서 투명 → 선명 → 유지 → 다시 투명. 위치·크기는 그대로
export default function FadeIn() {
  const t = useLoop(3200);
  const o = t < 2500 ? seg(t, 200, 1200) : 1 - seg(t, 2500, 3100);
  return (
    <div
      style={{
        width: 220,
        background: "#fff",
        borderRadius: 14,
        padding: "16px 18px",
        boxShadow: "0 4px 14px rgba(27,34,54,.08)",
        opacity: o,
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--color-accent)" }}>🎁 쿠폰이 도착했어요</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: "var(--color-ink)", marginTop: 6, letterSpacing: "-.02em" }}>
        10,000원 할인
      </div>
      <div style={{ fontSize: 12, color: "#6B7180", marginTop: 4 }}>오늘 자정까지 쓸 수 있어요</div>
    </div>
  );
}
