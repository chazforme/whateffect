"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { INK, SUB, Taps, card, io, stateAt } from "./parts";

const OPTS = ["일간", "주간", "월간"];
const TOTAL = ["1,284명", "8,930명", "36,512명"];
const BARS = [
  [30, 52, 41, 66, 48, 72, 58],
  [44, 38, 60, 55, 78, 64, 86],
  [62, 70, 56, 80, 74, 90, 84],
];
const SW = 60; // 칸 하나 폭
const SX = 20; // 알약 왼쪽
const SY = 34;
const cx = (i: number) => SX + 3 + SW * i + SW / 2;
const TAPS: [number, number][] = [
  [700, 1],
  [1900, 2],
  [3100, 0],
];

// 4.2초: 회색 알약 안의 흰 조각이 고른 칸으로 미끄러지고, 아래 숫자·막대만 바뀜
export default function SegmentedControl() {
  const t = useLoop(4200);
  const { v: act, at } = stateAt(t, 0, TAPS);
  const prev = stateAt(at - 1, 0, TAPS).v;
  const p = io(seg(t, at, at + 280));
  const kx = SW * (prev + (act - prev) * p);

  return (
    <div style={{ ...card, width: 226, height: 150 }}>
      <div style={{ position: "absolute", left: 20, top: 12, fontSize: 10, fontWeight: 800 }}>방문자 수</div>
      <div style={{ position: "absolute", left: SX, top: SY, width: SW * 3 + 6, height: 26, borderRadius: 13, background: "#E3E6EE" }}>
        <div
          style={{
            position: "absolute",
            left: 3 + kx,
            top: 3,
            width: SW,
            height: 20,
            borderRadius: 10,
            background: "#fff",
            boxShadow: "0 1px 4px rgba(27,34,54,.18)",
          }}
        />
        {OPTS.map((s, i) => (
          <span
            key={s}
            style={{
              position: "absolute",
              left: 3 + SW * i,
              width: SW,
              lineHeight: "26px",
              textAlign: "center",
              fontSize: 9.5,
              fontWeight: i === act ? 800 : 600,
              color: i === act ? INK : SUB,
            }}
          >
            {s}
          </span>
        ))}
      </div>
      <div style={{ position: "absolute", left: 20, top: 68, fontSize: 15, fontWeight: 800, letterSpacing: "-.02em" }}>{TOTAL[act]}</div>
      <div style={{ position: "absolute", left: 120, right: 20, top: 70, height: 60, display: "flex", alignItems: "flex-end", gap: 4 }}>
        {BARS[act].map((h, k) => {
          const h0 = BARS[prev][k];
          return (
            <i
              key={k}
              style={{
                flex: 1,
                height: `${h0 + (h - h0) * p}%`,
                borderRadius: 2,
                background: k === 6 ? "var(--color-accent)" : "#C9D3F7",
              }}
            />
          );
        })}
      </div>
      <Taps t={t} list={TAPS.map(([c, i]) => [c, cx(i), SY + 13])} size={24} />
    </div>
  );
}
