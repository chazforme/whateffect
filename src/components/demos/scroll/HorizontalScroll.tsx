"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { ACCENT, Browser, INK, Lines, PRODUCTS, SOFT, SUB, Wheel, io, stage } from "./kit";

const INTRO = 40; // 가로 구역이 화면 맨 위에 닿기까지
const SIDE = 176; // 옆으로 밀리는 거리
const ITEMS = PRODUCTS.slice(0, 6);

// 휠은 계속 아래로 굴리는데, 이 구역에서만 카드들이 옆으로 흘러감
function pos(t: number) {
  if (t >= 3500) {
    const b = 1 - io(seg(t, 3500, 4000));
    return { y: (INTRO + 50) * b, x: SIDE * b };
  }
  const y1 = io(seg(t, 300, 900)) * INTRO;
  const x = io(seg(t, 900, 2600)) * SIDE;
  const y2 = io(seg(t, 2600, 3100)) * 50;
  return { y: y1 + y2, x };
}

export default function HorizontalScroll() {
  const t = useLoop(4200);
  const { y, x } = pos(t);
  const sideways = t > 900 && t < 2600;
  const on = t < 3500 ? seg(t, 200, 300) * (1 - seg(t, 3100, 3250)) : seg(t, 3500, 3600) * (1 - seg(t, 3900, 4000));

  return (
    <div style={stage}>
      <Browser url="shop.co.kr">
        <div style={{ transform: `translateY(${-y}px)` }}>
          <div style={{ height: INTRO, padding: "10px 12px", background: SOFT }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: INK }}>이번 주 추천</div>
            <div style={{ fontSize: 7.5, color: SUB }}>지금 많이 보는 상품이에요</div>
          </div>
          <div style={{ height: 118, padding: "8px 0", position: "relative" }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: INK, padding: "0 12px 6px" }}>
              신상품 둘러보기{" "}
              <span style={{ color: ACCENT, opacity: sideways ? 1 : 0.3 }}>→→</span>
            </div>
            <div style={{ display: "flex", gap: 8, paddingLeft: 12, transform: `translateX(${-x}px)` }}>
              {ITEMS.map((p) => (
                <div key={p.name} style={{ width: 62, flexShrink: 0 }}>
                  <div
                    style={{
                      height: 56,
                      borderRadius: 8,
                      background: p.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                    }}
                  >
                    {p.emoji}
                  </div>
                  <div style={{ fontSize: 7.5, color: INK, marginTop: 4, whiteSpace: "nowrap" }}>{p.name}</div>
                  <div style={{ fontSize: 8, fontWeight: 800, color: INK }}>{p.price}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: "10px 12px", background: SOFT, height: 90 }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: INK, marginBottom: 6 }}>고객 후기 ★4.8</div>
            <Lines n={4} />
          </div>
        </div>
      </Browser>
      <Wheel t={t} on={on} dir={t < 3500 ? 1 : -1} />
    </div>
  );
}
