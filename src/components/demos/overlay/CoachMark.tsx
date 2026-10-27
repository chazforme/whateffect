"use client";

import type { CSSProperties } from "react";
import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { AppBar, Phone, Tap, accent, inOut, line, sub, txt } from "./_kit";

const bubble: CSSProperties = {
  position: "absolute",
  right: 6,
  width: 92,
  background: "#fff",
  borderRadius: 8,
  padding: "6px 7px",
  boxShadow: "0 4px 12px rgba(0,0,0,.2)",
};

// 4.4초 주기: 화면이 어두워지고 버튼 하나만 동그랗게 밝음 + 설명 말풍선 → '다음' → 다른 버튼으로 이동 → '확인'
export default function CoachMark() {
  const t = useLoop(4400);
  const on = inOut(t, 0, 400, 3700, 4000);
  const mv = ease(seg(t, 1900, 2350));
  // 동그라미 위치·크기: 아래 + 버튼 → 위 종 아이콘
  const sx = 92 + (99 - 92) * mv;
  const sy = 138 + (12 - 138) * mv;
  const r = 16 + (11 - 16) * mv;
  const b1 = inOut(t, 350, 650, 1750, 1900);
  const b2 = inOut(t, 2350, 2650, 3550, 3750);

  return (
    <Phone>
      <AppBar title="내 일정" right={<span style={{ fontSize: 9 }}>🔔</span>} />
      <div style={{ padding: "8px 9px", display: "flex", flexDirection: "column", gap: 6 }}>
        {["10:00 주간 회의", "14:00 고객사 미팅", "17:30 운동"].map((s) => (
          <div key={s} style={{ background: "#EEF1F7", borderRadius: 6, padding: "5px 7px", ...txt(7.5, 600) }}>
            {s}
          </div>
        ))}
        <div style={line("60%")} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 126,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: accent,
          color: "#fff",
          display: "grid",
          placeItems: "center",
          fontSize: 15,
          fontWeight: 600,
        }}
      >
        +
      </div>
      {/* 동그랗게 뚫린 어두운 막: 큰 그림자로 주변만 칠함 */}
      <div
        style={{
          position: "absolute",
          left: sx - r,
          top: sy - r,
          width: r * 2,
          height: r * 2,
          borderRadius: "50%",
          boxShadow: `0 0 0 400px rgba(15,20,35,${0.62 * on})`,
          border: `1.5px solid rgba(255,255,255,${0.9 * on})`,
        }}
      />
      <div style={{ ...bubble, bottom: 48, opacity: b1, transform: `translateY(${5 * (1 - b1)}px)` }}>
        <div style={{ ...txt(7.5, 700), whiteSpace: "normal" }}>여기를 눌러 새 일정을 만들어요</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
          <span style={txt(6.5, 500, sub)}>1 / 2</span>
          <span style={txt(7, 800, accent)}>다음 ›</span>
        </div>
      </div>
      <div style={{ ...bubble, top: 30, opacity: b2, transform: `translateY(${-5 * (1 - b2)}px)` }}>
        <div style={{ ...txt(7.5, 700), whiteSpace: "normal" }}>알림은 여기서 모아 봐요</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
          <span style={txt(6.5, 500, sub)}>2 / 2</span>
          <span style={txt(7, 800, accent)}>확인</span>
        </div>
      </div>
      <Tap t={t} at={1500} x={95} y={105} />
      <Tap t={t} at={3300} x={95} y={53} />
    </Phone>
  );
}
