import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaArrowDown,
  FaArrowUp,
  FaBan,
  FaBoxes,
  FaClipboardList,
  FaClock,
  FaEdit,
  FaEye,
  FaHistory,
  FaLayerGroup,
  FaTruck,
  FaWarehouse,
} from "react-icons/fa";
import InventoryAnalyticsPanel from "../../components/ngo/InventoryAnalyticsPanel";
import InventoryBatchDrawer from "../../components/ngo/InventoryBatchDrawer";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOWorkflowStrip from "../../components/ngo/NGOWorkflowStrip";
import NGOLayout, { NGOStatCard } from "../../components/dashboard/NGOLayout";
import {
  INVENTORY_BATCHES,
  INVENTORY_OVERVIEW_STATS,
  INVENTORY_STATUS_LABELS,
  INVENTORY_STATUS_COLORS,
  INVENTORY_QUICK_FILTERS,
  INVENTORY_CATEGORY_OPTIONS,
  INVENTORY_STATUS_OPTIONS,
  INVENTORY_STORAGE_OPTIONS,
  INVENTORY_DATE_OPTIONS,
  filterInventoryBatches,
} from "../../data/ngoInventory";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

const STAT_CONFIG = [
  { key: "availableFoodStock", label: "Available Food Stock", caption: "Estimated meals in stock", accent: "green", icon: FaBoxes },
  { key: "foodBatches", label: "Food Batches", caption: "Active inventory batches", accent: "blue", icon: FaLayerGroup },
  { key: "todaysIncoming", label: "Today's Incoming", caption: "Batches received today", accent: "purple", icon: FaArrowDown },
  { key: "todaysOutgoing", label: "Today's Outgoing", caption: "Distributed today", accent: "amber", icon: FaArrowUp },
  { key: "nearExpiry", label: "Near Expiry", caption: "Requires urgent action", accent: "amber", icon: FaClock },
  { key: "expiredItems", label: "Expired Items", caption: "Pending disposal", accent: "slate", icon: FaBan },
  { key: "storageUtilization", label: "Storage Utilization", caption: "Capacity in use", accent: "blue", icon: FaWarehouse },
];

