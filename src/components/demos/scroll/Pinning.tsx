"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { ACCENT, Browser, INK, SOFT, SUB, Wheel, prog, stage } from "./kit";

const INTRO = 34; // 위쪽 소개 글 높이
const PIN_TOP = 14; // 고정될 때 화면 위에서 떨어진 거리
const FEAT = 84; // 오른쪽 설명 하나 높이
const FEATS = [
  ["🔇", "노이즈 캔슬링", "지하철 소음도 조용하게"],
  ["🔋", "30시간 재생", "한 번 충전으로 일주일"],
  ["💧", "생활 방수", "비 오는 날도 걱정 없이"],
];
const PIN_LEN = FEAT * (FEATS.length - 1); // 고정되어 있는 스크롤 길이
const MAX = INTRO - PIN_TOP + PIN_LEN + 70;

// 왼쪽 사진은 제자리에 꽂혀 있고, 오른쪽 설명만 지나감. 다 지나가면 사진도 같이 올라감
export default function Pinning() {
  const t = useLoop(4200);
  const y = prog(t, 300, 3000, 3550, 4050) * MAX;
  const on = t < 3550 ? seg(t, 200, 300) * (1 - seg(t, 2900, 3050)) : seg(t, 3550, 3650) * (1 - seg(t, 3950, 4050));

  const start = INTRO - PIN_TOP; // 이만큼 내리면 고정 시작
  const natural = INTRO - y;
  let imgTop = natural;
  if (y > start) imgTop = PIN_TOP;
  if (y > start + PIN_LEN) imgTop = natural + PIN_LEN;
  const pinned = y > start && y < start + PIN_LEN ? 1 : 0;

  return (
    <div style={stage}>
      <Browser url="sound.co.kr">
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, transform: `translateY(${-y}px)` }}>
          <div style={{ height: INTRO, padding: "8px 12px", background: SOFT }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: INK }}>새로 나온 무선 이어폰</div>
          </div>
          {FEATS.map(([e, h, s], i) => (
            <div
              key={h}
              style={{
                position: "absolute",
                top: INTRO + PIN_TOP + i * FEAT,
                left: 120,
                right: 10,
                height: FEAT - 10,
              }}
            >
              <div style={{ fontSize: 14 }}>{e}</div>
              <div style={{ fontSize: 10, fontWeight: 800, color: INK, marginTop: 2 }}>{h}</div>
              <div style={{ fontSize: 7.5, color: SUB, marginTop: 2 }}>{s}</div>
            </div>
          ))}
          <div
            style={{
              position: "absolute",
              top: INTRO + PIN_TOP + PIN_LEN + 108,
              left: 12,
              right: 12,
              height: 24,
              borderRadius: 8,
              background: ACCENT,
              color: "#fff",
              fontSize: 9,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ₩189,000 · 구매하기
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 12,
            top: imgTop + PIN_TOP,
            width: 96,
            height: 96,
            borderRadius: 12,
            background: "linear-gradient(145deg,#EADFFB,#C7B6F2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            boxShadow: pinned ? "0 4px 12px rgba(58,91,239,.25)" : "none",
          }}
        >
          🎧
          <span
            style={{
              position: "absolute",
              top: -5,
              right: -5,
              fontSize: 12,
              opacity: pinned,
            }}
          >
            📌
          </span>
        </div>
      </Browser>
      <Wheel t={t} on={on} dir={t < 3550 ? 1 : -1} />
    </div>
  );
}
