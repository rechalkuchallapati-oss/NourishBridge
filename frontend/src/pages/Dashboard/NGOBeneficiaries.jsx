import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaChild,
  FaEdit,
  FaFileAlt,
  FaHistory,
  FaHome,
  FaMapMarkerAlt,
  FaPhone,
  FaTruck,
  FaUsers,
  FaUtensils,
  FaHandsHelping,
} from "react-icons/fa";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOWorkflowStrip from "../../components/ngo/NGOWorkflowStrip";
import NGOLayout, { NGOStatCard } from "../../components/dashboard/NGOLayout";
import {
  BENEFICIARIES,
  BENEFICIARY_OVERVIEW_STATS,
  BENEFICIARY_TYPE_LABELS,
  BENEFICIARY_TYPE_OPTIONS,
  BENEFICIARY_STATUS_LABELS,
  BENEFICIARY_STATUS_COLORS,
  BENEFICIARY_LOCATION_OPTIONS,
  BENEFICIARY_STATUS_OPTIONS,
  BENEFICIARY_PRIORITY_OPTIONS,
  PRIORITY_LABELS,
  PRIORITY_COLORS,
  filterBeneficiaries,
} from "../../data/ngoBeneficiaries";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

const STAT_CONFIG = [
  { key: "registeredBeneficiaries", label: "Registered Beneficiaries", caption: "Total registered orgs", accent: "blue", icon: FaUsers },
  { key: "familiesSupported", label: "Families Supported", caption: "Households reached", accent: "green", icon: FaHome },
  { key: "shelters", label: "Shelters", caption: "Active shelter partners", accent: "purple", icon: FaHandsHelping },
  { key: "orphanages", label: "Orphanages", caption: "Children's homes", accent: "amber", icon: FaChild },
  { key: "oldAgeHomes", label: "Old Age Homes", caption: "Senior care facilities", accent: "slate", icon: FaUsers },
  { key: "mealsServedToday", label: "Meals Served Today", caption: "Across all beneficiaries", accent: "green", icon: FaUtensils },
  { key: "communitiesCovered", label: "Communities Covered", caption: "Geographic zones", accent: "blue", icon: FaMapMarkerAlt },
];

