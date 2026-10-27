"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { C, Card, Caret, field, label, typed } from "./parts";

const WORDS = ["카페", "맛집", "전시회"];
const startAt = (i: number) => 500 + i * 1100;
const chipAt = (i: number) => startAt(i) + 700;

// 5초: 단어를 쓰고 Enter → 동글한 태그로 톡 바뀜, 세 번 반복 → 사라짐
export default function ChipInput() {
  const t = useLoop(5000);
  const fade = 1 - seg(t, 4300, 4700);
  const enter = WORDS.some((_, i) => t >= chipAt(i) && t < chipAt(i) + 300);
  const typing = WORDS.findIndex((_, i) => t >= startAt(i) && t < chipAt(i));
  const focus = t < 4300;

  return (
    <Card width={250} pad={16}>
      <div style={label}>관심 태그</div>
      <div style={{ ...field(focus ? C.acc : C.line, 40), gap: 6, padding: "0 8px" }}>
        {WORDS.map((w, i) => {
          if (t < chipAt(i)) return null;
          const pop = ease(seg(t, chipAt(i), chipAt(i) + 200));
          return (
            <span
              key={w}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "3px 7px 3px 10px",
                borderRadius: 999,
                background: C.tint,
                color: C.acc,
                fontSize: 12.5,
                fontWeight: 700,
                opacity: fade,
                transform: `scale(${0.7 + 0.3 * pop})`,
              }}
            >
              {w}
              <span style={{ fontSize: 10, color: "#8EA0F2" }}>✕</span>
            </span>
          );
        })}
        <span>
          {typing >= 0 && typed(WORDS[typing], t, startAt(typing), 170)}
          <Caret t={t} show={focus} />
        </span>
      </div>
      <div
        style={{
          marginTop: 8,
          height: 18,
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontSize: 11.5,
          fontWeight: 600,
          color: C.sub,
          whiteSpace: "nowrap",
        }}
      >
        쓰고
        <span
          style={{
            padding: "1px 6px",
            borderRadius: 5,
            border: `1px solid ${enter ? C.acc : C.line}`,
            background: enter ? C.acc : "#fff",
            color: enter ? "#fff" : C.ink,
            fontWeight: 700,
            fontSize: 11,
          }}
        >
          Enter ↵
        </span>
        누르면 태그가 돼요
      </div>
    </Card>
  );
}
