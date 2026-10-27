"use client";

import { useLoop } from "@/hooks/useLoop";
import { io, ACCENT, Browser, Cursor, LINE, Logo, SOFT, SUB, Taps, fadeIn, pressed, stateAt, track } from "./parts";
import { seg } from "@/lib/loop";

const MENU = ["홈", "상품", "이벤트", "고객센터"];
const L = [64, 90, 124, 166];
const W = [22, 30, 36, 46];
const cx = (i: number) => L[i] + W[i] / 2;
const URL = ["hyogwa.shop", "hyogwa.shop/products", "hyogwa.shop/event"];
const CLICKS: [number, number][] = [
  [700, 1],
  [2100, 2],
  [3500, 0],
];

function Body({ page }: { page: number }) {
  if (page === 0)
    return (
      <>
        <div style={{ height: 40, borderRadius: 7, background: "#DCE3F6", padding: "8px 10px", fontWeight: 800, fontSize: 11 }}>
          가을 신상 최대 30%
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          {["오늘의 특가", "베스트", "신상품"].map((s) => (
            <div key={s} style={{ flex: 1, height: 36, borderRadius: 6, background: SOFT, padding: 5, fontSize: 8, color: SUB }}>
              {s}
            </div>
          ))}
        </div>
      </>
    );
  if (page === 1)
    return (
      <>
        <div style={{ fontWeight: 800, fontSize: 11, marginBottom: 6 }}>전체 상품</div>
        <div style={{ display: "flex", gap: 6 }}>
          {[
            ["니트", "₩39,000"],
            ["셔츠", "₩29,000"],
            ["코트", "₩89,000"],
          ].map(([n, p]) => (
            <div key={n} style={{ flex: 1 }}>
              <div style={{ height: 40, borderRadius: 6, background: SOFT }} />
              <div style={{ fontSize: 8, marginTop: 3 }}>{n}</div>
              <div style={{ fontSize: 8, fontWeight: 800 }}>{p}</div>
            </div>
          ))}
        </div>
      </>
    );
  return (
    <>
      <div style={{ fontWeight: 800, fontSize: 11, marginBottom: 6 }}>진행 중인 이벤트</div>
      {["첫 구매 5,000원 쿠폰", "친구 초대하면 둘 다 적립"].map((s, i) => (
        <div
          key={s}
          style={{
            height: 26,
            borderRadius: 6,
            background: i ? "#FCE8D8" : "#DDF3E6",
            marginBottom: 6,
            padding: "0 9px",
            lineHeight: "26px",
            fontWeight: 700,
            fontSize: 9,
          }}
        >
          {s}
        </div>
      ))}
    </>
  );
}

// 4.8초: 커서가 맨 위 메뉴를 눌러 다니면 아래 내용만 바뀌고 메뉴줄은 그대로
export default function GlobalNavigationBar() {
  const t = useLoop(4800);
  const { v: page, at } = stateAt(t, 0, CLICKS);
  const prev = stateAt(at - 1, 0, CLICKS).v;
  const p = io(seg(t, at, at + 300));
  const ux = cx(prev) + (cx(page) - cx(prev)) * p;
  const uw = W[prev] + (W[page] - W[prev]) * p;
  const [x, y] = track(t, [
    [0, 150, 100],
    [600, cx(1), 15],
    [900, cx(1), 15],
    [1950, cx(2), 15],
    [2400, cx(2), 15],
    [3350, cx(0), 15],
    [3800, cx(0), 15],
    [4650, 150, 100],
  ]);
  const f = fadeIn(t, at);

  return (
    <Browser url={URL[page]}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 26, borderBottom: `1px solid ${LINE}` }}>
        <Logo y={1} />
        {MENU.map((m, i) => (
          <span
            key={m}
            style={{
              position: "absolute",
              left: L[i],
              width: W[i],
              top: 0,
              lineHeight: "26px",
              textAlign: "center",
              fontWeight: i === page ? 800 : 600,
              color: i === page ? ACCENT : SUB,
            }}
          >
            {m}
          </span>
        ))}
        <span style={{ position: "absolute", left: ux - uw / 2, width: uw, bottom: -1, height: 2, background: ACCENT, borderRadius: 1 }} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 10,
          right: 10,
          top: 34,
          opacity: at < 0 ? 1 : f,
          transform: `translateY(${at < 0 ? 0 : (1 - f) * 6}px)`,
        }}
      >
        <Body page={page} />
      </div>
      <Taps t={t} list={CLICKS.map(([c, i]) => [c, cx(i), 14])} size={18} />
      <Cursor x={x} y={y} down={pressed(t, CLICKS.map((c) => c[0]))} />
    </Browser>
  );
}
