"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const ITEMS = [
  { emoji: "🍓", name: "딸기 케이크", price: "₩28,000", bg: "#FDE2E4" },
  { emoji: "🧁", name: "컵케이크", price: "₩4,800", bg: "#E4E9FB" },
  { emoji: "🍪", name: "쿠키 세트", price: "₩9,900", bg: "#F4E9D8" },
];

const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
// 목록의 첫 번째 사진 자리 → 상세 화면 큰 사진 자리
const FROM = { x: 8, y: 26, w: 34, h: 34, r: 8, f: 18 };
const TO = { x: 0, y: 0, w: 112, h: 78, r: 0, f: 40 };

// 4초 주기: 목록에서 사진을 탭 → 그 사진이 그대로 커지며 상세 화면의 큰 사진이 됨 → 유지 → 되돌아감
export default function SharedElementTransition() {
  const t = useLoop(4000);
  const p = ease(seg(t, 800, 1450)) * (1 - ease(seg(t, 3000, 3600)));
  const tp = seg(t, 400, 800);
  const tapO = t < 400 || t > 800 ? 0 : tp < 0.3 ? tp / 0.3 : 1 - (tp - 0.3) / 0.7;

  const r = {
    x: lerp(FROM.x, TO.x, p),
    y: lerp(FROM.y, TO.y, p),
    w: lerp(FROM.w, TO.w, p),
    h: lerp(FROM.h, TO.h, p),
    rad: lerp(FROM.r, TO.r, p),
    f: lerp(FROM.f, TO.f, p),
  };
  const listO = 1 - seg(p, 0, 0.5);
  const detailO = seg(p, 0.5, 1);

  return (
    <div
      style={{
        width: 118,
        height: 168,
        background: "#fff",
        borderRadius: 18,
        border: "3px solid #1B2236",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 목록 화면 */}
      <div style={{ position: "absolute", inset: 0, opacity: listO }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "var(--color-ink)", padding: "9px 8px 0" }}>오늘의 디저트</div>
        {ITEMS.map((it, i) => (
          <div key={it.name} style={{ position: "absolute", left: 8, right: 6, top: 26 + i * 44, display: "flex", gap: 7 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: it.bg,
                fontSize: 18,
                lineHeight: "34px",
                textAlign: "center",
                visibility: i === 0 ? "hidden" : "visible",
              }}
            >
              {it.emoji}
            </div>
            <div style={{ paddingTop: 3 }}>
              <div style={{ fontSize: 9.5, fontWeight: 800, color: "var(--color-ink)" }}>{it.name}</div>
              <div style={{ fontSize: 9, color: "#6B7180", marginTop: 2 }}>{it.price}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 상세 화면 글자 */}
      <div style={{ position: "absolute", left: 9, right: 9, top: 86, opacity: detailO }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: "var(--color-ink)" }}>딸기 케이크</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--color-accent)", marginTop: 2 }}>₩28,000</div>
        <div style={{ fontSize: 8.5, color: "#6B7180", marginTop: 4 }}>생딸기를 듬뿍 올렸어요</div>
        <div
          style={{
            marginTop: 8,
            height: 18,
            borderRadius: 6,
            background: "var(--color-accent)",
            color: "#fff",
            fontSize: 9,
            fontWeight: 800,
            lineHeight: "18px",
            textAlign: "center",
          }}
        >
          장바구니 담기
        </div>
      </div>

      {/* 두 화면이 함께 쓰는 사진 */}
      <div
        style={{
          position: "absolute",
          left: r.x,
          top: r.y,
          width: r.w,
          height: r.h,
          borderRadius: r.rad,
          background: ITEMS[0].bg,
          fontSize: r.f,
          lineHeight: `${r.h}px`,
          textAlign: "center",
        }}
      >
        {ITEMS[0].emoji}
      </div>

      <div
        style={{
          position: "absolute",
          left: 25 - 11,
          top: 43 - 11,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "rgba(27,34,54,.3)",
          opacity: tapO,
          transform: `scale(${0.5 + tp})`,
        }}
      />
    </div>
  );
}
