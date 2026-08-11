import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  loadNotifications,
  markRead,
  markAllRead,
} from "../../modules/notifications/notificationHelpers";
import { getApiErrorMessage } from "../../utils/apiErrors";
import { getDonorDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];
const BOX_INSET = "pl-[0.5cm] pr-[0.5cm] pt-[0.5cm] pb-[0.5cm]";

export default function Notifications() {
  const user = getSessionUser();
  const donorName = getDonorDisplayName(user);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const result = await loadNotifications({ limit: 50 });
        if (!cancelled) {
          setNotifications(
            result.notifications.map((n) => ({ ...n, read: !n.unread })),
          );
        }
      } catch (error) {
        if (!cancelled) toast.error(getApiErrorMessage(error));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const handleMarkAllRead = async () => {
    try {
      await markAllRead();
      setNotifications((prev) => prev.map((item) => ({ ...item, read: true, unread: false })));
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
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
        <div className={`flex flex-col gap-[0.5cm] ${BOX_INSET}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FaBell className="text-[#16A34A]" />
              <h1 className="text-xl font-bold text-[#0F172A]">Notifications</h1>
            </div>
            {unreadCount > 0 ? (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="rounded-[10px] border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-semibold text-[#2563EB]"
              >
                Mark all read
              </button>
            ) : null}
          </div>

          {loading ? (
            <p className="text-sm text-[#64748B]">Loading notifications…</p>
          ) : notifications.length === 0 ? (
            <p className="text-sm text-[#64748B]">No notifications yet.</p>
          ) : (
            <ul className="flex flex-col gap-[0.5cm]">
              {notifications.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, ease: EASE }}
                  className={[
                    "rounded-[16px] border p-[0.5cm] shadow-sm",
                    !item.read ? "border-[#BBF7D0] bg-[#F0FDF4]" : "border-[#E5E7EB] bg-white",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[#0F172A]">{item.title}</p>
                      <p className="mt-1 text-sm text-[#64748B]">{item.body}</p>
                      <p className="mt-2 text-xs text-[#94A3B8]">{item.time}</p>
                    </div>
                    {!item.read ? (
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const updated = await markRead(item.id);
                            setNotifications((prev) =>
                              prev.map((n) =>
                                n.id === item.id ? { ...updated, read: true } : n,
                              ),
                            );
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
        </div>
      </motion.section>
    </DashboardLayout>
  );
}
