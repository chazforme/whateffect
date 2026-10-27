"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { ACCENT, Browser, INK, LINE, Logo, PALE, SOFT, SUB } from "./parts";

const ALL = ["주문 내역 보기", "결제 수단 변경", "알림 설정", "로그아웃"];
const HIT = ["결제 내역 보기", "결제 수단 변경"];
const TYPED = ["", "겨", "결", "결제"];

function Key({ k, on }: { k: string; on: boolean }) {
  return (
    <span
      style={{
        display: "inline-block",
        minWidth: 18,
        padding: "0 5px",
        height: 16,
        lineHeight: "15px",
        borderRadius: 4,
        border: `1px solid ${on ? ACCENT : "#C9CDD8"}`,
        borderBottomWidth: on ? 1 : 2.5,
        background: on ? PALE : "#fff",
        color: on ? ACCENT : INK,
        fontSize: 7.5,
        fontWeight: 800,
        textAlign: "center",
        transform: `translateY(${on ? 1.5 : 0}px)`,
      }}
    >
      {k}
    </span>
  );
}

// 4.4초: Ctrl+K → 가운데 검색창이 뜸 → '결제' 입력하면 메뉴가 걸러짐 → ↓ 로 고르고 Enter → 그 화면으로
export default function CommandPalette() {
  const t = useLoop(4400);
  const open = t < 2500 ? ease(seg(t, 650, 850)) : 1 - ease(seg(t, 2500, 2650));
  const typed = TYPED[t < 1050 ? 0 : t < 1200 ? 1 : t < 1350 ? 2 : 3];
  const list = typed.length ? HIT : ALL;
  const pickIdx = t >= 1900 ? 1 : 0;
  const done = t >= 2600 && t < 4000;
  const doneF = done ? seg(t, 2600, 2850) : 0;
  const keys: [string[], number, number][] = [
    [["Ctrl", "K"], 250, 900],
    [["↓"], 1750, 2050],
    [["Enter"], 2300, 2600],
  ];

  return (
    <Browser url={done ? "hyogwa.shop/my/payment" : "hyogwa.shop/admin"}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 22, borderBottom: `1px solid ${LINE}` }}>
        <Logo h={22} />
        <span style={{ position: "absolute", left: 60, lineHeight: "22px", fontSize: 8, color: SUB }}>관리자 · 메뉴 38개</span>
      </div>
      <div style={{ position: "absolute", left: 10, right: 10, top: 30 }}>
        {done ? (
          <div style={{ opacity: doneF }}>
            <div style={{ fontSize: 11, fontWeight: 800 }}>결제 수단 변경</div>
            <div style={{ marginTop: 6, height: 26, borderRadius: 6, background: PALE, padding: "0 9px", lineHeight: "26px", fontSize: 8.5, fontWeight: 700 }}>
              ✓ 카드 1234 · 기본 결제
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["주문", "상품", "회원", "쿠폰", "통계", "설정"].map((s) => (
              <div key={s} style={{ width: 70, height: 26, borderRadius: 6, background: SOFT, fontSize: 8, color: SUB, padding: 5 }}>
                {s}
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(15,20,35,.4)", opacity: open }} />
      <div
        style={{
          position: "absolute",
          left: 33,
          top: 8,
          width: 180,
          background: "#fff",
          borderRadius: 9,
          boxShadow: "0 10px 24px rgba(15,20,35,.3)",
          opacity: open,
          transform: `translateY(${(1 - open) * -6}px) scale(${0.96 + 0.04 * open})`,
          overflow: "hidden",
        }}
      >
        <div style={{ height: 24, display: "flex", alignItems: "center", gap: 5, padding: "0 9px", borderBottom: `1px solid ${LINE}` }}>
          <svg width="9" height="9" viewBox="0 0 14 14">
            <circle cx="6" cy="6" r="4" fill="none" stroke={SUB} strokeWidth="1.8" />
            <path d="M9 9 L12.5 12.5" stroke={SUB} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 9, fontWeight: 700, color: typed ? INK : "#A0A6B4" }}>{typed || "무엇을 할까요?"}</span>
          <i style={{ width: 1.5, height: 10, background: ACCENT, opacity: Math.floor(t / 400) % 2 ? 0 : 1, marginLeft: -3 }} />
        </div>
        <div style={{ padding: 3 }}>
          {list.map((s, i) => {
            const on = i === (typed.length ? pickIdx : 0);
            return (
              <div
                key={s}
                style={{
                  height: 16,
                  lineHeight: "16px",
                  padding: "0 7px",
                  borderRadius: 5,
                  fontSize: 8.5,
                  fontWeight: 600,
                  background: on ? PALE : "transparent",
                  color: INK,
                }}
              >
                {typed.length === 2 ? (
                  <>
                    <b style={{ color: ACCENT, fontWeight: 800 }}>결제</b>
                    {s.slice(2)}
                  </>
                ) : (
                  s
                )}
                {on && <span style={{ float: "right", fontSize: 7, color: SUB }}>↵</span>}
              </div>
            );
          })}
        </div>
      </div>
      {keys.map(([ks, a, b]) => {
        const o = seg(t, a, a + 120) * (1 - seg(t, b - 150, b));
        if (o <= 0) return null;
        const on = t > a + 200 && t < b - 120;
        return (
          <div key={ks.join()} style={{ position: "absolute", left: 0, right: 0, bottom: 8, textAlign: "center", opacity: o, zIndex: 8 }}>
            {ks.map((k, i) => (
              <span key={k}>
                {i > 0 && <span style={{ color: "#fff", fontSize: 8, fontWeight: 800, margin: "0 3px" }}>+</span>}
                <Key k={k} on={on} />
              </span>
            ))}
          </div>
        );
      })}
    </Browser>
  );
}
