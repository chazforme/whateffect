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

const CX = 140;
const CY = 85;
const PATH: P[] = [
  [0, 255, 165],
  [700, 195, 120],
  [1300, 165, 62],
  [1900, 112, 102],
  [2500, 168, 98],
  [3200, 30, 22],
];

// 4초 주기: 커서가 가까이 오면 버튼이 자석처럼 커서 쪽으로 끌려옴. 멀어지면 제자리로
export default function MagneticButton() {
  const t = useLoop(4000);
  const [x, y] = along(t, PATH);
  const dx = x - CX;
  const dy = y - CY;
  const pull = clamp(1 - Math.hypot(dx, dy) / 100);
  const bx = dx * 0.38 * pull;
  const by = dy * 0.38 * pull;
  const cursorO = seg(t, 0, 200) * (1 - seg(t, 3150, 3400));

  return (
    <div style={{ position: "relative", width: 280, height: 170 }}>
      <div
        style={{
          position: "absolute",
          left: CX - 60,
          top: CY - 23,
          width: 120,
          height: 46,
          borderRadius: 23,
          background: "var(--color-accent)",
          color: "#fff",
          fontSize: 15,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translate(${bx}px, ${by}px) scale(${1 + 0.06 * pull})`,
          boxShadow: `0 ${6 + 6 * pull}px ${14 + 8 * pull}px rgba(58,91,239,.35)`,
        }}
      >
        <span style={{ transform: `translate(${bx * 0.35}px, ${by * 0.35}px)` }}>구독하기 →</span>
      </div>
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
