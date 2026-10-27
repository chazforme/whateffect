"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { ACCENT, Browser, INK, SOFT, SUB, Wheel, firstTime, prog, stage } from "./kit";

const BODY = 137;
const PERIOD = 4000;
const MAX = 150;
const scrollY = (t: number) => prog(t) * MAX;

const ITEMS = [
  { top: 70, text: "✓ 오늘 주문하면 내일 도착" },
  { top: 104, text: "✓ 30일 무료 반품" },
  { top: 138, text: "✓ 1:1 전문가 상담" },
  { top: 172, text: "✓ 구매 시 포인트 5% 적립" },
];
const STAT_TOP = 214;
// 각 줄이 화면 아래쪽 85% 선을 넘는 순간 → 그때 한 번 재생
const fire = [...ITEMS.map((it) => it.top), STAT_TOP].map((top) =>
  firstTime((t) => scrollY(t) + BODY * 0.85, top, PERIOD),
);

export default function ScrollTriggeredAnimation() {
  const t = useLoop(PERIOD);
  const y = scrollY(t);
  const on = t < 3350 ? seg(t, 300, 400) * (1 - seg(t, 2500, 2650)) : seg(t, 3350, 3450) * (1 - seg(t, 3750, 3850));
  const st = ease(seg(t, fire[4], fire[4] + 600));

  return (
    <div style={stage}>
      <Browser url="brand.co.kr">
        <div style={{ position: "relative", height: 320, transform: `translateY(${-y}px)` }}>
          <div style={{ height: 58, padding: "12px 14px", background: SOFT }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: INK }}>왜 우리를 고를까요?</div>
            <div style={{ fontSize: 7.5, color: SUB }}>내려 보면 하나씩 나타나요</div>
          </div>
          {ITEMS.map((it, i) => {
            const a = ease(seg(t, fire[i], fire[i] + 550));
            const from = i % 2 ? 40 : -40;
            return (
              <div
                key={it.text}
                style={{
                  position: "absolute",
                  top: it.top,
                  left: 14,
                  right: 14,
                  height: 26,
                  borderRadius: 8,
                  background: "#fff",
                  boxShadow: "0 2px 6px rgba(27,34,54,.1)",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 10px",
                  fontSize: 9,
                  fontWeight: 700,
                  color: INK,
                  opacity: a,
                  transform: `translateX(${from * (1 - a)}px)`,
                }}
              >
                {it.text}
              </div>
            );
          })}
          <div
            style={{
              position: "absolute",
              top: STAT_TOP,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: st,
              transform: `scale(${0.7 + 0.3 * st})`,
            }}
          >
            <div style={{ fontSize: 8, color: SUB }}>함께한 고객</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: ACCENT }}>120만 명</div>
          </div>
        </div>
      </Browser>
      <Wheel t={t} on={on} dir={t < 3350 ? 1 : -1} />
    </div>
  );
}
