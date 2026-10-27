import type { CategoryId } from "./types";

/** 이 사전을 쓰는 일들 — 홈 주제 카드에 칩으로 표시 */
export type UseCase = "웹페이지" | "카드뉴스" | "상세페이지" | "대시보드" | "발표자료" | "문서";

export type TopicMeta = {
  id: CategoryId;
  tagline: string; // 한 줄 소개
  why: string; // 왜 알아두면 좋은지
  useFor: UseCase[];
  thumb: string; // 대표 데모 slug (없으면 주제 첫 용어)
  examples: string[]; // 대표 용어 slug
};

export const topicMeta: TopicMeta[] = [
  {
    id: "text",
    tagline: "글자가 써지고, 바뀌고, 빛나요",
    why: "제목 한 줄로 첫인상이 달라져요. 카드뉴스 제목, 발표자료 표지, 홈페이지 첫 문장에 바로 써요.",
    useFor: ["카드뉴스", "발표자료", "웹페이지"],
    thumb: "typewriter",
    examples: ["typewriter", "highlighter-animation", "odometer"],
  },
  {
    id: "motion",
    tagline: "나타나고, 사라지고, 넘어가요",
    why: "같은 내용도 차례로 보여주면 훨씬 잘 읽혀요. 발표 장면 넘김, 숫자 강조, 목록 등장에 써요.",
    useFor: ["발표자료", "웹페이지", "대시보드"],
    thumb: "stagger",
    examples: ["fade-in", "stagger", "count-up"],
  },
  {
    id: "scroll",
    tagline: "화면을 내릴 때 생기는 일",
    why: "긴 상세페이지와 소개 페이지를 끝까지 읽게 만들어요. 따라오는 메뉴, 읽은 만큼 차는 바가 대표적이에요.",
    useFor: ["상세페이지", "웹페이지", "문서"],
    thumb: "parallax",
    examples: ["sticky-header", "scroll-progress-bar", "parallax"],
  },
  {
    id: "micro",
    tagline: "마우스를 올리고, 누르고, 밀 때",
    why: "버튼이 반응해야 눌렀는지 알 수 있어요. 눌림, 좋아요, 끌어서 순서 바꾸기처럼 손맛을 정해요.",
    useFor: ["웹페이지", "상세페이지", "대시보드"],
    thumb: "like-burst",
    examples: ["hover-effect", "ripple", "drag-and-drop"],
  },
  {
    id: "navigation",
    tagline: "원하는 곳으로 찾아가는 길",
    why: "메뉴가 정리돼야 길을 잃지 않아요. 문서를 디지털로 옮길 때 목차·탭·단계 표시가 뼈대가 돼요.",
    useFor: ["웹페이지", "문서", "대시보드"],
    thumb: "tabs",
    examples: ["tabs", "breadcrumb", "table-of-contents"],
  },
  {
    id: "form",
    tagline: "적고, 고르고, 체크하는 칸",
    why: "신청서·설문·검색창을 만들 때 칸 하나하나의 이름을 알아야 원하는 대로 시킬 수 있어요.",
    useFor: ["웹페이지", "문서", "대시보드"],
    thumb: "toggle-switch",
    examples: ["floating-label", "toggle-switch", "autocomplete"],
  },
  {
    id: "feedback",
    tagline: "기다려요 · 됐어요 · 잘못됐어요",
    why: "모니터링 대시보드의 핵심이에요. 실시간 표시, 상태 표시, 오르내림 화살표, 불러오는 중 표시를 골라요.",
    useFor: ["대시보드", "웹페이지"],
    thumb: "live-indicator",
    examples: ["skeleton", "toast", "trend-indicator"],
  },
  {
    id: "overlay",
    tagline: "화면 위에 뜨고, 접었다 펴는 상자",
    why: "정보를 한 화면에 다 늘어놓지 않고 필요할 때만 꺼내 보여줘요. 팝업, 바텀시트, 펼치기·접기.",
    useFor: ["웹페이지", "상세페이지", "문서"],
    thumb: "bottom-sheet",
    examples: ["modal", "bottom-sheet", "accordion"],
  },
  {
    id: "layout",
    tagline: "화면을 어떻게 나누고 놓을지",
    why: "카드뉴스 비율, 발표 슬라이드 구성, 대시보드 칸 나누기를 말로 정확히 지시할 수 있어요.",
    useFor: ["카드뉴스", "발표자료", "대시보드", "상세페이지"],
    thumb: "bento-grid",
    examples: ["bento-grid", "split-screen", "sidebar-layout"],
  },
  {
    id: "style",
    tagline: "전체 분위기와 질감",
    why: "'세련되게 해줘' 대신 '글래스모피즘으로'처럼 원하는 느낌을 한 단어로 전할 수 있어요.",
    useFor: ["카드뉴스", "발표자료", "웹페이지"],
    thumb: "glassmorphism",
    examples: ["glassmorphism", "dark-mode", "neumorphism"],
  },
];
