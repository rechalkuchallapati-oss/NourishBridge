import { FaCheckCircle, FaChevronRight } from "react-icons/fa";
import SettingsStorageDonut from "./SettingsStorageDonut";
import { QUICK_ACTIONS, SYSTEM_INFO } from "../../../data/adminSystemSettings";

function SettingsCard({ children, className = "" }) {
  return (
    <article
      className={[
        "rounded-[18px] border border-[#E8ECF0] bg-white p-5 shadow-[0_4px_24px_rgba(15,23,42,0.06)]",
        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(34,197,94,0.1)]",
        className,
      ].join(" ")}
    >
      {children}
    </article>
  );
}

function StatusRow({ label, value, healthy = true }) {
  return (
    <div className="flex items-center justify-between gap-2 text-sm">
      <span className="text-[#64748B]">{label}</span>
      <span className="flex items-center gap-1.5 font-semibold text-[#0F172A]">
        {healthy ? (
          <FaCheckCircle className="text-[#22C55E]" aria-hidden="true" />
        ) : null}
        {value}
      </span>
    </div>
  );
}

export default function SettingsRightPanel({ onAction }) {
  return (
    <aside className="flex flex-col gap-4">
      <SettingsCard>
        <h3 className="text-base font-bold text-[#0F172A]">System Information</h3>
        <div className="mt-4 space-y-3">
          <StatusRow label="Version" value={SYSTEM_INFO.version} healthy={false} />
          <StatusRow label="Environment" value={SYSTEM_INFO.environment} healthy={false} />
          <StatusRow label="Last Updated" value={SYSTEM_INFO.lastUpdated} healthy={false} />
          <StatusRow label="Updated By" value={SYSTEM_INFO.updatedBy} healthy={false} />
          <StatusRow label="Database Status" value={SYSTEM_INFO.databaseStatus} />
          <StatusRow label="Server Status" value={SYSTEM_INFO.serverStatus} />
        </div>
        <button
          type="button"
          onClick={() => onAction("system-status")}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#22C55E] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#16A34A] hover:shadow-md active:scale-[0.98]"
        >
          View System Status
        </button>
      </SettingsCard>

      <SettingsCard>
        <h3 className="text-base font-bold text-[#0F172A]">Storage Usage</h3>
        <p className="mt-1 text-xs text-[#64748B]">Storage breakdown by type</p>
        <div className="mt-4">
          <SettingsStorageDonut />
        </div>
        <button
          type="button"
          onClick={() => onAction("manage-storage")}
          className="mt-4 flex w-full items-center justify-center rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm font-semibold text-[#15803D] transition-all duration-200 hover:border-[#BBF7D0] hover:bg-[#F0FDF4]"
        >
          Manage Storage
        </button>
      </SettingsCard>

      <SettingsCard>
        <h3 className="text-base font-bold text-[#0F172A]">Quick Actions</h3>
        <ul className="mt-4 space-y-2">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <li key={action.id}>
                <button
                  type="button"
                  onClick={() => onAction(action.id)}
                  className="group flex w-full items-start gap-3 rounded-[14px] border border-transparent p-3 text-left transition-all duration-200 hover:border-[#E2E8F0] hover:bg-[#F8FAFC]"
                >
                  <span
                    className={[
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px]",
                      action.iconBg,
                    ].join(" ")}
                  >
                    <Icon className="text-base" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[#0F172A]">{action.title}</span>
                      <FaChevronRight
                        className="shrink-0 text-[10px] text-[#CBD5E1] transition-transform group-hover:translate-x-0.5 group-hover:text-[#22C55E]"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-0.5 block text-xs leading-5 text-[#64748B]">
                      {action.description}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </SettingsCard>
    </aside>
  );
}
