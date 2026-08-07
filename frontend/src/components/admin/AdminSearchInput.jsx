import SearchInput from "../ui/SearchInput";
import { ADMIN_FILTER_INPUT } from "./adminStyles";

/**
 * Admin filter bar search — icon first, hides while typing, placeholder after icon.
 */
export default function AdminSearchInput({
  value,
  onChange,
  onClear,
  placeholder = "Search for...",
  className = "",
  inputClassName = "",
  ...props
}) {
  return (
    <SearchInput
      value={value}
      onChange={onChange}
      onClear={onClear ?? (() => onChange?.({ target: { value: "" } }))}
      placeholder={placeholder}
      hideIconWhenTyping
      className={className}
      inputClassName={`${ADMIN_FILTER_INPUT} h-[42px] ${inputClassName}`.trim()}
      {...props}
    />
  );
}
