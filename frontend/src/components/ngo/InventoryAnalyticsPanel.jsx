import { INVENTORY_ANALYTICS } from "../../data/ngoInventory";

function BarChart({ title, items, valueSuffix = "", maxValue }) {
  const peak = maxValue ?? Math.max(...items.map((i) => i.value), 1);

  return (
    <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">{title}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.label}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-medium text-[#334155]">{item.label}</span>
              <span className="text-[#64748B]">
                {item.value}
                {valueSuffix}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-none bg-[#E2E8F0]">
              <div
                className="h-full transition-all"
                style={{
                  width: `${(item.value / peak) * 100}%`,
                  backgroundColor: item.color ?? (item.urgent ? "#F59E0B" : "#16A34A"),
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FlowChart({ title, data }) {
  const peak = Math.max(...data.flatMap((d) => [d.incoming, d.outgoing]), 1);

  return (
    <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">{title}</p>
      <div className="mt-3 flex items-end justify-between gap-2" style={{ minHeight: 120 }}>
        {data.map((point) => (
          <div key={point.label} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex w-full items-end justify-center gap-0.5" style={{ height: 80 }}>
              <div
                className="w-2 bg-[#16A34A]"
                style={{ height: `${(point.incoming / peak) * 100}%` }}
                title={`In: ${point.incoming}`}
              />
              <div
                className="w-2 bg-[#2563EB]"
                style={{ height: `${(point.outgoing / peak) * 100}%` }}
                title={`Out: ${point.outgoing}`}
              />
            </div>
            <span className="text-[10px] text-[#64748B]">{point.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-4 text-xs text-[#64748B]">
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 bg-[#16A34A]" /> Incoming
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 bg-[#2563EB]" /> Outgoing
        </span>
      </div>
    </div>
  );
}

function CompareChart({ title, incoming, outgoing }) {
  const peak = Math.max(incoming, outgoing, 1);

  return (
    <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">{title}</p>
      <div className="mt-4 flex flex-col gap-3">
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span className="font-medium text-[#15803D]">Incoming</span>
            <span className="font-bold">{incoming} meals</span>
          </div>
          <div className="h-3 bg-[#E2E8F0]">
            <div
              className="h-full bg-[#16A34A]"
              style={{ width: `${(incoming / peak) * 100}%` }}
            />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span className="font-medium text-[#2563EB]">Outgoing</span>
            <span className="font-bold">{outgoing} meals</span>
          </div>
          <div className="h-3 bg-[#E2E8F0]">
            <div
              className="h-full bg-[#2563EB]"
              style={{ width: `${(outgoing / peak) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InventoryAnalyticsPanel() {
  const { foodCategories, stockByQuantity, expiryTimeline, incomingVsOutgoing, dailyFlow } =
    INVENTORY_ANALYTICS;

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
        Inventory Analytics
      </p>
      <div className="grid gap-[0.5cm] sm:grid-cols-2 xl:grid-cols-3">
        <BarChart title="Food Categories" items={foodCategories} valueSuffix="%" />
        <BarChart title="Stock by Quantity" items={stockByQuantity} valueSuffix=" kg" />
        <BarChart title="Expiry Timeline" items={expiryTimeline} valueSuffix=" batches" />
        <CompareChart
          title="Incoming vs Outgoing"
          incoming={incomingVsOutgoing.incoming}
          outgoing={incomingVsOutgoing.outgoing}
        />
        <div className="sm:col-span-2 xl:col-span-1">
          <FlowChart title="Daily Inventory Flow" data={dailyFlow} />
        </div>
      </div>
    </div>
  );
}
