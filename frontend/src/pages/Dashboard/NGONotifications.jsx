import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";
import toast from "react-hot-toast";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOLayout from "../../components/dashboard/NGOLayout";
import {
  loadNotifications,
  markRead,
  markAllRead,
} from "../../modules/notifications/notificationHelpers";
import { getApiErrorMessage } from "../../utils/apiErrors";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

export default function NGONotifications() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);
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

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkRead = async (id) => {
    try {
      const updated = await markRead(id);
      setNotifications((prev) => prev.map((n) => (n.id === id ? updated : n)));
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, unread: false, isRead: true })));
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <NGOLayout organizationName={orgName} unreadNotifications={unreadCount}>
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
      >
        <div className="flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6">
          <NGOPageHeader
            icon={FaBell}
            title="Notifications"
            description="Operational alerts for incoming donations, deliveries, inventory, and distribution."
            actions={
              unreadCount > 0 ? (
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="rounded-[10px] border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#2563EB] hover:bg-[#EFF6FF]"
                >
                  Mark all read
                </button>
              ) : null
            }
          />

          {loading ? (
            <p className="text-sm text-[#64748B]">Loading notifications…</p>
          ) : notifications.length === 0 ? (
            <p className="text-sm text-[#64748B]">No notifications yet.</p>
          ) : (
            <ul className="flex flex-col gap-[0.5cm]">
              {notifications.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.04 * index, ease: EASE }}
                  className={[
                    "rounded-[16px] border p-[0.5cm] shadow-sm",
                    item.unread ? "border-[#DBEAFE] bg-[#EFF6FF]" : "border-[#E5E7EB] bg-white",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[#0F172A]">{item.title}</p>
                      <p className="mt-1 text-sm text-[#64748B]">{item.body}</p>
                      <p className="mt-2 text-xs text-[#94A3B8]">{item.time}</p>
                    </div>
                    {item.unread ? (
                      <button
                        type="button"
                        onClick={() => handleMarkRead(item.id)}
                        className="shrink-0 rounded-full bg-[#2563EB] px-2.5 py-1 text-[10px] font-bold uppercase text-white"
                      >
                        Mark read
                      </button>
                    ) : null}
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </motion.section>
    </NGOLayout>
  );
}
