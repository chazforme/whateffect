"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

// 3.4초 주기: 왼쪽 바깥에서 미끄러져 들어와 → 유지 → 오른쪽으로 빠져나감 (투명도 변화 없음)
export default function SlideIn() {
  const t = useLoop(3400);
  const inX = -115 * (1 - ease(seg(t, 200, 900)));
  const out = seg(t, 2600, 3100);
  const x = t < 2600 ? inX : 115 * out * out;
  return (
    <div
      style={{
        width: 260,
        height: 110,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 230,
          background: "var(--color-accent)",
          borderRadius: 14,
          padding: "14px 16px",
          color: "#fff",
          transform: `translateX(${x}%)`,
          boxShadow: "0 6px 16px rgba(58,91,239,.25)",
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.85 }}>오늘만 특가</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 4 }}>
          <span style={{ fontSize: 17, fontWeight: 800 }}>🎧 무선 이어폰</span>
          <span style={{ fontSize: 17, fontWeight: 800 }}>₩39,000</span>
        </div>
      </div>
    </div>
  );
}
