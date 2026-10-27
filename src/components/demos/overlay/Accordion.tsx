"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { Cursor, accent, along, pressAt, sub, txt } from "./_kit";

const FAQ = [
  { q: "배송은 얼마나 걸려요?", a: "주문 후 1~2일이면 도착해요" },
  { q: "교환·환불은 어떻게 해요?", a: "받은 날부터 7일 안에 신청해요" },
  { q: "선물 포장이 되나요?", a: "주문할 때 '포장'을 골라 주세요" },
];
const HEAD = 26;
const ANS = 24;
const GAP = 5;
const TOP = 8;

// 4.4초 주기: 질문 1 클릭 → 답이 펼쳐짐 → 질문 2 클릭 → 1은 접히고 2가 펼쳐짐 → 2 다시 클릭 → 접힘
export default function Accordion() {
  const t = useLoop(4400);
  const o0 = ease(seg(t, 550, 900)) * (1 - ease(seg(t, 2050, 2400)));
  const o1 = ease(seg(t, 2050, 2400)) * (1 - ease(seg(t, 3450, 3800)));
  const open = [o0, o1, 0];

  // 각 질문 줄의 세로 위치 (위 항목이 펼쳐진 만큼 아래로 밀림)
  const headY = (i: number) => TOP + i * (HEAD + GAP) + open.slice(0, i).reduce((s, v) => s + v * ANS, 0);

  const y0 = headY(0) + 13;
  const y1 = headY(1) + 13;
  let cx = 175;
  let cy = y1;
  if (t < 1500) [cx, cy] = along(t, [[0, 210, 150], [400, 175, y0]]);
  else if (t < 1950) cy = y0 + (y1 - y0) * ease(seg(t, 1500, 1950));
  else if (t >= 4000) {
    const p = ease(seg(t, 4000, 4400));
    cx = 175 + 35 * p;
    cy = y1 + (150 - y1) * p;
  }

  return (
    <div style={{ position: "relative", width: 236, height: 150 }}>
      {FAQ.map((f, i) => (
        <div
          key={f.q}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: headY(i),
            background: "#fff",
            borderRadius: 9,
            overflow: "hidden",
            boxShadow: "0 2px 6px rgba(27,34,54,.06)",
          }}
        >
          <div style={{ height: HEAD, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 11px" }}>
            <span style={txt(9, 700)}>
              <b style={{ color: accent, marginRight: 4 }}>Q</b>
              {f.q}
            </span>
            <span style={{ ...txt(12, 500, sub), display: "inline-block", transform: `rotate(${45 * open[i]}deg)` }}>+</span>
          </div>
          <div style={{ height: ANS * open[i], overflow: "hidden" }}>
            <div style={{ ...txt(8, 500, sub), padding: "0 11px 0 25px", opacity: open[i] }}>{f.a}</div>
          </div>
        </div>
      ))}
      <Cursor x={cx} y={cy} press={pressAt(t, 500) + pressAt(t, 2000) + pressAt(t, 3400)} />
    </div>
  );
}
