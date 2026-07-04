import { useState } from "react";
import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  DONOR_NOTIFICATIONS,
  NOTIFICATION_TYPE_LABELS,
} from "../../data/donorNotifications";
import { getDonorDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];
const BOX_INSET = "pl-[0.5cm] pr-[0.5cm] pt-[0.5cm] pb-[0.5cm]";

export default function Notifications() {
  const user = getSessionUser();
  const donorName = getDonorDisplayName(user);
  const [notifications, setNotifications] = useState(DONOR_NOTIFICATIONS);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  return (
    <DashboardLayout
      emoji="🍱"
      title="Donor Dashboard"
      subtitle="Alerts and updates"
      userName={donorName}
      unreadNotifications={unreadCount}
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative flex flex-col gap-[0.5cm] overflow-hidden bg-gradient-to-br from-[#F0FDF4] via-[#F8FAFC] to-white"
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#16A34A]/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-8 left-1/4 h-36 w-36 rounded-full bg-[#22C55E]/10 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-[12%] top-[35%] h-28 w-28 rounded-full bg-[#BBF7D0]/35 blur-2xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-[0.5cm] sm:flex-row sm:items-start sm:justify-between">
          <motion.header
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-start gap-[0.5cm] sm:items-center"
          >
            <motion.span
              className="group relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#16A34A]/15 text-[#16A34A] transition-colors duration-300 hover:bg-[#16A34A]/25"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.06 }}
            >
              <FaBell
                className="text-2xl transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
              {unreadCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#16A34A] px-1 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              ) : null}
            </motion.span>
            <div className="flex flex-col gap-[0.5cm]">
              <p className="text-base font-semibold uppercase tracking-[0.18em] text-[#16A34A] sm:text-lg">
                Alerts & updates
              </p>
              <h1 className="bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                Notifications
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg">
                NGO acceptance, volunteer updates, pickup reminders, and food-safety
                alerts.
              </p>
            </div>
          </motion.header>

          {unreadCount > 0 ? (
            <motion.button
              type="button"
              onClick={markAllRead}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
              whileHover={{ y: -2 }}
              className="shrink-0 self-start rounded-none border border-[#BBF7D0] bg-white px-5 py-3 text-sm font-semibold text-[#16A34A] shadow-sm transition-all duration-300 hover:border-[#16A34A]/40 hover:bg-[#F0FDF4] hover:shadow-md sm:text-base"
            >
              Mark all as read
            </motion.button>
          ) : null}
        </div>

        <div className="relative flex flex-col gap-[0.5cm]">
          {notifications.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * index, ease: EASE }}
              whileHover={{ y: -2 }}
              className={[
                "rounded-none border shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(15,23,42,0.08)]",
                BOX_INSET,
                item.read
                  ? "border-[#E5E7EB] bg-white"
                  : "border-[#BBF7D0] bg-[#F0FDF4]",
              ].join(" ")}
            >
              <div className="flex gap-[0.5cm]">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center text-2xl sm:text-3xl" aria-hidden="true">
                  {item.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-[0.5cm]">
                    <h2 className="text-base font-bold text-[#0F172A] sm:text-lg">
                      {item.title}
                    </h2>
                    <span className="rounded-none bg-[#F1F5F9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#64748B] sm:text-xs">
                      {NOTIFICATION_TYPE_LABELS[item.type]}
                    </span>
                    {!item.read ? (
                      <span className="rounded-none bg-[#16A34A] px-2.5 py-1 text-[10px] font-bold uppercase text-white sm:text-xs">
                        New
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-[0.5cm] text-sm leading-7 text-[#64748B] sm:text-base">
                    {item.message}
                  </p>
                  <p className="mt-[0.5cm] text-xs text-[#94A3B8] sm:text-sm">{item.time}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </DashboardLayout>
  );
}
