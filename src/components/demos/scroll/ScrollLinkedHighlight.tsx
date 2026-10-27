"use client";

import { useLoop } from "@/hooks/useLoop";
import { clamp, seg } from "@/lib/loop";
import { Browser, INK, Scrollbar, Wheel, prog, stage } from "./kit";

const LINES = [
  ["매일", "쓰는", "물건을"],
  ["조금", "더", "오래,"],
  ["조금", "더", "아름답게."],
];
const N = LINES.flat().length;

// 휠을 굴린 만큼 흐린 단어가 앞에서부터 하나씩 진해짐 (되돌리면 다시 흐려짐)
export default function ScrollLinkedHighlight() {
  const t = useLoop(4200);
  const p = prog(t, 300, 2900, 3500, 4000);
  const s = p * N;
  const on = t < 3500 ? seg(t, 200, 300) * (1 - seg(t, 2800, 2950)) : seg(t, 3500, 3600) * (1 - seg(t, 3900, 4000));
  let k = 0;

  return (
    <div style={stage}>
      <Browser url="brand.co.kr/story">
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 18px",
            gap: 2,
          }}
        >
          {LINES.map((ws, li) => (
            <div key={li} style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-.02em", whiteSpace: "nowrap" }}>
              {ws.map((w, wi) => {
                const i = k++;
                const o = 0.16 + 0.84 * clamp(s - i);
                return (
                  <span key={wi} style={{ color: INK, opacity: o, marginRight: 5 }}>
                    {w}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
        <Scrollbar p={p} ratio={0.3} />
      </Browser>
      <Wheel t={t} on={on} dir={t < 3500 ? 1 : -1} />
    </div>
  );
}
