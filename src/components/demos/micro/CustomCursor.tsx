"use client";

import { useLoop } from "@/hooks/useLoop";
import { clamp, seg } from "@/lib/loop";

type P = [number, number, number];
const io = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
function along(t: number, pts: P[]): [number, number] {
  for (let i = 1; i < pts.length; i++) {
    const [t0, x0, y0] = pts[i - 1];
    const [t1, x1, y1] = pts[i];
    if (t <= t1) {
      const k = io(seg(t, t0, t1));
      return [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k];
    }
  }
  const l = pts[pts.length - 1];
  return [l[1], l[2]];
}

const PERIOD = 4000;
const PATH: P[] = [
  [0, 30, 150],
  [700, 70, 88],
  [1300, 70, 88],
  [1900, 150, 88],
  [2400, 150, 88],
  [3000, 230, 88],
  [3300, 230, 88],
  [3700, 150, 156],
  [4000, 30, 150],
];
const TILES = [
  { x: 35, emoji: "🍰", name: "케이크", bg: "#FFE1E6" },
  { x: 115, emoji: "🍵", name: "말차라테", bg: "#DFF1DA" },
  { x: 195, emoji: "🥐", name: "크루아상", bg: "#FFEBC9" },
];

// 4초 주기: 화살표 대신 파란 점 + 따라오는 동그라미. 사진 위에선 동그라미가 커지며 '보기'
export default function CustomCursor() {
  const t = useLoop(PERIOD);
  const [x, y] = along(t, PATH);
  const [rx, ry] = along((t - 140 + PERIOD) % PERIOD, PATH);
  const d = Math.min(...TILES.map((tile) => Math.hypot(rx - (tile.x + 35), ry - 85)));
  const f = clamp(1 - (d - 14) / 26);
  const r = 13 + 15 * f;

  return (
    <div style={{ position: "relative", width: 280, height: 170 }}>
      <div
        style={{
          position: "absolute",
          left: 10,
          top: 10,
          width: 260,
          height: 150,
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 3px 10px rgba(27,34,54,.08)",
        }}
      />
      <div style={{ position: "absolute", left: 25, top: 22, fontSize: 13, fontWeight: 800, color: "var(--color-ink)" }}>
        오늘의 디저트
      </div>
      {TILES.map((tile) => (
        <div key={tile.name} style={{ position: "absolute", left: tile.x, top: 50, width: 70 }}>
          <div
            style={{
              height: 70,
              borderRadius: 10,
              background: tile.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
            }}
          >
            {tile.emoji}
          </div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: "#6B7180", marginTop: 5, textAlign: "center" }}>
            {tile.name}
          </div>
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: rx - r,
          top: ry - r,
          width: r * 2,
          height: r * 2,
          borderRadius: "50%",
          border: "1.5px solid var(--color-accent)",
          background: `rgba(58,91,239,${0.85 * f})`,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 11,
          fontWeight: 800,
        }}
      >
        <span style={{ opacity: f }}>보기</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: x - 4,
          top: y - 4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--color-accent)",
          opacity: 1 - f,
        }}
      />
    </div>
  );
}
