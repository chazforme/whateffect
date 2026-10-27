"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";
import { isPaused, onPauseChange, setPaused, subscribe } from "@/lib/loop";

/** 데모 박스가 내려주는 값: 화면에 보이는지, 카드별 시작 어긋남(ms) */
export const DemoContext = createContext<{ visible: boolean; offset: number }>({
  visible: true,
  offset: 0,
});

/** 루프 주기(ms)를 받아 0 ~ periodMs 사이의 현재 진행 시간을 매 프레임 반환 */
export function useLoop(periodMs: number): number {
  const { visible, offset } = useContext(DemoContext);
  const [t, setT] = useState(0);

  useEffect(() => {
    if (!visible) return;
    return subscribe((n) => setT((n + offset) % periodMs));
  }, [visible, offset, periodMs]);

  return t;
}

export function usePaused(): [boolean, (p: boolean) => void] {
  const paused = useSyncExternalStore(onPauseChange, isPaused, () => false);
  return [paused, setPaused];
}
