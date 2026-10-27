"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { C, Card, Caret, Cursor, Tap, field, isDown, path, typed } from "./parts";

const WORD = "해운대 횟집";

// 4.4초: 흐린 안내 글자 → 쓰기 시작하면 사라짐 → 다 지우면 다시 보임
function valueAt(t: number): string {
  if (t < 3000) return typed(WORD, t, 1500, 150);
  return WORD.slice(0, Math.max(0, WORD.length - Math.floor((t - 3000) / 80) - 1));
}

export default function Placeholder() {
  const t = useLoop(4400);
  const focus = t >= 900 && t < 3900;
  const v = valueAt(t);
  const cur = path(t, [
    [0, 215, 105],
    [300, 215, 105],
    [800, 120, 72],
  ]);
  const co = seg(t, 0, 300) * (1 - seg(t, 1200, 1500));

  return (
    <Card width={250} pad={18}>
      <div style={{ fontSize: 15, fontWeight: 800, color: C.ink, marginBottom: 10, lineHeight: "20px" }}>
        어디로 갈까요?
      </div>
      <div style={{ ...field(focus ? C.acc : C.line, 42), fontSize: 15 }}>
        {v ? (
          <span>
            {v}
            <Caret t={t} show={focus} />
          </span>
        ) : (
          <span>
            <Caret t={t} show={focus} />
            <span style={{ color: C.faint, fontWeight: 500 }}>예: 부산 맛집</span>
          </span>
        )}
      </div>
      <Tap x={120} y={70} t={t} at={900} />
      <Cursor x={cur.x} y={cur.y} o={co} down={isDown(t, [900])} />
    </Card>
  );
}
