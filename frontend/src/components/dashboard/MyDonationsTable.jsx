import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaFilter } from "react-icons/fa";
import {
  DATE_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
} from "../../constants/donationForm";
import { ALL_DONATIONS, filterDonations } from "../../data/donorDonations";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import DonationItemsList from "../common/DonationItemsList";
import EventTypeBadge from "../common/EventTypeBadge";
import {
  dashboardAlertSuccessClass,
  dashboardBadgeClass,
  dashboardBoxClass,
  dashboardInputClass,
} from "./dashboardFormStyles";

const EASE = [0.22, 1, 0.36, 1];

const MY_DONATIONS_SELECT_CLASS = [
  dashboardInputClass,
  "!min-h-[56px] !py-4 sm:!text-base",
  "transition-all duration-300 hover:border-[#16A34A]/40 hover:bg-white",
].join(" ");

const MY_DONATIONS_ACTION_CLASS = [
  "inline-flex min-h-[56px] min-w-[120px] items-center justify-center gap-[0.5cm]",
  "rounded-none border border-[#E5E7EB] px-6 py-4",
  "text-base font-semibold leading-none text-[#16A34A]",
  "transition-all duration-300",
  "hover:-translate-y-0.5 hover:border-[#16A34A]/40 hover:bg-[#F0FDF4] hover:shadow-[0_8px_20px_rgba(22,163,74,0.12)]",
  "active:translate-y-0",
].join(" ");

const statusColors = {
  posted: "bg-[#F1F5F9] text-[#475569]",
  ngo_matched: "bg-[#DBEAFE] text-[#1D4ED8]",
  volunteer_assigned: "bg-[#E0E7FF] text-[#4338CA]",
  picked_up: "bg-[#FEF3C7] text-[#B45309]",
  in_transit: "bg-[#FFEDD5] text-[#C2410C]",
  delivered: "bg-[#DCFCE7] text-[#15803D]",
  ngo_confirmed: "bg-[#F0FDF4] text-[#166534]",
};

function StatusBadge({ status, label }) {
  return (
    <motion.span
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className={`${dashboardBadgeClass} inline-flex min-h-[52px] min-w-[132px] items-center justify-center px-4 py-3 text-center text-sm leading-tight transition-shadow duration-300 hover:shadow-sm sm:text-base ${statusColors[status] ?? statusColors.posted}`}
    >
      {label}
    </motion.span>
  );
}

export default function MyDonationsTable({ view = "all" }) {
  const location = useLocation();
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState(
    view === "active" ? "active" : view === "history" ? "ngo_confirmed" : "all"
  );

  const scopedDonations = useMemo(() => {
    if (view === "active") return ALL_DONATIONS.filter((item) => item.isActive);
    if (view === "history") return ALL_DONATIONS.filter((item) => !item.isActive);
    return ALL_DONATIONS;
  }, [view]);

  const filteredDonations = useMemo(
    () =>
      filterDonations(scopedDonations, {
        dateFilter,
        statusFilter: view === "history" ? "all" : statusFilter,
      }),
    [scopedDonations, dateFilter, statusFilter, view]
  );

  const successMessage = location.state?.message;

  return (
    <div className="flex flex-col gap-[0.5cm]">
      {successMessage ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={dashboardAlertSuccessClass}
        >
          {successMessage}
        </motion.div>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
        whileHover={{ y: -2 }}
        className={`${dashboardBoxClass} flex flex-col gap-[0.5cm] bg-white/80 p-4 backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] sm:flex-row sm:items-end sm:justify-between sm:p-5`}
      >
        <div className="flex min-h-[56px] items-center gap-3 text-[#64748B]">
          <motion.span
            animate={{ rotate: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaFilter aria-hidden="true" />
          </motion.span>
          <span className="text-sm font-semibold uppercase tracking-wide">Filters</span>
        </div>
        <div className="grid gap-[0.5cm] sm:grid-cols-2">
          <label className="flex flex-col gap-[0.5cm]">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              Date
            </span>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className={MY_DONATIONS_SELECT_CLASS}
            >
              {DATE_FILTER_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-[0.5cm]">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              Status
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              disabled={view === "active" || view === "history"}
              className={`${MY_DONATIONS_SELECT_CLASS} disabled:opacity-60`}
            >
              {STATUS_FILTER_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        className={`${dashboardBoxClass} overflow-hidden bg-white/90 backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(15,23,42,0.07)]`}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm sm:text-base">
            <thead className="border-b-2 border-[#E5E7EB] bg-gradient-to-r from-[#F1F5F9] to-[#F8FAFC]">
              <tr>
                {[
                  "Donation ID",
                  "Food",
                  "Quantity",
                  "NGO",
                  "Date",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-5 text-center text-sm font-extrabold uppercase tracking-wider text-[#0F172A] sm:px-5 sm:py-6 sm:text-base"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-[#64748B] sm:text-base">
                    No donations match your filters.
                  </td>
                </tr>
              ) : (
                filteredDonations.map((donation, index) => (
                  <motion.tr
                    key={donation.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.04 * index, ease: EASE }}
                    whileHover={{
                      backgroundColor: "rgba(240, 253, 244, 0.65)",
                      transition: { duration: 0.2 },
                    }}
                    className="group border-b border-[#F1F5F9] last:border-none"
                  >
                    <td className="px-4 py-5 font-bold text-[#0F172A] transition-colors duration-300 group-hover:text-[#15803D] sm:px-5 sm:py-6">
                      {donation.id}
                    </td>
                    <td className="px-4 py-5 text-[#0F172A] sm:px-5 sm:py-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        {donation.image ? (
                          <motion.img
                            src={donation.image}
                            alt={`${donation.food} — donor upload photo`}
                            className="h-[56px] w-[80px] shrink-0 rounded-md border border-slate-200 object-cover shadow-sm sm:h-[64px] sm:w-[92px]"
                            loading="lazy"
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.25 }}
                          />
                        ) : null}
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#15803D]">
                              {donation.food}
                            </span>
                            <EventTypeBadge eventType={donation.eventType} />
                          </div>
                          {donation.itemCount > 1 ? (
                            <DonationItemsList
                              record={donation}
                              className="mt-1.5"
                              maxItems={3}
                              itemClassName="text-xs text-[#64748B]"
                            />
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-[#64748B] sm:px-5 sm:py-6">
                      {donation.itemCount > 1 ? (
                        <DonationItemsList record={donation} ordered={false} />
                      ) : (
                        donation.quantity
                      )}
                    </td>
                    <td className="px-4 py-5 text-[#64748B] sm:px-5 sm:py-6">
                      {donation.ngo}
                    </td>
                    <td className="px-4 py-5 text-[#64748B] sm:px-5 sm:py-6">
                      {donation.dateLabel}
                    </td>
                    <td className="px-4 py-5 sm:px-5 sm:py-6">
                      <StatusBadge
                        status={donation.status}
                        label={donation.statusLabel}
                      />
                    </td>
                    <td className="px-4 py-5 sm:px-5 sm:py-6">
                      <Link
                        to={
                          donation.isActive
                            ? DASHBOARD_ROUTES.donorActive
                            : DASHBOARD_ROUTES.donorHistory
                        }
                        className={MY_DONATIONS_ACTION_CLASS}
                      >
                        <FaEye aria-hidden="true" />
                        <span className="text-center leading-none">
                          {donation.isActive ? "Track" : "View"}
                        </span>
                      </Link>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-sm text-[#64748B]"
      >
        Showing {filteredDonations.length} of {scopedDonations.length} donations
      </motion.p>
    </div>
  );
}

export { MY_DONATIONS_SELECT_CLASS };
