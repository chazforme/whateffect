"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { ACCENT, Finger, INK, Phone, SOFT, SUB } from "./kit";

const NEWS = [
  ["📦", "택배가 문 앞에 도착했어요"],
  ["💳", "카드 결제 ₩12,900"],
  ["🎟️", "쿠폰이 곧 사라져요"],
  ["⭐", "리뷰를 남겨 주세요"],
  ["🚚", "주문하신 상품 출발"],
];

function Row({ e, txt, hi = 0 }: { e: string; txt: string; hi?: number }) {
  return (
    <div
      style={{
        height: 28,
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "0 9px",
        borderBottom: `1px solid ${SOFT}`,
        background: `rgba(58,91,239,${0.14 * hi})`,
        fontSize: 8,
        fontWeight: 600,
        color: INK,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: 10 }}>{e}</span>
      {txt}
    </div>
  );
}

// 맨 위에서 손가락으로 끌어내림 → 동그란 화살표가 돌며 새로고침 → 새 알림이 맨 위에 생김
export default function PullToRefresh() {
  const t = useLoop(4000);
  const pull = ease(seg(t, 400, 1300)); // 끌어내린 정도
  let d = pull * 38;
  if (t > 1300) d = 38 - 8 * ease(seg(t, 1300, 1450));
  if (t > 2200) d = 30 * (1 - ease(seg(t, 2200, 2500)));
  const spinning = t > 1300 && t < 2300;
  const rot = spinning ? (t - 1300) * 0.6 + 38 * 7 : d * 7;
  const iconO = t < 2200 ? seg(d, 4, 24) : 1 - seg(t, 2200, 2400);
  const newH = t > 2200 ? ease(seg(t, 2200, 2500)) * 28 : 0;
  const hi = 1 - seg(t, 2900, 3500);
  const fade = seg(t, 0, 200) * (1 - seg(t, 3750, 3980));

  const fy = 40 + pull * 60;
  const fo = seg(t, 200, 400) * (1 - seg(t, 1300, 1500));

  return (
    <Phone>
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 22,
            padding: "6px 9px",
            fontSize: 9.5,
            fontWeight: 800,
            color: INK,
            background: "#fff",
            zIndex: 5,
          }}
        >
          알림
        </div>
        <div
          style={{
            position: "absolute",
            top: 22 + d / 2 - 9,
            left: "50%",
            marginLeft: -9,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 2px 6px rgba(27,34,54,.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: iconO,
          }}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" style={{ transform: `rotate(${rot}deg)` }}>
            <path d="M10 6 A4 4 0 1 1 6 2" fill="none" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M5 0 L8 2 L5 4 Z" fill={ACCENT} />
          </svg>
        </div>
        <div
          style={{
            position: "absolute",
            top: 22,
            left: 0,
            right: 0,
            transform: `translateY(${d}px)`,
            background: "#fff",
          }}
        >
          <div style={{ height: newH, overflow: "hidden" }}>
            <Row e="🎉" txt="새 알림 · 이벤트 당첨!" hi={hi} />
          </div>
          {NEWS.map(([e, txt]) => (
            <Row key={txt} e={e} txt={txt} />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 6,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 7.5,
            color: SUB,
            background: "#fff",
            opacity: spinning ? 1 : 0,
          }}
        >
          새로고침 중…
        </div>
        <Finger x={56} y={fy} o={fo} />
      </div>
    </Phone>
  );
}
