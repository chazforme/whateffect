"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { ACCENT, INK, LINE, Phone, SOFT, SUB, Tap } from "./parts";

const ITEMS = ["주문 내역", "찜한 상품", "쿠폰함 3", "최근 본 상품", "설정"];

// 4초: 왼쪽 위 ☰ 탭 → 메뉴판이 왼쪽에서 밀려 나오고 뒤가 어두워짐 → 바깥 탭 → 들어감
export default function Drawer() {
  const t = useLoop(4000);
  const open = t < 2800 ? ease(seg(t, 600, 1050)) : 1 - ease(seg(t, 2800, 3250));

  return (
    <Phone>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 28, borderBottom: `1px solid ${LINE}` }}>
        <div style={{ position: "absolute", left: 10, top: 9 }}>
          {[0, 5, 10].map((y) => (
            <i key={y} style={{ position: "absolute", top: y, width: 13, height: 2, borderRadius: 1, background: INK }} />
          ))}
        </div>
        <span style={{ position: "absolute", left: 0, right: 0, textAlign: "center", lineHeight: "28px", fontSize: 10, fontWeight: 800, color: ACCENT }}>
          효과몰
        </span>
      </div>
      <div style={{ position: "absolute", left: 9, right: 9, top: 36 }}>
        {["오늘 도착 상품", "타임 특가", "이번 주 베스트", "새로 들어온 상품", "리뷰 많은 상품"].map((s) => (
          <div key={s} style={{ height: 20, borderRadius: 5, background: SOFT, marginBottom: 5, fontSize: 7.5, padding: "0 6px", lineHeight: "20px", color: SUB }}>
            {s}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(15,20,35,.45)", opacity: open }} />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 82,
          background: "#fff",
          boxShadow: "4px 0 12px rgba(15,20,35,.18)",
          transform: `translateX(${-105 * (1 - open)}%)`,
          padding: "12px 9px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 5, paddingBottom: 9, borderBottom: `1px solid ${LINE}` }}>
          <i style={{ width: 18, height: 18, borderRadius: "50%", background: "#DCE3F6" }} />
          <div>
            <div style={{ fontSize: 9, fontWeight: 800 }}>김효과 님</div>
            <div style={{ fontSize: 6.5, color: ACCENT, fontWeight: 700 }}>VIP 회원</div>
          </div>
        </div>
        {ITEMS.map((s) => (
          <div key={s} style={{ fontSize: 8.5, fontWeight: 600, height: 21, lineHeight: "21px", color: INK }}>
            {s}
          </div>
        ))}
      </div>
      <Tap x={16} y={14} t={t} at={500} />
      <Tap x={100} y={100} t={t} at={2700} />
    </Phone>
  );
}
