"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { ACCENT, Finger, INK, LINE, Phone, SUB, io } from "./kit";

const CARDS = [
  { t: "여름 세일", s: "최대 50%", e: "☀️", bg: "#FFF1C9" },
  { t: "신상 입고", s: "이번 주 새로 나왔어요", e: "🛍️", bg: "#DCE4FD" },
  { t: "무료 배송", s: "주말까지만", e: "🚚", bg: "#DDF3E4" },
];
const CW = 76;
const GAP = 8;
const STEP = CW + GAP;
const DRAG = 40; // 손가락이 끌어간 거리(한 칸의 절반 정도)

// 손을 중간에 떼도 카드가 알아서 한 칸에 딱 맞춰 멈춤
function offset(t: number) {
  const swipe = (a: number) => {
    const dragged = seg(t, a, a + 450) * DRAG;
    const snap = ease(seg(t, a + 450, a + 800)) * (STEP - DRAG);
    return dragged + snap;
  };
  const back = io(seg(t, 3200, 3750)) * STEP * 2;
  return swipe(400) + swipe(1800) - back;
}

export default function ScrollSnap() {
  const t = useLoop(4000);
  const x = offset(t);
  const idx = Math.round(x / STEP);

  // 손가락: 0.4초·1.8초에 왼쪽으로 반 칸 끌고 뗌
  const fAt = t < 1500 ? 400 : 1800;
  const fp = seg(t, fAt, fAt + 450);
  const fo = seg(t, fAt - 150, fAt) * (1 - seg(t, fAt + 450, fAt + 600));

  return (
    <Phone>
      <div style={{ padding: "7px 9px", fontSize: 9.5, fontWeight: 800, color: INK }}>이번 주 기획전</div>
      <div style={{ position: "absolute", top: 34, left: 0, right: 0, height: 96 }}>
        <div style={{ display: "flex", gap: GAP, paddingLeft: 18, transform: `translateX(${-x}px)` }}>
          {CARDS.map((c) => (
            <div
              key={c.t}
              style={{
                width: CW,
                height: 96,
                flexShrink: 0,
                borderRadius: 10,
                background: c.bg,
                padding: 8,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 22 }}>{c.e}</span>
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, color: INK }}>{c.t}</div>
                <div style={{ fontSize: 7, color: SUB, whiteSpace: "nowrap" }}>{c.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", top: 140, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 4 }}>
        {CARDS.map((c, i) => (
          <i
            key={c.t}
            style={{ width: i === idx ? 12 : 5, height: 5, borderRadius: 3, background: i === idx ? ACCENT : LINE }}
          />
        ))}
      </div>
      <Finger x={88 - fp * DRAG} y={84} o={fo} />
    </Phone>
  );
}
