"use client";

import { useLoop } from "@/hooks/useLoop";

const PHRASES = ["랜딩페이지", "포트폴리오", "쇼핑몰"];
const TYPE = 110; // 한 글자 치는 간격
const HOLD = 1400; // 다 친 뒤 멈춤
const DEL = 45; // 한 글자 지우는 간격
const GAP = 350; // 다 지운 뒤 다음 단어까지

// 단어별 [시작 시각, 길이] 미리 계산 → 한 사이클 = 세 단어
const steps = PHRASES.map((w) => w.length * TYPE + HOLD + w.length * DEL + GAP);
const PERIOD = steps.reduce((a, b) => a + b, 0);

function textAt(t: number): string {
  let acc = 0;
  for (let p = 0; p < PHRASES.length; p++) {
    if (t < acc + steps[p]) {
      const w = PHRASES[p];
      const local = t - acc;
      const typed = w.length * TYPE;
      if (local < typed) return w.slice(0, Math.floor(local / TYPE) + 1);
      if (local < typed + HOLD) return w;
      const d = local - typed - HOLD;
      return w.slice(0, Math.max(0, w.length - Math.floor(d / DEL) - 1));
    }
    acc += steps[p];
  }
  return "";
}

export default function Typewriter() {
  const t = useLoop(PERIOD);
  return (
    <div
      style={{
        fontSize: 30,
        fontWeight: 800,
        letterSpacing: "-.02em",
        color: "var(--color-ink)",
        whiteSpace: "nowrap",
      }}
    >
      <span>{textAt(t)}</span>
      <span
        style={{
          display: "inline-block",
          width: 3,
          height: "1.05em",
          background: "var(--color-accent)",
          verticalAlign: "-.12em",
          marginLeft: 3,
          opacity: Math.floor(t / 500) % 2 ? 0 : 1,
        }}
      />
    </div>
  );
}
