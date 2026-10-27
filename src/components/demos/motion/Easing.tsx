"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";

const inOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const TRACK = 150;

function Row({ label, sub, p, accent }: { label: string; sub: string; p: number; accent: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 82, textAlign: "right" }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: accent ? "var(--color-accent)" : "var(--color-ink)" }}>
          {label}
        </div>
        <div style={{ fontSize: 10.5, color: "#6B7180", whiteSpace: "nowrap" }}>{sub}</div>
      </div>
      <div style={{ position: "relative", width: TRACK + 28, height: 28 }}>
        <div
          style={{ position: "absolute", left: 0, right: 0, top: 13, height: 2, borderRadius: 1, background: "#E3E6EE" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: p * TRACK,
            width: 28,
            height: 28,
            borderRadius: 9,
            background: accent ? "var(--color-accent)" : "#fff",
            boxShadow: "0 2px 6px rgba(27,34,54,.12)",
            fontSize: 15,
            lineHeight: "28px",
            textAlign: "center",
          }}
        >
          🛵
        </div>
      </div>
    </div>
  );
}

// 3.6초 주기: 같은 시간에 같은 거리를 가지만, 위는 일정한 속도 / 아래는 천천히 출발→빨리→천천히 멈춤
export default function Easing() {
  const t = useLoop(3600);
  const go = seg(t, 200, 1600);
  const back = seg(t, 2000, 3400);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Row label="일정한 속도" sub="기계처럼 딱딱" p={go - back} accent={false} />
      <Row label="이징" sub="부드럽게 출발·멈춤" p={inOut(go) - inOut(back)} accent />
    </div>
  );
}
