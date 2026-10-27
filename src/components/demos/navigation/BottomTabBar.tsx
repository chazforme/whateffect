"use client";

import type { ReactNode } from "react";
import { useLoop } from "@/hooks/useLoop";
import { ACCENT, LINE, PALE, Phone, SOFT, SUB, Taps, fadeIn, stateAt } from "./parts";

const LABELS = ["홈", "검색", "찜", "마이"];
const ICONS: ((c: string) => ReactNode)[] = [
  (c) => <path d="M2 7 L7 2.5 L12 7 V12 H2 Z" fill="none" stroke={c} strokeWidth="1.6" strokeLinejoin="round" />,
  (c) => (
    <>
      <circle cx="6" cy="6" r="3.8" fill="none" stroke={c} strokeWidth="1.6" />
      <path d="M9 9 L12.3 12.3" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  (c) => (
    <path
      d="M7 12 C2 8.5 1.5 6 2.3 4.3 C3.2 2.5 5.6 2.3 7 4.4 C8.4 2.3 10.8 2.5 11.7 4.3 C12.5 6 12 8.5 7 12 Z"
      fill="none"
      stroke={c}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  (c) => (
    <>
      <circle cx="7" cy="4.8" r="2.6" fill="none" stroke={c} strokeWidth="1.6" />
      <path d="M2.2 12.5 C2.8 9.4 4.8 8.4 7 8.4 C9.2 8.4 11.2 9.4 11.8 12.5" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
];
const TW = 28;
const BAR_TOP = 132;
const TAPS: [number, number][] = [
  [600, 1],
  [1600, 2],
  [2600, 3],
  [3600, 0],
];

function Screen({ i }: { i: number }) {
  const row = (s: string, extra?: ReactNode) => (
    <div key={s} style={{ height: 18, borderRadius: 5, background: SOFT, marginTop: 5, fontSize: 7.5, padding: "0 6px", lineHeight: "18px", color: SUB }}>
      {extra}
      {s}
    </div>
  );
  if (i === 0)
    return (
      <>
        <div style={{ height: 44, borderRadius: 8, background: "#DCE3F6", padding: 7, fontSize: 9, fontWeight: 800 }}>오늘의 특가</div>
        {row("새로 나온 메뉴")}
        {row("내 주변 맛집")}
      </>
    );
  if (i === 1)
    return (
      <>
        <div style={{ height: 22, borderRadius: 11, border: `1.5px solid ${ACCENT}`, fontSize: 7.5, lineHeight: "19px", padding: "0 8px", color: SUB }}>
          무엇을 찾으세요?
        </div>
        <div style={{ fontSize: 7, fontWeight: 700, margin: "8px 0 0", color: SUB }}>인기 검색어</div>
        {row("1  떡볶이")}
        {row("2  치킨")}
      </>
    );
  if (i === 2)
    return (
      <>
        {["동네 분식집", "바삭 치킨", "엄마손 김밥"].map((s) => row(s, <span style={{ color: "#F0506E", marginRight: 4 }}>♥</span>))}
      </>
    );
  return (
    <div style={{ textAlign: "center", paddingTop: 6 }}>
      <i style={{ display: "inline-block", width: 30, height: 30, borderRadius: "50%", background: PALE }} />
      <div style={{ fontSize: 9.5, fontWeight: 800, marginTop: 4 }}>김효과 님</div>
      {row("주문 내역 12건")}
    </div>
  );
}

// 4.4초: 맨 아래 아이콘 메뉴를 엄지로 차례로 누르면 위쪽 화면이 통째로 바뀜
export default function BottomTabBar() {
  const t = useLoop(4400);
  const { v: act, at } = stateAt(t, 0, TAPS);
  const f = at < 0 ? 1 : fadeIn(t, at, 200);

  return (
    <Phone>
      <div style={{ position: "absolute", left: 10, top: 9, fontSize: 11, fontWeight: 800 }}>{LABELS[act]}</div>
      <div style={{ position: "absolute", left: 9, right: 9, top: 30, opacity: f }}>
        <Screen i={act} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: BAR_TOP, bottom: 0, borderTop: `1px solid ${LINE}`, background: "#fff" }}>
        {LABELS.map((s, i) => {
          const c = i === act ? ACCENT : "#A0A6B4";
          return (
            <div key={s} style={{ position: "absolute", left: TW * i, width: TW, top: 4, textAlign: "center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" style={{ display: "block", margin: "0 auto" }}>
                {ICONS[i](c)}
              </svg>
              <div style={{ fontSize: 6.5, fontWeight: 700, color: c, marginTop: 1 }}>{s}</div>
            </div>
          );
        })}
      </div>
      <Taps t={t} list={TAPS.map(([c, i]) => [c, TW * i + TW / 2, BAR_TOP + 13])} />
    </Phone>
  );
}
