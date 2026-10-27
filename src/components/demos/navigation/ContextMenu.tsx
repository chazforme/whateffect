"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { Browser, Cursor, INK, LINE, PALE, SOFT, SUB, Tap, track } from "./parts";

const FILES: [string, string][] = [
  ["회의록.docx", "#C9D6FB"],
  ["사진.jpg", "#FCD9C4"],
  ["예산.xlsx", "#CDEFD9"],
];
const ITEMS = ["열기", "공유하기", "이름 바꾸기", "삭제"];
const MX = 120; // 메뉴가 뜨는 자리 = 오른쪽 클릭한 자리
const MY = 50;
const IH = 15;
const itemY = (i: number) => MY + 4 + IH * i + (i === 3 ? 5 : 0);

// 4초: 파일 위에서 오른쪽 클릭 → 바로 그 자리에 메뉴 → 항목을 훑고 고르면 닫힘
export default function ContextMenu() {
  const t = useLoop(4000);
  const open = t < 2650 ? ease(seg(t, 950, 1100)) : 1 - ease(seg(t, 2650, 2800));
  const [x, y] = track(t, [
    [0, 40, 110],
    [700, MX, MY],
    [1300, MX, MY],
    [1800, MX + 30, itemY(1) + 7],
    [2100, MX + 30, itemY(2) + 7],
    [2700, MX + 30, itemY(2) + 7],
    [3600, 40, 110],
  ]);
  const hover = open > 0.5 && t > 1500 ? (y < itemY(1) ? 0 : y < itemY(2) ? 1 : y < itemY(3) ? 2 : 3) : -1;
  const sel = t > 650 && t < 3300;
  const label = seg(t, 900, 1000) * (1 - seg(t, 1400, 1600));

  return (
    <Browser url="drive.hyogwa.shop">
      <div style={{ position: "absolute", left: 12, top: 8, fontSize: 10, fontWeight: 800 }}>내 드라이브</div>
      {FILES.map(([n, c], i) => (
        <div
          key={n}
          style={{
            position: "absolute",
            left: 12 + i * 78,
            top: 28,
            width: 68,
            height: 62,
            borderRadius: 8,
            border: `1.5px solid ${i === 1 && sel ? "var(--color-accent)" : LINE}`,
            background: i === 1 && sel ? PALE : "#fff",
            padding: 6,
          }}
        >
          <div style={{ height: 32, borderRadius: 5, background: c }} />
          <div style={{ fontSize: 7.5, fontWeight: 700, marginTop: 5, color: INK }}>{n}</div>
        </div>
      ))}
      <div style={{ position: "absolute", left: 12, top: 100, fontSize: 7.5, color: SUB }}>파일 3개 · 2.4MB</div>
      <div
        style={{
          position: "absolute",
          left: MX + 2,
          top: MY + 2,
          width: 76,
          padding: "3px 0",
          background: "#fff",
          borderRadius: 7,
          border: `1px solid ${LINE}`,
          boxShadow: "0 6px 16px rgba(27,34,54,.18)",
          opacity: open,
          transform: `scale(${0.92 + 0.08 * open})`,
          transformOrigin: "0 0",
          zIndex: 5,
        }}
      >
        {ITEMS.map((s, i) => (
          <div
            key={s}
            style={{
              height: IH,
              lineHeight: `${IH}px`,
              padding: "0 8px",
              fontSize: 8.5,
              fontWeight: 600,
              marginTop: i === 3 ? 5 : 0,
              borderTop: i === 3 ? `1px solid ${LINE}` : "none",
              background: hover === i ? SOFT : "transparent",
              color: i === 3 ? "#E5484D" : INK,
            }}
          >
            {s}
          </div>
        ))}
      </div>
      <span
        style={{
          position: "absolute",
          left: MX - 38,
          top: MY - 16,
          fontSize: 7,
          fontWeight: 800,
          color: "#fff",
          background: INK,
          borderRadius: 4,
          padding: "1px 4px",
          opacity: label,
          zIndex: 6,
        }}
      >
        우클릭
      </span>
      <Tap x={MX} y={MY} t={t} at={900} size={18} />
      <Tap x={MX + 30} y={itemY(2) + 7} t={t} at={2550} size={16} />
      <Cursor x={x} y={y} down={(t > 900 && t < 1060) || (t > 2550 && t < 2710)} />
    </Browser>
  );
}
