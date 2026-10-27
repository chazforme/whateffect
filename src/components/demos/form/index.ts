import type { ComponentType } from "react";
import Autocomplete from "./Autocomplete";
import Checkbox from "./Checkbox";
import ChipInput from "./ChipInput";
import DatePicker from "./DatePicker";
import FileUpload from "./FileUpload";
import FloatingLabel from "./FloatingLabel";
import HelperText from "./HelperText";
import InlineValidation from "./InlineValidation";
import NumberStepper from "./NumberStepper";
import OtpInput from "./OtpInput";
import PasswordToggle from "./PasswordToggle";
import Placeholder from "./Placeholder";
import RadioButton from "./RadioButton";
import RangeSlider from "./RangeSlider";
import Select from "./Select";
import StarRating from "./StarRating";
import TextField from "./TextField";
import ToggleSwitch from "./ToggleSwitch";

export const demos: Record<string, ComponentType> = {
  "text-field": TextField,
  placeholder: Placeholder,
  "floating-label": FloatingLabel,
  "helper-text": HelperText,
  "inline-validation": InlineValidation,
  "password-toggle": PasswordToggle,
  "otp-input": OtpInput,
  checkbox: Checkbox,
  "radio-button": RadioButton,
  "toggle-switch": ToggleSwitch,
  select: Select,
  autocomplete: Autocomplete,
  "chip-input": ChipInput,
  "range-slider": RangeSlider,
  "number-stepper": NumberStepper,
  "date-picker": DatePicker,
  "file-upload": FileUpload,
  "star-rating": StarRating,
};
