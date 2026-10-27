"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { C, Card, Cursor, isDown, path } from "./parts";

const LABELS = ["별로예요", "그저 그래요", "괜찮아요", "좋아요", "최고예요"];
const X0 = 28; // 첫 별 왼쪽 끝
const GAP = 38; // 별 간격
const STAR_Y = 66;
const CLICK = 1600;
const STAR = "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.9l6.6-.8z";

// 4.4초: 별 위를 지나가며 미리 채워짐 → 4번째에서 콕 → '좋아요'로 확정 → 비워지고 반복
export default function StarRating() {
  const t = useLoop(4400);
  const cur = path(t, [
    [0, 40, 125],
    [200, 40, 125],
    [500, X0 + 16, STAR_Y + 4],
    [1400, X0 + 3 * GAP + 16, STAR_Y + 4],
    [2600, X0 + 3 * GAP + 16, STAR_Y + 4],
    [3000, 220, 125],
  ]);
  const co = seg(t, 0, 200) * (1 - seg(t, 2700, 3000));
  const hover = t >= 500 && t < CLICK ? Math.min(5, Math.floor((cur.x - X0) / GAP) + 1) : 0;
  const rated = t >= CLICK;
  const count = rated ? 4 : hover;
  const fade = 1 - seg(t, 3800, 4100);

  return (
    <Card width={240} pad={18} style={{ textAlign: "center" }}>
      <div style={{ fontSize: 13.5, fontWeight: 800, color: C.ink, lineHeight: "20px" }}>배송은 만족스러우셨나요?</div>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 12, height: 32 }}>
        {LABELS.map((l, k) => {
          const on = k < count;
          const at = CLICK + k * 50;
          const pop = rated && on ? 1 + 0.22 * (1 - ease(seg(t, at, at + 260))) * (t >= at ? 1 : 0) : 1;
          return (
            <svg key={l} width="32" height="32" viewBox="0 0 24 24" style={{ transform: `scale(${pop})` }}>
              <path d={STAR} fill="#E3E6EE" />
              <path d={STAR} fill="#FFC633" opacity={on ? (rated ? fade : 0.75) : 0} />
            </svg>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 10,
          height: 20,
          fontSize: 13,
          fontWeight: 700,
          color: rated ? C.acc : C.sub,
          opacity: count ? (rated ? fade : 1) : 0,
        }}
      >
        {count ? LABELS[count - 1] : ""}
      </div>
      <Cursor x={cur.x} y={cur.y} o={co} down={isDown(t, [CLICK])} />
    </Card>
  );
}
