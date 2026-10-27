import type { CSSProperties } from "react";

// 모든 스타일 카드가 같은 내용을 쓴다 → 스타일끼리 나란히 비교하기 쉽게
export const LABEL = "이번 달 지출";
export const AMOUNT = "₩482,000";
export const SUB = "지난달보다 12% 덜 썼어요";
export const BTN = "내역 보기";

/** 데모 전체 틀: 280×170 안에 자기 배경을 그린다 */
export const frame: CSSProperties = {
  position: "relative",
  width: 280,
  height: 170,
  borderRadius: 16,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
};

/** "#RRGGBB" 두 색을 k(0~1)만큼 섞는다 */
export function mix(a: string, b: string, k: number): string {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * k)).join(",")})`;
}
