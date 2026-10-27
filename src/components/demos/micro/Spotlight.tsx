"use client";

import { useLoop } from "@/hooks/useLoop";

const P = 4200;

// 계속 흐르는 루프: 어두운 카드 위를 커서가 돌아다니면 커서 자리만 손전등처럼 밝아짐
export default function Spotlight() {
  const t = useLoop(P);
  const a = (t / P) * Math.PI * 2;
  const cx = 120 + 88 * Math.sin(a);
  const cy = 72 + 42 * Math.sin(2 * a + 0.6);

  return (
    <div style={{ position: "relative", width: 280, height: 170 }}>
      <div
        style={{
          position: "absolute",
          left: 20,
          top: 13,
          width: 240,
          height: 144,
          borderRadius: 16,
          overflow: "hidden",
          background: "#1B2236",
          boxShadow: "0 6px 16px rgba(27,34,54,.25)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle 85px at ${cx}px ${cy}px, rgba(130,155,255,.55), rgba(58,91,239,.18) 55%, rgba(58,91,239,0) 100%)`,
          }}
        />
        <div style={{ position: "absolute", left: 20, top: 26 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".18em", color: "#8E98C2" }}>MEMBERSHIP</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginTop: 6 }}>프리미엄 멤버십</div>
          <div style={{ fontSize: 12, color: "#B4BCDB", marginTop: 8 }}>월 4,900원 · 무료 배송 무제한</div>
          <div
            style={{
              display: "inline-block",
              marginTop: 14,
              padding: "6px 12px",
              borderRadius: 8,
              background: "rgba(255,255,255,.12)",
              border: "1px solid rgba(255,255,255,.2)",
              color: "#fff",
              fontSize: 11.5,
              fontWeight: 700,
            }}
          >
            시작하기
          </div>
        </div>
      </div>
      <svg width="16" height="20" viewBox="0 0 16 20" style={{ position: "absolute", left: 20 + cx - 1, top: 13 + cy - 1 }}>
        <path d="M1 1 L1 16 L5 12 L8 19 L11 18 L8 11 L14 11 Z" fill="#fff" stroke="#1B2236" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
