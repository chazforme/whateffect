"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { Browser, INK, SUB, Wheel, prog, stage } from "./kit";

const BODY = 137;
const MAX = 90;

// 같은 휠 한 번에 먼 산은 조금, 가까운 산은 많이, 아래 글은 그대로(1배) 움직임
export default function Parallax() {
  const t = useLoop(4000);
  const y = prog(t) * MAX;
  const on = t < 3350 ? seg(t, 300, 400) * (1 - seg(t, 2500, 2650)) : seg(t, 3350, 3450) * (1 - seg(t, 3750, 3850));
  const layer = (speed: number) => ({ transform: `translateY(${-y * speed}px)` });

  return (
    <div style={stage}>
      <Browser url="travel.co.kr">
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(#C9D6FB,#FDE2D8)" }} />
        <div
          style={{
            position: "absolute",
            left: 190,
            top: 8,
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "#FFD27A",
            ...layer(0.1),
          }}
        />
        <svg width="236" height={BODY} viewBox={`0 0 236 ${BODY}`} style={{ position: "absolute", top: 0, left: 0, ...layer(0.3) }}>
          <path d="M0 92 L40 58 L78 84 L122 44 L170 80 L206 56 L236 74 L236 137 L0 137 Z" fill="#9DB0F0" />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: 1 - seg(y, 30, 80),
            ...layer(0.5),
          }}
        >
          <div style={{ fontSize: 8, fontWeight: 700, color: "#4A5A9C" }}>2026 SUMMER</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>여름 휴가 기획전</div>
        </div>
        <svg width="236" height={BODY} viewBox={`0 0 236 ${BODY}`} style={{ position: "absolute", top: 0, left: 0, ...layer(0.75) }}>
          <path d="M0 112 L52 82 L96 106 L150 76 L200 104 L236 90 L236 137 L0 137 Z" fill="#5F7BE6" />
        </svg>
        <div style={{ position: "absolute", top: BODY - 6, left: 0, right: 0, background: "#fff", borderRadius: "10px 10px 0 0", ...layer(1) }}>
          <div style={{ padding: "8px 12px" }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: INK, marginBottom: 6 }}>추천 여행지</div>
            {["🏝️ 제주 3박 4일 · ₩389,000", "⛰️ 강원 숲속 캠핑 · ₩129,000", "🌊 부산 바다 호텔 · ₩159,000"].map((s) => (
              <div key={s} style={{ fontSize: 8, color: SUB, marginBottom: 5 }}>
                {s}
              </div>
            ))}
            <div style={{ fontSize: 7, color: SUB }}>여행 상품 더 보기 →</div>
          </div>
        </div>
      </Browser>
      <Wheel t={t} on={on} dir={t < 3350 ? 1 : -1} />
    </div>
  );
}
