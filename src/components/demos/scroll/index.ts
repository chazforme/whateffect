import type { ComponentType } from "react";
import AnchorScroll from "./AnchorScroll";
import BackToTop from "./BackToTop";
import HideOnScroll from "./HideOnScroll";
import HorizontalScroll from "./HorizontalScroll";
import InfiniteScroll from "./InfiniteScroll";
import LazyLoading from "./LazyLoading";
import Parallax from "./Parallax";
import Pinning from "./Pinning";
import PullToRefresh from "./PullToRefresh";
import ScrollLinkedHighlight from "./ScrollLinkedHighlight";
import ScrollProgressBar from "./ScrollProgressBar";
import ScrollScrubbedVideo from "./ScrollScrubbedVideo";
import ScrollSnap from "./ScrollSnap";
import ScrollTriggeredAnimation from "./ScrollTriggeredAnimation";
import ScrollZoom from "./ScrollZoom";
import Scrollytelling from "./Scrollytelling";
import StackingCards from "./StackingCards";
import StickyHeader from "./StickyHeader";

export const demos: Record<string, ComponentType> = {
  "sticky-header": StickyHeader,
  "hide-on-scroll": HideOnScroll,
  "scroll-progress-bar": ScrollProgressBar,
  "back-to-top": BackToTop,
  "anchor-scroll": AnchorScroll,
  "lazy-loading": LazyLoading,
  "infinite-scroll": InfiniteScroll,
  "pull-to-refresh": PullToRefresh,
  "scroll-snap": ScrollSnap,
  "horizontal-scroll": HorizontalScroll,
  "scroll-triggered-animation": ScrollTriggeredAnimation,
  parallax: Parallax,
  "scroll-linked-highlight": ScrollLinkedHighlight,
  "scroll-zoom": ScrollZoom,
  "stacking-cards": StackingCards,
  pinning: Pinning,
  "scroll-scrubbed-video": ScrollScrubbedVideo,
  scrollytelling: Scrollytelling,
};
