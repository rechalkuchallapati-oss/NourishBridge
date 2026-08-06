import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaBan,
  FaBuilding,
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaFilter,
  FaMapMarkerAlt,
  FaPlus,
  FaSearch,
  FaStar,
  FaTimesCircle,
  FaUserCheck,
} from "react-icons/fa";
import AdminInteractivePanel from "../../components/admin/AdminInteractivePanel";
import AdminNgoDetailsDrawer from "../../components/admin/AdminNgoDetailsDrawer";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminStatCardTrend from "../../components/admin/AdminStatCardTrend";
import NgoActionsMenu from "../../components/admin/NgoActionsMenu";
import {
  ADMIN_FILTER_INPUT,
  ADMIN_PAGE_BG,
  ADMIN_PRIMARY_BTN,
  ADMIN_SECONDARY_BTN,
} from "../../components/admin/adminStyles";
import {
  ADMIN_NGO_STATS,
  ADMIN_NGO_STAT_TRENDS,
  ADMIN_NGOS,
  CITY_FILTER_OPTIONS,
  NGO_STATUS_COLORS,
  NGO_STATUS_FILTER_OPTIONS,
  NGO_STATUS_LABELS,
  NGO_VERIFICATION_COLORS,
  NGO_VERIFICATION_LABELS,
  VERIFICATION_FILTER_OPTIONS,
  filterAdminNgos,
} from "../../data/adminNgos";

const EASE = [0.22, 1, 0.36, 1];
const PAGE_SIZE = 5;

const STAT_CONFIG = [
  { key: "totalNgos", label: "Total NGOs", accent: "green", icon: FaBuilding },
  { key: "verifiedNgos", label: "Verified NGOs", accent: "green", icon: FaUserCheck },
  { key: "pendingVerification", label: "Pending Verification", accent: "amber", icon: FaClock },
  { key: "suspendedNgos", label: "Suspended NGOs", accent: "slate", icon: FaBan },
  { key: "rejectedNgos", label: "Rejected NGOs", accent: "purple", icon: FaTimesCircle },
  { key: "activeNgos", label: "Active NGOs", accent: "blue", icon: FaCheckCircle },
];

