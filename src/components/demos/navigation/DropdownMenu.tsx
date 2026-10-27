"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { ACCENT, Browser, Cursor, INK, LINE, Logo, SOFT, SUB, Taps, pressed, track } from "./parts";

const ITEMS = ["주문 내역", "찜한 상품", "쿠폰함", "로그아웃"];
const PT = 27; // 목록 위쪽
const IH = 15;
const itemTop = (i: number) => PT + 3 + IH * i + (i === 3 ? 5 : 0);

// 4.6초: 오른쪽 위 '김효과 님 ▾' 클릭 → 작은 목록이 바로 아래로 → '찜한 상품' 클릭 → 닫히고 페이지 바뀜
export default function DropdownMenu() {
  const t = useLoop(4600);
  const open = t < 1850 ? ease(seg(t, 650, 830)) : 1 - ease(seg(t, 1850, 2000));
  const [x, y] = track(t, [
    [0, 120, 100],
    [550, 205, 12],
    [850, 205, 12],
    [1250, 190, itemTop(0) + 8],
    [1450, 190, itemTop(0) + 8],
    [1700, 190, itemTop(1) + 8],
    [2000, 190, itemTop(1) + 8],
    [2700, 120, 100],
  ]);
  const hover = open > 0.5 && t > 1200 ? (y < itemTop(1) ? 0 : y < itemTop(2) ? 1 : y < itemTop(3) ? 2 : 3) : -1;
  const wish = t >= 1950 && t < 4250;
  const f = wish ? seg(t, 1950, 2200) : t >= 4250 ? seg(t, 4250, 4500) : 1;

  return (
    <Browser url={wish ? "hyogwa.shop/my/wish" : "hyogwa.shop"}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 24, borderBottom: `1px solid ${LINE}` }}>
        <Logo />
        {["홈", "상품", "이벤트"].map((m, i) => (
          <span key={m} style={{ position: "absolute", left: 66 + i * 30, lineHeight: "24px", fontWeight: 600, color: SUB }}>
            {m}
          </span>
        ))}
        <span
          style={{
            position: "absolute",
            right: 8,
            top: 5,
            height: 15,
            lineHeight: "15px",
            padding: "0 6px",
            borderRadius: 8,
            background: open > 0.3 ? SOFT : "transparent",
            fontWeight: 700,
            fontSize: 8.5,
          }}
        >
          김효과 님 <span style={{ fontSize: 6.5, display: "inline-block", transform: `rotate(${open * 180}deg)` }}>▾</span>
        </span>
      </div>
      <div style={{ position: "absolute", left: 10, right: 10, top: 32, opacity: f }}>
        {wish ? (
          <>
            <div style={{ fontSize: 11, fontWeight: 800, marginBottom: 6 }}>찜한 상품 ♡ 3</div>
            {["니트 가디건 ₩39,000", "울 코트 ₩89,000", "러닝화 ₩69,000"].map((s) => (
              <div key={s} style={{ fontSize: 8.5, padding: "5px 0", borderBottom: `1px solid ${LINE}` }}>
                {s}
              </div>
            ))}
          </>
        ) : (
          <>
            <div style={{ fontSize: 11, fontWeight: 800, marginBottom: 6 }}>오늘의 추천</div>
            <div style={{ display: "flex", gap: 6 }}>
              {["니트", "셔츠", "코트"].map((s) => (
                <div key={s} style={{ flex: 1 }}>
                  <div style={{ height: 46, borderRadius: 6, background: SOFT }} />
                  <div style={{ fontSize: 8, marginTop: 3, color: SUB }}>{s}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          right: 8,
          top: PT,
          width: 76,
          padding: "3px 0",
          background: "#fff",
          borderRadius: 7,
          border: `1px solid ${LINE}`,
          boxShadow: "0 6px 14px rgba(27,34,54,.14)",
          opacity: open,
          transform: `translateY(${(1 - open) * -5}px)`,
          transformOrigin: "top",
          zIndex: 5,
        }}
      >
        {ITEMS.map((s, i) => (
          <div
            key={s}
            style={{
              height: IH,
              lineHeight: `${IH}px`,
              padding: "0 8px",
              fontSize: 8.5,
              fontWeight: 600,
              marginTop: i === 3 ? 5 : 0,
              borderTop: i === 3 ? `1px solid ${LINE}` : "none",
              background: hover === i ? SOFT : "transparent",
              color: i === 3 ? SUB : hover === i ? ACCENT : INK,
            }}
          >
            {s}
          </div>
        ))}
      </div>
      <Taps
        t={t}
        list={[
          [600, 205, 12],
          [1800, 190, itemTop(1) + 8],
        ]}
        size={16}
      />
      <Cursor x={x} y={y} down={pressed(t, [600, 1800])} />
    </Browser>
  );
}
