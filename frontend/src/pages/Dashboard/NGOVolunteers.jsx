import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaAward,
  FaClipboardList,
  FaExchangeAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaRoute,
  FaStar,
  FaTruck,
  FaUserCheck,
  FaUserFriends,
  FaUserSlash,
  FaComments,
  FaEye,
} from "react-icons/fa";
import VolunteerDetailsDrawer from "../../components/ngo/VolunteerDetailsDrawer";
import VolunteerLiveMapVisual from "../../components/ngo/VolunteerLiveMapVisual";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOWorkflowStrip from "../../components/ngo/NGOWorkflowStrip";
import NGOLayout, { NGOStatCard } from "../../components/dashboard/NGOLayout";
import {
  VOLUNTEERS,
  VOLUNTEER_OVERVIEW_STATS,
  VOLUNTEER_STATUS_LABELS,
  VOLUNTEER_STATUS_COLORS,
  VOLUNTEER_STATUS_ICONS,
  VOLUNTEER_QUICK_FILTERS,
  VOLUNTEER_STATUS_OPTIONS,
  VEHICLE_TYPE_OPTIONS,
  EXPERIENCE_OPTIONS,
  CITY_OPTIONS,
  RATING_FILTER_OPTIONS,
  filterVolunteers,
} from "../../data/ngoVolunteers";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

const STAT_CONFIG = [
  { key: "totalVolunteers", label: "Total Volunteers", caption: "Registered on platform", accent: "blue", icon: FaUserFriends },
  { key: "activeToday", label: "Active Today", caption: "Logged in today", accent: "green", icon: FaUserCheck },
  { key: "onMission", label: "On Mission", caption: "Currently assigned", accent: "purple", icon: FaRoute },
  { key: "available", label: "Available", caption: "Ready for assignment", accent: "green", icon: FaTruck },
  { key: "offline", label: "Offline", caption: "Not active today", accent: "slate", icon: FaUserSlash },
  { key: "topRated", label: "Top Rated Volunteers", caption: "4.9+ rating", accent: "amber", icon: FaAward },
];

const FILTER_SELECT_CLASS =
  "w-full rounded-none border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm font-medium text-[#0F172A] transition-colors hover:border-[#2563EB]/30 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20";

