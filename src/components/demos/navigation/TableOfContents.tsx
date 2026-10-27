"use client";

import { useLoop } from "@/hooks/useLoop";
import { seg } from "@/lib/loop";
import { ACCENT, Browser, Cursor, INK, LINE, SUB, Taps, io, pressed, stateAt, track } from "./parts";

const HEADS = ["1. 회사 소개", "2. 서비스", "3. 요금 안내", "4. 문의하기"];
const LINES = [
  ["2010년 서울에서 시작했어요", "직원 120명이 함께해요"],
  ["홈페이지 제작", "카드뉴스 디자인"],
  ["기본 월 9만 원", "프리미엄 월 19만 원"],
  ["help@hyogwa.shop", "평일 9시~18시"],
];
const SEC = 46; // 문단 하나 높이
const IY = 30; // 목차 첫 항목 위치
const IH = 16;
const iy = (i: number) => IY + IH * i + IH / 2;
const CLICKS: [number, number][] = [
  [900, 2],
  [2900, 0],
];

// 4.4초: 왼쪽 목차에서 '3. 요금 안내'를 누르면 글이 그 부분으로 바로 이동하고, 다시 '1.'을 누르면 처음으로
export default function TableOfContents() {
  const t = useLoop(4400);
  const { v: act, at } = stateAt(t, 0, CLICKS);
  const prev = stateAt(at - 1, 0, CLICKS).v;
  const pos = SEC * (prev + (act - prev) * io(seg(t, at, at + 550)));
  const flash = act === 2 ? seg(t, 1450, 1650) * (1 - seg(t, 2300, 2700)) : 0;
  const [x, y] = track(t, [
    [0, 42, iy(0)],
    [400, 42, iy(0)],
    [800, 42, iy(2)],
    [1100, 42, iy(2)],
    [2700, 42, iy(0)],
  ]);

  return (
    <Browser url="hyogwa.shop/about">
      <div style={{ position: "absolute", left: 8, top: 8, width: 76, bottom: 8, borderRadius: 7, background: "#F6F7FB", border: `1px solid ${LINE}` }}>
        <div style={{ padding: "6px 8px 0", fontSize: 9, fontWeight: 800 }}>목차</div>
      </div>
      {HEADS.map((h, i) => (
        <span
          key={h}
          style={{
            position: "absolute",
            left: 16,
            top: IY + IH * i,
            lineHeight: `${IH}px`,
            fontSize: 8,
            fontWeight: i === act ? 800 : 500,
            color: i === act ? ACCENT : SUB,
          }}
        >
          {h}
        </span>
      ))}
      <div style={{ position: "absolute", left: 94, right: 8, top: 0, bottom: 0, overflow: "hidden" }}>
        <div style={{ transform: `translateY(${-pos}px)`, paddingTop: 8 }}>
          {HEADS.map((h, i) => (
            <div key={h} style={{ height: SEC }}>
              <div
                style={{
                  display: "inline-block",
                  fontSize: 10,
                  fontWeight: 800,
                  color: INK,
                  padding: "1px 3px",
                  marginLeft: -3,
                  borderRadius: 3,
                  background: i === 2 ? `rgba(255,214,90,${0.7 * flash})` : "transparent",
                }}
              >
                {h}
              </div>
              {LINES[i].map((l) => (
                <div key={l} style={{ fontSize: 8, color: SUB, lineHeight: "12px" }}>
                  {l}
                </div>
              ))}
            </div>
          ))}
          <div style={{ height: 80 }} />
        </div>
      </div>
      <Taps t={t} list={CLICKS.map(([c, i]) => [c - 80, 42, iy(i)])} size={18} />
      <Cursor x={x} y={y} down={pressed(t, CLICKS.map(([c]) => c - 80))} />
    </Browser>
  );
}
