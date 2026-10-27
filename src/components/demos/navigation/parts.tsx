// 내비게이션 데모들이 함께 쓰는 조각: 폰·브라우저 목업, 가짜 커서, 탭 원, 커서 경로 계산
import type { CSSProperties, ReactNode } from "react";
import { clamp, seg } from "@/lib/loop";

export const INK = "#1B2236";
export const SUB = "#6B7180";
export const ACCENT = "var(--color-accent)";
export const LINE = "#E3E6EE";
export const SOFT = "#EEF1F7";
export const PALE = "#E6EBFD";

/** easeInOutCubic — 커서가 출발·도착할 때 부드럽게 */
export const io = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/** [시각, x, y] 키들 사이를 보간한 커서 위치 */
export type Key = [number, number, number];
export function track(t: number, keys: Key[]): [number, number] {
  if (t <= keys[0][0]) return [keys[0][1], keys[0][2]];
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, x0, y0] = keys[i];
    const [t1, x1, y1] = keys[i + 1];
    if (t < t1) {
      const p = io(seg(t, t0, t1));
      return [x0 + (x1 - x0) * p, y0 + (y1 - y0) * p];
    }
  }
  const l = keys[keys.length - 1];
  return [l[1], l[2]];
}

/** at 시각 이후 d ms 동안 0→1 (페이지 바뀔 때 새 내용이 떠오르는 정도) */
export const fadeIn = (t: number, at: number, d = 260) => seg(t, at, at + d);

/** 마지막으로 지난 클릭 시각과 그때 값 */
export function stateAt<T>(t: number, init: T, clicks: [number, T][]): { v: T; at: number } {
  let v = init;
  let at = -1e9;
  for (const [ct, cv] of clicks) {
    if (t >= ct) {
      v = cv;
      at = ct;
    }
  }
  return { v, at };
}

/** 누르는 순간(at~at+160ms) 커서가 살짝 눌림 */
export const pressed = (t: number, ats: number[]) => ats.some((a) => t >= a && t < a + 160);

export function Phone({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        width: 118,
        height: 168,
        background: "#fff",
        borderRadius: 18,
        border: `3px solid ${INK}`,
        position: "relative",
        overflow: "hidden",
        color: INK,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** 브라우저 창 목업. 안쪽 내용 영역은 246×130 (children 좌표 기준) */
export function Browser({ children, url = "hyogwa.shop" }: { children: ReactNode; url?: string }) {
  return (
    <div
      style={{
        width: 250,
        height: 150,
        background: "#fff",
        borderRadius: 10,
        border: `2px solid ${INK}`,
        overflow: "hidden",
        color: INK,
        boxShadow: "0 4px 14px rgba(27,34,54,.08)",
      }}
    >
      <div
        style={{
          height: 16,
          background: SOFT,
          display: "flex",
          alignItems: "center",
          gap: 3,
          padding: "0 7px",
          borderBottom: `1px solid ${LINE}`,
        }}
      >
        {["#F26B6B", "#F5C04A", "#5BC46A"].map((c) => (
          <i key={c} style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />
        ))}
        <span
          style={{
            marginLeft: 8,
            flex: 1,
            height: 10,
            borderRadius: 5,
            background: "#fff",
            fontSize: 6.5,
            lineHeight: "10px",
            color: SUB,
            padding: "0 6px",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {url}
        </span>
      </div>
      <div style={{ position: "relative", height: 130, overflow: "hidden", fontSize: 9 }}>{children}</div>
    </div>
  );
}

/** 가짜 마우스 커서 (끝이 x,y) */
export function Cursor({ x, y, o = 1, down = false }: { x: number; y: number; o?: number; down?: boolean }) {
  return (
    <svg
      width="12"
      height="15"
      viewBox="0 0 16 20"
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: o,
        transform: `scale(${down ? 0.82 : 1})`,
        transformOrigin: "0 0",
        pointerEvents: "none",
        zIndex: 30,
      }}
    >
      <path d="M1 1 L1 16 L5 12 L8 19 L11 18 L8 11 L14 11 Z" fill={INK} stroke="#fff" strokeWidth="1.3" />
    </svg>
  );
}

/** 손가락 탭/클릭 자리에 퍼지는 반투명 원 */
export function Tap({ x, y, t, at, size = 22 }: { x: number; y: number; t: number; at: number; size?: number }) {
  if (t < at || t > at + 480) return null;
  const p = clamp((t - at) / 480);
  const o = p < 0.33 ? p * 3 : 1 - (p - 0.33) / 0.67;
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
        opacity: o,
        transform: `scale(${0.4 + p * 1.2})`,
        pointerEvents: "none",
        zIndex: 29,
      }}
    />
  );
}

export function Taps({ t, list, size }: { t: number; list: [number, number, number][]; size?: number }) {
  return (
    <>
      {list.map(([at, x, y]) => (
        <Tap key={at} x={x} y={y} t={t} at={at} size={size} />
      ))}
    </>
  );
}

/** 흰 카드 (목업 없이 보여줄 때) */
export const card: CSSProperties = {
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 4px 14px rgba(27,34,54,.08)",
  position: "relative",
  overflow: "hidden",
  color: INK,
};

/** 쇼핑몰 로고 */
export function Logo({ x = 10, y = 0, h = 24 }: { x?: number; y?: number; h?: number }) {
  return (
    <span
      style={{
        position: "absolute",
        left: x,
        top: y,
        height: h,
        lineHeight: `${h}px`,
        fontSize: 10,
        fontWeight: 800,
        color: ACCENT,
        letterSpacing: "-.02em",
      }}
    >
      효과몰
    </span>
  );
}
