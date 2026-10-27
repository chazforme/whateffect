# 효과사전 (whateffect)

"이 효과, AI한테 뭐라고 말해야 하지?"를 해결하는 웹 효과 용어 사전.
주제 10개 × 18개 = 효과 180개. 카드마다 움직이는 데모, 쉬운 설명, 이럴 때 써요, AI에게 하는 요청 예시.

## 실행

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인.

## 구조

| 위치 | 내용 |
|---|---|
| `CLAUDE.md` | 작업 기준서 (카피 규칙, 데모 규칙) — Claude Code가 먼저 읽음 |
| `src/data/terms.json` | 주제 목록 + 글자 효과 18개 |
| `src/data/topics/<주제>.json` | 나머지 9개 주제 용어 |
| `src/components/demos/` | 데모 (글자 효과는 바로 아래, 나머지는 주제별 폴더) |
| `src/lib/topics.ts` | 홈 주제 카드 문구 (한 줄 소개, 왜 필요한지, 쓰임) |
| `src/hooks/useLoop.ts`, `src/lib/loop.ts` | 모든 데모가 공유하는 애니메이션 시계 |
| `public/reference/card-prototype.html` | 처음 확정한 카드 시안 |

## 남은 일

- 용어 상세 페이지 (`/term/[slug]`): AI에게 이렇게 말하세요 + 복사 버튼, 연관 용어
- 검색 (Fuse.js)
- 배포 (Vercel)
