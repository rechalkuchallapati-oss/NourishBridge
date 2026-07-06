import {
  NOTIFICATION_CATEGORY_LABELS,
  VOLUNTEER_NOTIFICATIONS,
} from "../../data/volunteerNotifications";
import { VOLUNTEER_SECTION_PAD, VOLUNTEER_STACK_GAP } from "../../components/volunteer/volunteerDashboardStyles";

const CATEGORY_COLORS = {
  pickup: "bg-[#FFEDD5] text-[#C2410C]",
  mission: "bg-[#DCFCE7] text-[#15803D]",
  ngo: "bg-[#DBEAFE] text-[#1D4ED8]",
  rating: "bg-[#FEF3C7] text-[#B45309]",
  schedule: "bg-[#EDE9FE] text-[#6D28D9]",
  system: "bg-[#F1F5F9] text-[#475569]",
};

export default function VolunteerNotifications() {
  const unread = VOLUNTEER_NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <section className={`rounded-none border border-[#E5E7EB] bg-white shadow-sm ${VOLUNTEER_SECTION_PAD}`}>
      <div className="flex flex-wrap items-center justify-between gap-[0.5cm]">
        <h1 className="text-lg font-bold text-[#0F172A]">Notifications</h1>
        <span className="rounded-none bg-[#F0FDF4] px-2.5 py-1 text-[10px] font-bold text-[#15803D]">
          {unread} unread
        </span>
      </div>

      <ul className={`mt-[0.5cm] ${VOLUNTEER_STACK_GAP}`}>
        {VOLUNTEER_NOTIFICATIONS.map((item) => (
          <li
            key={item.id}
            className={`rounded-none border p-[0.5cm] text-xs ${
              item.unread ? "border-[#DCFCE7] bg-[#F0FDF4]" : "border-[#E5E7EB] bg-white"
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-none px-2 py-0.5 text-[9px] font-bold uppercase ${
                  CATEGORY_COLORS[item.category] ?? CATEGORY_COLORS.system
                }`}
              >
                {NOTIFICATION_CATEGORY_LABELS[item.category] ?? item.category}
              </span>
              {item.unread ? (
                <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" aria-hidden="true" />
              ) : null}
              <span className="ml-auto text-[10px] text-[#94A3B8]">{item.time}</span>
            </div>
            <p className="mt-[0.3cm] font-semibold text-[#0F172A]">{item.title}</p>
            <p className="mt-[0.2cm] text-[#64748B]">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
