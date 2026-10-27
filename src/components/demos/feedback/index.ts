import type { ComponentType } from "react";
import Badge from "./Badge";
import EmptyState from "./EmptyState";
import ErrorPage from "./ErrorPage";
import InlineAlert from "./InlineAlert";
import LiveIndicator from "./LiveIndicator";
import NotificationDot from "./NotificationDot";
import OptimisticUi from "./OptimisticUi";
import ProgressBar from "./ProgressBar";
import ProgressRing from "./ProgressRing";
import Skeleton from "./Skeleton";
import SnackbarUndo from "./SnackbarUndo";
import Sparkline from "./Sparkline";
import Spinner from "./Spinner";
import StatusChip from "./StatusChip";
import SuccessCheckmark from "./SuccessCheckmark";
import ThresholdAlert from "./ThresholdAlert";
import Toast from "./Toast";
import TrendIndicator from "./TrendIndicator";

export const demos: Record<string, ComponentType> = {
  spinner: Spinner,
  skeleton: Skeleton,
  "progress-bar": ProgressBar,
  "progress-ring": ProgressRing,
  "success-checkmark": SuccessCheckmark,
  toast: Toast,
  "snackbar-undo": SnackbarUndo,
  "optimistic-ui": OptimisticUi,
  "inline-alert": InlineAlert,
  "empty-state": EmptyState,
  "error-page": ErrorPage,
  badge: Badge,
  "notification-dot": NotificationDot,
  "status-chip": StatusChip,
  "trend-indicator": TrendIndicator,
  sparkline: Sparkline,
  "live-indicator": LiveIndicator,
  "threshold-alert": ThresholdAlert,
};
