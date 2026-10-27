"use client";

import { useLoop } from "@/hooks/useLoop";

const NEWS = "오늘 오후 3시 앱 점검 예정  ·  전 상품 무료 배송 진행 중  ·  신규 가입하면 5천 원 쿠폰  ·  ";
const CHIPS = ["☕ 카페 봄날", "🥐 동네빵집", "🍜 한그릇", "🌷 꽃집 소소", "📚 책방 여름"];
const PERIOD = 12000;

// 계속 흐름: 같은 내용을 두 번 이어 붙이고 절반만큼 밀면 끊김 없이 무한히 흐른다
export default function Marquee() {
  const t = useLoop(PERIOD);
  const f = t / PERIOD;
  return (
    <div style={{ width: 270, display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 32,
          borderRadius: 10,
          background: "var(--color-ink)",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            flex: "none",
            height: "100%",
            padding: "0 10px",
            background: "var(--color-accent)",
            color: "#fff",
            fontSize: 12,
            fontWeight: 800,
            lineHeight: "32px",
            position: "relative",
            zIndex: 1,
          }}
        >
          📢 공지
        </span>
        <div style={{ overflow: "hidden", flex: 1 }}>
          <div
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              color: "#fff",
              fontSize: 12.5,
              fontWeight: 700,
              transform: `translateX(${-50 * f}%)`,
            }}
          >
            {NEWS + NEWS}
          </div>
        </div>
      </div>
      <div style={{ overflow: "hidden" }}>
        <div style={{ display: "inline-flex", gap: 8, transform: `translateX(${-50 * (1 - f)}%)` }}>
          {[...CHIPS, ...CHIPS].map((c, i) => (
            <span
              key={i}
              style={{
                flex: "none",
                padding: "7px 12px",
                borderRadius: 999,
                background: "#fff",
                fontSize: 12,
                fontWeight: 700,
                color: "var(--color-ink)",
                whiteSpace: "nowrap",
                marginRight: i === CHIPS.length * 2 - 1 ? 8 : 0,
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 11, color: "#6B7180", textAlign: "center" }}>함께하는 동네 가게들</div>
    </div>
  );
}
