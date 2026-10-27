"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { C, Card, Caret, Cursor, Tap, field, isDown, path, typed } from "./parts";

// 4.4초: 칸 가운데 '이메일' → 누르면 위 테두리로 떠오름 → 입력 → 지우면 다시 내려옴
export default function FloatingLabel() {
  const t = useLoop(4400);
  const focus = t >= 700 && t < 3450;
  const lift = t < 3300 ? ease(seg(t, 700, 950)) : 1 - ease(seg(t, 3500, 3750));
  const text = t < 3400 ? typed("minji@naver.com", t, 1100, 70) : "";
  const cur = path(t, [
    [0, 210, 95],
    [300, 210, 95],
    [650, 140, 52],
  ]);
  const co = seg(t, 0, 300) * (1 - seg(t, 1100, 1400));

  return (
    <Card width={250} height={96} pad="24px 18px">
      <div style={{ ...field(focus ? C.acc : C.line, 48), overflow: "visible", fontSize: 15 }}>
        <span
          style={{
            position: "absolute",
            left: 9,
            top: "50%",
            padding: "0 4px",
            background: "#fff",
            fontSize: 15,
            fontWeight: 600,
            lineHeight: "18px",
            color: lift > 0.5 ? (focus ? C.acc : C.sub) : C.faint,
            transform: `translateY(${-9 - lift * 24}px) scale(${1 - lift * 0.24})`,
            transformOrigin: "left center",
          }}
        >
          이메일
        </span>
        <span style={{ opacity: 1 - seg(t, 3200, 3400) }}>
          {text}
          <Caret t={t} show={focus && lift > 0.9} />
        </span>
      </div>
      <Tap x={140} y={48} t={t} at={700} />
      <Cursor x={cur.x} y={cur.y} o={co} down={isDown(t, [700])} />
    </Card>
  );
}
