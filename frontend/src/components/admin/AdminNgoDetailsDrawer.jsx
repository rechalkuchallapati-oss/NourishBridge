import NGODetailsDrawer from "../ngo/NGODetailsDrawer";
import {
  NGO_STATUS_COLORS,
  NGO_STATUS_LABELS,
  NGO_VERIFICATION_COLORS,
  NGO_VERIFICATION_LABELS,
} from "../../data/adminNgos";
import ngoLogo from "../../assets/dashboard/ngo-food/ngo-logo-helping-hands.png";

function Badge({ status, labels, colors }) {
  return (
    <span
      className={`inline-flex rounded-none border px-2.5 py-1 text-xs font-semibold ${colors[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">{label}</p>
      <p className="mt-1 text-sm font-medium text-[#0F172A]">{value}</p>
    </div>
  );
}

export default function AdminNgoDetailsDrawer({ ngo, onClose, onVerify, onReject, onSuspend }) {
  return (
    <NGODetailsDrawer
      open={Boolean(ngo)}
      title={ngo?.name ?? "NGO Details"}
      onClose={onClose}
      footer={
        ngo ? (
          <div className="flex flex-wrap gap-2">
            {ngo.verification === "pending" ? (
              <>
                <button
                  type="button"
                  onClick={() => onVerify(ngo)}
                  className="flex-1 rounded-none bg-[#16A34A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#15803D]"
                >
                  Verify NGO
                </button>
                <button
                  type="button"
                  onClick={() => onReject(ngo)}
                  className="flex-1 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Reject
                </button>
              </>
            ) : null}
            {ngo.status === "active" ? (
              <button
                type="button"
                onClick={() => onSuspend(ngo)}
                className="w-full rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#64748B] hover:bg-[#F8FAFC]"
              >
                Suspend NGO
              </button>
            ) : null}
          </div>
        ) : null
      }
    >
      {ngo ? (
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <img
              src={ngoLogo}
              alt=""
              className="h-16 w-16 rounded-none border border-[#E5E7EB] object-cover"
            />
            <div>
              <p className="font-bold text-[#0F172A]">{ngo.name}</p>
              <p className="mt-1 text-sm text-[#4338CA]">{ngo.id}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge
                  status={ngo.verification}
                  labels={NGO_VERIFICATION_LABELS}
                  colors={NGO_VERIFICATION_COLORS}
                />
                <Badge status={ngo.status} labels={NGO_STATUS_LABELS} colors={NGO_STATUS_COLORS} />
              </div>
            </div>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            <DetailItem label="Contact Person" value={ngo.contactPerson} />
            <DetailItem label="Email" value={ngo.email} />
            <DetailItem label="Phone" value={ngo.phone} />
            <DetailItem label="City" value={ngo.city} />
            <DetailItem label="Registration" value={ngo.registrationNumber} />
            <DetailItem label="Joined Date" value={ngo.joinedDate} />
            <DetailItem label="Storage Capacity" value={ngo.capacity} />
            <DetailItem label="Utilization" value={ngo.utilization} />
            <DetailItem label="Meals Served" value={ngo.mealsServed} />
            <DetailItem label="Rating" value={ngo.rating ? `${ngo.rating} ★` : "—"} />
          </dl>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">Address</p>
            <p className="mt-1 text-sm text-[#0F172A]">{ngo.address}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              Mission Statement
            </p>
            <p className="mt-1 text-sm leading-6 text-[#64748B]">{ngo.mission}</p>
          </div>

          {ngo.serviceAreas.length > 0 ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                Service Areas
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {ngo.serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-none border border-[#DBEAFE] bg-[#EFF6FF] px-2.5 py-1 text-xs font-semibold text-[#2563EB]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </NGODetailsDrawer>
  );
}
