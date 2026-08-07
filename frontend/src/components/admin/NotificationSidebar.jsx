import AdminInteractivePanel from "./AdminInteractivePanel";
import { NotificationSummaryPie } from "./reports/ReportsCharts";
import { NOTIFICATION_SUMMARY, RECENT_ACTIVITIES } from "../../data/adminReports";

export default function NotificationSidebar() {
  return (
    <aside className="flex flex-col gap-4">
      <AdminInteractivePanel className="!p-5">
        <h3 className="text-base font-bold text-[#0F172A]">Notification Summary</h3>
        <p className="mt-1 text-xs text-[#64748B]">Breakdown by category</p>
        <div className="mt-3">
          <NotificationSummaryPie data={NOTIFICATION_SUMMARY} />
        </div>
        <ul className="mt-2 space-y-1.5 text-xs">
          {NOTIFICATION_SUMMARY.map((item) => (
            <li key={item.name} className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-medium text-[#334155]">{item.name}</span>
              </span>
              <span className="font-bold text-[#0F172A]">{item.value}</span>
            </li>
          ))}
        </ul>
      </AdminInteractivePanel>

      <AdminInteractivePanel className="!p-5">
        <h3 className="text-base font-bold text-[#0F172A]">Recent Activities</h3>
        <ul className="mt-4 space-y-3">
          {RECENT_ACTIVITIES.map((activity) => (
            <li
              key={activity.id}
              className="rounded-[12px] border border-[#F1F5F9] bg-[#FAFBFC] p-3 transition-colors hover:border-[#BBF7D0] hover:bg-[#F0FDF4]"
            >
              <p className="text-sm leading-5 text-[#334155]">{activity.text}</p>
              <p className="mt-1 text-xs font-semibold text-[#94A3B8]">{activity.time}</p>
            </li>
          ))}
        </ul>
      </AdminInteractivePanel>
    </aside>
  );
}
