import { getNgoFoodImage } from "../../data/ngoFoodAssets";
import {
  INVENTORY_STATUS_POPUP,
  OVERVIEW_INVENTORY_SUMMARY,
} from "../../data/ngoDashboard";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { NGOSectionHeader, NGO_SECTION_CLASS } from "./NGOSectionLink";

function InventoryCategoryCard({ item }) {
  const image = getNgoFoodImage(item.foodKey);
  const statusClass = INVENTORY_STATUS_POPUP[item.status] ?? INVENTORY_STATUS_POPUP.good;

  return (
    <li className="flex gap-2.5 rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-2.5 transition-shadow duration-300 hover:shadow-sm">
      {image ? (
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-none bg-white">
          <img src={image} alt={item.label} className="h-full w-full object-cover" />
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94A3B8]">
              {item.category}
            </p>
            <p className="truncate text-xs font-bold text-[#0F172A]">{item.label}</p>
          </div>
          <span
            className={`shrink-0 rounded-none border px-1.5 py-0.5 text-[9px] font-bold uppercase ${statusClass}`}
            title={item.statusLabel}
          >
            {item.statusLabel}
          </span>
        </div>
        <p className="mt-1 text-[10px] text-[#64748B]">
          <span className="font-semibold text-[#0F172A]">{item.quantity}</span>
          {" · "}
          {item.itemCount} items
        </p>
      </div>
    </li>
  );
}

export default function NGOOverviewInventorySummary() {
  return (
    <section className={NGO_SECTION_CLASS}>
      <NGOSectionHeader
        title="Inventory Summary"
        actionTo={DASHBOARD_ROUTES.ngoInventory}
        actionLabel="View full inventory"
      />

      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {OVERVIEW_INVENTORY_SUMMARY.map((item) => (
          <InventoryCategoryCard key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}
