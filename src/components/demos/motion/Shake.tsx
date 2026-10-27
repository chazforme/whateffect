"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";

const RED = "#EF4444";

// 3.4초 주기: 비밀번호 입력 → 로그인 탭 → 입력칸이 좌우로 도리도리 흔들리며 빨갛게 → 원래대로
export default function Shake() {
  const t = useLoop(3400);
  const dots = Math.floor(seg(t, 100, 600) * 6);
  const tap = seg(t, 650, 1000);
  const err = t >= 900 && t < 2900;
  const errO = t < 2600 ? seg(t, 900, 1100) : 1 - seg(t, 2600, 2900);
  const dt = t - 900;
  const x = dt > 0 && dt < 550 ? 9 * Math.sin((dt / 90) * Math.PI * 2) * (1 - dt / 550) : 0;
  return (
    <div style={{ width: 210, position: "relative" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7180", marginBottom: 6 }}>비밀번호</div>
      <div
        style={{
          height: 38,
          borderRadius: 10,
          background: "#fff",
          border: `2px solid ${err ? RED : "#E3E6EE"}`,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          fontSize: 18,
          letterSpacing: 3,
          color: "var(--color-ink)",
          transform: `translateX(${x}px)`,
        }}
      >
        {"•".repeat(dots)}
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, color: RED, marginTop: 6, height: 16, opacity: errO }}>
        비밀번호가 맞지 않아요
      </div>
      <div
        style={{
          marginTop: 8,
          height: 36,
          borderRadius: 10,
          background: "var(--color-accent)",
          color: "#fff",
          fontSize: 14,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        로그인
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 6,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "rgba(27,34,54,.3)",
          opacity: t < 650 ? 0 : tap < 0.3 ? tap / 0.3 : 1 - (tap - 0.3) / 0.7,
          transform: `translateX(-50%) scale(${0.5 + tap})`,
        }}
      />
    </div>
  );
}
