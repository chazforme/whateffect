"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { C, Card, Cursor, isDown, path, won } from "./parts";

const X0 = 25; // 막대 왼쪽 끝
const W = 200; // 막대 길이
const Y = 99; // 막대 가운데 높이

// 4.8초: 오른쪽 손잡이를 왼쪽으로, 왼쪽 손잡이를 오른쪽으로 끌어 가격 범위를 좁힘
export default function RangeSlider() {
  const t = useLoop(4800);
  const back = ease(seg(t, 3800, 4400));
  const hi = 1 - 0.4 * ease(seg(t, 700, 1500)) * (1 - back);
  const lo = 0.2 * ease(seg(t, 1900, 2600)) * (1 - back);
  const cur = path(t, [
    [0, 235, 140],
    [200, 235, 140],
    [600, X0 + W, Y],
    [700, X0 + W, Y],
    [1500, X0 + W * 0.6, Y],
    [1600, X0 + W * 0.6, Y],
    [1850, X0, Y],
    [1900, X0, Y],
    [2600, X0 + W * 0.2, Y],
    [2700, X0 + W * 0.2, Y],
    [3100, 130, 145],
  ]);
  const co = seg(t, 0, 200) * (1 - seg(t, 2800, 3100));
  const v = (p: number) => won(Math.round(p * 100) * 1000);
  const knob = (p: number, drag: boolean) => (
    <div
      style={{
        position: "absolute",
        left: X0 + W * p - 10,
        top: Y - 10,
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "#fff",
        border: `2px solid ${C.acc}`,
        boxSizing: "border-box",
        boxShadow: "0 2px 6px rgba(27,34,54,.2)",
        transform: `scale(${drag ? 1.18 : 1})`,
      }}
    />
  );

  return (
    <Card width={250} height={136} pad={18}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.sub, lineHeight: "16px" }}>가격</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: C.ink, lineHeight: "26px", marginTop: 2 }}>
        {v(lo)} ~ {v(hi)}
      </div>
      <div style={{ position: "absolute", left: X0, top: Y - 2, width: W, height: 4, borderRadius: 2, background: C.line }} />
      <div
        style={{
          position: "absolute",
          left: X0 + W * lo,
          top: Y - 2,
          width: W * (hi - lo),
          height: 4,
          borderRadius: 2,
          background: C.acc,
        }}
      />
      {knob(lo, t >= 1850 && t < 2650)}
      {knob(hi, t >= 650 && t < 1550)}
      <div style={{ position: "absolute", left: X0 - 6, top: Y + 15, fontSize: 10.5, fontWeight: 600, color: C.faint }}>
        ₩0
      </div>
      <div style={{ position: "absolute", right: 14, top: Y + 15, fontSize: 10.5, fontWeight: 600, color: C.faint }}>
        ₩100,000
      </div>
      <Cursor x={cur.x + 3} y={cur.y + 3} o={co} down={isDown(t, [650, 1850])} />
    </Card>
  );
}
