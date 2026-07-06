import { useMemo, useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import EventTypeBadge from "../../common/EventTypeBadge";
import {
  COMPLETED_MISSIONS_HISTORY,
  DELIVERY_STATUS_LABELS,
  DELIVERY_STATUS_STYLES,
  getMissionTableRows,
  UPCOMING_MISSIONS_EXTENDED,
} from "../../../data/volunteerMissionHistory";
import { volunteerInteractive } from "../volunteerDashboardStyles";

const STATUS_FILTERS = [
  { id: "all", label: "All" },
  { id: "delivered", label: "Completed" },
  { id: "to_be_picked", label: "Upcoming" },
  { id: "to_be_delivered", label: "In Progress" },
];

function MissionDetailRow({ row }) {
  const [expanded, setExpanded] = useState(false);
  const statusKey = row.deliveryStatus ?? "delivered";
  const statusLabel = DELIVERY_STATUS_LABELS[statusKey] ?? statusKey;
  const statusStyle = DELIVERY_STATUS_STYLES[statusKey] ?? DELIVERY_STATUS_STYLES.delivered;

  return (
    <li className="rounded-none border border-[#E5E7EB] bg-white">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-[#F8FAFC]"
      >
        <FaChevronDown
          className={[
            "shrink-0 text-[10px] text-[#64748B] transition-transform",
            expanded ? "rotate-180" : "",
          ].join(" ")}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-[#64748B]">{row.missionId}</span>
            <span className="text-xs font-semibold text-[#0F172A]">{row.foodName}</span>
            {row.eventType ? <EventTypeBadge eventType={row.eventType} /> : null}
          </div>
          <p className="mt-0.5 text-[10px] text-[#64748B]">
            {row.donor} → {row.ngo}
          </p>
        </div>
        <span
          className={[
            "shrink-0 rounded-none border px-2 py-0.5 text-[10px] font-semibold",
            statusStyle,
          ].join(" ")}
        >
          {statusLabel}
        </span>
      </button>

      {expanded ? (
        <div className="border-t border-[#E5E7EB] bg-[#F8FAFC] px-3 py-3 text-[11px]">
          <dl className="grid gap-2 sm:grid-cols-2">
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">
                Total Load
              </dt>
              <dd className="mt-0.5 font-semibold text-[#0F172A]">{row.totalLoad ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">
                Meals
              </dt>
              <dd className="mt-0.5 font-semibold text-[#0F172A]">{row.meals ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">
                Pickup Time
              </dt>
              <dd className="mt-0.5 font-semibold text-[#0F172A]">{row.pickupAt ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">
                Delivered Time
              </dt>
              <dd className="mt-0.5 font-semibold text-[#0F172A]">{row.deliveredAt ?? "—"}</dd>
            </div>
          </dl>
          {(row.items ?? []).length > 0 ? (
            <div className="mt-3">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">
                Food Items
              </p>
              <ul className="mt-1.5 space-y-1">
                {row.items.map((item, index) => (
                  <li key={`${row.missionId}-item-${index}`} className="text-[11px] text-[#475569]">
                    <span className="font-semibold text-[#0F172A]">{item.name}</span>
                    {item.quantity ? ` · ${item.quantity}` : ""}
                    {item.cuisine ? ` · ${item.cuisine}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}

export default function VolunteerProfileMissionHistory() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const allRows = useMemo(
    () =>
      getMissionTableRows([
        ...UPCOMING_MISSIONS_EXTENDED,
        ...COMPLETED_MISSIONS_HISTORY,
      ]),
    [],
  );

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allRows.filter((row) => {
      const matchesStatus =
        statusFilter === "all" || (row.deliveryStatus ?? "delivered") === statusFilter;
      const matchesSearch =
        !query ||
        row.missionId?.toLowerCase().includes(query) ||
        row.foodName?.toLowerCase().includes(query) ||
        row.donor?.toLowerCase().includes(query) ||
        row.ngo?.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [allRows, statusFilter, search]);

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
      <h2 className="text-sm font-bold text-[#0F172A]">Mission History</h2>
      <p className="mt-1 text-[10px] text-[#64748B]">
        Filter and expand missions for pickup, delivery, and food item details.
      </p>

      <div className="mt-[0.5cm] flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setStatusFilter(filter.id)}
              className={[
                "rounded-none border px-2.5 py-1.5 text-[10px] font-semibold transition-colors",
                statusFilter === filter.id
                  ? "border-[#16A34A] bg-[#F0FDF4] text-[#15803D]"
                  : "border-[#E5E7EB] bg-white text-[#64748B] hover:border-[#BBF7D0]",
                volunteerInteractive.buttonOutline,
              ].join(" ")}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <label className="relative flex items-center">
          <FaSearch className="pointer-events-none absolute left-2.5 text-[10px] text-[#94A3B8]" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search missions..."
            className="w-full rounded-none border border-[#E5E7EB] py-2 pl-8 pr-3 text-[11px] outline-none focus:border-[#16A34A] sm:w-52"
          />
        </label>
      </div>

      <p className="mt-2 text-[10px] text-[#64748B]">
        Showing {filteredRows.length} of {allRows.length} missions
      </p>

      {filteredRows.length === 0 ? (
        <p className="mt-[0.5cm] rounded-none border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-[0.5cm] text-center text-xs text-[#64748B]">
          No missions match your filters.
        </p>
      ) : (
        <ul className="mt-[0.5cm] max-h-[420px] space-y-2 overflow-y-auto pr-1">
          {filteredRows.map((row) => (
            <MissionDetailRow key={row.missionId} row={row} />
          ))}
        </ul>
      )}
    </section>
  );
}
