"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { Finger, INK, LINE, PHONE_H, Phone, SUB, firstTime, prog } from "./kit";

const PHOTOS = [
  { cap: "설악산 단풍", emoji: "🍁", bg: "linear-gradient(135deg,#FDE2D8,#F7B79C)" },
  { cap: "강릉 바다", emoji: "🌊", bg: "linear-gradient(135deg,#D6EEF6,#8FC5EA)" },
  { cap: "진해 벚꽃", emoji: "🌸", bg: "linear-gradient(135deg,#FBDDEB,#F3A9C9)" },
  { cap: "부산 야경", emoji: "🌉", bg: "linear-gradient(135deg,#C9D2F6,#7E8FE0)" },
  { cap: "전주 비빔밥", emoji: "🍲", bg: "linear-gradient(135deg,#FFF1C9,#F5C97A)" },
];
const CARD = 80;
const TOP = 24;
const MAX = TOP + PHOTOS.length * CARD - PHONE_H + 4;
const PERIOD = 4000;
const scrollY = (t: number) => prog(t, 400, 2800) * MAX;
// 사진이 화면 아래에 걸린 순간 → 그때부터 불러오기 시작
const enterAt = PHOTOS.map((_, i) => firstTime((t) => scrollY(t) + PHONE_H, TOP + i * CARD + 14, PERIOD));

export default function LazyLoading() {
  const t = useLoop(PERIOD);
  const y = scrollY(t);
  const drag = seg(t, 400, 2800);
  const fo = seg(t, 250, 400) * (1 - seg(t, 2800, 3000));

  return (
    <Phone>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, transform: `translateY(${-y}px)` }}>
        <div style={{ height: TOP, padding: "7px 9px", fontSize: 9.5, fontWeight: 800, color: INK }}>오늘의 여행 사진</div>
        {PHOTOS.map((ph, i) => {
          const ld = seg(t, enterAt[i] + 250, enterAt[i] + 650);
          return (
            <div key={ph.cap} style={{ height: CARD, padding: "0 8px" }}>
              <div style={{ position: "relative", height: 58, borderRadius: 8, overflow: "hidden", background: LINE }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 7.5,
                    color: SUB,
                    opacity: 1 - ld,
                  }}
                >
                  불러오는 중…
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: ph.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    opacity: ld,
                    filter: `blur(${(1 - ld) * 4}px)`,
                  }}
                >
                  {ph.emoji}
                </div>
              </div>
              <div style={{ fontSize: 8, fontWeight: 600, color: INK, marginTop: 4 }}>{ph.cap}</div>
            </div>
          );
        })}
      </div>
      <Finger x={64} y={130 - drag * 80} o={fo} />
    </Phone>
  );
}
