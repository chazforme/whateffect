// 입력·폼 데모들이 같이 쓰는 조각: 흰 카드, 입력칸 모양, 깜빡이는 커서, 가짜 마우스, 탭 동그라미
import type { CSSProperties, ReactNode } from "react";
import { ease, seg } from "@/lib/loop";

export const C = {
  ink: "#1B2236",
  sub: "#6B7180",
  faint: "#A3A9B6",
  acc: "#3A5BEF",
  line: "#D5D9E2",
  soft: "#EEF1F7",
  tint: "#EEF2FE",
  red: "#E5484D",
  green: "#16A34A",
};

export function Card({
  width = 240,
  height,
  pad = 16,
  children,
  style,
}: {
  width?: number;
  height?: number;
  pad?: number | string;
  children?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        padding: pad,
        boxSizing: "border-box",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 14px rgba(27,34,54,.08)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** div로 그린 입력칸 */
export const field = (border: string, h = 38): CSSProperties => ({
  position: "relative",
  height: h,
  border: `1.5px solid ${border}`,
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  padding: "0 12px",
  boxSizing: "border-box",
  fontSize: 14,
  fontWeight: 600,
  color: C.ink,
  background: "#fff",
  whiteSpace: "nowrap",
  overflow: "hidden",
});

export const label: CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  color: C.sub,
  lineHeight: "16px",
  marginBottom: 5,
  whiteSpace: "nowrap",
};

/** 글 쓰는 자리 표시 (0.5초마다 깜빡) */
export function Caret({ t, show, h = 17 }: { t: number; show: boolean; h?: number }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 1.5,
        height: h,
        background: C.acc,
        marginLeft: 1,
        verticalAlign: "middle",
        opacity: show && Math.floor(t / 500) % 2 === 0 ? 1 : 0,
      }}
    />
  );
}

/** 가짜 마우스 화살표. (x, y)가 화살표 끝 */
export function Cursor({ x, y, o = 1, down = false }: { x: number; y: number; o?: number; down?: boolean }) {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      style={{
        position: "absolute",
        left: x - 1,
        top: y - 1,
        opacity: o,
        zIndex: 5,
        pointerEvents: "none",
        transform: down ? "scale(.86)" : undefined,
        transformOrigin: "1px 1px",
      }}
    >
      <path d="M1 1 L1 16 L5 12 L8 19 L11 18 L8 11 L14 11 Z" fill="#1B2236" stroke="#fff" strokeWidth="1.2" />
    </svg>
  );
}

/** 누른 자리에 퍼지는 반투명 동그라미 (at 시각에 누름) */
export function Tap({ x, y, t, at, size = 26 }: { x: number; y: number; t: number; at: number; size?: number }) {
  const p = seg(t, at - 100, at + 380);
  if (p <= 0 || p >= 1) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(58,91,239,.35)",
        opacity: p < 0.3 ? p / 0.3 : 1 - (p - 0.3) / 0.7,
        transform: `scale(${0.4 + p * 1.1})`,
        zIndex: 4,
        pointerEvents: "none",
      }}
    />
  );
}

/** start부터 step 간격으로 한 글자씩 */
export function typed(s: string, t: number, start: number, step: number): string {
  if (t < start) return "";
  return s.slice(0, Math.min(s.length, Math.floor((t - start) / step) + 1));
}

export type Key = [number, number, number]; // [시각, x, y]

/** 시각별 지점을 부드럽게 이어 커서 위치 계산 */
export function path(t: number, keys: Key[]): { x: number; y: number } {
  if (t <= keys[0][0]) return { x: keys[0][1], y: keys[0][2] };
  for (let i = 0; i < keys.length - 1; i++) {
    const [a, x1, y1] = keys[i];
    const [b, x2, y2] = keys[i + 1];
    if (t < b) {
      const p = ease(seg(t, a, b));
      return { x: x1 + (x2 - x1) * p, y: y1 + (y2 - y1) * p };
    }
  }
  const last = keys[keys.length - 1];
  return { x: last[1], y: last[2] };
}

/** 누르는 순간(0.16초) 동안 true */
export const isDown = (t: number, ats: number[]) => ats.some((a) => t >= a && t < a + 160);

/** ₩12,900 형식 (toLocaleString은 서버·브라우저 차이가 있어 직접) */
export const won = (n: number) => "₩" + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
