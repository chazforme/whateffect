"use client";

import { useLoop } from "@/hooks/useLoop";
import { ACCENT, Browser, Cursor, INK, LINE, Logo, PALE, SOFT, SUB, Taps, fadeIn, pressed, stateAt, track } from "./parts";

const NAMES = ["홈", "패션", "신발", "운동화"];
const CX = [10, 33, 64, 95]; // 각 경로 글자 왼쪽 위치
const SEP = [24, 55, 86];
const TILES = [
  ["패션", "가전", "식품"],
  ["신발", "가방", "의류"],
  ["운동화", "구두", "샌들"],
  ["러닝화 ₩89,000", "스니커즈 ₩69,000", "슬립온 ₩49,000"],
];
const ROW_Y = 26;
const CLICKS: [number, number][] = [
  [500, 2],
  [1200, 3],
  [1900, 4],
  [3000, 2],
  [3900, 1],
];
const TILE: [number, number] = [44, 86];

// 4.8초: 안으로 들어갈수록 위쪽 경로가 '홈 › 패션 › 신발 › 운동화'로 늘고, 앞 칸을 누르면 거기로 돌아감
export default function Breadcrumb() {
  const t = useLoop(4800);
  const { v: depth, at } = stateAt(t, 1, CLICKS);
  const f = at < 0 ? 1 : fadeIn(t, at);
  const grew = depth > stateAt(at - 1, 1, CLICKS).v;
  const [x, y] = track(t, [
    [0, ...TILE],
    [600, ...TILE],
    [1300, ...TILE],
    [2000, ...TILE],
    [2850, 40, ROW_Y + 7],
    [3150, 40, ROW_Y + 7],
    [3750, 15, ROW_Y + 7],
    [4050, 15, ROW_Y + 7],
    [4700, ...TILE],
  ]);

  return (
    <Browser url={`hyogwa.shop/${["", "fashion", "fashion/shoes", "fashion/shoes/sneakers"][depth - 1]}`}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 20, borderBottom: `1px solid ${LINE}` }}>
        <Logo h={20} />
      </div>
      {NAMES.slice(0, depth).map((n, i) => {
        const last = i === depth - 1;
        const o = last && i > 0 && grew ? f : 1;
        return (
          <span key={n}>
            {i > 0 && (
              <span style={{ position: "absolute", left: SEP[i - 1] + 2, top: ROW_Y, fontSize: 9.5, color: "#B5BAC6", opacity: o }}>›</span>
            )}
            <span
              style={{
                position: "absolute",
                left: CX[i],
                top: ROW_Y,
                fontSize: 9.5,
                fontWeight: last ? 800 : 500,
                color: last ? INK : SUB,
                textDecoration: last ? "none" : "underline",
                textDecorationColor: "#C9CDD8",
                opacity: o,
                transform: `translateX(${(1 - o) * 6}px)`,
              }}
            >
              {n}
            </span>
          </span>
        );
      })}
      <div style={{ position: "absolute", left: 10, right: 10, top: 44, opacity: f, transform: `translateY(${(1 - f) * 5}px)` }}>
        <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 6 }}>{NAMES[depth - 1]}</div>
        <div style={{ display: "flex", gap: 6 }}>
          {TILES[depth - 1].map((s, i) => (
            <div
              key={s}
              style={{
                flex: 1,
                height: 50,
                borderRadius: 7,
                background: i === 0 && depth < 4 ? PALE : SOFT,
                display: "flex",
                alignItems: "flex-end",
                padding: 6,
                fontSize: 8.5,
                fontWeight: 700,
                color: i === 0 && depth < 4 ? ACCENT : INK,
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
      <Taps
        t={t}
        list={[
          [400, ...TILE],
          [1100, ...TILE],
          [1800, ...TILE],
          [2950, 40, ROW_Y + 7],
          [3850, 15, ROW_Y + 7],
        ]}
        size={18}
      />
      <Cursor x={x} y={y} down={pressed(t, [400, 1100, 1800, 2950, 3850])} />
    </Browser>
  );
}
