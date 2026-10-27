import type { CSSProperties, ReactNode } from "react";
import { ease, seg } from "@/lib/loop";

// 오버레이 주제 데모들이 같이 쓰는 목업·커서·손가락·시간 도우미

/** a→b 동안 0→1로 들어오고, c→d 동안 1→0으로 나가는 값 (ease 적용) */
export const inOut = (t: number, a: number, b: number, c: number, d: number) =>
  ease(seg(t, a, b)) * (1 - ease(seg(t, c, d)));

/** [시각, x, y] 지점들을 이어서 t일 때 위치 */
export function along(t: number, pts: [number, number, number][]): [number, number] {
  if (t <= pts[0][0]) return [pts[0][1], pts[0][2]];
  for (let i = 1; i < pts.length; i++) {
    const [t1, x1, y1] = pts[i];
    const [t0, x0, y0] = pts[i - 1];
    if (t <= t1) {
      const p = ease(seg(t, t0, t1));
      return [x0 + (x1 - x0) * p, y0 + (y1 - y0) * p];
    }
  }
  const last = pts[pts.length - 1];
  return [last[1], last[2]];
}

export const ink = "var(--color-ink)";
export const accent = "var(--color-accent)";
export const sub = "#6B7180";

export const txt = (size: number, weight = 600, color: string = ink): CSSProperties => ({
  fontSize: size,
  fontWeight: weight,
  color,
  letterSpacing: "-.02em",
  lineHeight: 1.35,
  whiteSpace: "nowrap",
});

/** 작은 폰 118×168 (안쪽 112×162) */
export function Phone({ children, bg = "#fff" }: { children: ReactNode; bg?: string }) {
  return (
    <div
      style={{
        width: 118,
        height: 168,
        background: bg,
        borderRadius: 18,
        border: "3px solid #1B2236",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

/** 브라우저 창 목업. 내용 영역은 (w-4) × (h-22) */
export function Browser({
  children,
  w = 252,
  h = 160,
  url = "inno-mall.kr",
}: {
  children: ReactNode;
  w?: number;
  h?: number;
  url?: string;
}) {
  return (
    <div
      style={{
        width: w,
        height: h,
        background: "#fff",
        borderRadius: 10,
        border: "2px solid #1B2236",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          height: 18,
          background: "#EEF1F7",
          display: "flex",
          alignItems: "center",
          gap: 3,
          padding: "0 7px",
          flexShrink: 0,
        }}
      >
        {["#F2716B", "#F5C451", "#5CC97B"].map((c) => (
          <i key={c} style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />
        ))}
        <span
          style={{
            ...txt(7, 500, "#8A90A0"),
            marginLeft: 8,
            background: "#fff",
            borderRadius: 4,
            padding: "1px 8px",
            flex: 1,
          }}
        >
          {url}
        </span>
      </div>
      <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>{children}</div>
    </div>
  );
}

/** 화면을 어둡게 덮는 층 */
export function Dim({ o, color = "rgba(15,20,35,.45)" }: { o: number; color?: string }) {
  return <div style={{ position: "absolute", inset: 0, background: color, opacity: o, pointerEvents: "none" }} />;
}

/** 가짜 화살표 커서. (x, y)가 화살표 끝 */
export function Cursor({ x, y, o = 1, press = 0 }: { x: number; y: number; o?: number; press?: number }) {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 16 20"
      style={{
        position: "absolute",
        left: x - 1,
        top: y - 1,
        opacity: o,
        transform: `scale(${1 - press * 0.15})`,
        transformOrigin: "1px 1px",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      <path d="M1 1 L1 16 L5 12 L8 19 L11 18 L8 11 L14 11 Z" fill="#1B2236" stroke="#fff" strokeWidth="1.2" />
    </svg>
  );
}

/** 클릭 순간 눌림 정도 (at 전후 0→1→0) */
export const pressAt = (t: number, at: number) => (t < at - 80 || t > at + 160 ? 0 : t < at ? seg(t, at - 80, at) : 1 - seg(t, at, at + 160));

/** 손가락 탭(반투명 원). at부터 0.48초 동안 퍼지며 사라짐 — BottomSheet와 같은 모양 */
export function Tap({ t, at, x, y }: { t: number; at: number; x: number; y: number }) {
  const tp = seg(t, at, at + 480);
  const o = t < at || tp >= 1 ? 0 : tp < 0.33 ? tp * 3 : 1 - (tp - 0.33) / 0.67;
  const s = 0.4 + tp * 1.2;
  return (
    <div
      style={{
        position: "absolute",
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: "rgba(58,91,239,.35)",
        left: x - 11,
        top: y - 11,
        opacity: o,
        transform: `scale(${s})`,
        zIndex: 20,
        pointerEvents: "none",
      }}
    />
  );
}

/** 폰 안 상단 제목줄 */
export function AppBar({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div
      style={{
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 9px",
        borderBottom: "1px solid #EEF1F7",
      }}
    >
      <span style={txt(8.5, 800)}>{title}</span>
      {right}
    </div>
  );
}

/** 회색 글줄 (배경 내용용) */
export const line = (w: number | string, h = 5, bg = "#E3E6EE"): CSSProperties => ({
  width: w,
  height: h,
  borderRadius: 3,
  background: bg,
});
