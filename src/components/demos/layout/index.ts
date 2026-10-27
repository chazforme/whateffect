import type { ComponentType } from "react";
import AspectRatio from "./AspectRatio";
import BentoGrid from "./BentoGrid";
import CardGrid from "./CardGrid";
import ComparisonTable from "./ComparisonTable";
import ContainerWidth from "./ContainerWidth";
import DataTable from "./DataTable";
import DetailPage from "./DetailPage";
import FullBleed from "./FullBleed";
import HeroSection from "./HeroSection";
import KpiRow from "./KpiRow";
import Masonry from "./Masonry";
import Responsive from "./Responsive";
import SidebarLayout from "./SidebarLayout";
import SlideLayout from "./SlideLayout";
import SplitScreen from "./SplitScreen";
import Timeline from "./Timeline";
import Whitespace from "./Whitespace";
import Zigzag from "./Zigzag";

export const demos: Record<string, ComponentType> = {
  "hero-section": HeroSection,
  "container-width": ContainerWidth,
  "full-bleed": FullBleed,
  whitespace: Whitespace,
  "split-screen": SplitScreen,
  "zigzag-layout": Zigzag,
  "card-grid": CardGrid,
  "bento-grid": BentoGrid,
  masonry: Masonry,
  responsive: Responsive,
  "detail-page": DetailPage,
  "comparison-table": ComparisonTable,
  timeline: Timeline,
  "sidebar-layout": SidebarLayout,
  "kpi-row": KpiRow,
  "data-table": DataTable,
  "aspect-ratio": AspectRatio,
  "slide-layout": SlideLayout,
};
