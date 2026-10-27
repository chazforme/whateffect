"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { Browser, Cursor, accent, along, inOut, line, pressAt, sub, txt } from "./_kit";

// 4초 주기: 페이지 아래에서 쿠키 안내 띠가 올라옴 → '모두 허용' 클릭 → 내려감
export default function CookieBanner() {
  const t = useLoop(4000);
  const up = inOut(t, 300, 800, 2600, 3000);
  const [x, y] = along(t, [
    [0, 120, 40],
    [1100, 120, 40],
    [2100, 215, 120],
    [2800, 215, 120],
    [3700, 120, 40],
  ]);
  const co = seg(t, 900, 1150) * (1 - seg(t, 3300, 3700));

  return (
    <Browser url="news.inno.kr">
      <div style={{ padding: "8px 12px" }}>
        <div style={txt(10, 800)}>오늘의 소식</div>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <div style={{ width: 80, height: 54, borderRadius: 6, background: "#DCE3F6" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={txt(8.5, 700)}>가을 단풍, 이번 주말 절정</span>
            <div style={line(120)} />
            <div style={line(100)} />
            <div style={line(110)} />
          </div>
        </div>
        <div style={{ ...line("90%"), marginTop: 10 }} />
        <div style={{ ...line("75%"), marginTop: 6 }} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          background: "#fff",
          borderTop: "1px solid #E3E6EE",
          boxShadow: "0 -6px 16px rgba(15,20,35,.1)",
          padding: "7px 10px",
          display: "flex",
          alignItems: "center",
          gap: 6,
          transform: `translateY(${110 * (1 - up)}%)`,
        }}
      >
        <span style={{ fontSize: 15 }}>🍪</span>
        <div style={{ flex: 1 }}>
          <div style={txt(8, 800)}>쿠키를 사용해도 될까요?</div>
          <div style={txt(6.5, 500, sub)}>방문 기록을 저장해 둘게요</div>
        </div>
        <span style={{ ...txt(7, 700, sub), border: "1px solid #D5D9E2", borderRadius: 5, padding: "3px 6px" }}>거부</span>
        <span style={{ ...txt(7, 700, "#fff"), background: accent, borderRadius: 5, padding: "4px 7px" }}>모두 허용</span>
      </div>
      <Cursor x={x} y={y} o={co} press={pressAt(t, 2300)} />
    </Browser>
  );
}
