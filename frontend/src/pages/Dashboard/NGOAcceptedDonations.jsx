import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaCheckCircle,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaEye,
  FaMapMarkerAlt,
  FaPhone,
  FaRoute,
  FaTruck,
  FaBoxOpen,
} from "react-icons/fa";
import AcceptedDonationDrawer from "../../components/ngo/AcceptedDonationDrawer";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOWorkflowStrip from "../../components/ngo/NGOWorkflowStrip";
import NGOLayout, { NGOStatCard } from "../../components/dashboard/NGOLayout";
import {
  ACCEPTED_DONATIONS,
  ACCEPTED_OVERVIEW_STATS,
  ACCEPTED_QUICK_FILTERS,
  ACCEPTED_CATEGORY_OPTIONS,
  ACCEPTED_PIPELINE_STEPS,
  ACCEPTED_STATUS_LABELS,
  ACCEPTED_STATUS_COLORS,
  filterAcceptedDonations,
} from "../../data/ngoAcceptedDonations";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

const STAT_CONFIG = [
  { key: "acceptedToday", label: "Accepted Today", caption: "Donations accepted today", accent: "blue", icon: FaCheckCircle },
  { key: "awaitingPickup", label: "Awaiting Pickup", caption: "Volunteer not yet collected", accent: "amber", icon: FaTruck },
  { key: "inTransit", label: "In Transit", caption: "En route to NGO", accent: "purple", icon: FaRoute },
  { key: "received", label: "Received", caption: "At NGO — inspection pending", accent: "green", icon: FaBoxOpen },
  { key: "readyForDistribution", label: "Ready for Distribution", caption: "Quality checked & cleared", accent: "green", icon: FaClipboardCheck },
];

