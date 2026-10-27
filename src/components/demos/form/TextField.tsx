"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { C, Card, Caret, Cursor, Tap, field, isDown, label, path, typed } from "./parts";

// 5초: 첫 칸 눌러 이름 입력 → 둘째 칸 눌러 연락처 입력 → 지워지고 반복
export default function TextField() {
  const t = useLoop(5000);
  const f1 = t >= 650 && t < 2150;
  const f2 = t >= 2150 && t < 4300;
  const fade = 1 - seg(t, 4400, 4800);
  const name = typed("김민지", t, 850, 170);
  const phone = typed("010-1234-5678", t, 2350, 90);
  const cur = path(t, [
    [0, 200, 150],
    [200, 200, 150],
    [600, 140, 58],
    [1700, 140, 58],
    [2100, 140, 125],
  ]);
  const co = seg(t, 0, 200) * (1 - seg(t, 2500, 2800));

  return (
    <Card width={240} pad={16}>
      <div style={label}>받는 분</div>
      <div style={field(f1 ? C.acc : C.line, 36)}>
        <span>
          <span style={{ opacity: fade }}>{name}</span>
          <Caret t={t} show={f1} />
        </span>
      </div>
      <div style={{ ...label, marginTop: 10 }}>연락처</div>
      <div style={field(f2 ? C.acc : C.line, 36)}>
        <span>
          <span style={{ opacity: fade }}>{phone}</span>
          <Caret t={t} show={f2} />
        </span>
      </div>
      <Tap x={140} y={58} t={t} at={650} />
      <Tap x={140} y={125} t={t} at={2150} />
      <Cursor x={cur.x} y={cur.y} o={co} down={isDown(t, [650, 2150])} />
    </Card>
  );
}
