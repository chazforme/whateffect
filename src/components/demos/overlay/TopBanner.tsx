"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { Browser, Cursor, along, inOut, line, pressAt, sub, txt } from "./_kit";

const H = 20;

// 4초 주기: 맨 위에 얇은 알림 띠가 내려오며 페이지를 살짝 밀어냄 → ✕ 클릭 → 띠가 접히고 페이지가 올라감
export default function TopBanner() {
  const t = useLoop(4000);
  const open = inOut(t, 300, 800, 2550, 2950);
  const [x, y] = along(t, [
    [0, 140, 120],
    [1200, 140, 120],
    [2100, 235, 10],
    [2800, 235, 10],
    [3700, 140, 120],
  ]);
  const co = seg(t, 900, 1200) * (1 - seg(t, 3300, 3700));

  return (
    <Browser>
      <div
        style={{
          height: H * open,
          overflow: "hidden",
          background: "#1B2236",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <span style={txt(8, 700, "#fff")}>
          🎁 첫 구매 10% 할인 쿠폰 받기 <b style={{ color: "#9DB2FF" }}>›</b>
        </span>
        <span style={{ position: "absolute", right: 8, ...txt(8, 500, "rgba(255,255,255,.7)") }}>✕</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 12px", borderBottom: "1px solid #EEF1F7" }}>
        <span style={txt(10, 800)}>INNO 몰</span>
        <span style={{ display: "flex", gap: 9, ...txt(7.5, 600, sub) }}>
          <span>신상품</span>
          <span>베스트</span>
          <span>세일</span>
        </span>
      </div>
      <div style={{ height: 50, margin: "8px 12px 0", borderRadius: 8, background: "#DCE3F6", display: "flex", alignItems: "center", paddingLeft: 12 }}>
        <span style={txt(10, 800)}>가을 신상 모음</span>
      </div>
      <div style={{ display: "flex", gap: 6, margin: "8px 12px 0" }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ flex: 1, height: 36, borderRadius: 6, background: "#EEF1F7" }} />
        ))}
      </div>
      <div style={{ ...line("60%"), margin: "8px 12px 0" }} />
      <Cursor x={x} y={y} o={co} press={pressAt(t, 2300)} />
    </Browser>
  );
}
