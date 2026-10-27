"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

// 한국식: 오르면 빨강 ▲, 내리면 파랑 ▼
const TILES = [
  { label: "오늘 방문자", value: "1,284", up: true, delta: "12.4%" },
  { label: "구매 전환율", value: "3.1%", up: false, delta: "0.8%p" },
];

// 3.6초 주기: 숫자 아래 증감 칩이 화살표 방향으로 밀려 들어옴 → 유지 → 사라짐
export default function TrendIndicator() {
  const t = useLoop(3600);

  return (
    <div style={{ display: "flex", gap: 12 }}>
      {TILES.map((x, k) => {
        const p = ease(seg(t, 300 + k * 200, 800 + k * 200));
        const o = t < 3100 ? p : 1 - seg(t, 3100, 3450);
        const fg = x.up ? "#E5383B" : "#2D6BE0";
        const bg = x.up ? "#FDECEC" : "#E9EFFD";
        const bob = t > 900 + k * 200 && t < 3100 ? Math.sin(((t - 900) / 900) * Math.PI * 2) * 1.2 : 0;
        return (
          <div
            key={x.label}
            style={{
              width: 124,
              background: "#fff",
              borderRadius: 14,
              padding: "12px 12px 11px",
              boxShadow: "0 2px 8px rgba(27,34,54,.06)",
            }}
          >
            <div style={{ fontSize: 11, color: "#6B7180" }}>{x.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "var(--color-ink)", margin: "2px 0 8px" }}>
              {x.value}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, height: 20 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 3,
                  background: bg,
                  color: fg,
                  fontSize: 11.5,
                  fontWeight: 800,
                  padding: "2px 7px",
                  borderRadius: 10,
                  opacity: o,
                  transform: `translateY(${(x.up ? 8 : -8) * (1 - p)}px)`,
                }}
              >
                <span style={{ display: "inline-block", transform: `translateY(${x.up ? -bob : bob}px)` }}>
                  {x.up ? "▲" : "▼"}
                </span>
                {x.delta}
              </span>
              <span style={{ fontSize: 10, color: "#6B7180", opacity: o }}>어제보다</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
