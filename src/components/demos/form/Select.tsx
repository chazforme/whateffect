"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { C, Cursor, Tap, field, isDown, path } from "./parts";

const OPTS: [string, string][] = [
  ["집", "서울 마포구"],
  ["회사", "서울 강남구"],
  ["부모님 댁", "대전 서구"],
];
const ROW0 = 69; // 첫 줄 윗변 y

// 4.6초: 칸을 누르면 목록이 펼쳐짐 → '회사'를 골라 닫힘 → 칸 값이 바뀜
export default function Select() {
  const t = useLoop(4600);
  const open = t < 1950 ? ease(seg(t, 700, 900)) : 1 - seg(t, 1950, 2100);
  const sel = t >= 1950 && t < 4200 ? 1 : 0;
  const vo = t < 4000 ? 1 : t < 4200 ? 1 - seg(t, 4000, 4200) : seg(t, 4200, 4400);
  const cur = path(t, [
    [0, 200, 8],
    [200, 200, 8],
    [600, 180, 42],
    [1000, 180, 42],
    [1500, 150, 116],
    [2300, 150, 116],
    [2700, 215, 150],
  ]);
  const co = seg(t, 0, 200) * (1 - seg(t, 2400, 2700));
  const hover = open > 0.5 ? Math.floor((cur.y - ROW0) / 30) : -1;
  const [n, addr] = OPTS[sel];

  return (
    <div style={{ position: "relative", width: 240, height: 164 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.sub, lineHeight: "16px" }}>배송지</div>
      <div style={{ ...field(open > 0.01 ? C.acc : C.line), position: "absolute", top: 20, left: 0, right: 0 }}>
        <span style={{ opacity: vo }}>
          {n} <span style={{ color: C.sub, fontWeight: 500 }}>· {addr}</span>
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          style={{ marginLeft: "auto", transform: `rotate(${180 * open}deg)` }}
        >
          <path d="M2 4 L6 8 L10 4" fill="none" stroke={C.sub} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 0,
          right: 0,
          padding: 4,
          background: "#fff",
          border: `1px solid ${C.line}`,
          borderRadius: 10,
          boxShadow: "0 8px 20px rgba(27,34,54,.12)",
          opacity: open,
          transform: `translateY(${-6 * (1 - open)}px)`,
        }}
      >
        {OPTS.map(([a, b], k) => (
          <div
            key={a}
            style={{
              height: 30,
              display: "flex",
              alignItems: "center",
              padding: "0 9px",
              borderRadius: 7,
              background: hover === k ? C.tint : "transparent",
              fontSize: 13,
              fontWeight: 600,
              color: C.ink,
              whiteSpace: "nowrap",
            }}
          >
            {a}
            <span style={{ marginLeft: 5, color: C.sub, fontWeight: 500 }}>· {b}</span>
            {k === sel && <span style={{ marginLeft: "auto", color: C.acc, fontWeight: 800 }}>✓</span>}
          </div>
        ))}
      </div>
      <Tap x={180} y={40} t={t} at={650} />
      <Tap x={150} y={114} t={t} at={1900} />
      <Cursor x={cur.x} y={cur.y} o={co} down={isDown(t, [650, 1900])} />
    </div>
  );
}
