"use client";

import type { CSSProperties } from "react";
import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";

const ITEMS = [
  { emoji: "🎧", name: "무선 이어폰 프로", sub: "오늘 출발 · 무료배송", price: "₩89,000", bg: "#DCE3F6" },
  { emoji: "⌚", name: "스마트워치 SE", sub: "내일 도착 · 무료배송", price: "₩239,000", bg: "#F6E5D6" },
];

const grey: CSSProperties = { background: "#E3E6EE", borderRadius: 5 };
const row: CSSProperties = { display: "flex", gap: 12, alignItems: "center", height: 54 };

// 4초 주기: 회색 틀(빛이 훑고 지나감) 2초 → 실제 내용 → 다시 틀
export default function Skeleton() {
  const t = useLoop(4000);
  const content = t < 2000 ? 0 : t < 3700 ? seg(t, 2000, 2300) : 1 - seg(t, 3700, 4000);
  const sweep = ((t % 1000) / 1000) * 360 - 100; // 빛 띠의 x 위치

  return (
    <div
      style={{
        width: 250,
        background: "#fff",
        borderRadius: 14,
        padding: 12,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(27,34,54,.06)",
      }}
    >
      {/* 회색 틀 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, opacity: 1 - content }}>
        {ITEMS.map((it) => (
          <div key={it.name} style={row}>
            <div style={{ ...grey, width: 54, height: 54, borderRadius: 10 }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
              <div style={{ ...grey, width: "80%", height: 11 }} />
              <div style={{ ...grey, width: "55%", height: 9 }} />
              <div style={{ ...grey, width: "35%", height: 11 }} />
            </div>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 90,
            background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.8), rgba(255,255,255,0))",
            transform: `translateX(${sweep}px)`,
          }}
        />
      </div>
      {/* 실제 내용 */}
      <div
        style={{
          position: "absolute",
          inset: 12,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          opacity: content,
        }}
      >
        {ITEMS.map((it) => (
          <div key={it.name} style={row}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 10,
                background: it.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
              }}
            >
              {it.emoji}
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "var(--color-ink)" }}>{it.name}</div>
              <div style={{ fontSize: 10.5, color: "#6B7180" }}>{it.sub}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "var(--color-accent)" }}>{it.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