const FILTER_SELECT_CLASS =
  "w-full rounded-none border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm font-medium text-[#0F172A] transition-colors hover:border-[#2563EB]/30 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20";

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-none px-2.5 py-1 text-xs font-semibold ${ACCEPTED_STATUS_COLORS[status]}`}
    >
      {ACCEPTED_STATUS_LABELS[status]}
    </span>
  );
}

function SidePanel({ selected, onTrack, onViewDetails, onReportIssue, onRejectArrival }) {
  const hasVolunteer = selected?.volunteer && selected.volunteer !== "—";
  const canTrack = selected && ["picked_up", "in_transit"].includes(selected.status);
  const canReject = selected && !["completed", "ready_for_distribution"].includes(selected.status);

  return (
    <aside className="flex flex-col gap-[0.5cm] lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Quick Actions</h2>
        <div className="mt-[0.5cm] flex flex-col gap-2">
          <button
            type="button"
            onClick={onTrack}
            disabled={!canTrack}
            className="flex items-center justify-center gap-2 rounded-none bg-[#16A34A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#15803D] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaMapMarkerAlt aria-hidden="true" />
            Track Live
          </button>
          {hasVolunteer ? (
            <a
              href={`tel:${selected.volunteerPhone?.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#2563EB]/30 hover:bg-[#F8FAFC]"
            >
              <FaPhone aria-hidden="true" />
              Call Volunteer
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] opacity-40"
            >
              <FaPhone aria-hidden="true" />
              Call Volunteer
            </button>
          )}
          {selected?.donorPhone ? (
            <a
              href={`tel:${selected.donorPhone.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#2563EB]/30 hover:bg-[#F8FAFC]"
            >
              <FaPhone aria-hidden="true" />
              Contact Donor
            </a>
          ) : (
            <button
              type="button"
              disabled={!selected}
              className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#2563EB]/30 hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaPhone aria-hidden="true" />
              Contact Donor
            </button>
          )}
          <button
            type="button"
            onClick={onReportIssue}
            disabled={!selected}
            className="flex items-center justify-center gap-2 rounded-none border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaExclamationTriangle aria-hidden="true" />
            Report Issue
          </button>
          <button
            type="button"
            onClick={onRejectArrival}
            disabled={!canReject}
            className="flex items-center justify-center gap-2 rounded-none border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Reject on Arrival
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
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Status Flow</h2>
        <div className="mt-3 flex flex-col gap-1">
          {ACCEPTED_PIPELINE_STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center gap-2">
              <span
                className={[
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-none text-xs font-bold",
                  selected?.status === step.id
                    ? "bg-[#16A34A] text-white"
                    : "bg-[#F1F5F9] text-[#64748B]",
                ].join(" ")}
              >
                {index + 1}
              </span>
              <span
                className={[
                  "text-xs font-medium",
                  selected?.status === step.id ? "text-[#16A34A]" : "text-[#64748B]",
                ].join(" ")}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {selected ? (
        <div className="rounded-none border border-[#DCFCE7] bg-gradient-to-br from-[#F0FDF4] to-white p-[0.5cm] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#16A34A]">Selected</p>
          <p className="mt-2 text-lg font-bold text-[#0F172A]">{selected.id}</p>
          <p className="mt-1 font-semibold text-[#334155]">{selected.foodItem}</p>
          <p className="mt-1 text-sm text-[#64748B]">{selected.donor}</p>
          <div className="mt-3">
            <StatusBadge status={selected.status} />
          </div>
          {selected.liveTracking ? (
            <p className="mt-3 text-sm text-[#64748B]">
              Live: {selected.liveTracking.label}
            </p>
          ) : null}
        </div>
      ) : (
        <div className="rounded-none border border-dashed border-[#E5E7EB] bg-[#F8FAFC] p-[0.5cm] text-center">
          <p className="text-sm text-[#64748B]">
            Select a donation to track, contact, or inspect.
          </p>
        </div>
      )}
    </aside>
  );
}

export default function NGOAcceptedDonations() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);

  const [donations] = useState(ACCEPTED_DONATIONS);
  const [selectedId, setSelectedId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({ quick: "all", category: "all" });

  const stats = ACCEPTED_OVERVIEW_STATS;

  const filtered = useMemo(
    () => filterAcceptedDonations(donations, filters),
    [donations, filters],
  );

  const activeFiltered = useMemo(
    () => filtered.filter((d) => d.status !== "completed"),
    [filtered],
  );

  const selected = useMemo(
    () => donations.find((d) => d.id === selectedId) ?? null,
    [donations, selectedId],
  );

  const handleTrack = (donation) => {
    setSelectedId(donation.id);
    setDrawerOpen(true);
  };

  const handleViewDetails = () => {
    if (!selected) return;
    setDrawerOpen(true);
  };

  const handleReportIssue = () => {
    if (!selected) return;
    toast("Issue reported for " + selected.id + " — coordinator notified.", { icon: "⚠️" });
  };

  const handleRejectArrival = () => {
    if (!selected) return;
    toast.error(`${selected.id} flagged for rejection on arrival.`);
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
            icon={FaCheckCircle}
            title="Accepted Donations"
            description="Operations dashboard for donations accepted but not yet fully distributed. Track pickups, transit, receiving, and distribution readiness."
          />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              Operations Statistics
            </p>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
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
                  {ACCEPTED_QUICK_FILTERS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFilters((prev) => ({ ...prev, quick: item.id }))}
                      className={[
                        "rounded-none px-4 py-2 text-sm font-semibold transition-colors",
                        filters.quick === item.id
                          ? "bg-[#16A34A] text-white"
                          : "border border-[#E5E7EB] bg-white text-[#64748B] hover:border-[#16A34A]/30",
                      ].join(" ")}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <label className="flex min-w-[180px] max-w-xs flex-col gap-1.5">
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
                    {ACCEPTED_CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Accepted Donations Table
                </p>
                <div className="overflow-x-auto rounded-none border border-[#E5E7EB] bg-white shadow-sm">
                  <table className="w-full min-w-[980px] text-left text-sm">
                    <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                      <tr>
                        <th className="px-4 py-3">Donation ID</th>
                        <th className="px-4 py-3">Donor</th>
                        <th className="px-4 py-3">Food Item</th>
                        <th className="px-4 py-3">Qty</th>
                        <th className="px-4 py-3">Volunteer</th>
                        <th className="px-4 py-3">ETA</th>
                        <th className="px-4 py-3">Received Time</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeFiltered.map((donation) => (
                        <tr
                          key={donation.id}
                          onClick={() => setSelectedId(donation.id)}
                          className={[
                            "cursor-pointer border-b border-[#E5E7EB] transition-colors last:border-0 hover:bg-[#F8FAFC]",
                            selectedId === donation.id ? "bg-[#F0FDF4]" : "",
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
                          <td className="px-4 py-3">{donation.volunteer}</td>
                          <td className="px-4 py-3 font-medium text-[#2563EB]">
                            {donation.eta}
                          </td>
                          <td className="px-4 py-3 text-[#64748B]">{donation.receivedTime}</td>
                          <td className="px-4 py-3">
                            <StatusBadge status={donation.status} />
                          </td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTrack(donation);
                              }}
                              className="inline-flex items-center gap-1.5 rounded-none border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-semibold text-[#16A34A] transition-colors hover:border-[#16A34A]/30 hover:bg-[#F0FDF4]"
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

              {activeFiltered.length === 0 ? (
                <p className="text-center text-sm text-[#64748B]">
                  No accepted donations match these filters.
                </p>
              ) : null}
            </div>

            <SidePanel
              selected={selected}
              onTrack={() => selected && handleTrack(selected)}
              onViewDetails={handleViewDetails}
              onReportIssue={handleReportIssue}
              onRejectArrival={handleRejectArrival}
            />
          </div>

          <NGOWorkflowStrip />
        </div>
      </motion.section>

      <AcceptedDonationDrawer
        donation={drawerOpen ? selected : null}
        onClose={() => setDrawerOpen(false)}
      />
    </NGOLayout>
  );
}
