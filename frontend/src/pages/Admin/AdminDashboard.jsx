import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowDown,
  FaArrowUp,
  FaBuilding,
  FaChartLine,
  FaClock,
  FaExclamationTriangle,
  FaHandHoldingHeart,
  FaLeaf,
  FaChartPie,
  FaRoute,
  FaSatelliteDish,
  FaStar,
  FaTicketAlt,
  FaTruck,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import AdminDonationsCategoryPie from "../../components/admin/AdminDonationsCategoryPie";
import AdminDonationsOverviewChart from "../../components/admin/AdminDonationsOverviewChart";
import AdminInteractivePanel from "../../components/admin/AdminInteractivePanel";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import { ADMIN_PAGE_BG, ADMIN_TEXT_LINK } from "../../components/admin/adminStyles";
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
  leaf: FaLeaf,
};

const FOOTER_ACCENTS = {
  green: { icon: "text-[#16A34A] bg-[#DCFCE7]", card: "border-[#BBF7D0] bg-gradient-to-br from-[#F0FDF4] to-white" },
  blue: { icon: "text-[#2563EB] bg-[#DBEAFE]", card: "border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] to-white" },
  amber: { icon: "text-[#D97706] bg-[#FEF3C7]", card: "border-[#FDE68A] bg-gradient-to-br from-[#FFFBEB] to-white" },
  red: { icon: "text-[#DC2626] bg-[#FEE2E2]", card: "border-[#FECACA] bg-gradient-to-br from-[#FEF2F2] to-white" },
  slate: { icon: "text-[#475569] bg-[#F1F5F9]", card: "border-[#E2E8F0] bg-gradient-to-br from-[#F8FAFC] to-white" },
};

const DONATION_STATUS_COLORS = {
  "In Transit": "bg-blue-50 text-blue-700",
  Delivered: "bg-green-50 text-green-700",
  Accepted: "bg-amber-50 text-amber-700",
  Completed: "bg-slate-50 text-slate-600",
  Cancelled: "bg-red-50 text-red-700",
};

function ViewAllLink({ expanded, onClick, to }) {
  const className = [ADMIN_TEXT_LINK, expanded ? "scale-110 inline-block" : ""].join(" ");
  if (to) return <Link to={to} className={className}>View all</Link>;
  return <button type="button" onClick={onClick} className={className}>View all</button>;
}

function PanelHeader({ icon: Icon, title, subtitle, viewAll }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        {Icon ? (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]">
            <Icon aria-hidden="true" />
          </span>
        ) : null}
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">{title}</h2>
          {subtitle ? <p className="mt-0.5 text-sm text-[#64748B]">{subtitle}</p> : null}
        </div>
      </div>
      {viewAll}
    </div>
  );
}

