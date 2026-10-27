"use client";

import { useLoop } from "@/hooks/useLoop";
import { ACCENT, Cursor, INK, LINE, SUB, Taps, card, fadeIn, pressed, stateAt, track } from "./parts";

const PAGES = [
  [
    ["니트 가디건", "₩39,000"],
    ["옥스포드 셔츠", "₩29,000"],
    ["와이드 슬랙스", "₩45,000"],
  ],
  [
    ["울 코트", "₩129,000"],
    ["패딩 조끼", "₩59,000"],
    ["기모 후드", "₩35,000"],
  ],
  [
    ["캐시미어 목도리", "₩49,000"],
    ["가죽 장갑", "₩32,000"],
    ["니트 비니", "₩15,000"],
  ],
];
const BTN = ["‹", "1", "2", "3", "4", "5", "›"];
const BX = 43; // 버튼 줄 왼쪽
const BY = 117;
const bx = (i: number) => BX + i * 22 + 9;
const CLICKS: [number, number][] = [
  [800, 1],
  [2000, 2],
  [3200, 0],
];

// 4.4초: 아래 번호를 누를 때마다 위 목록이 다음 쪽으로 바뀌고, 지금 쪽 번호에 파란 원
export default function Pagination() {
  const t = useLoop(4400);
  const { v: pg, at } = stateAt(t, 0, CLICKS);
  const f = at < 0 ? 1 : fadeIn(t, at, 240);
  const [x, y] = track(t, [
    [0, bx(1), BY + 9],
    [650, bx(2), BY + 9],
    [1000, bx(2), BY + 9],
    [1850, bx(3), BY + 9],
    [2200, bx(3), BY + 9],
    [3050, bx(1), BY + 9],
    [3400, bx(1), BY + 9],
  ]);

  return (
    <div style={{ ...card, width: 240, height: 150 }}>
      <div style={{ padding: "10px 14px 0", display: "flex", justifyContent: "space-between", fontSize: 8.5 }}>
        <span style={{ fontWeight: 800, fontSize: 10 }}>전체 상품</span>
        <span style={{ color: SUB }}>총 15개 · {pg + 1}/5쪽</span>
      </div>
      <div style={{ padding: "4px 14px", opacity: f, transform: `translateX(${(1 - f) * 8}px)` }}>
        {PAGES[pg].map(([n, p]) => (
          <div key={n} style={{ display: "flex", justifyContent: "space-between", fontSize: 9, padding: "6px 0", borderBottom: `1px solid ${LINE}` }}>
            <span>{n}</span>
            <b style={{ fontWeight: 800 }}>{p}</b>
          </div>
        ))}
      </div>
      {BTN.map((s, i) => {
        const on = i === pg + 1;
        return (
          <span
            key={s}
            style={{
              position: "absolute",
              left: BX + i * 22,
              top: BY,
              width: 18,
              height: 18,
              borderRadius: "50%",
              lineHeight: "18px",
              textAlign: "center",
              fontSize: i === 0 || i === 6 ? 11 : 8.5,
              fontWeight: on ? 800 : 600,
              background: on ? ACCENT : "transparent",
              color: on ? "#fff" : i === 0 || i === 6 ? "#B5BAC6" : INK,
            }}
          >
            {s}
          </span>
        );
      })}
      <Taps t={t} list={CLICKS.map(([c, i]) => [c, bx(i + 1), BY + 9])} size={20} />
      <Cursor x={x} y={y} down={pressed(t, CLICKS.map((c) => c[0]))} />
    </div>
  );
}
