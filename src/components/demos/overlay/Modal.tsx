"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { Browser, Cursor, Dim, accent, along, inOut, line, pressAt, sub, txt } from "./_kit";

// 4초 주기: 커서가 '배송 안내' 클릭 → 화면 어두워지며 가운데 창 → '확인' 클릭 → 닫힘
export default function Modal() {
  const t = useLoop(4000);
  const show = inOut(t, 800, 1150, 2650, 2950);
  const [x, y] = along(t, [
    [0, 200, 120],
    [600, 212, 15],
    [1500, 212, 15],
    [2350, 130, 100],
    [3300, 130, 100],
    [3900, 200, 120],
  ]);
  const co = seg(t, 0, 200) * (1 - seg(t, 3500, 3900));

  return (
    <Browser>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px 0" }}>
        <span style={txt(10, 800)}>INNO 몰</span>
        <span style={{ ...txt(8, 700, accent), background: "#EEF1FD", borderRadius: 5, padding: "2px 7px" }}>
          배송 안내
        </span>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "10px 12px 0" }}>
        <div style={{ width: 92, height: 74, borderRadius: 8, background: "#DCE3F6" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 4 }}>
          <span style={txt(10, 800)}>가을 신상 모음</span>
          <span style={txt(8, 500, sub)}>니트 · 가디건 · 코트</span>
          <div style={line(90)} />
          <div style={line(70)} />
        </div>
      </div>
      <Dim o={show} />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 150,
          background: "#fff",
          borderRadius: 10,
          padding: "11px 12px 10px",
          boxShadow: "0 8px 24px rgba(15,20,35,.25)",
          opacity: show,
          transform: `translate(-50%,-50%) scale(${0.9 + 0.1 * show})`,
          textAlign: "center",
        }}
      >
        <div style={txt(10.5, 800)}>배송 안내</div>
        <div style={{ ...txt(8, 500, sub), whiteSpace: "normal", marginTop: 5 }}>
          10월 3일은 쉬는 날이라
          <br />
          다음 날 출발해요
        </div>
        <div
          style={{
            ...txt(8.5, 700, "#fff"),
            background: accent,
            borderRadius: 6,
            padding: "4px 0",
            marginTop: 8,
          }}
        >
          확인
        </div>
      </div>
      <Cursor x={x} y={y} o={co} press={pressAt(t, 700) + pressAt(t, 2500)} />
    </Browser>
  );
}
