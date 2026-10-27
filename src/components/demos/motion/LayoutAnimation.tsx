"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const ITEMS = [
  { emoji: "🍱", name: "불고기 도시락", price: "₩6,900", popular: 0, cheap: 1 },
  { emoji: "🥗", name: "닭가슴살 샐러드", price: "₩8,200", popular: 1, cheap: 2 },
  { emoji: "🍜", name: "얼큰 라면", price: "₩4,500", popular: 2, cheap: 0 },
];
const ROW = 40;

// 4초 주기: 정렬 기준이 바뀌면 항목들이 순간이동하지 않고 새 자리로 스르륵 미끄러져 감
export default function LayoutAnimation() {
  const t = useLoop(4000);
  const p = ease(seg(t, 600, 1300)) * (1 - ease(seg(t, 2600, 3300)));
  const cheap = t >= 500 && t < 2500;
  return (
    <div style={{ width: 230 }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {["인기순", "낮은 가격순"].map((lab, i) => {
          const on = (i === 1) === cheap;
          return (
            <span
              key={lab}
              style={{
                fontSize: 11.5,
                fontWeight: 800,
                padding: "4px 10px",
                borderRadius: 999,
                background: on ? "var(--color-ink)" : "#fff",
                color: on ? "#fff" : "#6B7180",
              }}
            >
              {lab}
            </span>
          );
        })}
      </div>
      <div style={{ position: "relative", height: ROW * 3 }}>
        {ITEMS.map((it) => (
          <div
            key={it.name}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: ROW - 6,
              top: ROW * (it.popular + (it.cheap - it.popular) * p),
              background: "#fff",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 12px",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--color-ink)",
              boxShadow: "0 2px 6px rgba(27,34,54,.06)",
            }}
          >
            <span>{it.emoji}</span>
            <span style={{ flex: 1 }}>{it.name}</span>
            <span style={{ color: "var(--color-accent)", fontWeight: 800 }}>{it.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
