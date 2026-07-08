import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaBan,
  FaCheckCircle,
  FaClock,
  FaInbox,
  FaMapMarkerAlt,
  FaRoute,
  FaTruck,
} from "react-icons/fa";
import DeclineDonationModal from "../../components/ngo/DeclineDonationModal";
import DonationDetailsDrawer from "../../components/ngo/DonationDetailsDrawer";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOWorkflowStrip from "../../components/ngo/NGOWorkflowStrip";
import NGOLayout, { NGOStatCard } from "../../components/dashboard/NGOLayout";
import {
  LIVE_INCOMING_DONATIONS,
  INCOMING_QUICK_FILTERS,
  INCOMING_CATEGORY_OPTIONS,
  INCOMING_STATUS_OPTIONS,
  DONATION_TABLE_STATUS_LABELS,
  DONATION_STATUS_COLORS,
  STORAGE_CAPACITY,
  TODAYS_SCHEDULE,
  UPCOMING_DELIVERIES_SUMMARY,
  computeIncomingDonationStats,
  filterIncomingDonations,
} from "../../data/ngoIncomingDonations";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];
const STORAGE_KEY = "nb_ngo_incoming_table_actions";

const STAT_CONFIG = [
  { key: "incoming", label: "Incoming Donations", caption: "Total active donor pledges", accent: "blue", icon: FaInbox },
  { key: "awaiting", label: "Awaiting Acceptance", caption: "Pending NGO review", accent: "amber", icon: FaClock },
  { key: "volunteerAssigned", label: "Volunteer Assigned", caption: "Coordinated for pickup", accent: "purple", icon: FaTruck },
  { key: "enRoute", label: "En Route", caption: "Picked up or in transit", accent: "green", icon: FaRoute },
  { key: "delivered", label: "Delivered", caption: "Received at NGO", accent: "green", icon: FaCheckCircle },
  { key: "rejected", label: "Rejected", caption: "Declined with reason", accent: "slate", icon: FaBan },
];

const FILTER_SELECT_CLASS =
  "w-full rounded-none border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm font-medium text-[#0F172A] transition-colors hover:border-[#2563EB]/30 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20";

function loadPersistedActions() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { accepted: [], rejected: [] };
  } catch {
    return { accepted: [], rejected: [] };
  }
}

