import type { ComponentType } from "react";
import Confetti from "./Confetti";
import CustomCursor from "./CustomCursor";
import DragAndDrop from "./DragAndDrop";
import FocusRing from "./FocusRing";
import HapticFeedback from "./HapticFeedback";
import HoverEffect from "./HoverEffect";
import HoverReveal from "./HoverReveal";
import IconMorph from "./IconMorph";
import LikeBurst from "./LikeBurst";
import LongPress from "./LongPress";
import MagneticButton from "./MagneticButton";
import PinchZoom from "./PinchZoom";
import PressState from "./PressState";
import Ripple from "./Ripple";
import Spotlight from "./Spotlight";
import SwipeGesture from "./SwipeGesture";
import Tilt3D from "./Tilt3D";
import ZoomOnHover from "./ZoomOnHover";

export const demos: Record<string, ComponentType> = {
  "hover-effect": HoverEffect,
  "zoom-on-hover": ZoomOnHover,
  "hover-reveal": HoverReveal,
  "spotlight-effect": Spotlight,
  "3d-tilt": Tilt3D,
  "magnetic-button": MagneticButton,
  "custom-cursor": CustomCursor,
  "focus-ring": FocusRing,
  "press-state": PressState,
  ripple: Ripple,
  "icon-morph": IconMorph,
  "like-burst": LikeBurst,
  confetti: Confetti,
  "haptic-feedback": HapticFeedback,
  "long-press": LongPress,
  "swipe-gesture": SwipeGesture,
  "drag-and-drop": DragAndDrop,
  "pinch-to-zoom": PinchZoom,
};
