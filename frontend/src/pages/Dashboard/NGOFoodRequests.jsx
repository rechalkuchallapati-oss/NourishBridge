import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaPlus,
  FaCopy,
  FaEdit,
  FaTimes,
  FaEye,
  FaCheckCircle,
  FaClock,
  FaHourglassHalf,
  FaBan,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOLayout, { NGOStatCard } from "../../components/dashboard/NGOLayout";
import NGOWorkflowStrip from "../../components/ngo/NGOWorkflowStrip";
import NGOModal from "../../components/ngo/NGOModal";
import {
  FOOD_REQUESTS,
  FOOD_CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_FILTER_OPTIONS,
  DATE_FILTER_OPTIONS,
  LOCATION_OPTIONS,
  REQUEST_STATUS_LABELS,
  REQUEST_STATUS_COLORS,
  PRIORITY_LABELS,
  PRIORITY_COLORS,
  computeFoodRequestStats,
  filterFoodRequests,
} from "../../data/ngoFoodRequests";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

const STAT_CONFIG = [
  { key: "active", label: "Active Requests", caption: "In progress or awaiting fulfillment", accent: "blue", icon: FaClipboardList },
  { key: "pending", label: "Pending Requests", caption: "Open and awaiting donor match", accent: "amber", icon: FaClock },
  { key: "approved", label: "Approved Requests", caption: "Matched and in delivery pipeline", accent: "purple", icon: FaCheckCircle },
  { key: "fulfilled", label: "Fulfilled Requests", caption: "Received or completed", accent: "green", icon: FaHourglassHalf },
  { key: "expired", label: "Expired Requests", caption: "Past deadline without fulfillment", accent: "slate", icon: FaBan },
];

