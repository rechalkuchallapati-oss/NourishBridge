import { useMemo } from "react";
import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";
import {
  NOTIFICATION_CATEGORY_LABELS,
  VOLUNTEER_NOTIFICATIONS,
} from "../../data/volunteerNotifications";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../../components/volunteer/VolunteerSectionShell";
import {
  VOLUNTEER_CONTENT_STACK,
  VOLUNTEER_INSET_LINE_GAP,
  VOLUNTEER_PAGE_SECTION_GAP,
} from "../../components/volunteer/volunteerDashboardStyles";

const CATEGORY_COLORS = {
  pickup: "bg-[#FFEDD5] text-[#C2410C]",
  mission: "bg-[#DCFCE7] text-[#15803D]",
  ngo: "bg-[#DCFCE7] text-[#15803D]",
  rating: "bg-[#FEF3C7] text-[#B45309]",
  schedule: "bg-[#EDE9FE] text-[#6D28D9]",
  system: "bg-[#F1F5F9] text-[#475569]",
};

export default function VolunteerNotifications() {
  const { liveNotifications } = useVolunteerMissionContext();

  const notifications = useMemo(
    () => [...liveNotifications, ...VOLUNTEER_NOTIFICATIONS],
    [liveNotifications],
  );

  const unread = notifications.filter((n) => n.unread).length;

  return (
    <div className={VOLUNTEER_PAGE_SECTION_GAP}>
      <VolunteerSectionShell>
        <div className="flex flex-wrap items-start justify-between gap-[0.5cm]">
          <VolunteerSectionTitle
            heading="h1"
            title="Notifications"
            subtitle="Mission updates, pickup alerts, donor confirmations, and NGO messages."
            theme="emerald"
            icon={FaBell}
          />
          <span className="shrink-0 rounded-none bg-[#F0FDF4] px-3 py-1.5 text-xs font-bold text-[#15803D]">
            {unread} unread
          </span>
        </div>

        <ul className={VOLUNTEER_CONTENT_STACK}>
          {notifications.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ scale: 1.01, x: 4 }}
              className={`rounded-none border p-[0.5cm] text-sm leading-relaxed transition-colors ${
                item.unread
                  ? "border-[#DCFCE7] bg-[#F0FDF4] hover:border-[#BBF7D0]"
                  : "border-[#E5E7EB] bg-white hover:border-[#BBF7D0] hover:bg-[#FAFFFA]"
              }`}
            >
              <div className="flex flex-wrap items-center gap-[0.5cm]">
                <span
                  className={`rounded-none px-2 py-0.5 text-[10px] font-bold uppercase ${
                    CATEGORY_COLORS[item.category] ?? CATEGORY_COLORS.system
                  }`}
                >
                  {NOTIFICATION_CATEGORY_LABELS[item.category] ?? item.category}
                </span>
                {item.live ? (
                  <span className="rounded-none bg-[#16A34A] px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                    Live
                  </span>
                ) : null}
                {item.unread ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" aria-hidden="true" />
                ) : null}
                <span className="ml-auto text-xs text-[#94A3B8]">{item.time}</span>
              </div>
              <p className={`${VOLUNTEER_INSET_LINE_GAP} font-semibold text-[#0F172A]`}>{item.title}</p>
              <p className={`${VOLUNTEER_INSET_LINE_GAP} text-[#64748B]`}>{item.body}</p>
            </motion.li>
          ))}
        </ul>
      </VolunteerSectionShell>
    </div>
  );
}
