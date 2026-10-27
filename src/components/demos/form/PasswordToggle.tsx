"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { C, Card, Cursor, Tap, field, isDown, label, path } from "./parts";

const PW = "sony2026!";

// 4.4초: ●●● → 눈 모양 누르면 실제 글자 → 다시 누르면 가려짐
export default function PasswordToggle() {
  const t = useLoop(4400);
  const shown = t >= 950 && t < 2700;
  const near = t >= 800 && t < 3000;
  const cur = path(t, [
    [0, 150, 110],
    [200, 150, 110],
    [800, 213, 60],
    [3000, 213, 60],
    [3500, 240, 110],
  ]);
  const co = seg(t, 0, 200) * (1 - seg(t, 3300, 3600));
  const ic = shown ? C.acc : C.sub;

  return (
    <Card width={250} pad={16}>
      <div style={label}>비밀번호</div>
      <div style={field(C.line, 40)}>
        <span style={shown ? { letterSpacing: ".02em" } : { letterSpacing: "2px", fontSize: 11, color: C.ink }}>
          {shown ? PW : "●".repeat(PW.length)}
        </span>
        <div
          style={{
            position: "absolute",
            right: 6,
            top: "50%",
            width: 30,
            height: 30,
            marginTop: -15,
            borderRadius: "50%",
            background: near ? C.soft : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="20" height="18" viewBox="0 0 20 18">
            <path d="M1.5 9 C5 3 15 3 18.5 9 C15 15 5 15 1.5 9 Z" fill="none" stroke={ic} strokeWidth="1.6" />
            <circle cx="10" cy="9" r="2.7" fill={ic} />
            {!shown && <path d="M4 16 L16 2" stroke={ic} strokeWidth="1.8" strokeLinecap="round" />}
          </svg>
        </div>
      </div>
      <Tap x={212} y={57} t={t} at={950} />
      <Tap x={212} y={57} t={t} at={2700} />
      <Cursor x={cur.x} y={cur.y} o={co} down={isDown(t, [950, 2700])} />
    </Card>
  );
}
