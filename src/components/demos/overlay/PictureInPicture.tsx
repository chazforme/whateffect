"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { Phone, Tap, inOut, sub, txt } from "./_kit";

const LIST = ["가을 캠핑 브이로그", "10분 집밥 레시피", "제주 한 달 살기", "주말 등산 코스", "홈카페 만들기"];

// 4.2초 주기: 영상 보다가 위로 쓸어 올림 → 영상이 오른쪽 아래 작은 창으로 줄어들어 계속 재생 → 작은 창 탭 → 다시 커짐
export default function PictureInPicture() {
  const t = useLoop(4200);
  const mini = inOut(t, 700, 1250, 2900, 3400);
  const scroll = ease(seg(t, 650, 1250)) * (1 - ease(seg(t, 2900, 3400)));

  // 큰 영상(0,0,112,63) → 작은 창(56,124,50,30)
  const v = {
    x: 56 * mini,
    y: 124 * mini,
    w: 112 + (50 - 112) * mini,
    h: 63 + (30 - 63) * mini,
  };
  // 손가락: 아래에서 위로 쓸기
  const swipe = seg(t, 550, 1150);
  const fo = t < 550 || t > 1250 ? 0 : Math.min(1, swipe * 4, (1 - swipe) * 4 + 0.2);

  return (
    <Phone>
      <div style={{ position: "absolute", left: 0, right: 0, top: 63 - 63 * scroll, padding: "6px 8px" }}>
        <div style={txt(8, 800)}>캠핑 의자 고르는 법</div>
        <div style={{ ...txt(6.5, 500, sub), marginBottom: 6 }}>조회수 1.2만회</div>
        {LIST.map((s, i) => (
          <div key={s} style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 5 }}>
            <div style={{ width: 30, height: 18, borderRadius: 3, background: ["#DCE3F6", "#F7C9B8", "#C7E8D3", "#F5DFA6", "#D9CCF5"][i] }} />
            <span style={txt(6.8, 600)}>{s}</span>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: v.x,
          top: v.y,
          width: v.w,
          height: v.h,
          background: "#1B2236",
          borderRadius: 6 * mini,
          overflow: "hidden",
          boxShadow: mini > 0.05 ? "0 4px 12px rgba(0,0,0,.3)" : "none",
          display: "grid",
          placeItems: "center",
          zIndex: 5,
        }}
      >
        <span style={{ fontSize: 22 - 10 * mini }}>⛺</span>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: "rgba(255,255,255,.25)" }}>
          <div style={{ width: `${(t / 4200) * 100}%`, height: "100%", background: "#FF4D5A" }} />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "rgba(58,91,239,.35)",
          left: 46,
          top: 130 - 60 * ease(swipe),
          opacity: fo,
          zIndex: 20,
        }}
      />
      <Tap t={t} at={2650} x={81} y={139} />
    </Phone>
  );
}
