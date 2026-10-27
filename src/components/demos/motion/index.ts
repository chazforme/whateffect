import type { ComponentType } from "react";
import Bounce from "./Bounce";
import CardFlip from "./CardFlip";
import CountUp from "./CountUp";
import Crossfade from "./Crossfade";
import Easing from "./Easing";
import FadeIn from "./FadeIn";
import LayoutAnimation from "./LayoutAnimation";
import Marquee from "./Marquee";
import PageTransition from "./PageTransition";
import Pulse from "./Pulse";
import ScaleIn from "./ScaleIn";
import Shake from "./Shake";
import ShapeMorphing from "./ShapeMorphing";
import SharedElementTransition from "./SharedElementTransition";
import SlideIn from "./SlideIn";
import Spring from "./Spring";
import Stagger from "./Stagger";
import SvgLineDrawing from "./SvgLineDrawing";

export const demos: Record<string, ComponentType> = {
  "fade-in": FadeIn,
  "slide-in": SlideIn,
  "scale-in": ScaleIn,
  stagger: Stagger,
  easing: Easing,
  spring: Spring,
  bounce: Bounce,
  "count-up": CountUp,
  pulse: Pulse,
  shake: Shake,
  crossfade: Crossfade,
  "page-transition": PageTransition,
  "shared-element-transition": SharedElementTransition,
  "layout-animation": LayoutAnimation,
  "card-flip": CardFlip,
  "svg-line-drawing": SvgLineDrawing,
  "shape-morphing": ShapeMorphing,
  marquee: Marquee,
};
