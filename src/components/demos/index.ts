import type { ComponentType } from "react";
import AnimatedUnderline from "./AnimatedUnderline";
import BlurReveal from "./BlurReveal";
import Glitch from "./Glitch";
import GradientText from "./GradientText";
import Highlighter from "./Highlighter";
import ImageFilledText from "./ImageFilledText";
import MaskedReveal from "./MaskedReveal";
import NeonGlow from "./NeonGlow";
import Odometer from "./Odometer";
import OutlineText from "./OutlineText";
import RotatingText from "./RotatingText";
import ShimmerText from "./ShimmerText";
import SplitText from "./SplitText";
import TextOnPath from "./TextOnPath";
import TextScramble from "./TextScramble";
import Typewriter from "./Typewriter";
import VariableFont from "./VariableFont";
import WaveText from "./WaveText";
import { demos as feedback } from "./feedback";
import { demos as form } from "./form";
import { demos as layout } from "./layout";
import { demos as micro } from "./micro";
import { demos as motion } from "./motion";
import { demos as navigation } from "./navigation";
import { demos as overlay } from "./overlay";
import { demos as scroll } from "./scroll";
import { demos as style } from "./style";

/** 글자 효과 (1번 주제) */
const text: Record<string, ComponentType> = {
  typewriter: Typewriter,
  "rotating-text": RotatingText,
  "masked-text-reveal": MaskedReveal,
  "split-text": SplitText,
  "text-scramble": TextScramble,
  "blur-reveal": BlurReveal,
  "highlighter-animation": Highlighter,
  "gradient-text": GradientText,
  "shimmer-text": ShimmerText,
  "outline-text": OutlineText,
  glitch: Glitch,
  "wave-text": WaveText,
  "animated-underline": AnimatedUnderline,
  odometer: Odometer,
  "neon-glow": NeonGlow,
  "text-on-path": TextOnPath,
  "variable-font-animation": VariableFont,
  "image-filled-text": ImageFilledText,
};

/** slug → 데모 컴포넌트. 주제별 폴더의 index.ts가 각자 등록한다 */
export const demos: Record<string, ComponentType> = {
  ...text,
  ...motion,
  ...scroll,
  ...micro,
  ...navigation,
  ...form,
  ...feedback,
  ...overlay,
  ...layout,
  ...style,
};
