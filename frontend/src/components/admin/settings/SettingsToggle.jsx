export default function SettingsToggle({ enabled, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => onChange(!enabled)}
      className={[
        "relative h-7 w-12 shrink-0 rounded-full transition-all duration-300 ease-out",
        enabled ? "bg-[#22C55E] shadow-[0_0_12px_rgba(34,197,94,0.35)]" : "bg-[#E2E8F0]",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300 ease-out",
          enabled ? "left-[22px]" : "left-0.5",
        ].join(" ")}
      />
    </button>
  );
}
