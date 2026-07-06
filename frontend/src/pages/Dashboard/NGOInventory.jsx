import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaBoxes } from "react-icons/fa";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOLayout from "../../components/dashboard/NGOLayout";
import {
  FOOD_INVENTORY,
  INVENTORY_FILTERS,
  INVENTORY_STATUS_COLORS,
  INVENTORY_STATUS_LABELS,
} from "../../data/ngoInventory";
import DonationItemsList from "../../components/common/DonationItemsList";
import EventTypeBadge from "../../components/common/EventTypeBadge";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

export default function NGOInventory() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "all") return FOOD_INVENTORY;
    return FOOD_INVENTORY.filter((item) => item.status === filter);
  }, [filter]);

  return (
    <NGOLayout organizationName={orgName} unreadNotifications={5}>
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
      >
        <div className="flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6">
          <NGOPageHeader
            icon={FaBoxes}
            title="Food Inventory"
            description="Lightweight inventory of verified food ready for distribution. Filter by urgency and availability."
          />

          <div className="flex flex-wrap gap-2">
            {INVENTORY_FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={[
                  "rounded-none px-4 py-2 text-sm font-semibold transition-colors",
                  filter === item.id
                    ? "bg-[#2563EB] text-white"
                    : "border border-[#E5E7EB] bg-white text-[#64748B] hover:border-[#2563EB]/30",
                ].join(" ")}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-none border border-[#E5E7EB] bg-white shadow-sm">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                <tr>
                  <th className="px-4 py-3">Food</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Received</th>
                  <th className="px-4 py-3">Consume By</th>
                  <th className="px-4 py-3">Est. Servings</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#E5E7EB] transition-colors last:border-0 hover:bg-[#F8FAFC]"
                  >
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-[#0F172A]">{item.food}</p>
                        <EventTypeBadge eventType={item.eventType} />
                      </div>
                      <p className="text-xs text-[#94A3B8]">{item.category}</p>
                      {item.itemCount > 1 ? (
                        <DonationItemsList record={item} className="mt-1.5" maxItems={3} />
                      ) : null}
                    </td>
                    <td className="px-4 py-3 font-medium">{item.quantity}</td>
                    <td className="px-4 py-3 text-[#64748B]">{item.received}</td>
                    <td className="px-4 py-3">{item.consumeBy}</td>
                    <td className="px-4 py-3">{item.servingsEstimate}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-none px-2.5 py-1 text-xs font-semibold ${INVENTORY_STATUS_COLORS[item.status]}`}
                      >
                        {INVENTORY_STATUS_LABELS[item.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-sm text-[#64748B]">No items match this filter.</p>
          ) : null}
        </div>
      </motion.section>
    </NGOLayout>
  );
}
