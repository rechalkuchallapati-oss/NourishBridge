import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOLayout from "../../components/dashboard/NGOLayout";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

const NGO_NOTIFICATIONS = [
  {
    id: 1,
    title: "New donation request",
    body: "DN-2395 — Assorted Sandwiches from Daily Bread Café awaiting review.",
    time: "3 hours ago",
    unread: true,
  },
  {
    id: 2,
    title: "Delivery in transit",
    body: "Rahul Mehta is en route with DN-2401. ETA 6:45 PM.",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 3,
    title: "Food arrived",
    body: "Paneer Tikka & Roti (DN-2350) arrived — inspection pending.",
    time: "Today, 6:10 PM",
    unread: true,
  },
  {
    id: 4,
    title: "Inventory alert",
    body: "Vegetable Biryani (25 kg) must be consumed by 10:00 PM tonight.",
    time: "Today, 6:35 PM",
    unread: false,
  },
  {
    id: 5,
    title: "Distribution recorded",
    body: "120 meals served at MG Road Community Kitchen.",
    time: "Yesterday",
    unread: false,
  },
];

export default function NGONotifications() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);
  const unreadCount = NGO_NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <NGOLayout organizationName={orgName} unreadNotifications={unreadCount}>
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
      >
        <div className="flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6">
          <NGOPageHeader
            icon={FaBell}
            title="Notifications"
            description="Operational alerts for incoming donations, deliveries, inventory, and distribution."
          />

          <ul className="flex flex-col gap-[0.5cm]">
            {NGO_NOTIFICATIONS.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.04 * index, ease: EASE }}
                className={[
                  "rounded-none border p-[0.5cm] shadow-sm",
                  item.unread
                    ? "border-[#DBEAFE] bg-[#EFF6FF]"
                    : "border-[#E5E7EB] bg-white",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#0F172A]">{item.title}</p>
                    <p className="mt-[0.3cm] text-sm leading-6 text-[#64748B]">{item.body}</p>
                  </div>
                  {item.unread ? (
                    <span className="shrink-0 rounded-none bg-[#2563EB] px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                      New
                    </span>
                  ) : null}
                </div>
                <p className="mt-[0.3cm] text-xs text-[#94A3B8]">{item.time}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.section>
    </NGOLayout>
  );
}
