"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { C, Card, Caret, Cursor, Tap, field, isDown, label, path, typed } from "./parts";

const EMAIL = "minji@naver.com";

// 4.8초: 쓰는 도중엔 빨간 경고 → 형식이 맞는 순간 초록 ✓ → 지워지고 반복
export default function InlineValidation() {
  const t = useLoop(4800);
  const text = typed(EMAIL, t, 700, 120);
  const n = text.length;
  const focus = t >= 450 && t < 4100;
  const fade = 1 - seg(t, 4100, 4500);
  const state = t >= 4500 || n < 3 ? "idle" : n < EMAIL.length ? "bad" : "ok";
  const border = state === "bad" ? C.red : state === "ok" ? C.green : focus ? C.acc : C.line;
  const cur = path(t, [
    [0, 215, 112],
    [100, 215, 112],
    [400, 140, 58],
  ]);
  const co = seg(t, 0, 100) * (1 - seg(t, 700, 1000));

  return (
    <Card width={250} pad={16}>
      <div style={label}>이메일</div>
      <div style={field(border)}>
        <span>
          <span style={{ opacity: fade }}>{text}</span>
          <Caret t={t} show={focus} />
        </span>
        {state === "ok" && (
          <span style={{ marginLeft: "auto", color: C.green, fontWeight: 800, opacity: fade }}>✓</span>
        )}
      </div>
      <div
        style={{
          marginTop: 7,
          height: 18,
          fontSize: 12,
          fontWeight: 700,
          whiteSpace: "nowrap",
          color: state === "ok" ? C.green : C.red,
          opacity: state === "idle" ? 0 : fade,
        }}
      >
        {state === "ok" ? "✓ 사용할 수 있는 이메일이에요" : "✕ 이메일 형식을 확인해 주세요"}
      </div>
      <Tap x={140} y={56} t={t} at={450} />
      <Cursor x={cur.x} y={cur.y} o={co} down={isDown(t, [450])} />
    </Card>
  );
}
