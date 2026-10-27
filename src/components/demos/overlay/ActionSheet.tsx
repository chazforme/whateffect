"use client";

import type { CSSProperties } from "react";
import { useLoop } from "@/hooks/useLoop";
import { AppBar, Dim, Phone, Tap, accent, inOut, sub, txt } from "./_kit";

const row: CSSProperties = { padding: "5px 0", borderTop: "1px solid #E7EAF0", ...txt(7.8, 600, accent) };

// 4초 주기: '사진 바꾸기' 탭 → 아래에서 선택지 묶음 + 따로 떨어진 '취소' → '앨범에서 선택' 탭 → 내려감
export default function ActionSheet() {
  const t = useLoop(4000);
  const dim = inOut(t, 550, 900, 2650, 3000);
  const up = inOut(t, 550, 1150, 2600, 3100);
  const hit = t > 2350 && t < 2650 ? 1 : 0;

  return (
    <Phone>
      <AppBar title="내 프로필" />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#DCE3F6", display: "grid", placeItems: "center", fontSize: 20 }}>
          🙂
        </div>
        <span style={{ ...txt(8.5, 800), marginTop: 7 }}>김민지</span>
        <span style={{ ...txt(7.5, 700, accent), marginTop: 8, border: "1px solid #DCE3F6", borderRadius: 6, padding: "3px 9px" }}>
          사진 바꾸기
        </span>
      </div>
      <Tap t={t} at={250} x={56} y={118} />
      <Dim o={dim} />
      <div
        style={{
          position: "absolute",
          left: 6,
          right: 6,
          bottom: 6,
          textAlign: "center",
          transform: `translateY(${115 * (1 - up)}%)`,
        }}
      >
        <div style={{ background: "rgba(255,255,255,.97)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: "5px 0", ...txt(6.5, 500, sub) }}>프로필 사진 바꾸기</div>
          <div style={row}>사진 찍기</div>
          <div style={{ ...row, background: hit ? "#E6EAF5" : "transparent" }}>앨범에서 선택</div>
          <div style={{ ...row, color: "#E5484D" }}>사진 지우기</div>
        </div>
        <div style={{ background: "#fff", borderRadius: 10, marginTop: 4, padding: "6px 0", ...txt(8, 800, accent) }}>
          취소
        </div>
      </div>
      <Tap t={t} at={2300} x={56} y={97} />
    </Phone>
  );
}
