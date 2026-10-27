"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { Browser, Cursor, accent, along, inOut, line, pressAt, sub, txt } from "./_kit";

const ITEMS = ["🔗 링크 복사", "💬 카카오톡", "✉️ 메일로 보내기"];

// 4초 주기: '공유' 버튼 클릭 → 버튼 바로 아래 꼬리 달린 작은 창 → '링크 복사' 클릭 → 닫힘
export default function Popover() {
  const t = useLoop(4000);
  const show = inOut(t, 750, 1000, 2700, 2900);
  const [x, y] = along(t, [
    [0, 120, 130],
    [550, 176, 72],
    [1500, 176, 72],
    [2300, 170, 93],
    [3300, 170, 93],
    [3900, 120, 130],
  ]);
  const co = seg(t, 0, 200) * (1 - seg(t, 3500, 3900));
  const hover = t > 2250 && t < 2750;

  return (
    <Browser>
      <div style={{ display: "flex", gap: 10, padding: "8px 12px 0" }}>
        <div style={{ width: 86, height: 100, borderRadius: 8, background: "#F5DFA6", display: "grid", placeItems: "center", fontSize: 30 }}>
          👜
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={txt(9.5, 800)}>가죽 미니백</span>
          <span style={txt(11, 800)}>₩89,000</span>
          <span style={txt(7.5, 500, sub)}>무료 배송 · 내일 도착</span>
          <div style={{ display: "flex", gap: 5, marginTop: 2 }}>
            <span style={{ ...txt(7.5, 700, "#fff"), background: accent, borderRadius: 5, padding: "3px 9px" }}>
              구매하기
            </span>
            <span style={{ ...txt(7.5, 700), border: "1px solid #D5D9E2", borderRadius: 5, padding: "2px 7px" }}>
              공유 ↗
            </span>
          </div>
          <div style={{ ...line("90%"), marginTop: 6 }} />
          <div style={line("70%")} />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 82,
          width: 88,
          background: "#fff",
          borderRadius: 8,
          border: "1px solid #E3E6EE",
          boxShadow: "0 6px 16px rgba(15,20,35,.14)",
          padding: 3,
          opacity: show,
          transform: `translateY(${-4 * (1 - show)}px)`,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: -4,
            left: 28,
            width: 7,
            height: 7,
            background: "#fff",
            borderLeft: "1px solid #E3E6EE",
            borderTop: "1px solid #E3E6EE",
            transform: "rotate(45deg)",
          }}
        />
        {ITEMS.map((it, i) => (
          <div
            key={it}
            style={{
              ...txt(7.5, 600),
              padding: "3px 6px",
              borderRadius: 5,
              background: hover && i === 0 ? "#EEF1F7" : "transparent",
            }}
          >
            {it}
          </div>
        ))}
      </div>
      <Cursor x={x} y={y} o={co} press={pressAt(t, 650) + pressAt(t, 2550)} />
    </Browser>
  );
}
