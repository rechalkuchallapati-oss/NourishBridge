import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaBoxes,
  FaCalendarCheck,
  FaEye,
  FaHome,
  FaMapMarkerAlt,
  FaTruck,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import DistributionBatchDrawer from "../../components/ngo/DistributionBatchDrawer";
import DistributionMapVisual from "../../components/ngo/DistributionMapVisual";
import DistributionStatusTimeline from "../../components/ngo/DistributionStatusTimeline";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOWorkflowStrip from "../../components/ngo/NGOWorkflowStrip";
import NGOLayout, { NGOStatCard } from "../../components/dashboard/NGOLayout";
import {
  DISTRIBUTION_QUEUE,
  DISTRIBUTION_OVERVIEW_STATS,
  DISTRIBUTION_SUMMARY,
  BENEFICIARY_LOCATIONS,
  DISTRIBUTION_PIPELINE_STEPS,
  DISTRIBUTION_STATUS_LABELS,
  DISTRIBUTION_STATUS_COLORS,
  DISTRIBUTION_DESTINATION_OPTIONS,
  DISTRIBUTION_STATUS_OPTIONS,
  filterDistributionQueue,
} from "../../data/ngoDistributionQueue";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

const STAT_CONFIG = [
  { key: "mealsDistributed", label: "Meals Distributed", caption: "Total meals served today", accent: "green", icon: FaUtensils },
  { key: "remainingInventory", label: "Remaining Inventory", caption: "Meals ready to distribute", accent: "blue", icon: FaBoxes },
  { key: "familiesServed", label: "Families Served", caption: "Households reached", accent: "purple", icon: FaHome },
  { key: "communitiesCovered", label: "Communities Covered", caption: "Active beneficiary zones", accent: "amber", icon: FaMapMarkerAlt },
  { key: "distributionEvents", label: "Distribution Events", caption: "Scheduled & active runs", accent: "blue", icon: FaCalendarCheck },
  { key: "todaysBeneficiaries", label: "Today's Beneficiaries", caption: "People served today", accent: "green", icon: FaUsers },
];

