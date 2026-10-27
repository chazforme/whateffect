"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { accent, txt } from "./_kit";

const SLIDES = [
  { bg: "#3A5BEF", sub: "10월 한정", title: "가을 신상 30% 할인" },
  { bg: "#1B2236", sub: "이번 주만", title: "전 상품 무료 배송" },
  { bg: "#F07C5A", sub: "처음 오셨나요?", title: "가입하면 5천원 쿠폰" },
];
const STEP = 1400;
const W = 240;

// 배너가 1.4초마다 옆으로 밀려 다음 장으로 → 아래 점이 따라 움직임 (마지막 다음은 다시 첫 장)
export default function Carousel() {
  const t = useLoop(STEP * SLIDES.length);
  const i = Math.floor(t / STEP);
  const p = ease(seg(t % STEP, 950, 1350));
  const pos = i + p; // 0~3, 3은 첫 장 복사본

  return (
    <div style={{ width: W }}>
      <div style={{ width: W, height: 110, borderRadius: 12, overflow: "hidden", position: "relative" }}>
        <div style={{ display: "flex", width: W * (SLIDES.length + 1), transform: `translateX(${-W * pos}px)` }}>
          {[...SLIDES, SLIDES[0]].map((s, k) => (
            <div
              key={k}
              style={{ width: W, height: 110, background: s.bg, padding: "22px 18px", flexShrink: 0 }}
            >
              <div style={txt(9, 600, "rgba(255,255,255,.75)")}>{s.sub}</div>
              <div style={{ ...txt(17, 800, "#fff"), marginTop: 4 }}>{s.title}</div>
              <div
                style={{
                  ...txt(8, 700, "#fff"),
                  display: "inline-block",
                  marginTop: 12,
                  border: "1px solid rgba(255,255,255,.5)",
                  borderRadius: 10,
                  padding: "2px 9px",
                }}
              >
                보러 가기 ›
              </div>
            </div>
          ))}
        </div>
        <span
          style={{
            position: "absolute",
            right: 10,
            bottom: 9,
            background: "rgba(0,0,0,.28)",
            borderRadius: 8,
            padding: "1px 7px",
            ...txt(7.5, 600, "#fff"),
          }}
        >
          {(Math.round(pos) % SLIDES.length) + 1} / {SLIDES.length}
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 9 }}>
        {SLIDES.map((s, k) => {
          const on = Math.max(0, 1 - Math.abs(pos - k), 1 - Math.abs(pos - SLIDES.length - k));
          return (
            <i
              key={s.title}
              style={{
                width: 6 + 12 * on,
                height: 6,
                borderRadius: 3,
                background: on > 0.5 ? accent : "#C9CFDC",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
