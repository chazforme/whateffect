// 스크롤 주제 데모들이 같이 쓰는 목업(폰·브라우저)과 표시기(휠·손가락).
// 진짜 스크롤은 쓰지 않는다. overflow:hidden 안에서 translateY를 t로 계산해 가짜로 움직인다.

import type { CSSProperties, ReactNode } from "react";
import { seg } from "@/lib/loop";

export const INK = "#1B2236";
export const SUB = "#6B7180";
export const ACCENT = "#3A5BEF";
export const LINE = "#E3E6EE";
export const SOFT = "#EEF1F7";

/** easeInOutCubic: 스크롤이 부드럽게 출발해서 부드럽게 멈춘다 */
export const io = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/** 기본 스크롤 곡선(0~1). a~b 동안 내려가고, c~d 동안 맨 위로 돌아온다 */
export function prog(t: number, a = 400, b = 2600, c = 3350, d = 3850): number {
  if (t < c) return io(seg(t, a, b));
  return 1 - io(seg(t, c, d));
}

/** f(t)가 처음으로 threshold 이상이 되는 시각 (스크롤 위치가 정해져 있으니 미리 계산 가능) */
export function firstTime(f: (t: number) => number, threshold: number, period: number): number {
  for (let t = 0; t <= period; t += 10) if (f(t) >= threshold) return t;
  return Infinity;
}

/** 폰 목업 바깥 118×168, 안쪽 112×162 */
export const PHONE_W = 112;
export const PHONE_H = 162;

