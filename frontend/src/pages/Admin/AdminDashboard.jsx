import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowDown,
  FaArrowUp,
  FaBuilding,
  FaClock,
  FaExclamationTriangle,
  FaHandHoldingHeart,
  FaRoute,
  FaStar,
  FaTicketAlt,
  FaTruck,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import AdminDonationsCategoryPie from "../../components/admin/AdminDonationsCategoryPie";
import AdminDonationsOverviewChart from "../../components/admin/AdminDonationsOverviewChart";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AdminProfilePanel from "../../components/admin/AdminProfilePanel";
import {
  FOOTER_MONITORING,
  PENDING_VERIFICATIONS,
  REALTIME_ACTIVITY,
  RECENT_DONATIONS,
  TOP_PERFORMING_NGOS,
} from "../../data/adminDashboard";
import { DASHBOARD_ROUTES } from "../../constants/routes";

const EASE = [0.22, 1, 0.36, 1];

const FOOTER_ICONS = {
  truck: FaTruck,
  route: FaRoute,
  clock: FaClock,
  alert: FaExclamationTriangle,
  ticket: FaTicketAlt,
};

const FOOTER_ACCENTS = {
  blue: { icon: "text-[#2563EB] bg-[#DBEAFE]", card: "border-[#DBEAFE]" },
  indigo: { icon: "text-[#4338CA] bg-[#E0E7FF]", card: "border-[#E0E7FF]" },
  amber: { icon: "text-[#D97706] bg-[#FEF3C7]", card: "border-[#FDE68A]" },
  red: { icon: "text-[#DC2626] bg-[#FEE2E2]", card: "border-[#FECACA]" },
  slate: { icon: "text-[#475569] bg-[#F1F5F9]", card: "border-[#E2E8F0]" },
};

const DONATION_STATUS_COLORS = {
  "In Transit": "bg-blue-50 text-blue-700",
  Delivered: "bg-green-50 text-green-700",
  Accepted: "bg-amber-50 text-amber-700",
  Completed: "bg-slate-50 text-slate-600",
  Cancelled: "bg-red-50 text-red-700",
};

