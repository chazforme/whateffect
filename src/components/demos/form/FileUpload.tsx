"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { C, Cursor, path } from "./parts";

function PdfIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size * 0.82} height={size} viewBox="0 0 18 22">
      <path d="M2 1 H12 L17 6 V20 a1 1 0 0 1 -1 1 H2 a1 1 0 0 1 -1 -1 V2 a1 1 0 0 1 1 -1 Z" fill="#fff" stroke={C.line} />
      <path d="M12 1 V6 H17" fill="none" stroke={C.line} />
      <rect x="0" y="11" width="13" height="6" rx="1.5" fill={C.red} />
      <text x="6.5" y="15.8" textAnchor="middle" fontSize="4.6" fontWeight="800" fill="#fff">
        PDF
      </text>
    </svg>
  );
}

// 4.6초: 파일을 점선 칸 위로 끌고 옴 → 칸이 파랗게 → 놓으면 아래 목록에 올라감
export default function FileUpload() {
  const t = useLoop(4600);
  const cur = path(t, [
    [0, 175, 140],
    [300, 175, 140],
    [1200, 110, 60],
    [1700, 110, 60],
    [2100, 240, 150],
  ]);
  const co = seg(t, 0, 250) * (1 - seg(t, 1800, 2100));
  const over = t >= 1000 && t < 1500;
  const drop = seg(t, 1500, 1700);
  const chipO = seg(t, 0, 250) * (1 - drop);
  const row = ease(seg(t, 1700, 1950)) * (1 - seg(t, 3900, 4400));
  const prog = ease(seg(t, 1750, 2600));

  return (
    <div style={{ position: "relative", width: 230, height: 160 }}>
      <div
        style={{
          height: 108,
          borderRadius: 14,
          border: `2px dashed ${over ? C.acc : "#C5CBD8"}`,
          background: over ? C.tint : "#fff",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path
            d="M12 16 V5 M7 9.5 L12 4.5 L17 9.5 M4 15 V19 H20 V15"
            fill="none"
            stroke={over ? C.acc : C.sub}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: over ? C.acc : C.ink, whiteSpace: "nowrap" }}>
          {over ? "여기에 놓으면 올라가요" : "파일을 여기로 끌어다 놓으세요"}
        </div>
        <div style={{ fontSize: 11, fontWeight: 500, color: C.faint }}>PDF·JPG, 10MB까지</div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 116,
          left: 0,
          right: 0,
          height: 40,
          borderRadius: 10,
          background: "#fff",
          boxShadow: "0 2px 8px rgba(27,34,54,.08)",
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "0 11px",
          boxSizing: "border-box",
          opacity: row,
          transform: `translateY(${(1 - row) * 8}px)`,
        }}
      >
        <PdfIcon />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", fontSize: 12.5, fontWeight: 700, color: C.ink, lineHeight: "16px" }}>
            견적서.pdf
            <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 500, color: C.faint }}>1.2MB</span>
          </div>
          <div style={{ marginTop: 4, height: 4, borderRadius: 2, background: C.soft }}>
            <div style={{ width: `${prog * 100}%`, height: 4, borderRadius: 2, background: C.acc }} />
          </div>
        </div>
        <span style={{ fontSize: 14, fontWeight: 800, color: C.green, opacity: seg(t, 2600, 2750) }}>✓</span>
      </div>

      <div
        style={{
          position: "absolute",
          left: cur.x - 28,
          top: cur.y - 14,
          display: "flex",
          alignItems: "center",
          gap: 5,
          padding: "5px 9px 5px 6px",
          borderRadius: 8,
          background: "#fff",
          boxShadow: "0 6px 16px rgba(27,34,54,.18)",
          fontSize: 12,
          fontWeight: 700,
          color: C.ink,
          whiteSpace: "nowrap",
          opacity: chipO,
          transform: `scale(${1 - 0.3 * drop}) rotate(-4deg)`,
          zIndex: 3,
        }}
      >
        <PdfIcon size={18} />
        견적서.pdf
      </div>
      <Cursor x={cur.x} y={cur.y} o={co} />
    </div>
  );
}
