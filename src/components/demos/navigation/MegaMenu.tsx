"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { ACCENT, Browser, Cursor, INK, LINE, Logo, SOFT, SUB, track } from "./parts";

const MENU = ["홈", "카테고리", "브랜드", "이벤트"];
const L = [64, 92, 140, 176];
const W = [22, 44, 30, 32];
const COLS: [string, string[]][] = [
  ["의류", ["니트", "셔츠", "바지"]],
  ["신발", ["운동화", "구두", "샌들"]],
  ["가방", ["백팩", "토트백", "지갑"]],
];

// 4.4초: 커서를 '카테고리'에 올리면 아래로 큰 판이 펼쳐지고, 안의 '운동화'를 가리킨 뒤 벗어나면 닫힘
export default function MegaMenu() {
  const t = useLoop(4400);
  const open = t < 3000 ? ease(seg(t, 650, 900)) : 1 - ease(seg(t, 3000, 3250));
  const [x, y] = track(t, [
    [0, 200, 112],
    [600, 112, 13],
    [1300, 112, 13],
    [2000, 80, 51],
    [2700, 80, 51],
    [3100, 200, 112],
  ]);
  const pick = t > 1950 && t < 3000;
  const hoverTop = open > 0.5;

  return (
    <Browser url="hyogwa.shop">
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 24, borderBottom: `1px solid ${LINE}`, background: "#fff", zIndex: 3 }}>
        <Logo />
        {MENU.map((m, i) => (
          <span
            key={m}
            style={{
              position: "absolute",
              left: L[i],
              width: W[i],
              lineHeight: "24px",
              textAlign: "center",
              fontWeight: i === 1 && hoverTop ? 800 : 600,
              color: i === 1 && hoverTop ? ACCENT : SUB,
            }}
          >
            {m}
            {i === 1 && <span style={{ fontSize: 6.5, marginLeft: 1 }}>▾</span>}
          </span>
        ))}
      </div>
      <div style={{ position: "absolute", left: 10, right: 10, top: 32 }}>
        <div style={{ height: 42, borderRadius: 7, background: "#DCE3F6", padding: "8px 10px", fontWeight: 800, fontSize: 11 }}>이번 주 인기 브랜드</div>
        <div style={{ display: "flex", gap: 6, marginTop: 7 }}>
          {[0, 1, 2, 3].map((k) => (
            <div key={k} style={{ flex: 1, height: 40, borderRadius: 6, background: SOFT }} />
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 24,
          height: 82,
          background: "#fff",
          zIndex: 2,
          boxShadow: "0 8px 14px rgba(27,34,54,.12)",
          borderBottom: `1px solid ${LINE}`,
          clipPath: `inset(0 0 ${(1 - open) * 100}% 0)`,
          opacity: Math.min(1, open * 2),
        }}
      >
        {COLS.map(([h, items], c) => (
          <div key={h} style={{ position: "absolute", left: 12 + c * 56, top: 8 }}>
            <div style={{ fontSize: 8.5, fontWeight: 800, color: ACCENT, marginBottom: 3 }}>{h}</div>
            {items.map((s) => {
              const on = pick && s === "운동화";
              return (
                <div
                  key={s}
                  style={{
                    fontSize: 8,
                    lineHeight: "12px",
                    color: on ? INK : SUB,
                    fontWeight: on ? 800 : 500,
                    textDecoration: on ? "underline" : "none",
                  }}
                >
                  {s}
                </div>
              );
            })}
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            right: 10,
            top: 8,
            width: 56,
            height: 64,
            borderRadius: 7,
            background: "#FCE8D8",
            padding: 6,
            fontSize: 8,
            fontWeight: 800,
            lineHeight: 1.3,
          }}
        >
          가을 신상
          <br />
          <span style={{ color: ACCENT }}>30% 할인</span>
        </div>
      </div>
      <Cursor x={x} y={y} />
    </Browser>
  );
}