function ViewAllLink({ expanded, onClick, to }) {
  const className = [
    "inline-block text-sm font-semibold text-[#4338CA] transition-all duration-200 hover:text-[#3730A3] hover:underline",
    expanded ? "scale-110" : "scale-100",
  ].join(" ");

  if (to) {
    return (
      <Link to={to} className={className}>
        View all
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      View all
    </button>
  );
}

function PanelBox({ title, subtitle, viewAll, children, className = "" }) {
  return (
    <div
      className={[
        "flex flex-col rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-5",
        className,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-[#0F172A] sm:text-lg">{title}</h2>
          {subtitle ? <p className="mt-0.5 text-xs text-[#64748B] sm:text-sm">{subtitle}</p> : null}
        </div>
        {viewAll}
      </div>
      <div className="mt-3 flex-1">{children}</div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activityExpanded, setActivityExpanded] = useState(false);
  const [donationsExpanded, setDonationsExpanded] = useState(false);
  const [ngosExpanded, setNgosExpanded] = useState(false);
  const [verificationsExpanded, setVerificationsExpanded] = useState(false);

  const visibleActivity = activityExpanded ? REALTIME_ACTIVITY : REALTIME_ACTIVITY.slice(0, 5);
  const visibleDonations = donationsExpanded ? RECENT_DONATIONS : RECENT_DONATIONS.slice(0, 4);
  const visibleNgos = ngosExpanded ? TOP_PERFORMING_NGOS : TOP_PERFORMING_NGOS.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="grid gap-[0.5cm] lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)]"
    >
      <AdminProfilePanel />

      <div className="flex min-w-0 flex-col gap-[0.5cm]">
        <section className="rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#EEF2FF]/60 via-[#F8FAFC] to-white p-[0.5cm] shadow-sm sm:p-5">
          <AdminPageHeader
            title="Dashboard"
            description="Monitor donations, distribution activity, and platform health in real time."
          />
        </section>

        <div className="grid gap-[0.5cm] xl:grid-cols-3">
          <PanelBox title="Donations Overview" subtitle="Daily donations — last 7 days">
            <AdminDonationsOverviewChart />
            <p className="mt-2 text-xs text-[#64748B]">
              <span className="font-bold text-[#4338CA]">443</span> donations this week
            </p>
          </PanelBox>

          <PanelBox title="Donations by Category" subtitle="Food type distribution">
            <AdminDonationsCategoryPie />
          </PanelBox>

          <PanelBox
            title="Real-time Activity"
            subtitle="Live food distribution events"
            viewAll={
              <ViewAllLink
                expanded={activityExpanded}
                onClick={() => setActivityExpanded((v) => !v)}
              />
            }
          >
            <ul className="flex max-h-64 flex-col gap-2 overflow-y-auto">
              {visibleActivity.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-2 rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2.5"
                >
                  <span className="text-base leading-none" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium leading-5 text-[#0F172A] sm:text-sm">
                      {item.message}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-[#4338CA]">{item.ref}</p>
                  </div>
                  <span className="shrink-0 text-[10px] text-[#94A3B8] sm:text-xs">{item.time}</span>
                </li>
              ))}
            </ul>
          </PanelBox>
        </div>

        <div className="grid gap-[0.5cm] lg:grid-cols-2">
          <PanelBox
            title="Recent Donations"
            subtitle="Latest donation activity"
            viewAll={
              <ViewAllLink
                expanded={donationsExpanded}
                onClick={() => setDonationsExpanded((v) => !v)}
                to={donationsExpanded ? undefined : `${DASHBOARD_ROUTES.admin}/donations`}
              />
            }
            className={donationsExpanded ? "lg:col-span-2" : ""}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="border-b border-[#E5E7EB] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                  <tr>
                    <th className="pb-2 pr-3">Donation ID</th>
                    <th className="pb-2 pr-3">Donor</th>
                    <th className="pb-2 pr-3">Food</th>
                    <th className="pb-2 pr-3">NGO</th>
                    <th className="pb-2 pr-3">Status</th>
                    <th className="pb-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleDonations.map((row) => (
                    <tr key={row.id} className="border-b border-[#F1F5F9] last:border-0">
                      <td className="py-2.5 pr-3 font-semibold text-[#4338CA]">{row.id}</td>
                      <td className="py-2.5 pr-3 text-[#0F172A]">{row.donor}</td>
                      <td className="py-2.5 pr-3 text-[#64748B]">{row.food}</td>
                      <td className="py-2.5 pr-3 text-[#64748B]">{row.ngo}</td>
                      <td className="py-2.5 pr-3">
                        <span
                          className={`inline-flex rounded-none px-2 py-0.5 text-xs font-semibold ${DONATION_STATUS_COLORS[row.status] ?? "bg-slate-50 text-slate-600"}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-xs text-[#94A3B8]">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PanelBox>

          <PanelBox
            title="Top Performing NGOs"
            subtitle="Highest impact this month"
            viewAll={
              <ViewAllLink
                expanded={ngosExpanded}
                onClick={() => setNgosExpanded((v) => !v)}
                to={ngosExpanded ? undefined : `${DASHBOARD_ROUTES.admin}/ngos`}
              />
            }
          >
            <ul className="flex flex-col gap-2">
              {visibleNgos.map((ngo, index) => (
                <li
                  key={ngo.id}
                  className="flex items-center gap-3 rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none bg-[#4338CA] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-[#0F172A]">{ngo.name}</p>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-[#64748B]">
                      <span className="flex items-center gap-1">
                        <FaHandHoldingHeart aria-hidden="true" />
                        {ngo.donations} donations
                      </span>
                      <span>{ngo.mealsDelivered} meals</span>
                    </div>
                  </div>
                  <span className="flex shrink-0 items-center gap-0.5 text-sm font-bold text-amber-600">
                    <FaStar className="text-xs" aria-hidden="true" />
                    {ngo.rating}
                  </span>
                </li>
              ))}
            </ul>
          </PanelBox>
        </div>

        <PanelBox
          title="Pending Verifications"
          subtitle="Applications awaiting admin review"
          viewAll={
            <ViewAllLink
              expanded={verificationsExpanded}
              onClick={() => setVerificationsExpanded((v) => !v)}
            />
          }
        >
          <div
            className={[
              "grid gap-3",
              verificationsExpanded ? "sm:grid-cols-3" : "grid-cols-3",
            ].join(" ")}
          >
            {[
              {
                label: "NGOs",
                count: PENDING_VERIFICATIONS.ngos,
                icon: FaBuilding,
                to: `${DASHBOARD_ROUTES.admin}/ngos`,
                color: "text-[#4338CA] bg-[#EEF2FF]",
              },
              {
                label: "Volunteers",
                count: PENDING_VERIFICATIONS.volunteers,
                icon: FaUserFriends,
                to: `${DASHBOARD_ROUTES.admin}/volunteers`,
                color: "text-[#7C3AED] bg-[#F5F3FF]",
              },
              {
                label: "Donors",
                count: PENDING_VERIFICATIONS.donors,
                icon: FaUsers,
                to: `${DASHBOARD_ROUTES.admin}/donors`,
                color: "text-[#16A34A] bg-[#F0FDF4]",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={[
                    "flex items-center gap-3 rounded-none border border-[#E5E7EB] bg-white p-4 transition-all hover:border-[#C7D2FE] hover:shadow-sm",
                    verificationsExpanded ? "flex-col text-center" : "",
                  ].join(" ")}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-none ${item.color}`}
                  >
                    <Icon aria-hidden="true" />
                  </span>
                  <div className={verificationsExpanded ? "text-center" : ""}>
                    <p className="text-2xl font-bold text-[#0F172A]">{item.count}</p>
                    <p className="text-xs font-semibold text-[#64748B]">{item.label}</p>
                  </div>
                  {verificationsExpanded ? (
                    <span className="text-xs font-semibold text-[#4338CA]">Review →</span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </PanelBox>

        <footer className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
          {FOOTER_MONITORING.map((card) => {
            const Icon = FOOTER_ICONS[card.icon];
            const accent = FOOTER_ACCENTS[card.accent] ?? FOOTER_ACCENTS.slate;
            return (
              <article
                key={card.id}
                className={[
                  "rounded-none border bg-white p-4 shadow-sm",
                  accent.card,
                ].join(" ")}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-none ${accent.icon}`}
                  >
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-2xl font-bold text-[#0F172A]">{card.value}</p>
                    <p className="text-xs font-semibold text-[#334155] sm:text-sm">{card.label}</p>
                    <p
                      className={[
                        "mt-1 flex items-center gap-1 text-[10px] sm:text-xs",
                        card.deltaPositive === true
                          ? "text-green-600"
                          : card.deltaPositive === false
                            ? "text-amber-600"
                            : "text-[#64748B]",
                      ].join(" ")}
                    >
                      {card.deltaPositive === true ? (
                        <FaArrowUp aria-hidden="true" />
                      ) : card.deltaPositive === false ? (
                        <FaArrowDown aria-hidden="true" />
                      ) : null}
                      {card.delta}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </footer>
      </div>
    </motion.div>
  );
}
