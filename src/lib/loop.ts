// 페이지 전체가 공유하는 requestAnimationFrame 루프 하나.
// CSS keyframes/transition 대신 이 시계로 매 프레임 직접 그린다 (CLAUDE.md 4번).

type Sub = (now: number) => void;

const subs = new Set<Sub>();
const pauseListeners = new Set<() => void>();
let raf = 0;
let paused = false;
let pausedAt = 0;
let shift = 0; // 멈춰 있던 시간만큼 시계를 뒤로 미룬다

export function now(): number {
  return paused ? pausedAt : performance.now() - shift;
}

function frame() {
  const n = now();
  subs.forEach((fn) => fn(n));
  raf = subs.size && !paused ? requestAnimationFrame(frame) : 0;
}

function start() {
  if (!raf && !paused && subs.size) raf = requestAnimationFrame(frame);
}

export function subscribe(fn: Sub): () => void {
  subs.add(fn);
  fn(now());
  start();
  return () => {
    subs.delete(fn);
  };
}

export function isPaused(): boolean {
  return paused;
}

export function setPaused(p: boolean) {
  if (p === paused) return;
  if (p) {
    pausedAt = now();
    paused = true;
    cancelAnimationFrame(raf);
    raf = 0;
  } else {
    shift = performance.now() - pausedAt;
    paused = false;
    start();
  }
  pauseListeners.forEach((fn) => fn());
}

export function onPauseChange(fn: () => void): () => void {
  pauseListeners.add(fn);
  return () => {
    pauseListeners.delete(fn);
  };
}

// ===== 유틸 =====
export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** t가 a~b 구간에서 0→1 */
export const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
/** easeOutCubic */
export const ease = (x: number) => 1 - Math.pow(1 - x, 3);
/** 같은 n이면 항상 같은 값(0~1)을 주는 가짜 난수. 서버·브라우저 렌더 결과를 맞추기 위함 */
export const rand = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};
