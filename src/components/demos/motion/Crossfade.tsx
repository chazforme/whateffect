"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";

const SLIDES = [
  { emoji: "🍓", name: "딸기 생크림 케이크", price: "₩28,000", bg: "#FDE2E4" },
  { emoji: "🍫", name: "진한 초코 케이크", price: "₩31,000", bg: "#EADBCB" },
];

// 4초 주기: 앞 사진이 서서히 투명해지는 동안 뒤 사진이 서서히 짙어지며 겹쳐 바뀜
export default function Crossfade() {
  const t = useLoop(4000);
  // 0~1500 앞, 1500~2300 겹쳐 바뀜, 2300~3400 뒤, 3400~4000 다시 앞으로
  const b = t < 3400 ? seg(t, 1500, 2300) : 1 - seg(t, 3400, 4000);
  return (
    <div
      style={{
        position: "relative",
        width: 220,
        height: 140,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 6px 16px rgba(27,34,54,.1)",
      }}
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.name}
          style={{
            position: "absolute",
            inset: 0,
            background: s.bg,
            opacity: i === 0 ? 1 - b : b,
          }}
        >
          <div style={{ fontSize: 56, lineHeight: 1, textAlign: "center", marginTop: 18 }}>{s.emoji}</div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              padding: "8px 14px",
              background: "rgba(255,255,255,.88)",
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              fontWeight: 800,
              color: "var(--color-ink)",
            }}
          >
            <span>{s.name}</span>
            <span>{s.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
