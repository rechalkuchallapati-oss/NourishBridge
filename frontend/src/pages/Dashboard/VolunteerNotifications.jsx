import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";
import toast from "react-hot-toast";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../../components/volunteer/VolunteerSectionShell";
import {
  loadNotifications,
  markRead,
  markAllRead,
} from "../../modules/notifications/notificationHelpers";
import { getApiErrorMessage } from "../../utils/apiErrors";
import {
  VOLUNTEER_CONTENT_STACK,
  VOLUNTEER_PAGE_SECTION_GAP,
} from "../../components/volunteer/volunteerDashboardStyles";

export default function VolunteerNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const result = await loadNotifications({ limit: 50 });
        if (!cancelled) setNotifications(result.notifications);
      } catch (error) {
        if (!cancelled) toast.error(getApiErrorMessage(error));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

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
          <div className="flex items-center gap-2">
            <span className="shrink-0 rounded-full bg-[#F0FDF4] px-3 py-1.5 text-xs font-bold text-[#15803D]">
              {unread} unread
            </span>
            {unread > 0 ? (
              <button
                type="button"
                onClick={async () => {
                  try {
                    await markAllRead();
                    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
                  } catch (error) {
                    toast.error(getApiErrorMessage(error));
                  }
                }}
                className="rounded-[10px] border border-[#E5E7EB] px-3 py-1.5 text-xs font-semibold text-[#2563EB]"
              >
                Mark all read
              </button>
            ) : null}
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-[#64748B]">Loading…</p>
        ) : (
          <ul className={VOLUNTEER_CONTENT_STACK}>
            {notifications.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className={`rounded-[16px] border p-[0.5cm] text-sm leading-relaxed ${
                  item.unread ? "border-[#BBF7D0] bg-[#F0FDF4]" : "border-[#E5E7EB] bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#0F172A]">{item.title}</p>
                    <p className="mt-1 text-[#64748B]">{item.body}</p>
                    <p className="mt-2 text-xs text-[#94A3B8]">{item.time}</p>
                  </div>
                  {item.unread ? (
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          const updated = await markRead(item.id);
                          setNotifications((prev) => prev.map((n) => (n.id === item.id ? updated : n)));
                        } catch (error) {
                          toast.error(getApiErrorMessage(error));
                        }
                      }}
                      className="text-xs font-semibold text-[#2563EB]"
                    >
                      Mark read
                    </button>
                  ) : null}
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </VolunteerSectionShell>
    </div>
  );
}
