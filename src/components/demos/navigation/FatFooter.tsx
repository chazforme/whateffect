"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { Browser, Cursor, LINE, Logo, SOFT, io, track } from "./parts";

const COLS: [string, string[]][] = [
  ["회사", ["회사 소개", "채용", "오시는 길"]],
  ["고객센터", ["공지사항", "자주 묻는 질문", "1:1 문의"]],
  ["정책", ["이용약관", "개인정보", "청소년 보호"]],
  ["앱 받기", ["아이폰", "안드로이드", "카카오 채널"]],
];
const FOOT = 98;

// 4.4초: 페이지를 끝까지 내리면 남색 바닥에 사이트 전체 바로가기가 4열로 → 하나 가리킴 → 다시 위로
export default function FatFooter() {
  const t = useLoop(4400);
  const down = t < 3300 ? io(seg(t, 300, 1300)) : 1 - io(seg(t, 3300, 4100));
  const [x, y] = track(t, [
    [0, 200, 60],
    [1400, 200, 60],
    [1900, 80, 70],
    [2700, 80, 70],
    [3200, 200, 60],
  ]);
  const hover = t > 1900 && t < 2700;

  return (
    <Browser url="hyogwa.shop">
      <div style={{ transform: `translateY(${-FOOT * down}px)` }}>
        <div style={{ height: 22, borderBottom: `1px solid ${LINE}`, position: "relative" }}>
          <Logo h={22} />
        </div>
        <div style={{ padding: "8px 10px", height: 108 }}>
          <div style={{ height: 36, borderRadius: 7, background: "#DCE3F6", padding: "7px 9px", fontWeight: 800, fontSize: 10 }}>가을 신상 모아보기</div>
          <div style={{ display: "flex", gap: 6, marginTop: 7 }}>
            {[0, 1, 2, 3].map((k) => (
              <div key={k} style={{ flex: 1, height: 38, borderRadius: 6, background: SOFT }} />
            ))}
          </div>
        </div>
        <div style={{ height: FOOT, background: "#1B2236", padding: "9px 10px 0", position: "relative" }}>
          <div style={{ display: "flex" }}>
            {COLS.map(([h, items]) => (
              <div key={h} style={{ flex: 1 }}>
                <div style={{ fontSize: 8, fontWeight: 800, color: "#fff", marginBottom: 3 }}>{h}</div>
                {items.map((s) => {
                  const on = hover && s === "자주 묻는 질문";
                  return (
                    <div
                      key={s}
                      style={{
                        fontSize: 7,
                        lineHeight: "12px",
                        color: on ? "#fff" : "#A9B0C2",
                        textDecoration: on ? "underline" : "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", left: 10, right: 10, bottom: 8, paddingTop: 5, borderTop: "1px solid #34405C", fontSize: 6.5, color: "#7D869C" }}>
            <span style={{ color: "#8FA4FF", fontWeight: 800 }}>효과몰</span> · 서울시 중구 · 사업자 123-45-67890 · © 2026
          </div>
        </div>
      </div>
      <Cursor x={x} y={y} o={seg(t, 1300, 1450) * (1 - seg(t, 2900, 3100))} />
    </Browser>
  );
}
