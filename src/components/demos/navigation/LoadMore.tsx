"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { ACCENT, INK, LINE, Phone, SUB, Tap } from "./parts";

const NEWS = ["가을 신상 입고 안내", "주말 특가 미리 보기", "앱 새 버전 소식", "추석 배송 일정", "포인트 2배 적립", "리뷰 쓰고 쿠폰 받기"];
const TOP = 30;
const RH = 17;

// 4.2초: 3개만 보이다가 '더보기'를 누르면 아래에 3개가 차례로 이어 붙고 버튼이 밀려 내려감
export default function LoadMore() {
  const t = useLoop(4200);
  const grow = t < 3500 ? ease(seg(t, 1000, 1450)) : 1 - ease(seg(t, 3500, 3900));
  const n = 3 + 3 * grow;
  const btnY = TOP + RH * n + 5;
  const shown = t >= 1000 && t < 3500 ? 6 : 3;

  return (
    <Phone>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 26, borderBottom: `1px solid ${LINE}`, padding: "0 10px", lineHeight: "26px", fontSize: 10, fontWeight: 800 }}>
        새 소식
      </div>
      {NEWS.map((s, i) => {
        const o = i < 3 ? 1 : t < 3500 ? seg(t, 1050 + (i - 3) * 90, 1300 + (i - 3) * 90) : 1 - seg(t, 3500, 3750);
        return (
          <div
            key={s}
            style={{
              position: "absolute",
              left: 10,
              right: 10,
              top: TOP + RH * i,
              height: RH,
              lineHeight: `${RH}px`,
              fontSize: 8,
              color: INK,
              borderBottom: `1px solid ${LINE}`,
              opacity: o,
              transform: `translateY(${(1 - o) * 6}px)`,
            }}
          >
            <span style={{ color: i < 3 ? SUB : ACCENT, fontWeight: 800, marginRight: 4 }}>{i + 1}</span>
            {s}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 14,
          right: 14,
          top: btnY,
          height: 20,
          borderRadius: 7,
          border: `1px solid ${LINE}`,
          textAlign: "center",
          lineHeight: "18px",
          fontSize: 8.5,
          fontWeight: 700,
          color: INK,
          background: "#fff",
        }}
      >
        더보기 <span style={{ color: SUB, fontWeight: 600 }}>{shown}/12</span> ∨
      </div>
      <Tap x={56} y={TOP + RH * 3 + 15} t={t} at={850} />
    </Phone>
  );
}
