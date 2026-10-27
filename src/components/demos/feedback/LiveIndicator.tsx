"use client";

import { useLoop } from "@/hooks/useLoop";
import { rand, seg } from "@/lib/loop";

const STEP = 800; // 0.8초마다 숫자 갱신
const PERIOD = 4800; // 숨쉬기(1.2초)와 갱신(0.8초)이 맞물리는 주기
const comma = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const VALUES = Array.from({ length: PERIOD / STEP }, (_, i) => 1284 + Math.round((rand(i + 7) - 0.5) * 40));

// 계속 흐름: 빨간 점이 숨쉬듯 깜빡이고 물결이 퍼지며, 접속자 수가 계속 바뀜
export default function LiveIndicator() {
  const t = useLoop(PERIOD);
  const breath = (t % 1200) / 1200;
  const dotO = 0.45 + 0.55 * (0.5 + 0.5 * Math.cos(breath * Math.PI * 2));
  const i = Math.floor(t / STEP);
  const fresh = 1 - seg(t % STEP, 0, 250);

  return (
    <div
      style={{
        width: 250,
        background: "#fff",
        borderRadius: 14,
        padding: "14px 16px",
        boxShadow: "0 2px 8px rgba(27,34,54,.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "#6B7180", fontWeight: 600 }}>실시간 접속자</span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            background: "#FDE8E8",
            color: "#E5383B",
            fontSize: 10.5,
            fontWeight: 900,
            letterSpacing: ".04em",
            padding: "3px 8px",
            borderRadius: 10,
          }}
        >
          <span style={{ position: "relative", width: 7, height: 7 }}>
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "#E5383B",
                opacity: 0.5 * (1 - breath),
                transform: `scale(${1 + breath * 1.8})`,
              }}
            />
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#E5383B", opacity: dotO }} />
          </span>
          LIVE
        </span>
      </div>
      <div
        style={{
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: "-.02em",
          margin: "6px 0 4px",
          color: fresh > 0.3 ? "var(--color-accent)" : "var(--color-ink)",
        }}
      >
        {comma(VALUES[i])}
        <span style={{ fontSize: 15, fontWeight: 700, marginLeft: 3, color: "var(--color-ink)" }}>명</span>
      </div>
      <div style={{ fontSize: 10.5, color: "#6B7180" }}>방금 전 업데이트 · 1초마다 새로 받아와요</div>
    </div>
  );
}
