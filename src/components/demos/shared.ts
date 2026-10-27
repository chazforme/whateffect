import type { CSSProperties } from "react";

/** 데모 안 큰 글자 기본 스타일 (시안의 타이핑 효과와 같은 톤) */
export const big: CSSProperties = {
  fontSize: 30,
  fontWeight: 800,
  letterSpacing: "-.02em",
  color: "var(--color-ink)",
  whiteSpace: "nowrap",
  lineHeight: 1.25,
};
