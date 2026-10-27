"use client";

import { useLoop } from "@/hooks/useLoop";
import { clamp, seg } from "@/lib/loop";
import { Finger, INK, Phone, prog } from "./kit";

const CARDS = [
  { n: "STEP 1", t: "상담 신청", s: "전화 한 통이면 돼요", e: "📞", bg: "#DCE4FD" },
  { n: "STEP 2", t: "맞춤 견적", s: "집에 맞게 계산해요", e: "📐", bg: "#FDE2D8" },
  { n: "STEP 3", t: "시공 완료", s: "하루 만에 끝나요", e: "🏠", bg: "#DDF3E4" },
];
const HEAD = 24;
const CH = 104; // 카드 높이
const GAP = 112; // 카드 간격(원래 위치)
const PEEK = 7; // 쌓일 때 위 카드가 보이는 만큼
const MAX = GAP * (CARDS.length - 1) - PEEK * (CARDS.length - 1);

// 카드가 올라오다가 맨 위에 차곡차곡 붙고, 다음 카드가 그 위를 덮음
export default function StackingCards() {
  const t = useLoop(4000);
  const y = prog(t, 400, 2800) * MAX;
  const drag = seg(t, 400, 2800);
  const fo = seg(t, 250, 400) * (1 - seg(t, 2800, 3000));

  const natural = (i: number) => HEAD + 6 + i * GAP - y;
  const stick = (i: number) => HEAD + 6 + i * PEEK;

  return (
    <Phone bg="#F6F7FB">
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: HEAD, padding: "7px 9px", fontSize: 9.5, fontWeight: 800, color: INK }}>
        진행 순서
      </div>
      {CARDS.map((c, i) => {
        const top = Math.max(natural(i), stick(i));
        const next = i + 1 < CARDS.length ? clamp(1 - (natural(i + 1) - stick(i + 1)) / (GAP - PEEK)) : 0;
        return (
          <div
            key={c.t}
            style={{
              position: "absolute",
              left: 8,
              right: 8,
              top,
              height: CH,
              borderRadius: 12,
              background: c.bg,
              padding: 10,
              boxShadow: "0 -2px 8px rgba(27,34,54,.12)",
              transform: `scale(${1 - 0.07 * next})`,
              transformOrigin: "50% 0",
              filter: `brightness(${1 - 0.12 * next})`,
              zIndex: i + 1,
            }}
          >
            <div style={{ fontSize: 7, fontWeight: 800, color: "#6B7180", letterSpacing: ".05em" }}>{c.n}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: INK, marginTop: 2 }}>{c.t}</div>
            <div style={{ fontSize: 7.5, color: "#6B7180", marginTop: 2 }}>{c.s}</div>
            <div style={{ fontSize: 26, position: "absolute", right: 10, bottom: 8 }}>{c.e}</div>
          </div>
        );
      })}
      <Finger x={64} y={140 - drag * 80} o={fo} />
    </Phone>
  );
}