function savePersistedActions(actions) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(actions));
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-none px-2.5 py-1 text-xs font-semibold ${DONATION_STATUS_COLORS[status]}`}
    >
      {DONATION_TABLE_STATUS_LABELS[status]}
    </span>
  );
}

function RightPanel() {
  return (
    <aside className="flex flex-col gap-[0.5cm] lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-none border border-[#DBEAFE] bg-gradient-to-br from-[#EFF6FF] to-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#2563EB]">
          Upcoming Deliveries
        </h2>
        <p className="mt-2 text-2xl font-bold text-[#0F172A]">
          {UPCOMING_DELIVERIES_SUMMARY.arrivingSoon} arriving in{" "}
          {UPCOMING_DELIVERIES_SUMMARY.arrivingInMinutes} mins
        </p>
        {UPCOMING_DELIVERIES_SUMMARY.emergencyCount > 0 ? (
          <p className="mt-1 text-sm font-semibold text-red-600">
            {UPCOMING_DELIVERIES_SUMMARY.emergencyCount} Emergency Delivery
          </p>
        ) : null}
        <ul className="mt-3 flex flex-col gap-2">
          {UPCOMING_DELIVERIES_SUMMARY.items.map((item) => (
            <li
              key={item.id}
              className="rounded-none border border-[#E5E7EB] bg-white px-3 py-2 text-sm"
            >
              <p className="font-semibold text-[#0F172A]">
                {item.id} · {item.donor}
              </p>
              <p className="text-xs text-[#64748B]">
                ETA {item.eta}
                {item.emergency ? " · Emergency" : ""}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">
          Storage Capacity
        </h2>
        <div className="mt-3">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-[#0F172A]">General Storage</span>
            <span className="text-[#64748B]">
              {STORAGE_CAPACITY.usedKg} / {STORAGE_CAPACITY.totalKg} kg
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-none bg-[#E2E8F0]">
            <div
              className="h-full bg-[#2563EB]"
              style={{ width: `${STORAGE_CAPACITY.usedPercent}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-[#64748B]">
            Cold storage {STORAGE_CAPACITY.coldStoragePercent}% ·{" "}
            {STORAGE_CAPACITY.slotsAvailable} slots available
          </p>
        </div>
      </div>

      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">
          Today&apos;s Schedule
        </h2>
        <ul className="mt-3 flex flex-col gap-2">
          {TODAYS_SCHEDULE.map((item) => (
            <li key={item.time + item.label} className="flex gap-3 text-sm">
              <span className="shrink-0 font-semibold text-[#2563EB]">{item.time}</span>
              <span className="text-[#64748B]">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default function NGOIncomingDonations() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);

  const [donations, setDonations] = useState(LIVE_INCOMING_DONATIONS);
  const [actions, setActions] = useState(loadPersistedActions);
  const [selectedId, setSelectedId] = useState(null);
  const [declineTarget, setDeclineTarget] = useState(null);
  const [filters, setFilters] = useState({
    quick: "all",
    category: "all",
    status: "all",
    nearby: "all",
  });

  const visibleDonations = useMemo(
    () =>
      donations.filter(
        (d) =>
          !actions.rejected.some((item) => item.id === d.id) ||
          d.status === "rejected",
      ),
    [donations, actions],
  );

  const stats = useMemo(
    () => computeIncomingDonationStats(visibleDonations),
    [visibleDonations],
  );

  const filtered = useMemo(
    () => filterIncomingDonations(visibleDonations, filters),
    [visibleDonations, filters],
  );

  const selected = useMemo(
    () => visibleDonations.find((d) => d.id === selectedId) ?? null,
    [visibleDonations, selectedId],
  );

  const canAccept = selected?.status === "pending_ngo_acceptance";
  const canReject =
    selected &&
    !["delivered", "verified", "completed", "rejected"].includes(selected.status);

  const handleAccept = (donation) => {
    const next = {
      ...actions,
      accepted: [...actions.accepted, donation.id],
    };
    setActions(next);
    savePersistedActions(next);
    setDonations((prev) =>
      prev.map((d) =>
        d.id === donation.id
          ? {
              ...d,
              status: "accepted",
              timeline: [
                ...d.timeline,
                { step: "accepted", time: "Just now" },
              ],
            }
          : d,
      ),
    );
    setSelectedId(null);
    toast.success(`${donation.id} accepted — volunteer coordination started.`);
  };

  const handleDeclineConfirm = (donationId, payload) => {
    const next = {
      ...actions,
      rejected: [...actions.rejected, { id: donationId, ...payload }],
    };
    setActions(next);
    savePersistedActions(next);
    setDonations((prev) =>
      prev.map((d) =>
        d.id === donationId ? { ...d, status: "rejected", rejectReason: payload.reason } : d,
      ),
    );
    setDeclineTarget(null);
    setSelectedId(null);
  };

  const handleReject = (donation) => {
    setDeclineTarget(donation);
    setSelectedId(null);
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
            icon={FaInbox}
            title="Incoming Donations"
            description="Food already donated by donors. Review live status, assign volunteers, track ETAs, and accept or reject donations."
          />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              Donation Statistics
            </p>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
              {STAT_CONFIG.map((stat) => (
                <NGOStatCard
                  key={stat.key}
                  label={stat.label}
                  value={stats[stat.key]}
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
                  {INCOMING_QUICK_FILTERS.map((item) => (
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
                  <label className="flex min-w-[140px] flex-1 flex-col gap-1.5">
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
                      {INCOMING_CATEGORY_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex min-w-[140px] flex-1 flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Donation Status
                    </span>
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, status: e.target.value }))
                      }
                      className={FILTER_SELECT_CLASS}
                    >
                      {INCOMING_STATUS_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex min-w-[140px] flex-1 flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Nearby
                    </span>
                    <select
                      value={filters.nearby}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, nearby: e.target.value }))
                      }
                      className={FILTER_SELECT_CLASS}
                    >
                      <option value="all">All Distances</option>
                      <option value="nearby">Nearby only (&lt; 5 km)</option>
                    </select>
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Live Incoming Donations Table
                </p>
                <div className="overflow-x-auto rounded-none border border-[#E5E7EB] bg-white shadow-sm">
                  <table className="w-full min-w-[960px] text-left text-sm">
                    <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                      <tr>
                        <th className="px-4 py-3">Donation ID</th>
                        <th className="px-4 py-3">Donor</th>
                        <th className="px-4 py-3">Food Item</th>
                        <th className="px-4 py-3">Quantity</th>
                        <th className="px-4 py-3">Pickup Time</th>
                        <th className="px-4 py-3">Volunteer</th>
                        <th className="px-4 py-3">ETA</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((donation) => (
                        <tr
                          key={donation.id}
                          className={[
                            "border-b border-[#E5E7EB] transition-colors last:border-0 hover:bg-[#F8FAFC]",
                            selectedId === donation.id ? "bg-[#EFF6FF]" : "",
                          ].join(" ")}
                        >
                          <td className="px-4 py-3 font-semibold text-[#2563EB]">
                            {donation.id}
                          </td>
                          <td className="px-4 py-3 font-medium text-[#0F172A]">
                            {donation.donor}
                          </td>
                          <td className="px-4 py-3">{donation.foodItem}</td>
                          <td className="px-4 py-3">{donation.quantity}</td>
                          <td className="px-4 py-3 text-[#64748B]">{donation.pickupTime}</td>
                          <td className="px-4 py-3">{donation.volunteer}</td>
                          <td className="px-4 py-3 font-medium text-[#2563EB]">
                            {donation.eta}
                          </td>
                          <td className="px-4 py-3">
                            <StatusBadge status={donation.status} />
                          </td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => setSelectedId(donation.id)}
                              className="inline-flex items-center gap-1.5 rounded-none border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-semibold text-[#2563EB] transition-colors hover:border-[#2563EB]/30 hover:bg-[#EFF6FF]"
                            >
                              <FaMapMarkerAlt aria-hidden="true" />
                              Track
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {filtered.length === 0 ? (
                <p className="text-center text-sm text-[#64748B]">
                  No donations match these filters.
                </p>
              ) : null}
            </div>

            <RightPanel />
          </div>

          <NGOWorkflowStrip />
        </div>
      </motion.section>

      <DonationDetailsDrawer
        donation={selected}
        onClose={() => setSelectedId(null)}
        onAccept={handleAccept}
        onReject={handleReject}
        canAccept={canAccept}
        canReject={canReject}
      />

      {declineTarget ? (
        <DeclineDonationModal
          donation={declineTarget}
          onClose={() => setDeclineTarget(null)}
          onConfirm={handleDeclineConfirm}
        />
      ) : null}
    </NGOLayout>
  );
}
