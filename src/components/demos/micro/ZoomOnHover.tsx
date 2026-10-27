"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

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

const PATH: P[] = [
  [0, 140, 168],
  [700, 70, 68],
  [1900, 70, 68],
  [2500, 205, 68],
  [3700, 205, 68],
  [4300, 140, 168],
];

const ITEMS = [
  { emoji: "👟", name: "러닝화 에어3", price: "₩89,000", bg: "linear-gradient(135deg,#FFE3D3,#FFC2A0)" },
  { emoji: "🎧", name: "무선 헤드폰", price: "₩129,000", bg: "linear-gradient(135deg,#DCE7FF,#B5C8FF)" },
];

// 4.4초 주기: 커서가 상품 사진 위에 올라가면 사진만 틀 안에서 살짝 확대
export default function ZoomOnHover() {
  const t = useLoop(4400);
  const [x, y] = along(t, PATH);
  const zoom = [
    ease(seg(t, 600, 1000)) * (1 - ease(seg(t, 1900, 2300))),
    ease(seg(t, 2400, 2800)) * (1 - ease(seg(t, 3700, 4100))),
  ];
  const cursorO = seg(t, 0, 200) * (1 - seg(t, 4100, 4380));

  return (
    <div style={{ position: "relative", width: 280, height: 170 }}>
      {ITEMS.map((it, i) => (
        <div
          key={it.name}
          style={{
            position: "absolute",
            left: 12 + i * 136,
            top: 20,
            width: 120,
            background: "#fff",
            borderRadius: 12,
            padding: 6,
            boxShadow: `0 ${3 + 5 * zoom[i]}px ${8 + 10 * zoom[i]}px rgba(27,34,54,${0.07 + 0.08 * zoom[i]})`,
          }}
        >
          <div style={{ height: 80, borderRadius: 8, overflow: "hidden" }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                background: it.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
                transform: `scale(${1 + 0.2 * zoom[i]})`,
              }}
            >
              {it.emoji}
            </div>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--color-ink)", marginTop: 6 }}>{it.name}</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: "var(--color-accent)", marginTop: 1 }}>{it.price}</div>
        </div>
      ))}
      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        style={{ position: "absolute", left: x - 1, top: y - 1, opacity: cursorO }}
      >
        <path d="M1 1 L1 16 L5 12 L8 19 L11 18 L8 11 L14 11 Z" fill="#1B2236" stroke="#fff" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
