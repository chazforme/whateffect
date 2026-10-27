"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";

const T = 800; // 누르는 시각
// 진동 두 번 (드르륵 · 드륵)
const BUZZ: [number, number][] = [
  [0, 260],
  [340, 560],
];

// 3.4초 주기: 폰 화면의 버튼을 누르면 폰이 '드르륵' 떨리고 양옆에 진동 줄이 생김
export default function HapticFeedback() {
  const t = useLoop(3400);
  const local = t - T;
  let shake = 0;
  let on = false;
  for (const [a, b] of BUZZ) {
    if (local >= a && local < b) {
      on = true;
      shake = Math.sin((local - a) / 11) * 3 * (1 - (local - a) / (b - a));
    }
  }
  const lineO = on ? (Math.floor(local / 55) % 2 ? 0.45 : 1) : 0;
  const done = local >= 0 && t < 3100;
  const fingerO = seg(local, -400, -150) * (1 - seg(local, 120, 380));
  const press = seg(local, -150, 0) * (1 - seg(local, 80, 220));

  return (
    <div style={{ position: "relative", width: 280, height: 170 }}>
      <svg width="280" height="170" style={{ position: "absolute", left: 0, top: 0, opacity: lineO }}>
        {[0, 1].map((side) => {
          const dir = side ? 1 : -1;
          const base = side ? 211 : 69;
          return [0, 9].map((off) => {
            const x = base + dir * off;
            return (
              <path
                key={`${side}-${off}`}
                d={`M ${x} ${68 - off} Q ${x + dir * 7} 85 ${x} ${102 + off}`}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            );
          });
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 81,
          top: 1,
          width: 118,
          height: 168,
          background: "#fff",
          borderRadius: 18,
          border: "3px solid #1B2236",
          boxSizing: "border-box",
          overflow: "hidden",
          transform: `translateX(${shake}px) rotate(${shake * 0.6}deg)`,
        }}
      >
        <div style={{ width: 30, height: 4, borderRadius: 2, background: "#1B2236", margin: "6px auto 0" }} />
        <div style={{ fontSize: 10, fontWeight: 700, color: "#6B7180", textAlign: "center", marginTop: 16 }}>결제 금액</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "var(--color-ink)", textAlign: "center", marginTop: 2 }}>
          ₩23,500
        </div>
        <div style={{ fontSize: 9.5, color: "#6B7180", textAlign: "center", marginTop: 6 }}>토스뱅크 카드</div>
        <div
          style={{
            position: "absolute",
            left: 10,
            right: 10,
            bottom: 12,
            height: 28,
            borderRadius: 8,
            background: done ? "#2CC28A" : "var(--color-accent)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${1 - 0.05 * press})`,
          }}
        >
          {done ? "✓ 결제 완료" : "결제하기"}
        </div>
        <div
          style={{
            position: "absolute",
            left: 56 - 13,
            bottom: 26 - 13,
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "rgba(27,34,54,.22)",
            border: "2px solid rgba(255,255,255,.9)",
            boxSizing: "border-box",
            opacity: fingerO,
            transform: `scale(${1 + 0.3 * press})`,
          }}
        />
      </div>
    </div>
  );
}
