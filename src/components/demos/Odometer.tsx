"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { big } from "./shared";

const VALUES = [1284500, 1291800, 1307400];
const STEP = 3000; // 숫자 하나 머무는 시간 (앞 1.2초 동안 굴러감)

const digits = (v: number) => String(v).padStart(7, "0").split("").map(Number);

/** 0~9(+0) 세로 띠를 pos만큼 올려서 한 칸만 보여줌 */
function Col({ pos }: { pos: number }) {
  return (
    <span style={{ display: "inline-block", height: "1.2em", overflow: "hidden", verticalAlign: "top" }}>
      <span style={{ display: "block", transform: `translateY(${-pos * 1.2}em)` }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((d, i) => (
          <span key={i} style={{ display: "block", height: "1.2em" }}>
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Odometer() {
  const t = useLoop(STEP * VALUES.length);
  const k = Math.floor(t / STEP);
  const from = digits(VALUES[k]);
  const to = digits(VALUES[(k + 1) % VALUES.length]);
  const local = t % STEP;

  const cols = from.map((a, i) => {
    let b = to[i];
    if (b < a) b += 10; // 계기판처럼 항상 앞으로만 굴러감
    const p = ease(seg(local, 300 + (6 - i) * 60, 1200 + (6 - i) * 60));
    return (a + (b - a) * p) % 10;
  });

  return (
    <div style={{ ...big, fontSize: 34, lineHeight: 1.2, fontVariantNumeric: "tabular-nums" }}>
      <span style={{ color: "var(--color-accent)", marginRight: 4 }}>₩</span>
      <Col pos={cols[0]} />,
      <Col pos={cols[1]} />
      <Col pos={cols[2]} />
      <Col pos={cols[3]} />,
      <Col pos={cols[4]} />
      <Col pos={cols[5]} />
      <Col pos={cols[6]} />
    </div>
  );
}
