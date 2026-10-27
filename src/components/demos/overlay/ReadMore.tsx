"use client";

import { useLoop } from "@/hooks/useLoop";
import { Tap, accent, inOut, sub, txt } from "./_kit";

const LH = 13; // 한 줄 높이
const REVIEW =
  "평소 입는 사이즈로 샀는데 딱 맞아요. 원단이 생각보다 두껍고 부드러워서 가을까지 입기 좋아요. 세탁기에 돌려도 줄어들지 않았고, 색도 사진이랑 거의 같아요. 배송도 하루 만에 와서 엄마 선물로 하나 더 주문했어요. 다음엔 다른 색도 살게요!";

// 4초 주기: 후기가 두 줄만 보이다가 '더보기' 탭 → 아래로 펼쳐짐 → '접기' 탭 → 다시 두 줄
export default function ReadMore() {
  const t = useLoop(4000);
  const open = inOut(t, 650, 1100, 2950, 3400);
  const h = LH * 2 + LH * 2 * open;
  const expanded = t > 650 && t < 3200;

  return (
    <div style={{ height: 128 }}>
      <div
        style={{
          position: "relative",
          width: 228,
          background: "#fff",
          borderRadius: 12,
          padding: "10px 12px",
          boxShadow: "0 2px 8px rgba(27,34,54,.07)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={txt(8.5, 700)}>
            <span style={{ color: "#F5A623" }}>★★★★★</span> 김**
          </span>
          <span style={txt(7, 500, sub)}>10.21</span>
        </div>
        <div
          style={{
            position: "relative",
            height: h,
            overflow: "hidden",
            marginTop: 6,
          }}
        >
          <div
            style={{
              ...txt(8.5, 500),
              lineHeight: `${LH}px`,
              whiteSpace: "normal",
              wordBreak: "keep-all",
            }}
          >
            {REVIEW}
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: LH,
              background: "linear-gradient(rgba(255,255,255,0), #fff)",
              opacity: 1 - open,
            }}
          />
        </div>
        <div style={{ ...txt(8, 700, accent), marginTop: 4 }}>
          {expanded ? "접기 ⌃" : "더보기 ⌄"}
        </div>
        <Tap t={t} at={450} x={30} y={10 + 12 + 6 + LH * 2 + 4 + 6} />
        <Tap t={t} at={2750} x={24} y={10 + 12 + 6 + LH * 4 + 4 + 6} />
      </div>
    </div>
  );
}
