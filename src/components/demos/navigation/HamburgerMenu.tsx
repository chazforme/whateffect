"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { ACCENT, INK, LINE, Phone, SOFT, SUB, Tap } from "./parts";

const MENU = ["홈", "상품", "이벤트", "고객센터", "마이페이지"];

// 4초: ☰ 탭 → X로 바뀌며 메뉴가 아래로 펼쳐짐 → 유지 → X 탭 → 닫힘
export default function HamburgerMenu() {
  const t = useLoop(4000);
  const open = t < 2800 ? ease(seg(t, 600, 1000)) : 1 - ease(seg(t, 2800, 3200));

  const bar = (dy: number, rot: number, o = 1) => ({
    position: "absolute" as const,
    left: 0,
    top: 5 + dy,
    width: 14,
    height: 2,
    borderRadius: 1,
    background: INK,
    opacity: o,
    transform: `translateY(${-dy * open}px) rotate(${rot * open}deg)`,
  });

  return (
    <Phone>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 28, borderBottom: `1px solid ${LINE}`, zIndex: 3, background: "#fff" }}>
        <span style={{ position: "absolute", left: 10, lineHeight: "28px", fontSize: 10, fontWeight: 800, color: ACCENT }}>효과몰</span>
        <div style={{ position: "absolute", right: 10, top: 9, width: 14, height: 12 }}>
          <i style={bar(-5, 45)} />
          <i style={bar(0, 0, 1 - open)} />
          <i style={bar(5, -45)} />
        </div>
      </div>
      <div style={{ position: "absolute", left: 9, right: 9, top: 36 }}>
        <div style={{ height: 50, borderRadius: 8, background: "#DCE3F6", padding: 7, fontSize: 9.5, fontWeight: 800 }}>
          가을 세일
          <div style={{ fontSize: 7.5, fontWeight: 600, color: SUB, marginTop: 2 }}>최대 30% 할인</div>
        </div>
        {["오늘의 특가", "베스트 상품", "신상품"].map((s) => (
          <div key={s} style={{ height: 18, borderRadius: 5, background: SOFT, marginTop: 6, fontSize: 7.5, padding: "0 6px", lineHeight: "18px", color: SUB }}>
            {s}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 28,
          bottom: 0,
          background: "#fff",
          zIndex: 2,
          clipPath: `inset(0 0 ${(1 - open) * 100}% 0)`,
          padding: "4px 12px",
        }}
      >
        {MENU.map((m, i) => {
          const o = t < 2800 ? seg(t, 750 + i * 60, 1000 + i * 60) : 1 - seg(t, 2800, 3050);
          return (
            <div
              key={m}
              style={{
                height: 24,
                lineHeight: "24px",
                fontSize: 10.5,
                fontWeight: 700,
                borderBottom: `1px solid ${LINE}`,
                opacity: o,
                transform: `translateY(${(1 - o) * -6}px)`,
              }}
            >
              {m}
              <span style={{ float: "right", color: "#B5BAC6", fontWeight: 600 }}>›</span>
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none" }}>
        <Tap x={95} y={14} t={t} at={500} />
        <Tap x={95} y={14} t={t} at={2700} />
      </div>
    </Phone>
  );
}
