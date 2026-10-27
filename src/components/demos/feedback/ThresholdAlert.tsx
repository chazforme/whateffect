"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const MAX = 120; // 막대 끝 = 120%
const RED = "#F04452";
const AMBER = "#E39A00";
const GREEN = "#1A8F55";

// 4.2초 주기: 소진율이 62% → 104%로 오름. 90%에서 노란 '주의', 100% 넘으면 카드 전체가 빨갛게
export default function ThresholdAlert() {
  const t = useLoop(4200);
  const v = Math.round(62 + 42 * ease(seg(t, 300, 2000)));
  const level = v >= 100 ? 2 : v >= 90 ? 1 : 0;
  const o = t < 3800 ? seg(t, 0, 200) : 1 - seg(t, 3800, 4150);
  const blink = level === 2 ? 0.55 + 0.45 * Math.cos(((t % 1000) / 1000) * Math.PI * 2) : 1;
  const color = level === 2 ? RED : level === 1 ? AMBER : "var(--color-accent)";
  const chip =
    level === 2
      ? { text: "⚠ 예산 초과", bg: "#FDE8E8", fg: RED }
      : level === 1
        ? { text: "주의", bg: "#FFF3D6", fg: AMBER }
        : { text: "정상", bg: "#E3F5EA", fg: GREEN };

  return (
    <div
      style={{
        width: 252,
        background: level === 2 ? "#FFF4F5" : "#fff",
        border: `2px solid ${level === 2 ? RED : "#fff"}`,
        borderRadius: 14,
        padding: "13px 15px",
        boxShadow: "0 2px 8px rgba(27,34,54,.06)",
        opacity: o,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "#6B7180", fontWeight: 600 }}>오늘 광고비 소진율</span>
        <span
          style={{
            fontSize: 10.5,
            fontWeight: 800,
            background: chip.bg,
            color: chip.fg,
            padding: "3px 8px",
            borderRadius: 10,
            opacity: blink,
          }}
        >
          {chip.text}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "4px 0 10px" }}>
        <span style={{ fontSize: 28, fontWeight: 800, color: level === 2 ? RED : "var(--color-ink)" }}>{v}%</span>
        <span style={{ fontSize: 10.5, color: "#6B7180" }}>₩{v * 5}만 / 일 예산 ₩500만</span>
      </div>
      <div style={{ position: "relative", height: 10, borderRadius: 5, background: "#EEF1F7" }}>
        <div
          style={{
            height: "100%",
            width: `${(Math.min(v, MAX) / MAX) * 100}%`,
            borderRadius: 5,
            background: color,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `${(100 / MAX) * 100}%`,
            top: -4,
            bottom: -4,
            width: 2,
            marginLeft: -1,
            background: "#1B2236",
          }}
        />
      </div>
      <div style={{ position: "relative", height: 12, marginTop: 3 }}>
        <span
          style={{
            position: "absolute",
            left: `${(100 / MAX) * 100}%`,
            transform: "translateX(-50%)",
            fontSize: 9.5,
            color: "#6B7180",
            whiteSpace: "nowrap",
          }}
        >
          기준 100%
        </span>
      </div>
    </div>
  );
}
