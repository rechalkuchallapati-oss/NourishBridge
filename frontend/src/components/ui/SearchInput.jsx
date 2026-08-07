import { Search, X } from "lucide-react";
import { INPUT_BASE } from "../../styles/designTokens";

export default function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = "Search for...",
  className = "",
  inputClassName = "",
  hideIconWhenTyping = false,
  ...props
}) {
  const hasValue = Boolean(value?.trim());
  const showIcon = !hideIconWhenTyping || !hasValue;

  return (
    <label className={["relative block min-w-[200px] flex-1", className].join(" ")}>
      {showIcon ? (
        <Search
          className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#94A3B8] transition-opacity duration-200"
          size={18}
          aria-hidden="true"
        />
      ) : null}
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={[
          inputClassName || INPUT_BASE,
          showIcon ? "pl-11" : "pl-4",
          hasValue && onClear ? "pr-10" : "pr-4",
        ].join(" ")}
        {...props}
      />
      {hasValue && onClear ? (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#94A3B8] transition-colors hover:bg-[#F1F5F9] hover:text-[#64748B]"
        >
          <X size={14} />
        </button>
      ) : null}
    </label>
  );
}

export { SearchInput };
