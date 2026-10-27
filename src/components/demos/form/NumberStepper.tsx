"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { C, Card, Tap, won } from "./parts";

const PRICE = 12900;
// [누르는 시각, 바뀐 수량, 누른 버튼]
const STEPS: [number, number, "+" | "−"][] = [
  [700, 2, "+"],
  [1300, 3, "+"],
  [2500, 2, "−"],
  [3400, 1, "−"],
];

// 4.4초: +를 두 번 눌러 3개 → −를 두 번 눌러 다시 1개. 합계도 같이 바뀜
export default function NumberStepper() {
  const t = useLoop(4400);
  let qty = 1;
  let last = -1000;
  for (const [at, q] of STEPS) {
    if (t >= at) {
      qty = q;
      last = at;
    }
  }
  const pop = 1 + 0.25 * (1 - ease(seg(t, last, last + 220)));
  const btn = (s: string, dim: boolean) => (
    <div
      style={{
        width: 34,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        fontWeight: 700,
        color: dim ? "#C5CAD5" : C.ink,
      }}
    >
      {s}
    </div>
  );

  return (
    <Card width={250} pad={16}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, height: 40 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "#FFF1E3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#FF9A3C" }} />
        </div>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: C.ink, lineHeight: "19px" }}>제주 감귤 3kg</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.sub, lineHeight: "17px" }}>{won(PRICE)}</div>
        </div>
      </div>
      <div style={{ height: 1, background: C.soft, margin: "12px 0" }} />
      <div style={{ display: "flex", alignItems: "center", height: 34 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: 34,
            border: `1.5px solid ${C.line}`,
            borderRadius: 10,
            boxSizing: "border-box",
          }}
        >
          {btn("−", qty === 1)}
          <div
            style={{
              width: 40,
              textAlign: "center",
              fontSize: 15,
              fontWeight: 800,
              color: C.ink,
              transform: `scale(${pop})`,
            }}
          >
            {qty}
          </div>
          {btn("+", false)}
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.sub, lineHeight: "14px" }}>합계</div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: C.acc,
              lineHeight: "21px",
              transform: `scale(${pop})`,
              transformOrigin: "right center",
            }}
          >
            {won(PRICE * qty)}
          </div>
        </div>
      </div>
      {STEPS.map(([at, , s]) => (
        <Tap key={at} x={s === "+" ? 108 : 34} y={97} t={t} at={at} size={30} />
      ))}
    </Card>
  );
}
