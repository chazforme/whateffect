import type { ComponentType } from "react";
import AuroraBackground from "./AuroraBackground";
import BoldTypography from "./BoldTypography";
import Brutalism from "./Brutalism";
import Claymorphism from "./Claymorphism";
import DarkMode from "./DarkMode";
import Duotone from "./Duotone";
import FlatDesign from "./FlatDesign";
import Glassmorphism from "./Glassmorphism";
import GradientMesh from "./GradientMesh";
import GrainTexture from "./GrainTexture";
import Minimalism from "./Minimalism";
import Monochrome from "./Monochrome";
import Neumorphism from "./Neumorphism";
import PastelPalette from "./PastelPalette";
import RoundedCorners from "./RoundedCorners";
import Skeuomorphism from "./Skeuomorphism";
import SoftShadow from "./SoftShadow";
import Y2k from "./Y2k";

/** 비주얼 스타일 (style 주제) */
export const demos: Record<string, ComponentType> = {
  "flat-design": FlatDesign,
  minimalism: Minimalism,
  "rounded-corners": RoundedCorners,
  "soft-shadow": SoftShadow,
  "bold-typography": BoldTypography,
  "pastel-palette": PastelPalette,
  monochrome: Monochrome,
  duotone: Duotone,
  "dark-mode": DarkMode,
  "gradient-mesh": GradientMesh,
  "aurora-background": AuroraBackground,
  "grain-texture": GrainTexture,
  glassmorphism: Glassmorphism,
  neumorphism: Neumorphism,
  claymorphism: Claymorphism,
  skeuomorphism: Skeuomorphism,
  brutalism: Brutalism,
  y2k: Y2k,
};
