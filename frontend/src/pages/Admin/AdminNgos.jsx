import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaBan,
  FaBuilding,
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaMapMarkerAlt,
  FaPlus,
  FaSearch,
  FaStar,
  FaTimesCircle,
  FaUserCheck,
} from "react-icons/fa";
import AdminNgoDetailsDrawer from "../../components/admin/AdminNgoDetailsDrawer";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import NgoActionsMenu from "../../components/admin/NgoActionsMenu";
import { AdminStatCard } from "../../components/dashboard/AdminLayout";
import {
  ADMIN_NGO_STATS,
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

const STAT_CONFIG = [
  { key: "totalNgos", label: "Total NGOs", accent: "indigo", icon: FaBuilding },
  { key: "verifiedNgos", label: "Verified NGOs", accent: "green", icon: FaUserCheck },
  { key: "pendingVerification", label: "Pending Verification", accent: "amber", icon: FaClock },
  { key: "suspendedNgos", label: "Suspended NGOs", accent: "slate", icon: FaBan },
  { key: "rejectedNgos", label: "Rejected NGOs", accent: "purple", icon: FaTimesCircle },
  { key: "activeNgos", label: "Active NGOs", accent: "blue", icon: FaCheckCircle },
];

const FILTER_SELECT_CLASS =
  "w-full rounded-none border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm font-medium text-[#0F172A] transition-colors hover:border-[#4338CA]/30 focus:border-[#4338CA] focus:outline-none focus:ring-2 focus:ring-[#4338CA]/20";

function StatusBadge({ status, labels, colors }) {
  return (
    <span
      className={`inline-flex rounded-none border px-2.5 py-1 text-xs font-semibold ${colors[status]}`}
    >
      {labels[status]}
    </span>
  );
}

export default function AdminNgos() {
  const [ngos, setNgos] = useState(ADMIN_NGOS);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    verification: "all",
    city: "all",
    status: "all",
  });

  const filtered = useMemo(() => filterAdminNgos(ngos, filters), [ngos, filters]);

  useEffect(() => {
    if (!filters.search.trim()) return;
    if (filtered.length === 1) {
      setSelectedNgo(filtered[0]);
    }
  }, [filters.search, filtered]);

  const openNgo = (ngo) => {
    setOpenMenuId(null);
    setSelectedNgo(ngo);
  };

  const verifyNgo = (ngo) => {
    setNgos((prev) =>
      prev.map((item) =>
        item.id === ngo.id
          ? { ...item, verification: "verified", status: "active" }
          : item,
      ),
    );
    setSelectedNgo((current) =>
      current?.id === ngo.id
        ? { ...current, verification: "verified", status: "active" }
        : current,
    );
    toast.success(`${ngo.name} verified`);
  };

  const rejectNgo = (ngo) => {
    setNgos((prev) =>
      prev.map((item) =>
        item.id === ngo.id
          ? { ...item, verification: "rejected", status: "rejected" }
          : item,
      ),
    );
    setSelectedNgo(null);
    toast.error(`${ngo.name} rejected`);
  };

  const suspendNgo = (ngo) => {
    setNgos((prev) =>
      prev.map((item) =>
        item.id === ngo.id ? { ...item, status: "suspended" } : item,
      ),
    );
    setSelectedNgo((current) =>
      current?.id === ngo.id ? { ...current, status: "suspended" } : current,
    );
    toast(`${ngo.name} suspended`, { icon: "⛔" });
  };

  const handleAction = (actionId, ngo) => {
    setOpenMenuId(null);

    switch (actionId) {
      case "view":
        openNgo(ngo);
        break;
      case "verify":
        verifyNgo(ngo);
        break;
      case "reject":
        rejectNgo(ngo);
        break;
      case "activate":
        setNgos((prev) =>
          prev.map((item) =>
            item.id === ngo.id ? { ...item, status: "active" } : item,
          ),
        );
        toast.success(`${ngo.name} activated`);
        break;
      case "suspend":
        suspendNgo(ngo);
        break;
      case "email":
        window.location.href = `mailto:${ngo.email}`;
        break;
      case "delete":
        setNgos((prev) => prev.filter((item) => item.id !== ngo.id));
        setSelectedNgo(null);
        toast.error(`${ngo.name} removed`);
        break;
      default:
        break;
    }
  };

  const handleSearchKeyDown = (event) => {
    if (event.key !== "Enter" || filtered.length === 0) return;
    openNgo(filtered[0]);
  };

  return (
    <>
      <Toaster position="top-center" />

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#EEF2FF]/60 via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
      >
        <div className="flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6">
          <AdminPageHeader
            title="NGOs"
            description="Review, verify, and manage registered NGOs on NourishBridge."
          />

          <div className="flex gap-2 overflow-x-auto pb-1">
            {STAT_CONFIG.map((stat) => (
              <div key={stat.key} className="min-w-[150px] flex-1 shrink-0">
                <AdminStatCard
                  label={stat.label}
                  value={ADMIN_NGO_STATS[stat.key]}
                  icon={stat.icon}
                  accent={stat.accent}
                />
              </div>
            ))}
          </div>

          <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
              <h2 className="text-lg font-bold text-[#0F172A]">All NGOs</h2>

              <div className="flex flex-wrap items-end gap-2">
                <label className="flex min-w-[180px] flex-1 flex-col gap-1.5">
                  <span className="sr-only">Search NGOs</span>
                  <span className="relative">
                    <FaSearch
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      value={filters.search}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, search: e.target.value }))
                      }
                      onKeyDown={handleSearchKeyDown}
                      placeholder="Search NGO name, ID, contact..."
                      className={`${FILTER_SELECT_CLASS} pl-9`}
                    />
                  </span>
                </label>

                <label className="flex min-w-[130px] flex-col gap-1.5">
                  <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                    <FaUserCheck aria-hidden="true" />
                    Verification
                  </span>
                  <select
                    value={filters.verification}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, verification: e.target.value }))
                    }
                    className={FILTER_SELECT_CLASS}
                  >
                    {VERIFICATION_FILTER_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex min-w-[120px] flex-col gap-1.5">
                  <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                    <FaMapMarkerAlt aria-hidden="true" />
                    City
                  </span>
                  <select
                    value={filters.city}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, city: e.target.value }))
                    }
                    className={FILTER_SELECT_CLASS}
                  >
                    {CITY_FILTER_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex min-w-[120px] flex-col gap-1.5">
                  <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                    <FaCheckCircle aria-hidden="true" />
                    Status
                  </span>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, status: e.target.value }))
                    }
                    className={FILTER_SELECT_CLASS}
                  >
                    {NGO_STATUS_FILTER_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  type="button"
                  onClick={() => toast.success("NGO list exported")}
                  className="inline-flex h-[42px] items-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-[#4338CA] transition-colors hover:bg-[#EEF2FF]"
                >
                  <FaDownload aria-hidden="true" />
                  Export
                </button>

                <button
                  type="button"
                  onClick={() => toast("Add NGO flow coming soon", { icon: "➕" })}
                  className="inline-flex h-[42px] items-center gap-2 rounded-none bg-[#4338CA] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#3730A3]"
                >
                  <FaPlus aria-hidden="true" />
                  Add NGO
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-none border border-[#E5E7EB] bg-white shadow-sm">
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
                {filtered.map((ngo) => (
                  <tr
                    key={ngo.id}
                    onClick={() => openNgo(ngo)}
                    className={[
                      "cursor-pointer border-b border-[#E5E7EB] transition-colors last:border-0 hover:bg-[#F8FAFC]",
                      selectedNgo?.id === ngo.id ? "bg-[#EEF2FF]" : "",
                    ].join(" ")}
                  >
                    <td className="px-4 py-3 font-semibold text-[#4338CA]">{ngo.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none bg-[#EEF2FF] text-[#4338CA]">
                          <FaBuilding aria-hidden="true" />
                        </span>
                        <div>
                          <p className="font-medium text-[#0F172A]">{ngo.name}</p>
                          {ngo.rating ? (
                            <p className="flex items-center gap-1 text-xs text-amber-600">
                              <FaStar aria-hidden="true" />
                              {ngo.rating}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#64748B]">{ngo.contactPerson}</td>
                    <td className="px-4 py-3 text-[#64748B]">{ngo.city}</td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        status={ngo.verification}
                        labels={NGO_VERIFICATION_LABELS}
                        colors={NGO_VERIFICATION_COLORS}
                      />
                    </td>
                    <td className="px-4 py-3 text-[#64748B]">{ngo.capacity}</td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        status={ngo.status}
                        labels={NGO_STATUS_LABELS}
                        colors={NGO_STATUS_COLORS}
                      />
                    </td>
                    <td className="px-4 py-3 text-[#64748B]">{ngo.joinedDate}</td>
                    <td className="px-4 py-3 text-right">
                      <NgoActionsMenu
                        ngo={ngo}
                        isOpen={openMenuId === ngo.id}
                        onToggle={() =>
                          setOpenMenuId((current) => (current === ngo.id ? null : ngo.id))
                        }
                        onClose={() => setOpenMenuId(null)}
                        onAction={handleAction}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-[#64748B]">
                No NGOs match these filters.
              </p>
            ) : null}
          </div>
        </div>
      </motion.section>

      <AdminNgoDetailsDrawer
        ngo={selectedNgo}
        onClose={() => setSelectedNgo(null)}
        onVerify={verifyNgo}
        onReject={rejectNgo}
        onSuspend={suspendNgo}
      />
    </>
  );
}