const FILTER_SELECT_CLASS =
  "w-full rounded-none border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm font-medium text-[#0F172A] transition-colors hover:border-[#2563EB]/30 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20";

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-none px-2.5 py-1 text-xs font-semibold ${INVENTORY_STATUS_COLORS[status]}`}
    >
      {INVENTORY_STATUS_LABELS[status]}
    </span>
  );
}

function SidePanel({
  selected,
  onAssign,
  onReserve,
  onMarkExpired,
  onUpdateQuantity,
  onViewHistory,
  onViewDetails,
}) {
  const canModify =
    selected && !["distributed", "expired"].includes(selected.status);

  return (
    <aside className="flex flex-col gap-[0.5cm] lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Quick Actions</h2>
        <div className="mt-[0.5cm] flex flex-col gap-2">
          <button
            type="button"
            onClick={onAssign}
            disabled={!canModify}
            className="flex items-center justify-center gap-2 rounded-none bg-[#16A34A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#15803D] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaTruck aria-hidden="true" />
            Assign for Distribution
          </button>
          <button
            type="button"
            onClick={onReserve}
            disabled={!canModify}
            className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#2563EB]/30 hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaClipboardList aria-hidden="true" />
            Reserve Batch
          </button>
          <button
            type="button"
            onClick={onMarkExpired}
            disabled={!canModify}
            className="flex items-center justify-center gap-2 rounded-none border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaBan aria-hidden="true" />
            Mark Expired
          </button>
          <button
            type="button"
            onClick={onUpdateQuantity}
            disabled={!canModify}
            className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#2563EB]/30 hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaEdit aria-hidden="true" />
            Update Quantity
          </button>
          <button
            type="button"
            onClick={onViewHistory}
            disabled={!selected}
            className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#2563EB] transition-colors hover:border-[#2563EB]/30 hover:bg-[#EFF6FF] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaHistory aria-hidden="true" />
            View History
          </button>
          <button
            type="button"
            onClick={onViewDetails}
            disabled={!selected}
            className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#2563EB] transition-colors hover:border-[#2563EB]/30 hover:bg-[#EFF6FF] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaEye aria-hidden="true" />
            View Details
          </button>
        </div>
      </div>

      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">
          Inventory Status
        </h2>
        <ul className="mt-3 flex flex-col gap-1.5">
          {Object.entries(INVENTORY_STATUS_LABELS).map(([key, label]) => (
            <li
              key={key}
              className={[
                "flex items-center gap-2 rounded-none px-2 py-1 text-xs",
                selected?.status === key ? "bg-[#F0FDF4]" : "",
              ].join(" ")}
            >
              <StatusBadge status={key} />
            </li>
          ))}
        </ul>
      </div>

      {selected ? (
        <div className="rounded-none border border-[#DBEAFE] bg-gradient-to-br from-[#EFF6FF] to-white p-[0.5cm] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">Selected Batch</p>
          <p className="mt-2 text-lg font-bold text-[#0F172A]">{selected.id}</p>
          <p className="mt-1 font-semibold text-[#334155]">{selected.foodItem}</p>
          <p className="mt-1 text-sm text-[#64748B]">
            {selected.quantity} · {selected.estimatedMeals} meals
          </p>
          <div className="mt-3">
            <StatusBadge status={selected.status} />
          </div>
          <p className="mt-3 text-sm text-[#64748B]">{selected.currentLocation}</p>
        </div>
      ) : (
        <div className="rounded-none border border-dashed border-[#E5E7EB] bg-[#F8FAFC] p-[0.5cm] text-center">
          <p className="text-sm text-[#64748B]">Select a batch to manage stock or view details.</p>
        </div>
      )}
    </aside>
  );
}

export default function NGOInventory() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);

  const [batches, setBatches] = useState(INVENTORY_BATCHES);
  const [selectedId, setSelectedId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    quick: "all",
    category: "all",
    status: "all",
    storage: "all",
    date: "all",
    batchId: "",
  });

  const stats = INVENTORY_OVERVIEW_STATS;

  const filtered = useMemo(
    () => filterInventoryBatches(batches, filters),
    [batches, filters],
  );

  const activeTable = useMemo(() => {
    if (filters.status !== "all") return filtered;
    return filtered.filter((b) => b.status !== "distributed");
  }, [filtered, filters.status]);

  const selected = useMemo(
    () => batches.find((b) => b.id === selectedId) ?? null,
    [batches, selectedId],
  );

  const updateBatch = (id, updates) => {
    setBatches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    );
  };

  const handleView = (batch) => {
    setSelectedId(batch.id);
    setDrawerOpen(true);
  };

  const handleAssign = () => {
    if (!selected) return;
    updateBatch(selected.id, {
      status: "ready_for_distribution",
      assignedDistributionBatch: "BAT-NEW",
      history: [
        ...selected.history,
        { action: "Assigned for distribution", time: "Just now" },
      ],
    });
    toast.success(`${selected.id} assigned for distribution`);
  };

  const handleReserve = () => {
    if (!selected) return;
    updateBatch(selected.id, {
      status: "reserved",
      history: [...selected.history, { action: "Batch reserved", time: "Just now" }],
    });
    toast.success(`${selected.id} reserved`);
  };

  const handleMarkExpired = () => {
    if (!selected) return;
    updateBatch(selected.id, {
      status: "expired",
      expiryTime: "Expired",
      qualityStatus: "Expired — Disposed",
      currentLocation: "Disposal Queue",
      history: [...selected.history, { action: "Marked expired", time: "Just now" }],
    });
    toast.error(`${selected.id} marked as expired`);
  };

  const handleUpdateQuantity = () => {
    if (!selected) return;
    toast("Update quantity form coming soon — " + selected.id, { icon: "✏️" });
  };

  const handleViewHistory = () => {
    if (!selected) return;
    setDrawerOpen(true);
  };

  return (
    <NGOLayout organizationName={orgName}>
      <Toaster position="top-center" />

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
      >
        <div className="flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6">
          <NGOPageHeader
            icon={FaBoxes}
            title="Inventory"
            description="Food stock management — track batches, quantity, expiry, storage, and readiness for distribution."
          />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              Dashboard Statistics
            </p>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
              {STAT_CONFIG.map((stat) => (
                <NGOStatCard
                  key={stat.key}
                  label={stat.label}
                  value={
                    stat.key === "storageUtilization"
                      ? `${stats[stat.key]}%`
                      : stats[stat.key]
                  }
                  caption={stat.caption}
                  icon={stat.icon}
                  accent={stat.accent}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-[0.5cm] lg:grid-cols-[minmax(0,1fr)_260px] xl:grid-cols-[minmax(0,1fr)_280px]">
            <div className="flex min-w-0 flex-col gap-[0.5cm]">
              <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
                <p className="mb-[0.5cm] text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Filters
                </p>
                <div className="mb-3 flex flex-wrap gap-2">
                  {INVENTORY_QUICK_FILTERS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFilters((prev) => ({ ...prev, quick: item.id }))}
                      className={[
                        "rounded-none px-4 py-2 text-sm font-semibold transition-colors",
                        filters.quick === item.id
                          ? "bg-[#2563EB] text-white"
                          : "border border-[#E5E7EB] bg-white text-[#64748B] hover:border-[#2563EB]/30",
                      ].join(" ")}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <label className="flex min-w-[130px] flex-1 flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Food Category
                    </span>
                    <select
                      value={filters.category}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, category: e.target.value }))
                      }
                      className={FILTER_SELECT_CLASS}
                    >
                      {INVENTORY_CATEGORY_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex min-w-[130px] flex-1 flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Status
                    </span>
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, status: e.target.value }))
                      }
                      className={FILTER_SELECT_CLASS}
                    >
                      {INVENTORY_STATUS_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex min-w-[130px] flex-1 flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Storage Type
                    </span>
                    <select
                      value={filters.storage}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, storage: e.target.value }))
                      }
                      className={FILTER_SELECT_CLASS}
                    >
                      {INVENTORY_STORAGE_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex min-w-[130px] flex-1 flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Date
                    </span>
                    <select
                      value={filters.date}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, date: e.target.value }))
                      }
                      className={FILTER_SELECT_CLASS}
                    >
                      {INVENTORY_DATE_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex min-w-[130px] flex-1 flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Batch ID
                    </span>
                    <input
                      type="text"
                      value={filters.batchId}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, batchId: e.target.value }))
                      }
                      placeholder="e.g. INV-1045"
                      className={FILTER_SELECT_CLASS}
                    />
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Main Inventory Table
                </p>
                <div className="overflow-x-auto rounded-none border border-[#E5E7EB] bg-white shadow-sm">
                  <table className="w-full min-w-[1100px] text-left text-sm">
                    <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                      <tr>
                        <th className="px-4 py-3">Batch ID</th>
                        <th className="px-4 py-3">Food Item</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Quantity</th>
                        <th className="px-4 py-3">Estimated Meals</th>
                        <th className="px-4 py-3">Received Date</th>
                        <th className="px-4 py-3">Expiry Time</th>
                        <th className="px-4 py-3">Storage</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeTable.map((batch) => (
                        <tr
                          key={batch.id}
                          onClick={() => setSelectedId(batch.id)}
                          className={[
                            "cursor-pointer border-b border-[#E5E7EB] transition-colors last:border-0 hover:bg-[#F8FAFC]",
                            selectedId === batch.id ? "bg-[#EFF6FF]" : "",
                          ].join(" ")}
                        >
                          <td className="px-4 py-3 font-semibold text-[#2563EB]">{batch.id}</td>
                          <td className="px-4 py-3 font-medium text-[#0F172A]">{batch.foodItem}</td>
                          <td className="px-4 py-3 text-[#64748B]">{batch.category}</td>
                          <td className="px-4 py-3">{batch.quantity}</td>
                          <td className="px-4 py-3">{batch.estimatedMeals} Meals</td>
                          <td className="px-4 py-3">{batch.receivedDate}</td>
                          <td
                            className={[
                              "px-4 py-3 font-medium",
                              batch.status === "near_expiry" ? "text-amber-600" : "text-[#64748B]",
                            ].join(" ")}
                          >
                            {batch.expiryTime}
                          </td>
                          <td className="px-4 py-3">{batch.storage}</td>
                          <td className="px-4 py-3">
                            <StatusBadge status={batch.status} />
                          </td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleView(batch);
                              }}
                              className="inline-flex items-center gap-1.5 rounded-none border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-semibold text-[#2563EB] transition-colors hover:border-[#2563EB]/30 hover:bg-[#EFF6FF]"
                            >
                              <FaEye aria-hidden="true" />
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {activeTable.length === 0 ? (
                <p className="text-center text-sm text-[#64748B]">No batches match these filters.</p>
              ) : null}

              <InventoryAnalyticsPanel />
            </div>

            <SidePanel
              selected={selected}
              onAssign={handleAssign}
              onReserve={handleReserve}
              onMarkExpired={handleMarkExpired}
              onUpdateQuantity={handleUpdateQuantity}
              onViewHistory={handleViewHistory}
              onViewDetails={() => selected && setDrawerOpen(true)}
            />
          </div>

          <NGOWorkflowStrip />
        </div>
      </motion.section>

      <InventoryBatchDrawer
        batch={drawerOpen ? selected : null}
        onClose={() => setDrawerOpen(false)}
      />
    </NGOLayout>
  );
}
