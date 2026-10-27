"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { ACCENT, Browser, Cursor, INK, LINE, Logo, PALE, SUB, Taps, fadeIn, io, pressed, stateAt, track } from "./parts";

const ITEMS = ["공지사항", "자주 묻는 질문", "1:1 문의", "배송 안내"];
const ROWS = [
  ["추석 연휴 배송 안내", "개인정보 처리방침 변경", "앱 새 버전 소식"],
  ["Q. 배송은 며칠 걸려요?", "Q. 교환은 어떻게 해요?", "Q. 쿠폰은 어디서 받아요?"],
  ["문의 남기기", "내 문의 내역", "답변 완료 2건"],
  ["오늘 주문하면 내일 도착", "3만 원 이상 무료 배송", "제주·도서 +3,000원"],
];
const TOP = 44;
const H = 18;
const cy = (i: number) => TOP + H * i + H / 2;
const CLICKS: [number, number][] = [
  [800, 1],
  [1900, 2],
  [3000, 3],
  [4200, 0],
];

// 4.8초: 고객센터 안의 작은 메뉴를 왼쪽 세로줄에서 하나씩 고르면 오른쪽 내용이 바뀜
export default function LocalNavigationBar() {
  const t = useLoop(4800);
  const { v: act, at } = stateAt(t, 0, CLICKS);
  const prev = stateAt(at - 1, 0, CLICKS).v;
  const p = io(seg(t, at, at + 260));
  const hy = TOP + H * (prev + (act - prev) * p);
  const f = at < 0 ? 1 : fadeIn(t, at);
  const [x, y] = track(t, [
    [0, 38, cy(0)],
    [650, 38, cy(1)],
    [1000, 38, cy(1)],
    [1750, 38, cy(2)],
    [2100, 38, cy(2)],
    [2850, 38, cy(3)],
    [3300, 38, cy(3)],
    [4050, 38, cy(0)],
  ]);

  return (
    <Browser url="hyogwa.shop/help">
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 22, borderBottom: `1px solid ${LINE}` }}>
        <Logo h={22} />
        {["홈", "상품", "이벤트", "고객센터"].map((m, i) => (
          <span
            key={m}
            style={{
              position: "absolute",
              left: 70 + i * 40,
              lineHeight: "22px",
              fontSize: 8.5,
              fontWeight: i === 3 ? 800 : 600,
              color: i === 3 ? ACCENT : SUB,
            }}
          >
            {m}
          </span>
        ))}
      </div>
      <div style={{ position: "absolute", left: 0, top: 23, bottom: 0, width: 76, background: "#F6F7FB", borderRight: `1px solid ${LINE}` }}>
        <div style={{ padding: "5px 9px 0", fontSize: 9.5, fontWeight: 800 }}>고객센터</div>
      </div>
      <div style={{ position: "absolute", left: 0, width: 76, top: hy, height: H, background: PALE }}>
        <i style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2.5, background: ACCENT }} />
      </div>
      {ITEMS.map((s, i) => (
        <span
          key={s}
          style={{
            position: "absolute",
            left: 9,
            top: TOP + H * i,
            lineHeight: `${H}px`,
            fontSize: 8.5,
            fontWeight: i === act ? 800 : 500,
            color: i === act ? ACCENT : SUB,
          }}
        >
          {s}
        </span>
      ))}
      <div style={{ position: "absolute", left: 88, right: 10, top: 32, opacity: f, transform: `translateY(${(1 - f) * 5}px)` }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: INK, marginBottom: 6 }}>{ITEMS[act]}</div>
        {ROWS[act].map((r) => (
          <div key={r} style={{ fontSize: 8, padding: "5px 0", borderBottom: `1px solid ${LINE}`, color: INK }}>
            {r}
          </div>
        ))}
      </div>
      <Taps t={t} list={CLICKS.map(([c, i]) => [c, 38, cy(i)])} size={18} />
      <Cursor x={x} y={y} down={pressed(t, CLICKS.map((c) => c[0]))} />
    </Browser>
  );
}
