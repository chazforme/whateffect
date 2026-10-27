"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { C, Caret, Cursor, Tap, field, isDown, path, typed } from "./parts";

const SUGGEST: Record<string, string[]> = {
  부: ["부산 맛집", "부천 날씨", "부대찌개 맛집"],
  부산: ["부산 맛집", "부산 여행 코스", "부산 KTX 시간표"],
};

// 4.8초: '부' → '부산' 칠 때마다 추천이 바뀜 → '부산 맛집'을 눌러 칸이 채워짐
export default function Autocomplete() {
  const t = useLoop(4800);
  const q = t < 2000 ? typed("부산", t, 500, 400) : "";
  const value = t < 2000 ? q : t < 4600 ? "부산 맛집" : "";
  const vo = 1 - seg(t, 4200, 4600);
  const open = t < 2000 ? (q ? ease(seg(t, 500, 700)) : 0) : 1 - seg(t, 2000, 2150);
  const list = SUGGEST[q || "부산"];
  const focus = t >= 300 && t < 4200;
  const cur = path(t, [
    [1100, 205, 150],
    [1600, 120, 68],
  ]);
  const co = seg(t, 1100, 1300) * (1 - seg(t, 2300, 2600));
  const hover = t >= 1600 && t < 2000;
  const ql = q.length || 2;

  return (
    <div style={{ position: "relative", width: 240, height: 150 }}>
      <div style={{ ...field(focus ? C.acc : C.line, 40), gap: 8, position: "absolute", top: 0, left: 0, right: 0 }}>
        <svg width="15" height="15" viewBox="0 0 16 16">
          <circle cx="7" cy="7" r="5.2" fill="none" stroke={C.sub} strokeWidth="1.8" />
          <path d="M11 11 L14.5 14.5" stroke={C.sub} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span>
          <span style={{ opacity: vo }}>{value}</span>
          <Caret t={t} show={focus} />
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 46,
          left: 0,
          right: 0,
          padding: 4,
          background: "#fff",
          border: `1px solid ${C.line}`,
          borderRadius: 10,
          boxShadow: "0 8px 20px rgba(27,34,54,.12)",
          opacity: open,
          transform: `translateY(${-6 * (1 - open)}px)`,
        }}
      >
        {list.map((s, k) => (
          <div
            key={s}
            style={{
              height: 30,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 9px",
              borderRadius: 7,
              background: hover && k === 0 ? C.tint : "transparent",
              fontSize: 13,
              fontWeight: 500,
              color: C.ink,
              whiteSpace: "nowrap",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 16 16">
              <circle cx="7" cy="7" r="5.2" fill="none" stroke={C.faint} strokeWidth="2" />
              <path d="M11 11 L14.5 14.5" stroke={C.faint} strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>
              <b style={{ color: C.acc, fontWeight: 800 }}>{s.slice(0, ql)}</b>
              {s.slice(ql)}
            </span>
          </div>
        ))}
      </div>
      <Tap x={120} y={66} t={t} at={1950} />
      <Cursor x={cur.x} y={cur.y} o={co} down={isDown(t, [1950])} />
    </div>
  );
}
