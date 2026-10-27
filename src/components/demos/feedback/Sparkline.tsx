"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, rand, seg } from "@/lib/loop";

const W = 76;
const H = 24;
const N = 14;

// 결정적 난수로 만든 최근 14일 값. trend가 +면 오르는 흐름, -면 내리는 흐름
function series(seed: number, trend: number) {
  const ys = Array.from({ length: N }, (_, i) => i * trend + (rand(seed + i) - 0.5) * 4);
  const min = Math.min(...ys);
  const max = Math.max(...ys);
  return ys.map((y, i) => [(i / (N - 1)) * (W - 4) + 2, H - 3 - ((y - min) / (max - min)) * (H - 6)]);
}

const ROWS = [
  { label: "방문자", value: "1,284", delta: "▲12%", up: true, pts: series(3, 0.7) },
  { label: "주문", value: "312", delta: "▲4%", up: true, pts: series(31, 0.35) },
  { label: "문의", value: "27", delta: "▼8%", up: false, pts: series(57, -0.5) },
];

// 3.8초 주기: 줄마다 작은 꺾은선이 왼쪽부터 그려짐 → 끝점 동그라미 → 사라짐
export default function Sparkline() {
  const t = useLoop(3800);
  const out = 1 - seg(t, 3300, 3700);

  return (
    <div
      style={{
        width: 256,
        background: "#fff",
        borderRadius: 14,
        padding: "4px 14px",
        boxShadow: "0 2px 8px rgba(27,34,54,.06)",
      }}
    >
      {ROWS.map((r, k) => {
        const p = ease(seg(t, 200 + k * 160, 1300 + k * 160));
        const c = r.up ? "#E5383B" : "#2D6BE0";
        const [ex, ey] = r.pts[N - 1];
        return (
          <div
            key={r.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 0",
              borderTop: k ? "1px solid #EEF1F7" : "none",
            }}
          >
            <div style={{ width: 70 }}>
              <div style={{ fontSize: 10.5, color: "#6B7180" }}>{r.label}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "var(--color-ink)" }}>{r.value}</div>
            </div>
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ opacity: out }}>
              <polyline
                points={r.pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")}
                fill="none"
                stroke={c}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray="1 1"
                strokeDashoffset={1 - p}
                opacity={p > 0.01 ? 1 : 0}
              />
              <circle cx={ex} cy={ey} r="2.6" fill={c} opacity={seg(p, 0.92, 1)} />
            </svg>
            <div style={{ marginLeft: "auto", fontSize: 11.5, fontWeight: 800, color: c, opacity: out }}>
              {r.delta}
            </div>
          </div>
        );
      })}
    </div>
  );
}
