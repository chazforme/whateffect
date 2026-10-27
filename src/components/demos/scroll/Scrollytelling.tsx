"use client";

import { useLoop } from "@/hooks/useLoop";
import { clamp, seg } from "@/lib/loop";
import { ACCENT, Browser, INK, LINE, SUB, Wheel, prog, stage } from "./kit";

const BODY = 137;
const MID = BODY / 2;
const BARS = [
  { y: "2015", v: 27 },
  { y: "2019", v: 30 },
  { y: "2024", v: 36 },
];
const STEPS = ["2015년엔 네 집 중 한 집이 혼자 살았어요", "2019년엔 30%로 늘었고", "2024년, 세 집 중 한 집이 1인 가구예요"];
const CARD_H = 42;
const FIRST = 120; // 첫 설명 카드 위치
const GAP = 104;
const MAX = FIRST + GAP * (STEPS.length - 1) + CARD_H / 2 - MID + 6;

// 그래프는 뒤에 고정, 설명 글이 하나씩 올라올 때마다 그래프의 강조가 바뀜
export default function Scrollytelling() {
  const t = useLoop(4400);
  const y = prog(t, 300, 3300, 3850, 4350) * MAX;
  const on = t < 3850 ? seg(t, 200, 300) * (1 - seg(t, 3200, 3350)) : seg(t, 3850, 3950) * (1 - seg(t, 4250, 4350));
  const centers = STEPS.map((_, i) => FIRST + i * GAP + CARD_H / 2 - y);
  const weight = centers.map((c) => clamp(1 - Math.abs(c - MID) / 52));
  const chartO = seg(y, 10, 50);

  return (
    <div style={stage}>
      <Browser url="news.co.kr">
        {/* 뒤에 고정된 그래프 */}
        <div style={{ position: "absolute", right: 12, top: 18, width: 92, height: 104, opacity: chartO }}>
          <div style={{ fontSize: 7.5, fontWeight: 700, color: SUB, marginBottom: 4 }}>1인 가구 비율</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 80, borderBottom: `1px solid ${LINE}` }}>
            {BARS.map((b, i) => {
              const w = weight[i];
              return (
                <div key={b.y} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <span style={{ fontSize: 8, fontWeight: 800, color: ACCENT, opacity: w }}>{b.v}%</span>
                  <div
                    style={{
                      width: "100%",
                      height: b.v * 1.8,
                      borderRadius: "4px 4px 0 0",
                      background: w > 0.3 ? ACCENT : "#C9D2F6",
                      opacity: 0.45 + 0.55 * w,
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 2 }}>
            {BARS.map((b) => (
              <span key={b.y} style={{ flex: 1, textAlign: "center", fontSize: 7, color: SUB }}>
                {b.y}
              </span>
            ))}
          </div>
        </div>
        {/* 스크롤되는 기사 */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, transform: `translateY(${-y}px)` }}>
          <div style={{ padding: "16px 12px 0" }}>
            <div style={{ fontSize: 7.5, color: ACCENT, fontWeight: 700 }}>데이터 기획</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: INK, lineHeight: 1.3 }}>
              숫자로 본
              <br />
              혼자 사는 집
            </div>
          </div>
          {STEPS.map((s, i) => (
            <div
              key={s}
              style={{
                position: "absolute",
                top: FIRST + i * GAP,
                left: 10,
                width: 110,
                height: CARD_H,
                borderRadius: 8,
                background: "#fff",
                border: `1.5px solid ${weight[i] > 0.3 ? ACCENT : LINE}`,
                boxShadow: "0 2px 8px rgba(27,34,54,.1)",
                padding: "6px 8px",
                fontSize: 8,
                fontWeight: 700,
                color: INK,
                lineHeight: 1.4,
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </Browser>
      <Wheel t={t} on={on} dir={t < 3850 ? 1 : -1} />
    </div>
  );
}
