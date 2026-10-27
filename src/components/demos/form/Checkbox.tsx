"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { C, Card, Cursor, Tap, isDown, path } from "./parts";

const ITEMS: [string, string][] = [
  ["필수", "이용약관 동의"],
  ["필수", "개인정보 수집 동의"],
  ["선택", "마케팅 정보 받기"],
];
const CLICKS = [600, 1200, 1800];

// 4.2초: 네모를 하나씩 눌러 ✓ — 여러 개가 동시에 체크됨
export default function Checkbox() {
  const t = useLoop(4200);
  const off = 1 - seg(t, 3600, 3900);
  const cur = path(t, [
    [0, 150, 140],
    [200, 150, 140],
    [550, 28, 34],
    [1150, 28, 70],
    [1750, 28, 106],
    [2600, 28, 106],
    [3100, 170, 140],
  ]);
  const co = seg(t, 0, 200) * (1 - seg(t, 2700, 3000));

  return (
    <Card width={240} pad={16}>
      {ITEMS.map(([tag, text], i) => {
        const p = ease(seg(t, CLICKS[i], CLICKS[i] + 250)) * off;
        return (
          <div
            key={text}
            style={{ height: 30, marginTop: i ? 6 : 0, display: "flex", alignItems: "center", gap: 9 }}
          >
            <div
              style={{
                position: "relative",
                width: 20,
                height: 20,
                borderRadius: 6,
                border: `1.8px solid ${p > 0.01 ? C.acc : C.line}`,
                boxSizing: "border-box",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", inset: -2, background: C.acc, opacity: Math.min(1, p * 2) }} />
              <svg width="20" height="20" viewBox="0 0 20 20" style={{ position: "absolute", left: -1.8, top: -1.8 }}>
                <path
                  d="M5 10.5 L8.5 14 L15 6.5"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="16"
                  strokeDashoffset={16 * (1 - p)}
                />
              </svg>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: tag === "필수" ? C.acc : C.faint }}>[{tag}]</span>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: C.ink, whiteSpace: "nowrap" }}>{text}</span>
          </div>
        );
      })}
      {CLICKS.map((at, i) => (
        <Tap key={at} x={26} y={31 + i * 36} t={t} at={at} />
      ))}
      <Cursor x={cur.x} y={cur.y} o={co} down={isDown(t, CLICKS)} />
    </Card>
  );
}
