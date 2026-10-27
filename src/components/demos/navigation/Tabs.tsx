"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { ACCENT, Cursor, INK, LINE, SOFT, SUB, Taps, card, fadeIn, io, pressed, stateAt, track } from "./parts";

const TABS = ["상품정보", "리뷰 128", "문의 4"];
const TW = 80;
const TY = 44; // 탭 줄 위쪽
const cx = (i: number) => TW * i + TW / 2;
const CLICKS: [number, number][] = [
  [800, 1],
  [2000, 2],
  [3200, 0],
];

function Panel({ i }: { i: number }) {
  if (i === 0)
    return (
      <>
        {["· 무게 230g, 아주 가벼워요", "· 푹신한 쿠션 밑창", "· 사이즈 230~290"].map((s) => (
          <div key={s} style={{ fontSize: 9, lineHeight: "17px" }}>
            {s}
          </div>
        ))}
      </>
    );
  if (i === 1)
    return (
      <>
        <div style={{ fontSize: 10, fontWeight: 800, color: "#F5A524", marginBottom: 3 }}>
          ★★★★★ <span style={{ color: INK }}>4.8</span>
        </div>
        {["“가볍고 발이 편해요”", "“사이즈 딱 맞아요”"].map((s) => (
          <div key={s} style={{ fontSize: 9, lineHeight: "17px", color: SUB }}>
            {s}
          </div>
        ))}
      </>
    );
  return (
    <>
      <div style={{ fontSize: 9, lineHeight: "17px", fontWeight: 700 }}>Q. 발볼 넓은 편인가요?</div>
      <div style={{ fontSize: 9, lineHeight: "17px", color: ACCENT }}>A. 보통 너비예요</div>
      <div style={{ fontSize: 9, lineHeight: "17px", fontWeight: 700 }}>Q. 언제 도착해요?</div>
    </>
  );
}

// 4.4초: 제목 줄의 탭을 누를 때마다 밑줄이 옆으로 미끄러지고 아래 내용이 그 자리에서 바뀜
export default function Tabs() {
  const t = useLoop(4400);
  const { v: act, at } = stateAt(t, 0, CLICKS);
  const prev = stateAt(at - 1, 0, CLICKS).v;
  const ux = TW * (prev + (act - prev) * io(seg(t, at, at + 280)));
  const f = at < 0 ? 1 : fadeIn(t, at, 220);
  const [x, y] = track(t, [
    [0, 150, 130],
    [650, cx(1), TY + 12],
    [1000, cx(1), TY + 12],
    [1850, cx(2), TY + 12],
    [2200, cx(2), TY + 12],
    [3050, cx(0), TY + 12],
    [3400, cx(0), TY + 12],
    [4300, 150, 130],
  ]);

  return (
    <div style={{ ...card, width: 240, height: 150 }}>
      <div style={{ display: "flex", gap: 8, padding: "9px 12px", alignItems: "center" }}>
        <i style={{ width: 26, height: 26, borderRadius: 6, background: SOFT }} />
        <div>
          <div style={{ fontSize: 10, fontWeight: 800 }}>가벼운 러닝화</div>
          <div style={{ fontSize: 9, fontWeight: 700, color: ACCENT }}>₩89,000</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: TY, height: 24, borderBottom: `1px solid ${LINE}` }}>
        {TABS.map((s, i) => (
          <span
            key={s}
            style={{
              position: "absolute",
              left: TW * i,
              width: TW,
              lineHeight: "24px",
              textAlign: "center",
              fontSize: 9.5,
              fontWeight: i === act ? 800 : 600,
              color: i === act ? INK : "#9AA0AE",
            }}
          >
            {s}
          </span>
        ))}
        <span style={{ position: "absolute", left: ux + 10, width: TW - 20, bottom: -1, height: 2.5, borderRadius: 2, background: ACCENT }} />
      </div>
      <div style={{ position: "absolute", left: 14, right: 14, top: TY + 32, opacity: f, transform: `translateY(${(1 - f) * 4}px)` }}>
        <Panel i={act} />
      </div>
      <Taps t={t} list={CLICKS.map(([c, i]) => [c, cx(i), TY + 12])} size={20} />
      <Cursor x={x} y={y} down={pressed(t, CLICKS.map((c) => c[0]))} />
    </div>
  );
}
