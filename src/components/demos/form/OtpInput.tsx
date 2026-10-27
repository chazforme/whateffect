"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { C, Card, Caret, typed } from "./parts";

const CODE = "482915";
const START = 600;
const STEP = 230;

// 4.4초: 한 칸에 한 자리씩 채워지며 다음 칸으로 → 6자리 다 차면 초록 ✓
export default function OtpInput() {
  const t = useLoop(4400);
  const n = typed(CODE, t, START, STEP).length;
  const done = n === CODE.length && t < 3900;
  const fade = 1 - seg(t, 3700, 4100);
  const sec = 178 - Math.floor(t / 1000);
  const timer = `0${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;

  return (
    <Card width={256} pad={16}>
      <div style={{ fontSize: 14, fontWeight: 800, color: C.ink, lineHeight: "20px" }}>인증번호 6자리</div>
      <div style={{ fontSize: 11.5, fontWeight: 600, color: C.sub, lineHeight: "16px", whiteSpace: "nowrap" }}>
        문자로 받은 번호를 넣어요 · <span style={{ color: C.acc }}>{timer}</span>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
        {CODE.split("").map((d, i) => {
          const at = START + i * STEP;
          const has = i < n && t < 4100;
          const active = i === n && t < 3700;
          const pop = 1 + 0.25 * (1 - ease(seg(t, at, at + 200)));
          return (
            <div
              key={i}
              style={{
                width: 32,
                height: 40,
                borderRadius: 9,
                border: `1.5px solid ${done ? C.green : active ? C.acc : has ? "#AEB5C4" : C.line}`,
                background: done ? "#F0FAF3" : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 19,
                fontWeight: 800,
                color: C.ink,
                boxSizing: "border-box",
              }}
            >
              {has ? (
                <span style={{ display: "inline-block", opacity: fade, transform: `scale(${pop})` }}>{d}</span>
              ) : (
                <Caret t={t} show={active} h={18} />
              )}
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 10,
          height: 18,
          fontSize: 12.5,
          fontWeight: 700,
          color: C.green,
          opacity: done ? ease(seg(t, START + 5 * STEP + 150, START + 5 * STEP + 400)) * fade : 0,
        }}
      >
        ✓ 인증됐어요
      </div>
    </Card>
  );
}