const FILTER_SELECT_CLASS =
  "w-full rounded-none border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm font-medium text-[#0F172A] transition-colors hover:border-[#2563EB]/30 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20";

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-none px-2.5 py-1 text-xs font-semibold ${BENEFICIARY_STATUS_COLORS[status]}`}
    >
      {BENEFICIARY_STATUS_LABELS[status]}
    </span>
  );
}

function PriorityBadge({ priority }) {
  return (
    <span
      className={`inline-flex rounded-none px-2.5 py-1 text-xs font-semibold ${PRIORITY_COLORS[priority]}`}
    >
      {PRIORITY_LABELS[priority]}
    </span>
  );
}

function DetailRow({ label, value, href }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">{label}</p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[#2563EB] hover:underline"
        >
          {value}
        </a>
      ) : (
        <p className="mt-1 text-sm font-medium text-[#0F172A]">{value}</p>
      )}
    </div>
  );
}

function DetailsPanel({ selected, onSchedule, onViewHistory, onEdit, onContact, onReport }) {
  return (
    <aside className="flex flex-col gap-[0.5cm] lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Quick Actions</h2>
        <div className="mt-[0.5cm] flex flex-col gap-2">
          <button
            type="button"
            onClick={onSchedule}
            disabled={!selected || selected.status !== "active"}
            className="flex items-center justify-center gap-2 rounded-none bg-[#16A34A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#15803D] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaTruck aria-hidden="true" />
            Schedule Delivery
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
            onClick={onEdit}
            disabled={!selected}
            className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#2563EB]/30 hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaEdit aria-hidden="true" />
            Edit Details
          </button>
          <button
            type="button"
            onClick={onContact}
            disabled={!selected}
            className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#2563EB]/30 hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaPhone aria-hidden="true" />
            Contact Beneficiary
          </button>
          <button
            type="button"
            onClick={onReport}
            disabled={!selected}
            className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#64748B] transition-colors hover:border-[#2563EB]/30 hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaFileAlt aria-hidden="true" />
            Generate Report
          </button>
        </div>
      </div>

      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Beneficiary Types</h2>
        <ul className="mt-3 flex flex-col gap-1.5">
          {Object.entries(BENEFICIARY_TYPE_LABELS).map(([key, label]) => (
            <li
              key={key}
              className={[
                "rounded-none px-2 py-1 text-xs font-medium",
                selected?.type === key ? "bg-[#EFF6FF] text-[#2563EB]" : "text-[#64748B]",
              ].join(" ")}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Priority Level</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
            <li key={key} className="flex items-center gap-2">
              <PriorityBadge priority={key} />
              <span className="text-xs text-[#64748B]">{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {selected ? (
        <>
          <div className="rounded-none border border-[#DBEAFE] bg-gradient-to-br from-[#EFF6FF] to-white p-[0.5cm] shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">Details Panel</p>
            <p className="mt-2 text-lg font-bold text-[#0F172A]">{selected.organization}</p>
            <p className="text-sm text-[#64748B]">{selected.id}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusBadge status={selected.status} />
              <PriorityBadge priority={selected.priority} />
            </div>
            <div className="mt-4 grid gap-3">
              <DetailRow label="Contact Person" value={selected.contactPerson} />
              <DetailRow label="Phone" value={selected.phone} href={`tel:${selected.phone.replace(/\s/g, "")}`} />
              <DetailRow label="Email" value={selected.email} href={`mailto:${selected.email}`} />
              <DetailRow label="Address" value={selected.address} />
              <DetailRow label="Google Maps" value="Open in Maps" href={selected.mapsUrl} />
              <DetailRow label="Registered Since" value={selected.registeredSince} />
              <DetailRow label="Beneficiary Count" value={`${selected.beneficiaryCount} people`} />
              <DetailRow label="Dietary Requirements" value={selected.dietaryRequirements} />
              <DetailRow label="Preferred Delivery Time" value={selected.preferredDeliveryTime} />
            </div>
          </div>

          <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Food Requirement</h2>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="text-[#94A3B8]">Breakfast</dt>
                <dd className="font-semibold">{selected.foodRequirements.breakfast} meals</dd>
              </div>
              <div>
                <dt className="text-[#94A3B8]">Lunch</dt>
                <dd className="font-semibold">{selected.foodRequirements.lunch} meals</dd>
              </div>
              <div>
                <dt className="text-[#94A3B8]">Dinner</dt>
                <dd className="font-semibold">{selected.foodRequirements.dinner} meals</dd>
              </div>
              <div>
                <dt className="text-[#94A3B8]">Daily Meals Needed</dt>
                <dd className="font-semibold text-[#2563EB]">{selected.foodRequirements.dailyMealsNeeded}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[#94A3B8]">Special Diet</dt>
                <dd className="font-medium">{selected.foodRequirements.specialDiet}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[#94A3B8]">Weekly Requirement</dt>
                <dd className="font-bold text-[#0F172A]">{selected.foodRequirements.weeklyRequirement} meals</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Delivery History</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[400px] text-left text-xs">
                <thead className="border-b border-[#E5E7EB] text-[#94A3B8]">
                  <tr>
                    <th className="pb-2 pr-2">Date</th>
                    <th className="pb-2 pr-2">Food Batch</th>
                    <th className="pb-2 pr-2">Meals</th>
                    <th className="pb-2 pr-2">Volunteer</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.deliveryHistory.map((row) => (
                    <tr key={row.date + row.foodBatch} className="border-b border-[#F1F5F9] last:border-0">
                      <td className="py-2 pr-2">{row.date}</td>
                      <td className="py-2 pr-2 font-medium text-[#2563EB]">{row.foodBatch}</td>
                      <td className="py-2 pr-2">{row.meals}</td>
                      <td className="py-2 pr-2">{row.volunteer}</td>
                      <td className="py-2">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-none border border-dashed border-[#E5E7EB] bg-[#F8FAFC] p-[0.5cm] text-center">
          <p className="text-sm text-[#64748B]">
            Select a beneficiary to view contact details, food requirements, and delivery history.
          </p>
        </div>
      )}
    </aside>
  );
}

export default function NGOBeneficiaries() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);

  const [selectedId, setSelectedId] = useState("BEN-201");
  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    priority: "all",
    location: "all",
    search: "",
  });

  const stats = BENEFICIARY_OVERVIEW_STATS;

  const filtered = useMemo(
    () => filterBeneficiaries(BENEFICIARIES, filters),
    [filters],
  );

  const selected = useMemo(
    () => BENEFICIARIES.find((b) => b.id === selectedId) ?? null,
    [selectedId],
  );

  const handleSchedule = () => {
    if (!selected) return;
    toast.success(`Delivery scheduled for ${selected.organization}`);
  };

  const handleViewHistory = () => {
    if (!selected) return;
    toast(`${selected.deliveryHistory.length} deliveries on record for ${selected.id}`, { icon: "📋" });
  };

  const handleEdit = () => {
    if (!selected) return;
    toast("Edit form coming soon — " + selected.id, { icon: "✏️" });
  };

  const handleContact = () => {
    if (!selected) return;
    window.location.href = `tel:${selected.phone.replace(/\s/g, "")}`;
  };

  const handleReport = () => {
    if (!selected) return;
    toast.success(`Report generated for ${selected.organization}`);
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
            icon={FaUsers}
            title="Beneficiaries"
            description="Manage who receives food — shelters, orphanages, old-age homes, community kitchens, schools, and families."
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
                <div className="flex flex-wrap gap-3">
                  <label className="flex min-w-[130px] flex-1 flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">Type</span>
                    <select
                      value={filters.type}
                      onChange={(e) => setFilters((p) => ({ ...p, type: e.target.value }))}
                      className={FILTER_SELECT_CLASS}
                    >
                      {BENEFICIARY_TYPE_OPTIONS.map((o) => (
                        <option key={o.id} value={o.id}>{o.label}</option>
                      ))}
                    </select>
                  </label>
                  <label className="flex min-w-[130px] flex-1 flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">Status</span>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))}
                      className={FILTER_SELECT_CLASS}
                    >
                      {BENEFICIARY_STATUS_OPTIONS.map((o) => (
                        <option key={o.id} value={o.id}>{o.label}</option>
                      ))}
                    </select>
                  </label>
                  <label className="flex min-w-[130px] flex-1 flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">Priority</span>
                    <select
                      value={filters.priority}
                      onChange={(e) => setFilters((p) => ({ ...p, priority: e.target.value }))}
                      className={FILTER_SELECT_CLASS}
                    >
                      {BENEFICIARY_PRIORITY_OPTIONS.map((o) => (
                        <option key={o.id} value={o.id}>{o.label}</option>
                      ))}
                    </select>
                  </label>
                  <label className="flex min-w-[130px] flex-1 flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">Location</span>
                    <select
                      value={filters.location}
                      onChange={(e) => setFilters((p) => ({ ...p, location: e.target.value }))}
                      className={FILTER_SELECT_CLASS}
                    >
                      {BENEFICIARY_LOCATION_OPTIONS.map((o) => (
                        <option key={o.id} value={o.id}>{o.label}</option>
                      ))}
                    </select>
                  </label>
                  <label className="flex min-w-[160px] flex-1 flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">Search</span>
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
                  Main Table
                </p>
                <div className="overflow-x-auto rounded-none border border-[#E5E7EB] bg-white shadow-sm">
                  <table className="w-full min-w-[960px] text-left text-sm">
                    <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                      <tr>
                        <th className="px-4 py-3">Beneficiary ID</th>
                        <th className="px-4 py-3">Organization</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Location</th>
                        <th className="px-4 py-3">Capacity</th>
                        <th className="px-4 py-3">Meals Required</th>
                        <th className="px-4 py-3">Last Delivery</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((ben) => (
                        <tr
                          key={ben.id}
                          onClick={() => setSelectedId(ben.id)}
                          className={[
                            "cursor-pointer border-b border-[#E5E7EB] transition-colors last:border-0 hover:bg-[#F8FAFC]",
                            selectedId === ben.id ? "bg-[#EFF6FF]" : "",
                          ].join(" ")}
                        >
                          <td className="px-4 py-3 font-semibold text-[#2563EB]">{ben.id}</td>
                          <td className="px-4 py-3 font-medium text-[#0F172A]">{ben.organization}</td>
                          <td className="px-4 py-3">{BENEFICIARY_TYPE_LABELS[ben.type]}</td>
                          <td className="px-4 py-3">{ben.location}</td>
                          <td className="px-4 py-3">{ben.capacity}</td>
                          <td className="px-4 py-3">{ben.mealsRequired} Meals</td>
                          <td className="px-4 py-3 text-[#64748B]">{ben.lastDelivery}</td>
                          <td className="px-4 py-3">
                            <StatusBadge status={ben.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {filtered.length === 0 ? (
                <p className="text-center text-sm text-[#64748B]">No beneficiaries match these filters.</p>
              ) : null}

              {selected ? (
                <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm lg:hidden">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Delivery History</h2>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[520px] text-left text-sm">
                      <thead className="border-b border-[#E5E7EB] text-xs font-semibold uppercase text-[#64748B]">
                        <tr>
                          <th className="px-3 py-2">Date</th>
                          <th className="px-3 py-2">Food Batch</th>
                          <th className="px-3 py-2">Meals</th>
                          <th className="px-3 py-2">Volunteer</th>
                          <th className="px-3 py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selected.deliveryHistory.map((row) => (
                          <tr key={row.date + row.foodBatch} className="border-b border-[#F1F5F9]">
                            <td className="px-3 py-2">{row.date}</td>
                            <td className="px-3 py-2 font-medium text-[#2563EB]">{row.foodBatch}</td>
                            <td className="px-3 py-2">{row.meals}</td>
                            <td className="px-3 py-2">{row.volunteer}</td>
                            <td className="px-3 py-2">{row.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </div>

            <DetailsPanel
              selected={selected}
              onSchedule={handleSchedule}
              onViewHistory={handleViewHistory}
              onEdit={handleEdit}
              onContact={handleContact}
              onReport={handleReport}
            />
          </div>

          <NGOWorkflowStrip />
        </div>
      </motion.section>
    </NGOLayout>
  );
}
