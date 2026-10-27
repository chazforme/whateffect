"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { AppBar, Dim, Phone, Tap, inOut, sub, txt } from "./_kit";

const PHOTOS = ["#F7C9B8", "#BFD3F7", "#C7E8D3", "#F5DFA6", "#D9CCF5", "#F7C9B8"];
const RED = "#E5484D";

// 4.2초 주기: 휴지통 탭 → '정말 삭제할까요?' 창 → '삭제' 탭 → 사진이 사라짐 → 다시 채워짐
export default function AlertDialog() {
  const t = useLoop(4200);
  const show = inOut(t, 600, 900, 2500, 2750);
  const gone = seg(t, 2600, 2900) * (1 - seg(t, 3800, 4150));

  return (
    <Phone>
      <AppBar title="사진 2장 선택" right={<span style={txt(7.5, 700, sub)}>취소</span>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3, padding: 6 }}>
        {PHOTOS.map((c, i) => {
          const picked = i === 1 || i === 3;
          return (
            <div
              key={i}
              style={{
                height: 30,
                borderRadius: 4,
                background: c,
                position: "relative",
                opacity: picked ? 1 - gone : 1,
                outline: picked ? "2px solid var(--color-accent)" : "none",
                outlineOffset: -2,
              }}
            >
              {picked && (
                <span
                  style={{
                    position: "absolute",
                    right: 2,
                    top: 2,
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    color: "#fff",
                    fontSize: 6,
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 800,
                  }}
                >
                  ✓
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 26,
          borderTop: "1px solid #EEF1F7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          ...txt(8, 700, RED),
        }}
      >
        🗑 삭제
      </div>
      <Tap t={t} at={300} x={56} y={149} />
      <Dim o={show} />
      <div
        style={{
          position: "absolute",
          left: 10,
          right: 10,
          top: "50%",
          background: "#fff",
          borderRadius: 10,
          overflow: "hidden",
          textAlign: "center",
          opacity: show,
          transform: `translateY(-50%) scale(${0.92 + 0.08 * show})`,
        }}
      >
        <div style={{ padding: "10px 6px 8px" }}>
          <div style={txt(9, 800)}>정말 삭제할까요?</div>
          <div style={{ ...txt(6.8, 500, sub), marginTop: 3 }}>삭제하면 되돌릴 수 없어요</div>
        </div>
        <div style={{ display: "flex", borderTop: "1px solid #EEF1F7" }}>
          <span style={{ flex: 1, padding: "6px 0", ...txt(8, 600, sub), borderRight: "1px solid #EEF1F7" }}>
            취소
          </span>
          <span style={{ flex: 1, padding: "6px 0", ...txt(8, 800, RED) }}>삭제</span>
        </div>
      </div>
      <Tap t={t} at={2150} x={79} y={102} />
    </Phone>
  );
}
