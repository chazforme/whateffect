"use client";

import type { CSSProperties } from "react";

const HEAD = ["날짜", "매체", "노출", "클릭", "비용"];
const ROWS = [
  ["10/21", "네이버", "52,310", "1,204", "₩84만"],
  ["10/22", "유튜브", "88,902", "2,015", "₩132만"],
  ["10/23", "인스타", "41,577", "986", "₩61만"],
  ["10/24", "네이버", "49,880", "1,131", "₩79만"],
  ["10/25", "유튜브", "92,140", "2,240", "₩140만"],
];

const cell: CSSProperties = { padding: "5px 6px", whiteSpace: "nowrap" };

// 칸과 줄을 맞춘 숫자 표: 머리줄 고정색, 줄마다 번갈아 옅은 바탕, 숫자는 오른쪽 정렬
export default function DataTable() {
  return (
    <div
      style={{
        width: 272,
        background: "#fff",
        borderRadius: 9,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(27,34,54,.08)",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 8.5, color: "var(--color-ink)" }}>
        <thead>
          <tr style={{ background: "#1B2236", color: "#fff" }}>
            {HEAD.map((h, i) => (
              <th key={h} style={{ ...cell, fontWeight: 700, textAlign: i < 2 ? "left" : "right" }}>
                {h}
                {h === "비용" && " ▾"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r, k) => (
            <tr key={k} style={{ background: k % 2 ? "#F4F6FA" : "#fff" }}>
              {r.map((v, i) => (
                <td
                  key={i}
                  style={{
                    ...cell,
                    textAlign: i < 2 ? "left" : "right",
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: i === 4 ? 700 : 500,
                    color: i === 0 ? "#6B7180" : "var(--color-ink)",
                  }}
                >
                  {v}
                </td>
              ))}
            </tr>
          ))}
          <tr style={{ borderTop: "1.5px solid #1B2236" }}>
            <td style={{ ...cell, fontWeight: 800 }} colSpan={2}>
              합계
            </td>
            <td style={{ ...cell, textAlign: "right", fontWeight: 800 }}>324,809</td>
            <td style={{ ...cell, textAlign: "right", fontWeight: 800 }}>7,576</td>
            <td style={{ ...cell, textAlign: "right", fontWeight: 800, color: "var(--color-accent)" }}>₩496만</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
