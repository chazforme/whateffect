import type { ComponentType } from "react";
import Accordion from "./Accordion";
import ActionSheet from "./ActionSheet";
import AlertDialog from "./AlertDialog";
import BottomSheet from "./BottomSheet";
import Card from "./Card";
import Carousel from "./Carousel";
import CoachMark from "./CoachMark";
import CookieBanner from "./CookieBanner";
import FullScreenOverlay from "./FullScreenOverlay";
import Lightbox from "./Lightbox";
import Modal from "./Modal";
import PictureInPicture from "./PictureInPicture";
import Popover from "./Popover";
import PopupNotice from "./PopupNotice";
import ReadMore from "./ReadMore";
import SidePanel from "./SidePanel";
import Tooltip from "./Tooltip";
import TopBanner from "./TopBanner";

export const demos: Record<string, ComponentType> = {
  modal: Modal,
  "alert-dialog": AlertDialog,
  "bottom-sheet": BottomSheet,
  "action-sheet": ActionSheet,
  "full-screen-overlay": FullScreenOverlay,
  "side-panel": SidePanel,
  popover: Popover,
  tooltip: Tooltip,
  "coach-mark": CoachMark,
  lightbox: Lightbox,
  "popup-notice": PopupNotice,
  "cookie-banner": CookieBanner,
  "top-banner": TopBanner,
  "picture-in-picture": PictureInPicture,
  card: Card,
  accordion: Accordion,
  "read-more": ReadMore,
  carousel: Carousel,
};