export function Phone({ children, bg = "#fff" }: { children: ReactNode; bg?: string }) {
  return (
    <div
      style={{
        width: 118,
        height: 168,
        flexShrink: 0,
        background: bg,
        borderRadius: 18,
        border: `3px solid ${INK}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

/** 브라우저 창 목업. 안쪽 본문 높이 = h - 20 */
export function Browser({
  children,
  w = 236,
  h = 158,
  url = "shop.co.kr",
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
        flexShrink: 0,
        background: "#fff",
        borderRadius: 10,
        border: "1px solid #D5D9E2",
        boxShadow: "0 4px 14px rgba(27,34,54,.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 18,
          background: SOFT,
          display: "flex",
          alignItems: "center",
          gap: 3,
          padding: "0 7px",
          borderBottom: `1px solid ${LINE}`,
        }}
      >
        {["#F2A7A7", "#F3D38B", "#A9D9A4"].map((c) => (
          <i key={c} style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />
        ))}
        <span
          style={{
            marginLeft: 8,
            flex: 1,
            height: 10,
            borderRadius: 5,
            background: "#fff",
            fontSize: 7,
            lineHeight: "10px",
            color: SUB,
            paddingLeft: 6,
            fontStyle: "normal",
          }}
        >
          {url}
        </span>
      </div>
      <div style={{ position: "absolute", top: 19, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

/** 마우스 휠 표시기. on(0~1)이면 휠이 굴러가고 화살표가 보인다. dir: 1 아래, -1 위 */
export function Wheel({ t, on, dir = 1 }: { t: number; on: number; dir?: 1 | -1 }) {
  const ph = (t / 260) % 1;
  const off = on > 0.05 ? (dir === 1 ? ph : 1 - ph) * 5 : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, width: 20 }}>
      <svg width="16" height="26" viewBox="0 0 16 26" style={{ opacity: on > 0.05 ? 0.4 + 0.6 * on : 0.35 }}>
        <rect x="1" y="1" width="14" height="24" rx="7" fill="#fff" stroke={INK} strokeWidth="1.5" />
        <rect x="6.8" y={5 + off} width="2.4" height="5" rx="1.2" fill={ACCENT} />
      </svg>
      <svg
        width="10"
        height="8"
        viewBox="0 0 10 8"
        style={{ opacity: on, transform: dir === 1 ? undefined : "rotate(180deg)" }}
      >
        <path d="M1 1.5 L5 6 L9 1.5" fill="none" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/** 반투명 손가락(원). 폰 안 좌표 */
export function Finger({ x, y, o, s = 1 }: { x: number; y: number; o: number; s?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x - 11,
        top: y - 11,
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: "rgba(58,91,239,.32)",
        border: "1.5px solid rgba(58,91,239,.55)",
        opacity: o,
        transform: `scale(${s})`,
        zIndex: 20,
        pointerEvents: "none",
      }}
    />
  );
}

/** 가짜 마우스 커서(화살표) */
export function Cursor({ x, y, o = 1 }: { x: number; y: number; o?: number }) {
  return (
    <svg
      width="13"
      height="17"
      viewBox="0 0 16 20"
      style={{ position: "absolute", left: x, top: y, opacity: o, zIndex: 20, pointerEvents: "none" }}
    >
      <path d="M1 1 L1 16 L5 12 L8 19 L11 18 L8 11 L14 11 Z" fill={INK} stroke="#fff" strokeWidth="1.2" />
    </svg>
  );
}

/** 오른쪽 얇은 스크롤바. p: 0~1 위치, ratio: 손잡이 길이 비율 */
export function Scrollbar({ p, ratio = 0.3, o = 1 }: { p: number; ratio?: number; o?: number }) {
  return (
    <div style={{ position: "absolute", right: 2, top: 3, bottom: 3, width: 3, zIndex: 15, opacity: o }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          width: 3,
          borderRadius: 2,
          background: "rgba(27,34,54,.28)",
          height: `${ratio * 100}%`,
          top: `${p * (1 - ratio) * 100}%`,
        }}
      />
    </div>
  );
}

/** 목업 + 오른쪽 표시기를 나란히 */
export const stage: CSSProperties = { display: "flex", alignItems: "center", gap: 12 };

/** 줄글을 대신하는 회색 줄 (본문 분위기만 낼 때) */
export function Lines({ n, w = [100, 92, 96, 70], gap = 4, h = 4 }: { n: number; w?: number[]; gap?: number; h?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {Array.from({ length: n }, (_, i) => (
        <div key={i} style={{ height: h, borderRadius: 2, background: LINE, width: `${w[i % w.length]}%` }} />
      ))}
    </div>
  );
}

export type Product = { name: string; price: string; emoji: string; bg: string };

export const PRODUCTS: Product[] = [
  { name: "린넨 셔츠", price: "₩29,900", emoji: "👕", bg: "#DCE4FD" },
  { name: "데일리 운동화", price: "₩59,000", emoji: "👟", bg: "#FDE2D8" },
  { name: "캔버스 에코백", price: "₩15,900", emoji: "👜", bg: "#DDF3E4" },
  { name: "무선 이어폰", price: "₩89,000", emoji: "🎧", bg: "#EADFFB" },
  { name: "텀블러 500ml", price: "₩18,500", emoji: "🥤", bg: "#FFF1C9" },
  { name: "울 니트", price: "₩45,000", emoji: "🧶", bg: "#FBDDEB" },
  { name: "선글라스", price: "₩32,000", emoji: "🕶️", bg: "#D6EEF6" },
  { name: "캠핑 의자", price: "₩39,900", emoji: "🪑", bg: "#E7EBD6" },
  { name: "향초 세트", price: "₩21,000", emoji: "🕯️", bg: "#FCE8D2" },
  { name: "가죽 지갑", price: "₩49,000", emoji: "👛", bg: "#E4E0F5" },
  { name: "머그컵", price: "₩12,900", emoji: "☕", bg: "#F0E4DA" },
  { name: "우산", price: "₩16,000", emoji: "☂️", bg: "#DCEFF8" },
];

/** 상품 한 줄 (폰용). 높이 34 */
export const ROW_H = 34;
export function ProductRow({ p, style }: { p: Product; style?: CSSProperties }) {
  return (
    <div
      style={{
        height: ROW_H,
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "0 8px",
        borderBottom: `1px solid ${SOFT}`,
        ...style,
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: 6,
          background: p.bg,
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {p.emoji}
      </div>
      <div style={{ lineHeight: 1.2, minWidth: 0 }}>
        <div style={{ fontSize: 8.5, fontWeight: 600, color: INK, whiteSpace: "nowrap" }}>{p.name}</div>
        <div style={{ fontSize: 8.5, fontWeight: 800, color: INK }}>{p.price}</div>
      </div>
    </div>
  );
}
