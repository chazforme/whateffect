"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { C, Card, Cursor, Tap, isDown, path } from "./parts";

const OPTS = ["문 앞에 놔주세요", "경비실에 맡겨주세요", "직접 받을게요"];
// [바뀌는 시각, 고른 번호]
const CHANGES: [number, number][] = [
  [0, 0],
  [1000, 2],
  [2400, 1],
  [4000, 0],
];

// 4.4초: 다른 동그라미를 누르면 앞의 점은 줄어들고 새 점이 커짐 — 늘 하나만
export default function RadioButton() {
  const t = useLoop(4400);
  let j = 0;
  for (let k = 0; k < CHANGES.length; k++) if (t >= CHANGES[k][0]) j = k;
  const sel = CHANGES[j][1];
  const prev = j > 0 ? CHANGES[j - 1][1] : sel;
  const p = j > 0 ? ease(seg(t, CHANGES[j][0], CHANGES[j][0] + 250)) : 1;
  const cur = path(t, [
    [0, 160, 150],
    [300, 160, 150],
    [900, 28, 126],
    [1900, 28, 126],
    [2300, 28, 92],
    [3500, 28, 92],
    [3900, 28, 58],
  ]);
  const co = seg(t, 0, 300) * (1 - seg(t, 4100, 4350));

  return (
    <Card width={240} pad={16}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.sub, lineHeight: "16px", marginBottom: 8 }}>
        배송 요청사항
      </div>
      {OPTS.map((o, k) => {
        const s = k === sel ? p : k === prev ? 1 - p : 0;
        const on = k === sel;
        return (
          <div key={o} style={{ height: 30, marginTop: k ? 4 : 0, display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: `2px solid ${on ? C.acc : C.line}`,
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.acc, transform: `scale(${s})` }} />
            </div>
            <span
              style={{ fontSize: 13.5, fontWeight: on ? 700 : 600, color: on ? C.ink : C.sub, whiteSpace: "nowrap" }}
            >
              {o}
            </span>
          </div>
        );
      })}
      <Tap x={26} y={123} t={t} at={1000} />
      <Tap x={26} y={89} t={t} at={2400} />
      <Tap x={26} y={55} t={t} at={4000} />
      <Cursor x={cur.x} y={cur.y} o={co} down={isDown(t, [1000, 2400, 4000])} />
    </Card>
  );
}
