"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { accent, inOut, sub, txt } from "./_kit";

const ITEMS = [
  { emoji: "🍊", bg: "#FFE2C2", name: "제주 감귤 5kg", price: "₩19,900", star: "★ 4.8 · 후기 312" },
  { emoji: "🍎", bg: "#FAD0D0", name: "청송 사과 3kg", price: "₩24,500", star: "★ 4.9 · 후기 208" },
];

// 4초 주기: 흩어진 사진·이름·가격이 → 하얀 상자(그림자·둥근 모서리)에 묶이며 살짝 떠오름 → 다시 풀림
export default function Card() {
  const t = useLoop(4000);

  return (
    <div style={{ display: "flex", gap: 14 }}>
      {ITEMS.map((it, k) => {
        const c = inOut(t, 500 + k * 180, 1100 + k * 180, 3000, 3500);
        const loose = 1 - c;
        return (
          <div
            key={it.name}
            style={{
              width: 112,
              padding: 8,
              borderRadius: 14,
              background: `rgba(255,255,255,${c})`,
              boxShadow: `0 ${8 * c}px ${20 * c}px rgba(27,34,54,${0.12 * c})`,
              transform: `translateY(${-5 * c}px)`,
            }}
          >
            <div
              style={{
                height: 64,
                borderRadius: 8,
                background: it.bg,
                display: "grid",
                placeItems: "center",
                fontSize: 28,
                transform: `translate(${-6 * loose}px, ${-4 * loose}px) rotate(${-4 * loose}deg)`,
              }}
            >
              {it.emoji}
            </div>
            <div style={{ ...txt(9, 700), marginTop: 7 + 4 * loose, transform: `translateX(${5 * loose}px)` }}>{it.name}</div>
            <div style={{ ...txt(11, 800, accent), marginTop: 2 + 3 * loose, transform: `translateX(${-4 * loose}px)` }}>
              {it.price}
            </div>
            <div style={{ ...txt(7, 500, sub), marginTop: 3 + 2 * loose, opacity: 0.4 + 0.6 * seg(c, 0.3, 1) }}>{it.star}</div>
          </div>
        );
      })}
    </div>
  );
}