const FILTER_SELECT_CLASS =
  "w-full rounded-none border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm font-medium text-[#0F172A] transition-colors hover:border-[#2563EB]/30 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20";

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="flex min-w-[140px] flex-1 flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={FILTER_SELECT_CLASS}>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
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

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-none px-2.5 py-1 text-xs font-semibold ${REQUEST_STATUS_COLORS[status]}`}
    >
      {REQUEST_STATUS_LABELS[status]}
    </span>
  );
}

function SidePanel({ selected, onCreate, onDuplicate, onEdit, onCancel }) {
  const canModify = selected && !["completed", "expired"].includes(selected.status);

  return (
    <aside className="flex flex-col gap-[0.5cm] lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Priority Management</h2>
        <ul className="mt-[0.5cm] flex flex-col gap-2">
          {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
            <li key={key} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <PriorityBadge priority={key} />
                <span className="text-xs text-[#64748B]">{label}</span>
              </div>
              <span className="text-xs font-semibold text-[#94A3B8]">
                {selected?.priority === key ? "Active" : ""}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Quick Actions</h2>
        <div className="mt-[0.5cm] flex flex-col gap-2">
          <button
            type="button"
            onClick={onCreate}
            className="flex items-center justify-center gap-2 rounded-none bg-[#16A34A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#15803D]"
          >
            <FaPlus aria-hidden="true" />
            Create Request
          </button>
          <button
            type="button"
            onClick={onDuplicate}
            disabled={!selected}
            className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#2563EB]/30 hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaCopy aria-hidden="true" />
            Duplicate Request
          </button>
          <button
            type="button"
            onClick={onEdit}
            disabled={!canModify}
            className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#2563EB]/30 hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaEdit aria-hidden="true" />
            Edit Request
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={!canModify}
            className="flex items-center justify-center gap-2 rounded-none border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaTimes aria-hidden="true" />
            Cancel Request
          </button>
        </div>
      </div>

      {selected ? (
        <div className="rounded-none border border-[#DBEAFE] bg-gradient-to-br from-[#EFF6FF] to-white p-[0.5cm] shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Request Summary</h2>
          <p className="mt-2 text-lg font-bold text-[#0F172A]">{selected.id}</p>
          <p className="mt-1 font-semibold text-[#334155]">{selected.foodNeeded}</p>
          <p className="mt-1 text-sm text-[#64748B]">{selected.quantity}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <PriorityBadge priority={selected.priority} />
            <StatusBadge status={selected.status} />
          </div>
          <p className="mt-3 text-sm text-[#64748B]">{selected.notes}</p>
        </div>
      ) : (
        <div className="rounded-none border border-dashed border-[#E5E7EB] bg-[#F8FAFC] p-[0.5cm] text-center">
          <p className="text-sm text-[#64748B]">Select a request from the table to view details and take action.</p>
        </div>
      )}
    </aside>
  );
}

export default function NGOFoodRequests() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);

  const [requests, setRequests] = useState(FOOD_REQUESTS);
  const [selectedId, setSelectedId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    priority: "all",
    status: "all",
    date: "all",
    location: "all",
  });

  const stats = useMemo(() => computeFoodRequestStats(requests), [requests]);

  const filtered = useMemo(
    () => filterFoodRequests(requests, filters),
    [requests, filters]
  );

  const activeFiltered = useMemo(
    () => filtered.filter((r) => !["completed", "expired"].includes(r.status)),
    [filtered],
  );

  const historyRequests = useMemo(
    () =>
      requests.filter((r) =>
        ["completed", "expired"].includes(r.status),
      ),
    [requests],
  );

  const selected = useMemo(
    () => requests.find((r) => r.id === selectedId) ?? null,
    [requests, selectedId]
  );

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleView = (request) => {
    setSelectedId(request.id);
  };

  const handleCreate = () => setShowCreateModal(true);

  const handleDuplicate = () => {
    if (!selected) return;
    const newId = `REQ-${2048 + requests.length + 1}`;
    const duplicate = {
      ...selected,
      id: newId,
      status: "open",
      createdAt: "Just now",
    };
    setRequests((prev) => [duplicate, ...prev]);
    setSelectedId(newId);
    toast.success(`Duplicated as ${newId}`);
  };

  const handleEdit = () => {
    if (!selected) return;
    toast("Edit form coming soon — selected " + selected.id, { icon: "✏️" });
  };

  const handleCancel = () => {
    if (!selected) return;
    setRequests((prev) =>
      prev.map((r) => (r.id === selected.id ? { ...r, status: "expired" } : r))
    );
    toast.success(`${selected.id} cancelled`);
  };

  const handleCreateSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newId = `REQ-${2048 + requests.length + 1}`;
    const newRequest = {
      id: newId,
      foodNeeded: form.foodNeeded.value,
      quantity: form.quantity.value,
      priority: form.priority.value,
      neededBy: form.neededBy.value,
      location: form.location.value,
      locationKey: form.locationKey.value,
      status: "open",
      category: form.category.value,
      dateKey: "today",
      notes: form.notes.value,
      createdAt: "Just now",
    };
    setRequests((prev) => [newRequest, ...prev]);
    setSelectedId(newId);
    setShowCreateModal(false);
    toast.success(`Request ${newId} created`);
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
            icon={FaClipboardList}
            title="Food Requests"
            description="Create and manage food requests for your NGO. Track priority, fulfillment status, and donor matching from one place."
            actions={
              <button
                type="button"
                onClick={handleCreate}
                className="flex items-center gap-2 rounded-none bg-[#16A34A] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(22,163,74,0.28)] transition-colors hover:bg-[#15803D]"
              >
                <FaPlus aria-hidden="true" />
                Create Request
              </button>
            }
          />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              Request Statistics
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
                <div className="flex flex-wrap gap-3">
                  <FilterSelect
                    label="Food Category"
                    value={filters.category}
                    onChange={(v) => updateFilter("category", v)}
                    options={FOOD_CATEGORY_OPTIONS}
                  />
                  <FilterSelect
                    label="Priority"
                    value={filters.priority}
                    onChange={(v) => updateFilter("priority", v)}
                    options={PRIORITY_OPTIONS}
                  />
                  <FilterSelect
                    label="Status"
                    value={filters.status}
                    onChange={(v) => updateFilter("status", v)}
                    options={STATUS_FILTER_OPTIONS}
                  />
                  <FilterSelect
                    label="Date"
                    value={filters.date}
                    onChange={(v) => updateFilter("date", v)}
                    options={DATE_FILTER_OPTIONS}
                  />
                  <FilterSelect
                    label="Location"
                    value={filters.location}
                    onChange={(v) => updateFilter("location", v)}
                    options={LOCATION_OPTIONS}
                  />
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Request Table
                </p>
                <div className="overflow-x-auto rounded-none border border-[#E5E7EB] bg-white shadow-sm">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                    <tr>
                      <th className="px-4 py-3">Request ID</th>
                      <th className="px-4 py-3">Food Needed</th>
                      <th className="px-4 py-3">Quantity</th>
                      <th className="px-4 py-3">Priority</th>
                      <th className="px-4 py-3">Needed By</th>
                      <th className="px-4 py-3">Location</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeFiltered.map((request) => (
                      <tr
                        key={request.id}
                        className={[
                          "border-b border-[#E5E7EB] transition-colors last:border-0 hover:bg-[#F8FAFC]",
                          selectedId === request.id ? "bg-[#EFF6FF]" : "",
                        ].join(" ")}
                      >
                        <td className="px-4 py-3 font-semibold text-[#2563EB]">{request.id}</td>
                        <td className="px-4 py-3 font-medium text-[#0F172A]">{request.foodNeeded}</td>
                        <td className="px-4 py-3">{request.quantity}</td>
                        <td className="px-4 py-3">
                          <PriorityBadge priority={request.priority} />
                        </td>
                        <td className="px-4 py-3 text-[#64748B]">{request.neededBy}</td>
                        <td className="px-4 py-3">{request.location}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={request.status} />
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => handleView(request)}
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

              {activeFiltered.length === 0 ? (
                <p className="text-center text-sm text-[#64748B]">No active requests match these filters.</p>
              ) : null}

              {historyRequests.length > 0 ? (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                    Request History
                  </p>
                  <div className="overflow-x-auto rounded-none border border-[#E5E7EB] bg-white shadow-sm">
                    <table className="w-full min-w-[900px] text-left text-sm">
                      <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                        <tr>
                          <th className="px-4 py-3">Request ID</th>
                          <th className="px-4 py-3">Food Needed</th>
                          <th className="px-4 py-3">Quantity</th>
                          <th className="px-4 py-3">Priority</th>
                          <th className="px-4 py-3">Location</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyRequests.map((request) => (
                          <tr
                            key={request.id}
                            className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#F8FAFC]"
                          >
                            <td className="px-4 py-3 font-semibold text-[#64748B]">{request.id}</td>
                            <td className="px-4 py-3">{request.foodNeeded}</td>
                            <td className="px-4 py-3">{request.quantity}</td>
                            <td className="px-4 py-3">
                              <PriorityBadge priority={request.priority} />
                            </td>
                            <td className="px-4 py-3">{request.location}</td>
                            <td className="px-4 py-3">
                              <StatusBadge status={request.status} />
                            </td>
                            <td className="px-4 py-3 text-[#64748B]">{request.createdAt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </div>

            <SidePanel
              selected={selected}
              onCreate={handleCreate}
              onDuplicate={handleDuplicate}
              onEdit={handleEdit}
              onCancel={handleCancel}
            />
          </div>

          <NGOWorkflowStrip />
        </div>
      </motion.section>

      {showCreateModal ? (
        <NGOModal title="Create Food Request" onClose={() => setShowCreateModal(false)} wide>
          <form onSubmit={handleCreateSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-[#334155]">Food Needed</span>
              <input
                name="foodNeeded"
                required
                placeholder="e.g. Cooked Meals"
                className={FILTER_SELECT_CLASS}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-[#334155]">Quantity</span>
              <input
                name="quantity"
                required
                placeholder="e.g. 200 Meals"
                className={FILTER_SELECT_CLASS}
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-[#334155]">Category</span>
                <select name="category" className={FILTER_SELECT_CLASS}>
                  {FOOD_CATEGORY_OPTIONS.filter((o) => o.id !== "all").map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-[#334155]">Priority</span>
                <select name="priority" className={FILTER_SELECT_CLASS}>
                  <option value="emergency">Emergency</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </label>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-[#334155]">Needed By</span>
              <input
                name="neededBy"
                required
                placeholder="e.g. Today 5 PM"
                className={FILTER_SELECT_CLASS}
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-[#334155]">Location</span>
                <input
                  name="location"
                  required
                  placeholder="e.g. Hyderabad"
                  className={FILTER_SELECT_CLASS}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-[#334155]">Location Key</span>
                <select name="locationKey" className={FILTER_SELECT_CLASS}>
                  {LOCATION_OPTIONS.filter((o) => o.id !== "all").map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-[#334155]">Notes</span>
              <textarea
                name="notes"
                rows={3}
                placeholder="Additional details for donors and volunteers"
                className={FILTER_SELECT_CLASS}
              />
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="rounded-none border border-[#E5E7EB] px-4 py-2.5 text-sm font-semibold text-[#64748B] hover:bg-[#F8FAFC]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-none bg-[#16A34A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#15803D]"
              >
                Create Request
              </button>
            </div>
          </form>
        </NGOModal>
      ) : null}
    </NGOLayout>
  );
}
