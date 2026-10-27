"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { C, Cursor, Tap, field, isDown, path } from "./parts";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const CAL_TOP = 40;
const ROW_TOP = CAL_TOP + 6 + 16 + 14; // 날짜 첫 줄 윗변
const CELL = 30;
const PICK = 14; // 2026년 11월 1일이 일요일 → 14일은 둘째 줄 토요일

// 5.2초: 칸을 누르면 달력이 펼쳐짐 → 14일을 콕 → 닫히며 날짜가 들어감
export default function DatePicker() {
  const t = useLoop(5200);
  const open = t < 2100 ? ease(seg(t, 650, 850)) : 1 - seg(t, 2100, 2300);
  const picked = t >= 1850 && t < 4600;
  const vo = t < 4400 ? 1 : t < 4600 ? 1 - seg(t, 4400, 4600) : seg(t, 4600, 4800);
  const pop = ease(seg(t, 1850, 2050));
  const px = 6 + 6 * CELL + CELL / 2;
  const py = ROW_TOP + 16 + 8;
  const cur = path(t, [
    [0, 150, 60],
    [200, 150, 60],
    [550, 120, 20],
    [1100, 120, 20],
    [1700, px, py],
    [2400, px, py],
    [2800, 235, 140],
  ]);
  const co = seg(t, 0, 200) * (1 - seg(t, 2500, 2800));

  return (
    <div style={{ position: "relative", width: 222, height: 164 }}>
      <div style={{ ...field(open > 0.01 ? C.acc : C.line, 36), gap: 8 }}>
        <svg width="15" height="15" viewBox="0 0 16 16">
          <rect x="1.5" y="2.5" width="13" height="12" rx="2.5" fill="none" stroke={C.sub} strokeWidth="1.6" />
          <path d="M1.5 6.5 H14.5 M5 1 V4 M11 1 V4" stroke={C.sub} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.sub }}>체크인</span>
        <span style={{ opacity: vo, color: picked ? C.ink : C.faint, fontWeight: picked ? 700 : 500, fontSize: 13.5 }}>
          {picked ? "2026. 11. 14 (토)" : "날짜를 골라 주세요"}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: CAL_TOP,
          left: 0,
          width: 222,
          padding: 6,
          boxSizing: "border-box",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 8px 20px rgba(27,34,54,.14)",
          opacity: open,
          transform: `translateY(${-6 * (1 - open)}px)`,
        }}
      >
        <div
          style={{
            height: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 6px",
            fontSize: 11.5,
            fontWeight: 800,
            color: C.ink,
          }}
        >
          <span style={{ color: C.faint }}>‹</span>
          2026년 11월
          <span style={{ color: C.faint }}>›</span>
        </div>
        <div style={{ display: "flex", height: 14, alignItems: "center" }}>
          {DAYS.map((d, c) => (
            <span
              key={d}
              style={{
                width: CELL,
                textAlign: "center",
                fontSize: 9.5,
                fontWeight: 700,
                color: c === 0 ? C.red : c === 6 ? C.acc : C.faint,
              }}
            >
              {d}
            </span>
          ))}
        </div>
        {[0, 1, 2, 3, 4].map((r) => (
          <div key={r} style={{ display: "flex", height: 16 }}>
            {DAYS.map((_, c) => {
              const d = r * 7 + c + 1;
              const isPick = d === PICK && picked;
              const isHover = d === PICK && t >= 1650 && t < 1850;
              return (
                <span
                  key={c}
                  style={{
                    position: "relative",
                    width: CELL,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10.5,
                    fontWeight: 600,
                    color: isPick ? "#fff" : c === 0 ? C.red : c === 6 ? C.acc : C.ink,
                  }}
                >
                  {(isPick || isHover) && (
                    <span
                      style={{
                        position: "absolute",
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: isPick ? C.acc : C.tint,
                        transform: `scale(${isPick ? 0.6 + 0.4 * pop : 1})`,
                      }}
                    />
                  )}
                  {d <= 30 && <span style={{ position: "relative" }}>{d}</span>}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <Tap x={120} y={18} t={t} at={600} />
      <Tap x={px} y={py} t={t} at={1850} size={22} />
      <Cursor x={cur.x} y={cur.y} o={co} down={isDown(t, [600, 1850])} />
    </div>
  );
}
