"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { ACCENT, Browser, INK, Lines, SUB, Wheel, prog, stage } from "./kit";

const MAX = 230;
const DAYS = ["1일차 · 동쪽 해안", "2일차 · 한라산", "3일차 · 서귀포", "4일차 · 공항 가는 길"];

// 글을 읽어 내려가는 만큼 위쪽 막대가 채워짐
export default function ScrollProgressBar() {
  const t = useLoop(4000);
  const p = prog(t);
  const y = p * MAX;
  const on = t < 3350 ? seg(t, 300, 450) * (1 - seg(t, 2500, 2650)) : seg(t, 3350, 3450) * (1 - seg(t, 3750, 3850));

  return (
    <div style={stage}>
      <Browser url="blog.co.kr/jeju">
        <div style={{ padding: "12px 14px", transform: `translateY(${-y}px)` }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: INK }}>제주 3박 4일 여행 코스</div>
          <div style={{ fontSize: 7.5, color: SUB, margin: "3px 0 10px" }}>여행 · 읽는 데 5분</div>
          {DAYS.map((d) => (
            <div key={d} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: INK, marginBottom: 5 }}>{d}</div>
              <Lines n={5} />
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#E9ECF4" }}>
          <div style={{ height: 4, width: `${p * 100}%`, background: ACCENT, borderRadius: "0 2px 2px 0" }} />
        </div>
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            fontSize: 8,
            fontWeight: 800,
            color: "#fff",
            background: ACCENT,
            borderRadius: 6,
            padding: "1px 5px",
          }}
        >
          {Math.round(p * 100)}%
        </div>
      </Browser>
      <Wheel t={t} on={on} dir={t < 3350 ? 1 : -1} />
    </div>
  );
}
