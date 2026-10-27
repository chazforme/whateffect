"use client";

import type { CSSProperties } from "react";
import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const APPS = [
  { emoji: "💬", label: "메시지", bg: "#FFE680" },
  { emoji: "🛍️", label: "쇼핑", bg: "#DCE3F6" },
  { emoji: "✉️", label: "메일", bg: "#E6F3EC" },
  { emoji: "📷", label: "사진", bg: "#EEEBFA" },
];
const CHANGES = [500, 1300, 2100]; // 숫자가 1 → 2 → 3으로 바뀌는 시각

const badge: CSSProperties = {
  position: "absolute",
  top: -6,
  right: -7,
  minWidth: 20,
  height: 20,
  padding: "0 5px",
  borderRadius: 10,
  background: "#F04452",
  color: "#fff",
  fontSize: 11,
  fontWeight: 800,
  border: "2px solid #fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
};

// 4초 주기: 메시지 앱에 빨간 숫자가 톡 붙고 1 → 2 → 3으로 늘어남
export default function Badge() {
  const t = useLoop(4000);
  let count = 0;
  let last = 0;
  CHANGES.forEach((c, i) => {
    if (t >= c) {
      count = i + 1;
      last = c;
    }
  });
  const b = Math.sin(Math.PI * seg(t, last, last + 300));
  const first = ease(seg(t, CHANGES[0], CHANGES[0] + 200));
  const out = 1 - seg(t, 3500, 3850);
  const scale = (count === 1 ? first : 1) * (1 + 0.35 * b);

  return (
    <div style={{ display: "flex", gap: 14 }}>
      {APPS.map((a, i) => (
        <div key={a.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <div
            style={{
              position: "relative",
              width: 50,
              height: 50,
              borderRadius: 14,
              background: a.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              boxShadow: "0 2px 6px rgba(27,34,54,.08)",
            }}
          >
            {a.emoji}
            {i === 0 && count > 0 && (
              <span style={{ ...badge, opacity: out, transform: `scale(${scale})` }}>{count}</span>
            )}
            {i === 2 && <span style={badge}>99+</span>}
          </div>
          <span style={{ fontSize: 11, color: "var(--color-ink)", fontWeight: 600 }}>{a.label}</span>
        </div>
      ))}
    </div>
  );
}
