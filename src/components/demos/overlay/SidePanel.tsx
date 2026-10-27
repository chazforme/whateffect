"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { Browser, Cursor, accent, along, inOut, pressAt, sub, txt } from "./_kit";

const ORDERS = [
  ["#1024", "김민지", "배송 중"],
  ["#1025", "박서준", "준비 중"],
  ["#1026", "이하늘", "완료"],
  ["#1027", "최유나", "배송 중"],
];

// 4초 주기: 목록의 한 줄 클릭 → 오른쪽에서 상세 패널이 밀려 들어옴(목록은 그대로 보임) → ✕ 클릭 → 닫힘
export default function SidePanel() {
  const t = useLoop(4000);
  const open = inOut(t, 750, 1250, 2700, 3100);
  const [x, y] = along(t, [
    [0, 60, 125],
    [550, 70, 58],
    [1400, 70, 58],
    [2300, 233, 13],
    [3200, 233, 13],
    [3900, 60, 125],
  ]);
  const co = seg(t, 0, 200) * (1 - seg(t, 3500, 3900));
  const picked = t > 650 && t < 3100;

  return (
    <Browser url="admin.inno-mall.kr">
      <div style={{ padding: "8px 10px" }}>
        <div style={txt(10, 800)}>주문 목록</div>
        <div style={{ marginTop: 6 }}>
          {ORDERS.map(([no, name, st], i) => (
            <div
              key={no}
              style={{
                display: "flex",
                gap: 10,
                padding: "5px 6px",
                borderTop: "1px solid #EEF1F7",
                background: picked && i === 1 ? "#EEF1FD" : "transparent",
                borderRadius: 4,
                ...txt(8, 600),
              }}
            >
              <span style={{ color: sub }}>{no}</span>
              <span>{name}</span>
              <span style={{ marginLeft: "auto", color: st === "완료" ? sub : accent }}>{st}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 118,
          background: "#fff",
          boxShadow: "-6px 0 18px rgba(15,20,35,.14)",
          padding: "8px 10px",
          transform: `translateX(${108 * (1 - open)}%)`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={txt(9.5, 800)}>주문 상세</span>
          <span style={txt(9, 500, sub)}>✕</span>
        </div>
        <div style={{ ...txt(7.5, 500, sub), marginTop: 8 }}>#1025 · 박서준</div>
        <div style={{ ...txt(8.5, 700), marginTop: 6 }}>호텔 수건 세트</div>
        <div style={{ ...txt(10, 800), marginTop: 3 }}>₩24,000</div>
        <span
          style={{
            display: "inline-block",
            marginTop: 8,
            ...txt(7.5, 700, accent),
            background: "#EEF1FD",
            borderRadius: 5,
            padding: "2px 7px",
          }}
        >
          준비 중
        </span>
        <div style={{ ...txt(7, 500, sub), marginTop: 8 }}>서울 마포구 ○○로 12</div>
      </div>
      <Cursor x={x} y={y} o={co} press={pressAt(t, 650) + pressAt(t, 2500)} />
    </Browser>
  );
}
