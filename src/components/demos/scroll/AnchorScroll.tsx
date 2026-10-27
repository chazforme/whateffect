"use client";

import type { CSSProperties } from "react";
import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { ACCENT, Browser, Cursor, INK, LINE, SOFT, SUB, io } from "./kit";

const SEC = 118; // 구역 하나 높이
const MENU = [
  { label: "소개", x: 142 },
  { label: "가격", x: 166 },
  { label: "문의", x: 190 },
];

// 메뉴 '가격'을 누르면 그 구역으로 미끄러지듯 이동, '소개'를 누르면 다시 위로
function scrollY(t: number) {
  if (t < 2650) return io(seg(t, 950, 1650)) * SEC;
  return SEC * (1 - io(seg(t, 2650, 3350)));
}

const h: CSSProperties = { fontSize: 11, fontWeight: 800, color: INK, marginBottom: 6 };

export default function AnchorScroll() {
  const t = useLoop(4000);
  const y = scrollY(t);

  // 커서: 화면 가운데 → 가격(0.85초 클릭) → 소개(2.55초 클릭)
  const ax = MENU[1].x + 2;
  const bx = MENU[0].x + 2;
  let cx: number;
  let cy: number;
  if (t < 2000) {
    const m = ease(seg(t, 250, 800));
    cx = 120 + (ax - 120) * m;
    cy = 90 + (8 - 90) * m;
  } else {
    const m = ease(seg(t, 2000, 2500));
    cx = ax + (bx - ax) * m;
    cy = 8;
  }
  const co = seg(t, 100, 250) * (1 - seg(t, 3500, 3800));
  const ring = (c: number, x: number) =>
    c > 0 && c < 1 ? (
      <div
        style={{
          position: "absolute",
          left: x - 9 * c,
          top: 9 - 9 * c,
          width: 18 * c,
          height: 18 * c,
          borderRadius: "50%",
          border: `1.5px solid ${ACCENT}`,
          opacity: 1 - c,
          zIndex: 19,
        }}
      />
    ) : null;
  const active = y > SEC * 0.5 ? 1 : 0;

  return (
    <Browser url="studio.co.kr">
      <div style={{ position: "absolute", left: 0, right: 0, top: 20, transform: `translateY(${-y}px)` }}>
        <div style={{ height: SEC, padding: "12px 14px", background: SOFT }}>
          <div style={h}>사진 한 장으로 남기는 하루</div>
          <div style={{ fontSize: 8, color: SUB, lineHeight: 1.5 }}>
            가족사진 · 프로필 · 우정사진
            <br />
            자연광 스튜디오에서 찍어 드려요
          </div>
          <div style={{ marginTop: 10, height: 40, borderRadius: 8, background: "#DCE4FD" }} />
        </div>
        <div style={{ height: SEC, padding: "12px 14px" }}>
          <div style={h}>가격 안내</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              ["기본", "₩99,000"],
              ["프리미엄", "₩159,000"],
            ].map(([n, p]) => (
              <div key={n} style={{ flex: 1, border: `1px solid ${LINE}`, borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 8, color: SUB }}>{n}</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: INK }}>{p}</div>
                <div style={{ fontSize: 7.5, color: SUB, marginTop: 4 }}>✓ 보정 사진 5장</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: SEC, padding: "12px 14px", background: SOFT }}>
          <div style={h}>문의하기</div>
          <div style={{ fontSize: 8, color: SUB }}>☎ 02-123-4567</div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 20,
          background: "#fff",
          borderBottom: `1px solid ${LINE}`,
          zIndex: 10,
        }}
      >
        <b style={{ position: "absolute", left: 12, top: 4, fontSize: 9, fontWeight: 800, color: INK }}>스튜디오 온</b>
        {MENU.map((m, i) => (
          <span
            key={m.label}
            style={{
              position: "absolute",
              left: m.x - 8,
              top: 5,
              fontSize: 8,
              fontWeight: 700,
              color: i === active ? ACCENT : SUB,
            }}
          >
            {m.label}
          </span>
        ))}
      </div>
      {ring(seg(t, 850, 1150), ax)}
      {ring(seg(t, 2550, 2850), bx)}
      <Cursor x={cx} y={cy} o={co} />
    </Browser>
  );
}
