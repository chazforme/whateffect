"use client";

import { useLoop } from "@/hooks/useLoop";
import { AppBar, Phone, Tap, inOut, line, txt } from "./_kit";

const RECENT = ["운동화", "캠핑 의자", "가을 니트", "선물 세트"];

// 4초 주기: 돋보기 탭 → 화면 전체가 검색 화면으로 덮임 → ✕ 탭 → 걷힘
export default function FullScreenOverlay() {
  const t = useLoop(4000);
  const show = inOut(t, 500, 850, 2700, 3000);

  return (
    <Phone>
      <AppBar title="INNO 몰" right={<span style={{ fontSize: 9 }}>🔍</span>} />
      <div style={{ height: 50, margin: "8px 8px 0", borderRadius: 8, background: "#DCE3F6" }} />
      <div style={{ display: "flex", gap: 5, margin: "8px 8px 0" }}>
        <div style={{ flex: 1, height: 38, borderRadius: 6, background: "#EEF1F7" }} />
        <div style={{ flex: 1, height: 38, borderRadius: 6, background: "#EEF1F7" }} />
      </div>
      <div style={{ ...line("70%"), margin: "8px 8px 0" }} />
      <Tap t={t} at={200} x={99} y={12} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(27,34,54,.96)",
          opacity: show,
          transform: `translateY(${-8 * (1 - show)}px)`,
          padding: "8px 9px",
        }}
      >
        <div style={{ textAlign: "right", ...txt(10, 500, "#fff") }}>✕</div>
        <div
          style={{
            marginTop: 6,
            background: "rgba(255,255,255,.12)",
            borderRadius: 7,
            padding: "6px 8px",
            ...txt(7.5, 500, "rgba(255,255,255,.65)"),
          }}
        >
          🔍 무엇을 찾으세요?
        </div>
        <div style={{ ...txt(7, 700, "rgba(255,255,255,.55)"), marginTop: 12 }}>최근 검색어</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
          {RECENT.map((r) => (
            <span
              key={r}
              style={{ ...txt(7, 600, "#fff"), border: "1px solid rgba(255,255,255,.3)", borderRadius: 10, padding: "2px 7px" }}
            >
              {r}
            </span>
          ))}
        </div>
      </div>
      <Tap t={t} at={2450} x={99} y={15} />
    </Phone>
  );
}
