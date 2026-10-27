"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";

const KINDS = [
  { icon: "i", text: "영수증을 PDF로 받을 수 있어요", bg: "#E9EFFD", fg: "#2846C9" },
  { icon: "!", text: "연휴엔 배송이 1~2일 늦어져요", bg: "#FFF3D6", fg: "#9A6400" },
  { icon: "✕", text: "결제 실패 · 카드를 확인해 주세요", bg: "#FDE8E8", fg: "#C23030" },
];
const STEP = 1500;
const ORDERS = ["10/24  무선 이어폰 · 배송완료", "10/19  캠핑 의자 · 배송완료"];

// 4.5초 주기: 같은 자리에 안내(파랑) → 주의(노랑) → 실패(빨강) 띠가 차례로 바뀜
export default function InlineAlert() {
  const t = useLoop(STEP * KINDS.length);
  const k = KINDS[Math.floor(t / STEP)];
  const local = t % STEP;
  const inn = ease(seg(local, 0, 280));
  const o = local < 1250 ? inn : 1 - seg(local, 1250, 1500);

  return (
    <div
      style={{
        width: 260,
        background: "#fff",
        borderRadius: 14,
        padding: 14,
        boxShadow: "0 2px 8px rgba(27,34,54,.06)",
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 800, color: "var(--color-ink)", marginBottom: 10 }}>내 주문</div>
      <div style={{ height: 34, marginBottom: 10 }}>
        <div
          style={{
            height: 34,
            borderRadius: 8,
            background: k.bg,
            color: k.fg,
            borderLeft: `4px solid ${k.fg}`,
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "0 9px",
            fontSize: 11.5,
            fontWeight: 700,
            whiteSpace: "nowrap",
            opacity: o,
            transform: `translateY(${-6 * (1 - inn)}px)`,
          }}
        >
          <span
            style={{
              width: 15,
              height: 15,
              borderRadius: "50%",
              background: k.fg,
              color: "#fff",
              fontSize: 9,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {k.icon}
          </span>
          <span style={{ flex: 1 }}>{k.text}</span>
          <span style={{ opacity: 0.6, fontSize: 10 }}>✕</span>
        </div>
      </div>
      {ORDERS.map((r) => (
        <div
          key={r}
          style={{ fontSize: 11, color: "#6B7180", padding: "6px 0", borderTop: "1px solid #EEF1F7" }}
        >
          {r}
        </div>
      ))}
    </div>
  );
}
