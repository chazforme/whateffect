import type { ComponentType } from "react";
import BottomTabBar from "./BottomTabBar";
import Breadcrumb from "./Breadcrumb";
import CommandPalette from "./CommandPalette";
import ContextMenu from "./ContextMenu";
import Drawer from "./Drawer";
import DropdownMenu from "./DropdownMenu";
import FatFooter from "./FatFooter";
import FloatingActionButton from "./FloatingActionButton";
import GlobalNavigationBar from "./GlobalNavigationBar";
import HamburgerMenu from "./HamburgerMenu";
import LoadMore from "./LoadMore";
import LocalNavigationBar from "./LocalNavigationBar";
import MegaMenu from "./MegaMenu";
import Pagination from "./Pagination";
import SegmentedControl from "./SegmentedControl";
import Stepper from "./Stepper";
import TableOfContents from "./TableOfContents";
import Tabs from "./Tabs";

export const demos: Record<string, ComponentType> = {
  "global-navigation-bar": GlobalNavigationBar,
  "local-navigation-bar": LocalNavigationBar,
  "hamburger-menu": HamburgerMenu,
  drawer: Drawer,
  "mega-menu": MegaMenu,
  "dropdown-menu": DropdownMenu,
  breadcrumb: Breadcrumb,
  tabs: Tabs,
  "segmented-control": SegmentedControl,
  "bottom-tab-bar": BottomTabBar,
  "floating-action-button": FloatingActionButton,
  pagination: Pagination,
  "load-more": LoadMore,
  stepper: Stepper,
  "table-of-contents": TableOfContents,
  "context-menu": ContextMenu,
  "command-palette": CommandPalette,
  "fat-footer": FatFooter,
};