const PERFORMANCE_KPIS = [
  { key: "missionsCompleted", label: "Missions Completed" },
  { key: "mealsDelivered", label: "Meals Delivered" },
  { key: "foodRescuedKg", label: "Food Rescued", suffix: " kg" },
  { key: "onTimeDeliveryPct", label: "On-Time Delivery %", suffix: "%" },
  { key: "trustScore", label: "Trust Score" },
  { key: "avgResponseTimeMin", label: "Avg Response Time", suffix: " min" },
  { key: "distanceCoveredKm", label: "Distance Covered", suffix: " km" },
  { key: "volunteerHours", label: "Volunteer Hours" },
];

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-none px-2.5 py-1 text-xs font-semibold ${VOLUNTEER_STATUS_COLORS[status]}`}
    >
      {VOLUNTEER_STATUS_ICONS[status]} {VOLUNTEER_STATUS_LABELS[status]}
    </span>
  );
}

function SidePanel({
  selected,
  onAssignPickup,
  onAssignDistribution,
  onAssignEmergency,
  onAssignBatch,
  onChangeVolunteer,
  onCall,
  onMessage,
  onAssignMission,
  onViewProfile,
  onTrackLive,
}) {
  return (
    <aside className="flex flex-col gap-[0.5cm] lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Assignment Panel</h2>
        <div className="mt-[0.5cm] flex flex-col gap-2">
          <button
            type="button"
            onClick={onAssignPickup}
            disabled={!selected || selected.status !== "available"}
            className="flex items-center justify-center gap-2 rounded-none bg-[#16A34A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#15803D] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Assign Pickup
          </button>
          <button
            type="button"
            onClick={onAssignDistribution}
            disabled={!selected}
            className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Assign Distribution
          </button>
          <button
            type="button"
            onClick={onAssignEmergency}
            disabled={!selected}
            className="flex items-center justify-center gap-2 rounded-none border border-[#EDE9FE] bg-[#F5F3FF] px-4 py-2.5 text-sm font-semibold text-[#6D28D9] hover:bg-[#EDE9FE] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Assign Emergency Request
          </button>
          <button
            type="button"
            onClick={onAssignBatch}
            disabled={!selected}
            className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Assign Batch
          </button>
          <button
            type="button"
            onClick={onChangeVolunteer}
            disabled={!selected}
            className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#64748B] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaExchangeAlt aria-hidden="true" />
            Change Volunteer
          </button>
        </div>
      </div>

      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Quick Actions</h2>
        <div className="mt-[0.5cm] flex flex-col gap-2">
          <button
            type="button"
            onClick={onCall}
            disabled={!selected}
            className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaPhone aria-hidden="true" />
            Call Volunteer
          </button>
          <button
            type="button"
            onClick={onMessage}
            disabled={!selected}
            className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#2563EB] hover:bg-[#EFF6FF] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaComments aria-hidden="true" />
            Send Message
          </button>
          <button
            type="button"
            onClick={onAssignMission}
            disabled={!selected || selected.status !== "available"}
            className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#16A34A] hover:bg-[#F0FDF4] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaClipboardList aria-hidden="true" />
            Assign Mission
          </button>
          <button
            type="button"
            onClick={onViewProfile}
            disabled={!selected}
            className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#2563EB] hover:bg-[#EFF6FF] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaEye aria-hidden="true" />
            View Profile
          </button>
          <button
            type="button"
            onClick={onTrackLive}
            disabled={!selected || !selected.mapPin}
            className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#2563EB] hover:bg-[#EFF6FF] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaMapMarkerAlt aria-hidden="true" />
            Track Live
          </button>
        </div>
      </div>

      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Status Types</h2>
        <ul className="mt-3 flex flex-col gap-1.5">
          {Object.entries(VOLUNTEER_STATUS_LABELS).map(([key, label]) => (
            <li key={key} className="text-xs font-medium text-[#64748B]">
              {VOLUNTEER_STATUS_ICONS[key]} {label}
            </li>
          ))}
        </ul>
      </div>

      <VolunteerLiveMapVisual selectedPinId={selected?.mapPinId ?? null} />

      {selected ? (
        <div className="rounded-none border border-[#DBEAFE] bg-gradient-to-br from-[#EFF6FF] to-white p-[0.5cm] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">
            Volunteer Performance
          </p>
          <p className="mt-2 font-bold text-[#0F172A]">{selected.name}</p>
          <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
            {PERFORMANCE_KPIS.map((kpi) => (
              <div key={kpi.key}>
                <dt className="text-[#94A3B8]">{kpi.label}</dt>
                <dd className="font-bold text-[#0F172A]">
                  {selected.performance[kpi.key]}
                  {kpi.suffix ?? ""}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </aside>
  );
}

export default function NGOVolunteers() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);

  const [volunteers, setVolunteers] = useState(VOLUNTEERS);
  const [selectedId, setSelectedId] = useState("VOL-204");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    quick: "all",
    status: "all",
    vehicle: "all",
    city: "all",
    experience: "all",
    minRating: "all",
    search: "",
  });

  const stats = VOLUNTEER_OVERVIEW_STATS;

  const filtered = useMemo(
    () => filterVolunteers(volunteers, filters),
    [volunteers, filters],
  );

  const selected = useMemo(
    () => volunteers.find((v) => v.id === selectedId) ?? null,
    [volunteers, selectedId],
  );

  const assignMission = (volunteer, missionLabel) => {
    setVolunteers((prev) =>
      prev.map((v) =>
        v.id === volunteer.id
          ? { ...v, status: "on_mission", currentMission: missionLabel }
          : v,
      ),
    );
    toast.success(`Mission assigned to ${volunteer.name}`);
  };

  const handleAssign = (vol) => {
    if (!vol || vol.status !== "available") return;
    assignMission(vol, "New Pickup Assignment");
  };

  return (
    <NGOLayout organizationName={orgName}>
      <Toaster position="top-center" />

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#F0FDF4] via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
      >
        <div className="flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6">
          <NGOPageHeader
            icon={FaUserFriends}
            title="Volunteers"
            description="Manage, assign, monitor, and communicate with volunteers across pickups and distributions."
          />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              Dashboard Statistics
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

          <div className="grid gap-[0.5cm] lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="flex min-w-0 flex-col gap-[0.5cm]">
              <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
                <p className="mb-[0.5cm] text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Filters
                </p>
                <div className="mb-3 flex flex-wrap gap-2">
                  {VOLUNTEER_QUICK_FILTERS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFilters((p) => ({ ...p, quick: item.id }))}
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
                <div className="flex flex-wrap gap-3">
                  {[
                    { key: "status", label: "Status", options: VOLUNTEER_STATUS_OPTIONS },
                    { key: "vehicle", label: "Vehicle Type", options: VEHICLE_TYPE_OPTIONS },
                    { key: "minRating", label: "Rating", options: RATING_FILTER_OPTIONS },
                    { key: "experience", label: "Experience", options: EXPERIENCE_OPTIONS },
                    { key: "city", label: "City", options: CITY_OPTIONS },
                  ].map(({ key, label, options }) => (
                    <label key={key} className="flex min-w-[130px] flex-1 flex-col gap-1.5">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                        {label}
                      </span>
                      <select
                        value={filters[key]}
                        onChange={(e) =>
                          setFilters((p) => ({ ...p, [key]: e.target.value }))
                        }
                        className={FILTER_SELECT_CLASS}
                      >
                        {options.map((o) => (
                          <option key={o.id} value={o.id}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  ))}
                  <label className="flex min-w-[140px] flex-1 flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Search
                    </span>
                    <input
                      type="text"
                      value={filters.search}
                      onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                      placeholder="Name or ID..."
                      className={FILTER_SELECT_CLASS}
                    />
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Volunteer Directory
                </p>
                <div className="overflow-x-auto rounded-none border border-[#E5E7EB] bg-white shadow-sm">
                  <table className="w-full min-w-[900px] text-left text-sm">
                    <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                      <tr>
                        <th className="px-4 py-3">Volunteer ID</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Rating</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Current Mission</th>
                        <th className="px-4 py-3">Vehicle</th>
                        <th className="px-4 py-3">Location</th>
                        <th className="px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((vol) => (
                        <tr
                          key={vol.id}
                          onClick={() => setSelectedId(vol.id)}
                          className={[
                            "cursor-pointer border-b border-[#E5E7EB] transition-colors last:border-0 hover:bg-[#F8FAFC]",
                            selectedId === vol.id ? "bg-[#F0FDF4]" : "",
                          ].join(" ")}
                        >
                          <td className="px-4 py-3 font-semibold text-[#2563EB]">{vol.id}</td>
                          <td className="px-4 py-3 font-medium text-[#0F172A]">{vol.name}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
                              <FaStar className="text-xs" aria-hidden="true" />
                              {vol.rating}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <StatusBadge status={vol.status} />
                          </td>
                          <td className="px-4 py-3 text-[#64748B]">{vol.currentMission}</td>
                          <td className="px-4 py-3">{vol.vehicle}</td>
                          <td className="px-4 py-3">{vol.location}</td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(vol.id);
                                if (vol.status === "available") handleAssign(vol);
                                else {
                                  setDrawerOpen(true);
                                }
                              }}
                              className="inline-flex items-center gap-1.5 rounded-none border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-semibold text-[#16A34A] transition-colors hover:border-[#16A34A]/30 hover:bg-[#F0FDF4]"
                            >
                              {vol.status === "available" ? "Assign" : "View"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {filtered.length === 0 ? (
                <p className="text-center text-sm text-[#64748B]">No volunteers match these filters.</p>
              ) : null}
            </div>

            <SidePanel
              selected={selected}
              onAssignPickup={() => selected && assignMission(selected, "Pickup Assignment")}
              onAssignDistribution={() => selected && assignMission(selected, "Distribution Run")}
              onAssignEmergency={() => selected && assignMission(selected, "Emergency Request")}
              onAssignBatch={() => selected && assignMission(selected, "Batch Assignment")}
              onChangeVolunteer={() => toast("Change volunteer flow coming soon", { icon: "🔄" })}
              onCall={() =>
                selected && (window.location.href = `tel:${selected.phone.replace(/\s/g, "")}`)
              }
              onMessage={() => selected && toast(`Message sent to ${selected.name}`)}
              onAssignMission={() => selected && handleAssign(selected)}
              onViewProfile={() => setDrawerOpen(true)}
              onTrackLive={() => selected && toast(`Tracking ${selected.name} live`, { icon: "📍" })}
            />
          </div>

          <NGOWorkflowStrip />
        </div>
      </motion.section>

      <VolunteerDetailsDrawer
        volunteer={drawerOpen ? selected : null}
        onClose={() => setDrawerOpen(false)}
      />
    </NGOLayout>
  );
}
