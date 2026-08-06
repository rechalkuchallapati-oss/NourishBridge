import {
  FaArrowDown,
  FaArrowUp,
  FaBook,
  FaClock,
  FaHeadset,
  FaPlus,
  FaUserPlus,
} from "react-icons/fa";
import AdminInteractivePanel from "./AdminInteractivePanel";
import { ADMIN_PRIMARY_BTN, ADMIN_SECONDARY_BTN } from "./adminStyles";
import { AVG_RESPONSE_TIME, POPULAR_CATEGORIES } from "../../data/adminSupportTickets";
import TicketStatusDonut from "./TicketStatusDonut";

function QuickActionButton({ icon: Icon, label, onClick, primary = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        primary ? ADMIN_PRIMARY_BTN : ADMIN_SECONDARY_BTN,
        "w-full justify-center py-3 text-sm transition-all duration-300 hover:-translate-y-0.5",
      ].join(" ")}
    >
      <Icon aria-hidden="true" />
      {label}
    </button>
  );
}

export default function TicketAnalyticsPanel({ onAction }) {
  const isFaster = AVG_RESPONSE_TIME.trend < 0;

  return (
    <aside className="flex flex-col gap-4">
      <AdminInteractivePanel>
        <h3 className="text-base font-bold text-[#0F172A]">Ticket Summary</h3>
        <p className="mt-1 text-xs text-[#64748B]">Status distribution overview</p>
        <div className="mt-4">
          <TicketStatusDonut />
        </div>
      </AdminInteractivePanel>

      <AdminInteractivePanel>
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-none border border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]">
            <FaClock className="text-xl" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
              Average Response Time
            </p>
            <p className="text-3xl font-extrabold tracking-tight text-[#0F172A]">
              {AVG_RESPONSE_TIME.display}
            </p>
          </div>
        </div>
        <p
          className={[
            "mt-3 flex items-center gap-1.5 text-sm font-semibold",
            isFaster ? "text-[#16A34A]" : "text-red-600",
          ].join(" ")}
        >
          {isFaster ? <FaArrowDown aria-hidden="true" /> : <FaArrowUp aria-hidden="true" />}
          {Math.abs(AVG_RESPONSE_TIME.trend)}% Faster {AVG_RESPONSE_TIME.trendLabel}
        </p>
      </AdminInteractivePanel>

      <AdminInteractivePanel>
        <h3 className="text-base font-bold text-[#0F172A]">Popular Categories</h3>
        <p className="mt-1 text-xs text-[#64748B]">Most reported issue types</p>
        <ul className="mt-4 space-y-3">
          {POPULAR_CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#334155]">{cat.label}</span>
                <span className="font-bold text-[#0F172A]">{cat.share}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#F1F5F9]">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${cat.share}%`, backgroundColor: cat.color }}
                />
              </div>
            </li>
          ))}
        </ul>
      </AdminInteractivePanel>

      <AdminInteractivePanel>
        <h3 className="text-base font-bold text-[#0F172A]">Quick Actions</h3>
        <div className="mt-4 flex flex-col gap-2">
          <QuickActionButton
            icon={FaPlus}
            label="Create New Ticket"
            primary
            onClick={() => onAction("create")}
          />
          <QuickActionButton
            icon={FaBook}
            label="Open Help Center"
            onClick={() => onAction("help")}
          />
          <QuickActionButton
            icon={FaUserPlus}
            label="Assign Ticket"
            onClick={() => onAction("assign")}
          />
          <QuickActionButton
            icon={FaHeadset}
            label="Contact Support Team"
            onClick={() => onAction("contact")}
          />
        </div>
      </AdminInteractivePanel>
    </aside>
  );
}
