import { FaTimes } from "react-icons/fa";
import { SETTINGS_TABS, TAB_PLACEHOLDERS } from "../../../data/adminSystemSettings";

export default function SettingsAllCategoriesModal({ isOpen, onClose, onSelect, activeId }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close settings categories"
        className="absolute inset-0 bg-[#0F172A]/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
        className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[18px] border border-[#E5E7EB] bg-white p-8 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="settings-modal-title" className="text-2xl font-bold text-[#0F172A]">
              All Settings
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              Choose a category to configure platform preferences and operational controls.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-[#E5E7EB] text-[#64748B] transition-colors hover:bg-[#F8FAFC]"
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SETTINGS_TABS.map((tab) => {
            const Icon = tab.icon;
            const meta = TAB_PLACEHOLDERS[tab.id];
            const isActive = activeId === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  onSelect(tab.id);
                  onClose();
                }}
                className={[
                  "flex flex-col items-start gap-4 rounded-[16px] border p-5 text-left",
                  "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(22,163,74,0.12)]",
                  isActive
                    ? "border-[#16A34A] bg-[#F0FDF4] shadow-[0_0_0_2px_rgba(22,163,74,0.15)]"
                    : "border-[#E5E7EB] bg-white hover:border-[#BBF7D0]",
                ].join(" ")}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#DCFCE7] text-[#16A34A]">
                  <Icon className="text-xl" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-base font-bold text-[#0F172A]">{tab.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-[#64748B]">
                    {tab.id === "general"
                      ? "Platform info & global preferences"
                      : `${meta?.description?.slice(0, 55) ?? "Configure settings"}…`}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
