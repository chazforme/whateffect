"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { ACCENT, INK, LINE, SOFT, SUB, Taps, card, fadeIn, io, stateAt } from "./parts";

const STEPS = ["장바구니", "배송 정보", "결제", "완료"];
const BODY = [
  ["장바구니 2개", "니트 가디건 외 1개 · ₩68,000"],
  ["받는 분", "김효과 · 서울시 중구"],
  ["결제 수단", "카드 · 일시불"],
  ["주문 완료!", "내일 도착 예정이에요"],
];
const X = [35, 95, 155, 215];
const Y = 24;
const TAPS: [number, number][] = [
  [900, 1],
  [1900, 2],
  [2900, 3],
];
const BTN: [number, number] = [206, 127];

// 4.4초: '다음'을 누를 때마다 위 동그라미가 한 칸씩 채워지고 끝난 칸엔 ✓
export default function Stepper() {
  const t = useLoop(4400);
  const reset = t >= 4050;
  const { v: cur, at } = stateAt(t, 0, TAPS);
  const step = reset ? 0 : cur;
  const fill = reset ? 0 : at < 0 ? 0 : cur - 1 + io(seg(t, at, at + 350));
  const f = reset ? seg(t, 4050, 4300) : at < 0 ? 1 : fadeIn(t, at);

  return (
    <div style={{ ...card, width: 250, height: 150 }}>
      <div style={{ position: "absolute", left: X[0], width: X[3] - X[0], top: Y - 1, height: 2, background: LINE }} />
      <div style={{ position: "absolute", left: X[0], width: (X[1] - X[0]) * Math.max(0, fill), top: Y - 1, height: 2, background: ACCENT }} />
      {STEPS.map((s, i) => {
        const done = i < step;
        const now = i === step;
        return (
          <div key={s}>
            <div
              style={{
                position: "absolute",
                left: X[i] - 9,
                top: Y - 9,
                width: 18,
                height: 18,
                borderRadius: "50%",
                boxSizing: "border-box",
                border: `2px solid ${done || now ? ACCENT : "#C9CDD8"}`,
                background: done ? ACCENT : "#fff",
                color: done ? "#fff" : now ? ACCENT : "#A0A6B4",
                fontSize: 8.5,
                fontWeight: 800,
                lineHeight: "14px",
                textAlign: "center",
              }}
            >
              {done ? "✓" : i + 1}
            </div>
            <div
              style={{
                position: "absolute",
                left: X[i] - 30,
                width: 60,
                top: Y + 13,
                textAlign: "center",
                fontSize: 8,
                fontWeight: now ? 800 : 600,
                color: now ? INK : SUB,
              }}
            >
              {s}
            </div>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 14,
          right: 14,
          top: 62,
          height: 40,
          borderRadius: 8,
          background: SOFT,
          padding: "6px 10px",
          opacity: f,
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 800, color: step === 3 ? ACCENT : INK }}>{BODY[step][0]}</div>
        <div style={{ fontSize: 8, color: SUB, marginTop: 2 }}>{BODY[step][1]}</div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 14,
          bottom: 12,
          width: 60,
          height: 22,
          borderRadius: 7,
          background: ACCENT,
          color: "#fff",
          fontSize: 9,
          fontWeight: 800,
          lineHeight: "22px",
          textAlign: "center",
        }}
      >
        {step === 3 ? "확인" : "다음"}
      </div>
      <Taps t={t} list={TAPS.map(([c]) => [c - 100, BTN[0], BTN[1]])} size={22} />
    </div>
  );
}
