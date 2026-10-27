"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { Cursor, along, txt } from "./_kit";

const BTNS = [
  { icon: "♡", tip: "찜하기" },
  { icon: "↗", tip: "공유하기" },
  { icon: "🖨", tip: "인쇄하기" },
];
const STEP = 1300;
const GAP = 46; // 버튼 간격

// 커서가 아이콘 위에 머무르면 잠깐 뒤 작은 검은 말풍선으로 이름이 뜸 → 떠나면 사라짐
export default function Tooltip() {
  const t = useLoop(STEP * BTNS.length);
  const active = Math.floor(t / STEP);
  const local = t % STEP;
  const tip = ease(seg(local, 450, 650)) * (1 - seg(local, 1050, 1150));

  // 버튼 묶음 폭 = 3*36 + 2*10 = 128, 화면 가운데 기준 좌표
  const cx = (i: number) => 20 + i * GAP + 18;
  const [x, y] = along(t, [
    [0, cx(0) + 2, 102],
    [300, cx(0) + 2, 92],
    [STEP, cx(0) + 2, 92],
    [STEP + 300, cx(1) + 2, 92],
    [STEP * 2, cx(1) + 2, 92],
    [STEP * 2 + 300, cx(2) + 2, 92],
    [STEP * 3 - 200, cx(2) + 2, 92],
    [STEP * 3, cx(0) + 2, 102],
  ]);

  return (
    <div style={{ position: "relative", width: 172, height: 130 }}>
      <div
        style={{
          position: "absolute",
          left: 10,
          top: 66,
          display: "flex",
          gap: 10,
          background: "#fff",
          borderRadius: 14,
          padding: "6px 10px",
          boxShadow: "0 2px 8px rgba(27,34,54,.08)",
        }}
      >
        {BTNS.map((b, i) => (
          <div
            key={b.tip}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              display: "grid",
              placeItems: "center",
              fontSize: 17,
              color: "var(--color-ink)",
              background: i === active && local > 250 && local < 1100 ? "#EEF1F7" : "transparent",
            }}
          >
            {b.icon}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: cx(active),
          top: 42,
          transform: `translateX(-50%) translateY(${4 * (1 - tip)}px)`,
          opacity: tip,
          background: "#1B2236",
          borderRadius: 6,
          padding: "4px 8px",
          ...txt(10, 700, "#fff"),
        }}
      >
        {BTNS[active].tip}
        <span
          style={{
            position: "absolute",
            left: "50%",
            bottom: -3,
            width: 7,
            height: 7,
            background: "#1B2236",
            transform: "translateX(-50%) rotate(45deg)",
          }}
        />
      </div>
      <Cursor x={x} y={y} o={1} />
    </div>
  );
}