export default function AdminDashboard() {
  const [activityExpanded, setActivityExpanded] = useState(false);
  const [donationsExpanded, setDonationsExpanded] = useState(false);
  const [ngosExpanded, setNgosExpanded] = useState(false);

  const visibleActivity = activityExpanded ? REALTIME_ACTIVITY : REALTIME_ACTIVITY.slice(0, 5);
  const visibleDonations = donationsExpanded ? RECENT_DONATIONS : RECENT_DONATIONS.slice(0, 4);
  const visibleNgos = ngosExpanded ? TOP_PERFORMING_NGOS : TOP_PERFORMING_NGOS.slice(0, 3);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={ADMIN_PAGE_BG}
    >
      <div className="flex flex-col gap-5 p-5 sm:p-6">
        <AdminPageHeader
          title="Dashboard"
          description="Monitor donations, distribution activity, and platform health in real time."
        />

        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <AdminInteractivePanel className="min-h-[280px]">
            <PanelHeader icon={FaChartLine} title="Donations Overview" subtitle="Daily donations — last 7 days" />
            <AdminDonationsOverviewChart />
            <p className="mt-3 text-sm text-[#64748B]">
              <span className="font-bold text-[#16A34A]">443</span> donations this week
              <span className="ml-2 inline-flex items-center gap-0.5 text-xs font-semibold text-[#16A34A]">
                <FaArrowUp aria-hidden="true" /> 16%
              </span>
            </p>
          </AdminInteractivePanel>

          <AdminInteractivePanel className="min-h-[280px]">
            <PanelHeader icon={FaChartPie} title="Donations by Category" subtitle="Food type distribution" />
            <AdminDonationsCategoryPie />
          </AdminInteractivePanel>

          <AdminInteractivePanel className="min-h-[280px] lg:col-span-2 xl:col-span-1">
            <PanelHeader
              icon={FaSatelliteDish}
              title="Real-time Activity"
              subtitle="Live food distribution events"
              viewAll={<ViewAllLink expanded={activityExpanded} onClick={() => setActivityExpanded((v) => !v)} />}
            />
            <ul className="flex max-h-56 flex-col gap-2 overflow-y-auto">
              {visibleActivity.map((item) => (
                <li key={item.id} className="flex items-start gap-2 rounded-[16px] border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2.5 transition-colors hover:border-[#BBF7D0] hover:bg-[#F0FDF4]">
                  <span className="text-base leading-none" aria-hidden="true">{item.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#0F172A]">{item.message}</p>
                    <p className="mt-0.5 text-xs font-semibold text-[#15803D]">{item.ref}</p>
                  </div>
                  <span className="shrink-0 text-xs text-[#94A3B8]">{item.time}</span>
                </li>
              ))}
            </ul>
          </AdminInteractivePanel>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <AdminInteractivePanel className={donationsExpanded ? "lg:col-span-2" : ""}>
            <PanelHeader
              icon={FaHandHoldingHeart}
              title="Recent Donations"
              subtitle="Latest donation activity"
              viewAll={
                <ViewAllLink
                  expanded={donationsExpanded}
                  onClick={() => setDonationsExpanded((v) => !v)}
                  to={donationsExpanded ? undefined : `${DASHBOARD_ROUTES.admin}/donations`}
                />
              }
            />
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
                    <tr key={row.id} className="border-b border-[#F1F5F9] transition-colors last:border-0 hover:bg-[#F0FDF4]">
                      <td className="py-2.5 pr-3 font-semibold text-[#15803D]">{row.id}</td>
                      <td className="py-2.5 pr-3 text-[#0F172A]">{row.donor}</td>
                      <td className="py-2.5 pr-3 text-[#64748B]">{row.food}</td>
                      <td className="py-2.5 pr-3 text-[#64748B]">{row.ngo}</td>
                      <td className="py-2.5 pr-3">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${DONATION_STATUS_COLORS[row.status] ?? "bg-slate-50 text-slate-600"}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-xs text-[#94A3B8]">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AdminInteractivePanel>

          <AdminInteractivePanel>
            <PanelHeader
              icon={FaBuilding}
              title="Top Performing NGOs"
              subtitle="Highest impact this month"
              viewAll={
                <ViewAllLink
                  expanded={ngosExpanded}
                  onClick={() => setNgosExpanded((v) => !v)}
                  to={ngosExpanded ? undefined : `${DASHBOARD_ROUTES.admin}/ngos`}
                />
              }
            />
            <ul className="flex flex-col gap-2">
              {visibleNgos.map((ngo, index) => (
                <li key={ngo.id} className="flex items-center gap-3 rounded-[16px] border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-3 transition-all hover:border-[#BBF7D0] hover:bg-[#F0FDF4]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#16A34A] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-[#0F172A]">{ngo.name}</p>
                    <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-[#64748B]">
                      <span>{ngo.donations} donations</span>
                      <span>{ngo.mealsDelivered} meals</span>
                    </div>
                  </div>
                  <span className="flex shrink-0 items-center gap-0.5 text-sm font-bold text-amber-600">
                    <FaStar className="text-xs" aria-hidden="true" /> {ngo.rating}
                  </span>
                </li>
              ))}
            </ul>
          </AdminInteractivePanel>
        </div>

        <AdminInteractivePanel>
          <PanelHeader icon={FaUsers} title="Pending Verifications" subtitle="Applications awaiting admin review" />
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "NGOs", count: PENDING_VERIFICATIONS.ngos, icon: FaBuilding, to: `${DASHBOARD_ROUTES.admin}/ngos` },
              { label: "Volunteers", count: PENDING_VERIFICATIONS.volunteers, icon: FaUserFriends, to: `${DASHBOARD_ROUTES.admin}/volunteers` },
              { label: "Donors", count: PENDING_VERIFICATIONS.donors, icon: FaUsers, to: `${DASHBOARD_ROUTES.admin}/donors` },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex items-center gap-3 rounded-[16px] border border-[#E5E7EB] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#BBF7D0] hover:bg-[#F0FDF4] hover:shadow-md active:scale-[0.99]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#F0FDF4] text-[#16A34A]">
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-2xl font-bold text-[#0F172A]">{item.count}</p>
                    <p className="text-sm font-semibold text-[#64748B]">{item.label}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </AdminInteractivePanel>

        <footer className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {FOOTER_MONITORING.map((card) => {
            const Icon = FOOTER_ICONS[card.icon];
            const accent = FOOTER_ACCENTS[card.accent] ?? FOOTER_ACCENTS.slate;
            const isUp = card.trend > 0;
            const isDown = card.trend < 0;
            return (
              <article
                key={card.id}
                className={[
                  "rounded-[16px] border p-5 shadow-sm transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(22,163,74,0.1)]",
                  "active:scale-[0.99] active:shadow-[0_0_0_2px_rgba(22,163,74,0.15)]",
                  accent.card,
                ].join(" ")}
              >
                <div className="flex items-start gap-4">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] ${accent.icon}`}>
                    <Icon className="text-lg" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-3xl font-bold text-[#0F172A]">{card.value}</p>
                    <p className="mt-1 text-sm font-semibold text-[#334155]">{card.label}</p>
                    <p className={["mt-2 flex items-center gap-1 text-xs font-semibold", isUp ? "text-[#16A34A]" : isDown ? "text-red-600" : "text-[#64748B]"].join(" ")}>
                      {isUp ? <FaArrowUp aria-hidden="true" /> : null}
                      {isDown ? <FaArrowDown aria-hidden="true" /> : null}
                      {card.trend !== 0 ? `${Math.abs(card.trend)}%` : "—"}
                      <span className="font-normal text-[#94A3B8]">{card.trendLabel}</span>
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </footer>
      </div>
    </motion.section>
  );
}