const FILTER_SELECT_CLASS =
  "w-full rounded-none border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm font-medium text-[#0F172A] transition-colors hover:border-[#7C3AED]/30 focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20";

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-none px-2.5 py-1 text-xs font-semibold ${DISTRIBUTION_STATUS_COLORS[status]}`}
    >
      {DISTRIBUTION_STATUS_LABELS[status]}
    </span>
  );
}

function SidePanel({ selected }) {
  return (
    <aside className="flex flex-col gap-[0.5cm] lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">
          Distribution Status
        </h2>
        <div className="mt-3">
          {selected ? (
            <DistributionStatusTimeline
              currentStatus={selected.status}
              timeline={selected.timeline}
            />
          ) : (
            <div className="flex flex-col gap-1">
              {DISTRIBUTION_PIPELINE_STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center gap-2 text-xs text-[#64748B]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-none bg-[#F1F5F9] font-bold">
                    {index + 1}
                  </span>
                  {step.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">
          Beneficiary Details
        </h2>
        <ul className="mt-3 flex flex-col gap-2">
          {BENEFICIARY_LOCATIONS.map((loc) => (
            <li
              key={loc.id}
              className={[
                "flex items-center justify-between rounded-none border px-3 py-2 text-sm",
                selected?.destinationKey === loc.id
                  ? "border-[#7C3AED] bg-[#F5F3FF]"
                  : "border-[#E5E7EB] bg-[#F8FAFC]",
              ].join(" ")}
            >
              <span className="font-semibold text-[#0F172A]">{loc.name}</span>
              <span className="text-[#64748B]">{loc.people} people</span>
            </li>
          ))}
        </ul>
      </div>

      <DistributionMapVisual />

      <div className="rounded-none border border-[#EDE9FE] bg-gradient-to-br from-[#F5F3FF] to-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#7C3AED]">
          Distribution Summary
        </h2>
        <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div>
            <dt className="text-[#94A3B8]">Meals Planned</dt>
            <dd className="font-bold text-[#0F172A]">{DISTRIBUTION_SUMMARY.mealsPlanned}</dd>
          </div>
          <div>
            <dt className="text-[#94A3B8]">Meals Distributed</dt>
            <dd className="font-bold text-[#15803D]">{DISTRIBUTION_SUMMARY.mealsDistributed}</dd>
          </div>
          <div>
            <dt className="text-[#94A3B8]">Meals Remaining</dt>
            <dd className="font-bold text-[#2563EB]">{DISTRIBUTION_SUMMARY.mealsRemaining}</dd>
          </div>
          <div>
            <dt className="text-[#94A3B8]">Food Wasted</dt>
            <dd className="font-bold text-red-600">{DISTRIBUTION_SUMMARY.foodWasted}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[#94A3B8]">People Served</dt>
            <dd className="font-bold text-[#0F172A]">{DISTRIBUTION_SUMMARY.peopleServed}</dd>
          </div>
        </dl>
      </div>
    </aside>
  );
}

export default function NGODistributionQueue() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);

  const [batches, setBatches] = useState(DISTRIBUTION_QUEUE);
  const [selectedId, setSelectedId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({ status: "all", destination: "all" });

  const stats = DISTRIBUTION_OVERVIEW_STATS;

  const filtered = useMemo(
    () => filterDistributionQueue(batches, filters),
    [batches, filters],
  );

  const activeQueue = useMemo(
    () => filtered.filter((b) => b.status !== "completed"),
    [filtered],
  );

  const foodBatchRows = useMemo(
    () =>
      activeQueue.map((batch) => ({
        batchNo: batch.id,
        foodType: batch.food,
        preparedTime: batch.preparedTime,
        distributionDeadline: batch.distributionDeadline,
        remainingQuantity: batch.remainingQuantity,
      })),
    [activeQueue],
  );

  const volunteerRows = useMemo(
    () =>
      activeQueue.map((batch) => ({
        id: batch.id,
        volunteer: batch.volunteer,
        vehicle: batch.vehicle,
        destination: batch.destination,
        departureTime: batch.departureTime,
        arrivalTime: batch.arrivalTime,
        status: DISTRIBUTION_STATUS_LABELS[batch.status] ?? batch.status,
      })),
    [activeQueue],
  );

  const selected = useMemo(
    () => batches.find((b) => b.id === selectedId) ?? null,
    [batches, selectedId],
  );

  const handleView = (batch) => {
    setSelectedId(batch.id);
    setDrawerOpen(true);
  };

  const handleSubmitProof = (batchId, proof) => {
    setBatches((prev) =>
      prev.map((b) =>
        b.id === batchId
          ? {
              ...b,
              status: "completed",
              beneficiaryCount: Number(proof.beneficiaryCount),
              proofNotes: proof.notes,
              completionTime: proof.completionTime,
              remainingQuantity: "0 meals",
              timeline: [
                ...b.timeline,
                { step: "completed", time: proof.completionTime || "Just now" },
              ],
            }
          : b,
      ),
    );
    setDrawerOpen(false);
    toast.success(`Proof saved for ${batchId}`);
  };

  return (
    <NGOLayout organizationName={orgName}>
      <Toaster position="top-center" />

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#F5F3FF] via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
      >
        <div className="flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6">
          <NGOPageHeader
            icon={FaTruck}
            title="Distribution"
            description="Manage food distribution to beneficiaries after it reaches your NGO. Track batches, volunteers, destinations, and distribution proof."
          />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              Distribution Statistics
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

          <div className="grid gap-[0.5cm] lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="flex min-w-0 flex-col gap-[0.5cm]">
              <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
                <p className="mb-[0.5cm] text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Filters
                </p>
                <div className="flex flex-wrap gap-3">
                  <label className="flex min-w-[140px] flex-1 flex-col gap-1.5">
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
                      {DISTRIBUTION_STATUS_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex min-w-[140px] flex-1 flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Destination
                    </span>
                    <select
                      value={filters.destination}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, destination: e.target.value }))
                      }
                      className={FILTER_SELECT_CLASS}
                    >
                      {DISTRIBUTION_DESTINATION_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Distribution Queue
                </p>
                <div className="overflow-x-auto rounded-none border border-[#E5E7EB] bg-white shadow-sm">
                  <table className="w-full min-w-[900px] text-left text-sm">
                    <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                      <tr>
                        <th className="px-4 py-3">Batch ID</th>
                        <th className="px-4 py-3">Food</th>
                        <th className="px-4 py-3">Meals</th>
                        <th className="px-4 py-3">Destination</th>
                        <th className="px-4 py-3">Distribution Time</th>
                        <th className="px-4 py-3">Volunteer</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeQueue.map((batch) => (
                        <tr
                          key={batch.id}
                          onClick={() => setSelectedId(batch.id)}
                          className={[
                            "cursor-pointer border-b border-[#E5E7EB] transition-colors last:border-0 hover:bg-[#F8FAFC]",
                            selectedId === batch.id ? "bg-[#F5F3FF]" : "",
                          ].join(" ")}
                        >
                          <td className="px-4 py-3 font-semibold text-[#7C3AED]">{batch.id}</td>
                          <td className="px-4 py-3 font-medium text-[#0F172A]">{batch.food}</td>
                          <td className="px-4 py-3">{batch.meals} Meals</td>
                          <td className="px-4 py-3">{batch.destination}</td>
                          <td className="px-4 py-3 text-[#64748B]">{batch.distributionTime}</td>
                          <td className="px-4 py-3">{batch.volunteer}</td>
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
                              className="inline-flex items-center gap-1.5 rounded-none border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-semibold text-[#7C3AED] transition-colors hover:border-[#7C3AED]/30 hover:bg-[#F5F3FF]"
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

              {activeQueue.length === 0 ? (
                <p className="text-center text-sm text-[#64748B]">
                  No batches in the distribution queue.
                </p>
              ) : null}

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Food Batch Tracking
                </p>
                <div className="overflow-x-auto rounded-none border border-[#E5E7EB] bg-white shadow-sm">
                  <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                      <tr>
                        <th className="px-4 py-3">Batch No</th>
                        <th className="px-4 py-3">Food Type</th>
                        <th className="px-4 py-3">Prepared Time</th>
                        <th className="px-4 py-3">Distribution Deadline</th>
                        <th className="px-4 py-3">Remaining Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foodBatchRows.map((batch) => (
                        <tr
                          key={batch.batchNo}
                          className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#F8FAFC]"
                        >
                          <td className="px-4 py-3 font-semibold text-[#7C3AED]">
                            {batch.batchNo}
                          </td>
                          <td className="px-4 py-3">{batch.foodType}</td>
                          <td className="px-4 py-3 text-[#64748B]">{batch.preparedTime}</td>
                          <td className="px-4 py-3">{batch.distributionDeadline}</td>
                          <td className="px-4 py-3 font-medium">{batch.remainingQuantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Volunteer Assignment
                </p>
                <div className="overflow-x-auto rounded-none border border-[#E5E7EB] bg-white shadow-sm">
                  <table className="w-full min-w-[800px] text-left text-sm">
                    <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                      <tr>
                        <th className="px-4 py-3">Volunteer</th>
                        <th className="px-4 py-3">Vehicle</th>
                        <th className="px-4 py-3">Destination</th>
                        <th className="px-4 py-3">Departure Time</th>
                        <th className="px-4 py-3">Arrival Time</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {volunteerRows.map((row) => (
                        <tr
                          key={row.id}
                          className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#F8FAFC]"
                        >
                          <td className="px-4 py-3 font-medium">{row.volunteer}</td>
                          <td className="px-4 py-3 text-[#64748B]">{row.vehicle}</td>
                          <td className="px-4 py-3">{row.destination}</td>
                          <td className="px-4 py-3">{row.departureTime}</td>
                          <td className="px-4 py-3">{row.arrivalTime}</td>
                          <td className="px-4 py-3">{row.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <SidePanel selected={selected} />
          </div>

          <NGOWorkflowStrip />
        </div>
      </motion.section>

      <DistributionBatchDrawer
        batch={drawerOpen ? selected : null}
        onClose={() => setDrawerOpen(false)}
        onSubmitProof={handleSubmitProof}
      />
    </NGOLayout>
  );
}