function StatusBadge({ status, labels, colors }) {
  return (
    <span className={`inline-flex rounded-none border px-2.5 py-1 text-xs font-semibold ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function AdminNgos() {
  const [ngos, setNgos] = useState(ADMIN_NGOS);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ search: "", verification: "all", city: "all", status: "all" });

  const filtered = useMemo(() => filterAdminNgos(ngos, filters), [ngos, filters]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  useEffect(() => setCurrentPage(1), [filters]);
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!filters.search.trim()) return;
    if (filtered.length === 1) setSelectedNgo(filtered[0]);
  }, [filters.search, filtered]);

  const openNgo = (ngo) => {
    setOpenMenuId(null);
    setSelectedNgo(ngo);
  };

  const verifyNgo = (ngo) => {
    setNgos((prev) =>
      prev.map((item) =>
        item.id === ngo.id ? { ...item, verification: "verified", status: "active" } : item,
      ),
    );
    setSelectedNgo((c) => (c?.id === ngo.id ? { ...c, verification: "verified", status: "active" } : c));
    toast.success(`${ngo.name} verified`);
  };

  const rejectNgo = (ngo) => {
    setNgos((prev) =>
      prev.map((item) =>
        item.id === ngo.id ? { ...item, verification: "rejected", status: "rejected" } : item,
      ),
    );
    setSelectedNgo(null);
    toast.error(`${ngo.name} rejected`);
  };

  const suspendNgo = (ngo) => {
    setNgos((prev) =>
      prev.map((item) => (item.id === ngo.id ? { ...item, status: "suspended" } : item)),
    );
    setSelectedNgo((c) => (c?.id === ngo.id ? { ...c, status: "suspended" } : c));
    toast(`${ngo.name} suspended`, { icon: "⛔" });
  };

  const handleAction = (actionId, ngo) => {
    setOpenMenuId(null);
    switch (actionId) {
      case "view": openNgo(ngo); break;
      case "verify": verifyNgo(ngo); break;
      case "reject": rejectNgo(ngo); break;
      case "activate":
        setNgos((prev) => prev.map((item) => (item.id === ngo.id ? { ...item, status: "active" } : item)));
        toast.success(`${ngo.name} activated`);
        break;
      case "suspend": suspendNgo(ngo); break;
      case "email": window.location.href = `mailto:${ngo.email}`; break;
      case "delete":
        setNgos((prev) => prev.filter((item) => item.id !== ngo.id));
        setSelectedNgo(null);
        toast.error(`${ngo.name} removed`);
        break;
      default: break;
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={ADMIN_PAGE_BG}
      >
        <div className="flex flex-col gap-5 p-5 sm:p-6">
          <AdminPageHeader title="NGOs" description="Review, verify, and manage registered NGOs on NourishBridge." />

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {STAT_CONFIG.map((stat) => {
              const trendData = ADMIN_NGO_STAT_TRENDS[stat.key];
              return (
                <AdminStatCardTrend
                  key={stat.key}
                  label={stat.label}
                  value={ADMIN_NGO_STATS[stat.key]}
                  icon={stat.icon}
                  accent={stat.accent}
                  trend={trendData.trend}
                  trendLabel={trendData.trendLabel}
                />
              );
            })}
          </div>

          <AdminInteractivePanel>
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <h2 className="text-xl font-bold text-[#0F172A]">All NGOs</h2>
              <div className="flex flex-wrap items-end gap-2">
                <label className="relative min-w-[200px] flex-1">
                  <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" aria-hidden="true" />
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                    onKeyDown={(e) => e.key === "Enter" && filtered[0] && openNgo(filtered[0])}
                    placeholder="Search NGO name, ID, contact..."
                    className={`${ADMIN_FILTER_INPUT} pl-9`}
                  />
                </label>
                <label className="min-w-[130px]">
                  <span className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                    <FaUserCheck aria-hidden="true" /> Verification
                  </span>
                  <select value={filters.verification} onChange={(e) => setFilters((p) => ({ ...p, verification: e.target.value }))} className={ADMIN_FILTER_INPUT}>
                    {VERIFICATION_FILTER_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                  </select>
                </label>
                <label className="min-w-[120px]">
                  <span className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                    <FaMapMarkerAlt aria-hidden="true" /> City
                  </span>
                  <select value={filters.city} onChange={(e) => setFilters((p) => ({ ...p, city: e.target.value }))} className={ADMIN_FILTER_INPUT}>
                    {CITY_FILTER_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                  </select>
                </label>
                <label className="min-w-[120px]">
                  <span className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                    <FaFilter aria-hidden="true" /> Status
                  </span>
                  <select value={filters.status} onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))} className={ADMIN_FILTER_INPUT}>
                    {NGO_STATUS_FILTER_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                  </select>
                </label>
                <button type="button" onClick={() => toast.success("NGO list exported")} className={ADMIN_SECONDARY_BTN}>
                  <FaDownload aria-hidden="true" /> Export
                </button>
                <button type="button" onClick={() => toast("Add NGO flow coming soon", { icon: "➕" })} className={ADMIN_PRIMARY_BTN}>
                  <FaPlus aria-hidden="true" /> Add NGO
                </button>
              </div>
            </div>
          </AdminInteractivePanel>

          <AdminInteractivePanel className="!p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left text-sm">
                <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                  <tr>
                    <th className="px-4 py-3">NGO ID</th>
                    <th className="px-4 py-3">NGO Name</th>
                    <th className="px-4 py-3">Contact Person</th>
                    <th className="px-4 py-3">City</th>
                    <th className="px-4 py-3">Verification</th>
                    <th className="px-4 py-3">Capacity</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Joined Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((ngo) => (
                    <tr
                      key={ngo.id}
                      onClick={() => openNgo(ngo)}
                      className={[
                        "cursor-pointer border-b border-[#E5E7EB] transition-colors last:border-0 hover:bg-[#F0FDF4]",
                        selectedNgo?.id === ngo.id ? "bg-[#F0FDF4]" : "",
                      ].join(" ")}
                    >
                      <td className="px-4 py-3 font-semibold text-[#15803D]">{ngo.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none bg-[#F0FDF4] text-[#16A34A]">
                            <FaBuilding aria-hidden="true" />
                          </span>
                          <div>
                            <p className="font-medium text-[#0F172A]">{ngo.name}</p>
                            {ngo.rating ? (
                              <p className="flex items-center gap-1 text-xs text-amber-600">
                                <FaStar aria-hidden="true" /> {ngo.rating}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#64748B]">{ngo.contactPerson}</td>
                      <td className="px-4 py-3 text-[#64748B]">{ngo.city}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={ngo.verification} labels={NGO_VERIFICATION_LABELS} colors={NGO_VERIFICATION_COLORS} />
                      </td>
                      <td className="px-4 py-3 text-[#64748B]">{ngo.capacity}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={ngo.status} labels={NGO_STATUS_LABELS} colors={NGO_STATUS_COLORS} />
                      </td>
                      <td className="px-4 py-3 text-[#64748B]">{ngo.joinedDate}</td>
                      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <NgoActionsMenu
                          ngo={ngo}
                          isOpen={openMenuId === ngo.id}
                          onToggle={() => setOpenMenuId((c) => (c === ngo.id ? null : ngo.id))}
                          onClose={() => setOpenMenuId(null)}
                          onAction={handleAction}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-[#64748B]">No NGOs match these filters.</p>
              ) : null}
            </div>
            <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filtered.length}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </AdminInteractivePanel>
        </div>
      </motion.section>

      <AdminNgoDetailsDrawer
        ngo={selectedNgo}
        onClose={() => setSelectedNgo(null)}
        onVerify={verifyNgo}
        onReject={rejectNgo}
        onSuspend={suspendNgo}
        onEdit={(ngo) => toast(`Edit ${ngo.name}`, { icon: "✏️" })}
      />
    </>
  );
}
