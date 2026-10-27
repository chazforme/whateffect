"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const ROWS = ["무료 배송", "오늘 주문, 내일 도착", "30일 무료 반품", "구매 시 포인트 적립"];

// 3.2초 주기, 0.18초 간격으로 하나씩
export default function Stagger() {
  const t = useLoop(3200);
  return (
    <div style={{ width: "76%", display: "flex", flexDirection: "column", gap: 8 }}>
      {ROWS.map((label, k) => {
        const local = t - k * 180;
        let o = 0;
        let y = 22;
        if (t >= 2600) {
          o = 1 - seg(t, 2600, 2900);
          y = 0;
        } else if (local > 0) {
          o = seg(local, 0, 450);
          y = 22 * (1 - ease(seg(local, 0, 550)));
        }
        return (
          <div
            key={label}
            style={{
              background: "#fff",
              borderRadius: 10,
              height: 32,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 12px",
              fontSize: 13.5,
              fontWeight: 700,
              color: "var(--color-ink)",
              boxShadow: "0 2px 6px rgba(27,34,54,.06)",
              opacity: o,
              transform: `translateY(${y}px)`,
            }}
          >
            <i style={{ fontStyle: "normal", color: "var(--color-accent)", fontWeight: 800 }}>✓</i>
            {label}
          </div>
        );
      })}
    </div>
  );
}
