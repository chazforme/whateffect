"use client";

import { useLoop } from "@/hooks/useLoop";
import { ease, seg } from "@/lib/loop";
import { C, Card, Tap } from "./parts";

const ROWS: [string, string, number, number][] = [
  // 이름, 설명, 켜는 시각, 끄는 시각
  ["푸시 알림", "주문·배송 소식", 600, 2800],
  ["마케팅 알림", "할인·이벤트 소식", 1400, 3600],
];

// 4.4초: 손가락으로 스위치를 톡 → 동그라미가 옮겨가며 파랗게 켜짐 → 다시 끔
export default function ToggleSwitch() {
  const t = useLoop(4400);

  return (
    <Card width={240} pad="6px 16px">
      {ROWS.map(([name, desc, on, off], i) => {
        const p = t < off ? ease(seg(t, on, on + 250)) : 1 - ease(seg(t, off, off + 250));
        return (
          <div
            key={name}
            style={{
              height: 52,
              display: "flex",
              alignItems: "center",
              borderTop: i ? `1px solid ${C.soft}` : undefined,
              boxSizing: "border-box",
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, lineHeight: "19px" }}>{name}</div>
              <div style={{ fontSize: 11.5, fontWeight: 500, color: C.sub, lineHeight: "16px" }}>{desc}</div>
            </div>
            <div
              style={{
                position: "relative",
                marginLeft: "auto",
                width: 44,
                height: 26,
                borderRadius: 13,
                background: C.line,
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: C.acc, opacity: p }} />
              <div
                style={{
                  position: "absolute",
                  top: 2,
                  left: 2 + p * 18,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "#fff",
                  boxShadow: "0 1px 3px rgba(27,34,54,.25)",
                }}
              />
            </div>
          </div>
        );
      })}
      {ROWS.map(([name, , on, off], i) => (
        <span key={name}>
          <Tap x={202} y={32 + i * 52} t={t} at={on} size={30} />
          <Tap x={202} y={32 + i * 52} t={t} at={off} size={30} />
        </span>
      ))}
    </Card>
  );
}
