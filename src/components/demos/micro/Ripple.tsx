"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

// 버튼 안 좌표 기준 [누르는 시각, x, y]
const TAPS: [number, number, number][] = [
  [450, 48, 30],
  [1950, 172, 26],
];

// 3.2초 주기: 손가락이 누른 자리에서 물결 같은 원이 퍼져 나감 (두 번, 다른 자리)
export default function Ripple() {
  const t = useLoop(3200);

  return (
    <div style={{ position: "relative", width: 280, height: 170 }}>
      <div
        style={{
          position: "absolute",
          left: 30,
          top: 57,
          width: 220,
          height: 56,
          borderRadius: 12,
          overflow: "hidden",
          background: "#fff",
          border: "1.5px solid #E3E6EE",
          boxSizing: "border-box",
          boxShadow: "0 3px 10px rgba(27,34,54,.06)",
        }}
      >
        {TAPS.map(([T, x, y]) => {
          const local = t - T;
          const r = 12 + ease(seg(local, 0, 750)) * 200;
          const o = local < 0 ? 0 : 0.32 * (1 - seg(local, 300, 950));
          return (
            <div
              key={T}
              style={{
                position: "absolute",
                left: x - r,
                top: y - r,
                width: r * 2,
                height: r * 2,
                borderRadius: "50%",
                background: "var(--color-accent)",
                opacity: o,
              }}
            />
          );
        })}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            fontWeight: 800,
            color: "var(--color-ink)",
          }}
        >
          🔔 알림 설정 바꾸기
        </div>
      </div>
      {TAPS.map(([T, x, y]) => {
        const local = t - T;
        const o = seg(local, -300, -80) * (1 - seg(local, 250, 450));
        const press = seg(local, -80, 40) * (1 - seg(local, 200, 350));
        return (
          <div
            key={T}
            style={{
              position: "absolute",
              left: 30 + x - 13,
              top: 57 + y - 13,
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "rgba(27,34,54,.22)",
              border: "2px solid rgba(255,255,255,.9)",
              boxSizing: "border-box",
              opacity: o,
              transform: `scale(${1 + 0.3 * press})`,
            }}
          />
        );
      })}
    </div>
  );
}
