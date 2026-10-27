"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { ACCENT, Browser, Wheel, io, stage } from "./kit";

const W = 234;
const H = 137;
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const mix = (c1: number[], c2: number[], k: number) =>
  `rgb(${c1.map((v, i) => Math.round(lerp(v, c2[i], k))).join(",")})`;

// 영상 재생 위치 = 스크롤 위치. 내리면 앞으로, 올리면 거꾸로 감긴다
function frame(t: number) {
  if (t < 2300) return io(seg(t, 300, 1900));
  if (t < 3400) return 1 - io(seg(t, 2300, 3100)) * 0.65;
  return 0.35 * (1 - io(seg(t, 3400, 3900)));
}

const BUILDINGS = [
  [6, 40, 26],
  [36, 62, 22],
  [62, 34, 30],
  [96, 70, 24],
  [124, 46, 28],
  [156, 58, 22],
  [182, 38, 26],
  [210, 52, 22],
];

export default function ScrollScrubbedVideo() {
  const t = useLoop(4000);
  const f = frame(t);
  const back = t > 2300 && t < 3100;
  const on = t < 2300 ? seg(t, 200, 300) * (1 - seg(t, 1800, 1950)) : seg(t, 2300, 2400) * (1 - seg(t, 3800, 3900));
  const sec = Math.round(f * 8);

  return (
    <div style={stage}>
      <Browser url="city.co.kr">
        <div style={{ position: "absolute", inset: 0, background: mix([28, 36, 78], [255, 206, 160], f) }} />
        <div
          style={{
            position: "absolute",
            left: 100,
            top: lerp(110, 22, f),
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: mix([255, 160, 90], [255, 236, 150], f),
            boxShadow: `0 0 ${12 + 14 * f}px rgba(255,220,140,${0.4 + 0.4 * f})`,
          }}
        />
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
          {BUILDINGS.map(([x, h, w], i) => (
            <g key={i}>
              <rect x={x} y={H - 18 - h} width={w} height={h + 18} fill={mix([20, 24, 48], [70, 80, 120], f)} />
              {[0, 1, 2].map((r) => (
                <rect
                  key={r}
                  x={x + 5 + (r % 2) * 9}
                  y={H - 12 - h + r * 11}
                  width={4}
                  height={4}
                  fill="#FFE08A"
                  opacity={seg(1 - f, (i % 3) * 0.2, (i % 3) * 0.2 + 0.4)}
                />
              ))}
            </g>
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            left: 10,
            right: 10,
            bottom: 7,
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "#fff",
            fontSize: 7.5,
            fontWeight: 700,
          }}
        >
          <span style={{ width: 22 }}>{back ? "◀◀" : "▶"}</span>
          <div style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,.35)", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${f * 100}%`, background: ACCENT, borderRadius: 2 }} />
            <div
              style={{
                position: "absolute",
                left: `${f * 100}%`,
                top: -3,
                width: 9,
                height: 9,
                marginLeft: -4.5,
                borderRadius: "50%",
                background: "#fff",
              }}
            />
          </div>
          <span>0:0{sec} / 0:08</span>
        </div>
      </Browser>
      <Wheel t={t} on={on} dir={t < 2300 ? 1 : -1} />
    </div>
  );
}
