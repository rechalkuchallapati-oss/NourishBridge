import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FaClipboardCheck } from "react-icons/fa";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOLayout from "../../components/dashboard/NGOLayout";
import {
  PACKAGING_OPTIONS,
  PENDING_RECEIVING,
  RECENT_RECEIVING_LOG,
  RECEIVING_STATES,
  SPOILAGE_OPTIONS,
  TEMPERATURE_OPTIONS,
} from "../../data/ngoReceiving";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

const STATE_LABELS = {
  [RECEIVING_STATES.ARRIVED]: "Arrived",
  [RECEIVING_STATES.INSPECTION_PENDING]: "Inspection Pending",
  [RECEIVING_STATES.ACCEPTED]: "Accepted for Distribution",
  [RECEIVING_STATES.REJECTED]: "Rejected with Reason",
};

function ReceivingInspectionForm({ item, onSubmit }) {
  const [form, setForm] = useState({
    packaging: "",
    temperature: item.requiresTemperatureCheck ? "" : "N/A",
    spoilage: "",
    quantityReceived: "",
    categoryConfirmed: item.foodCategory,
    notes: "",
    result: "",
  });

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.packaging || !form.spoilage || !form.quantityReceived || !form.result) {
      toast.error("Complete all required inspection fields.");
      return;
    }
    onSubmit(item.id, form);
    toast.success(
      form.result === "accept"
        ? "Food accepted for distribution."
        : "Food rejected — reason recorded.",
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-[0.5cm] flex flex-col gap-[0.5cm] border-t border-[#E5E7EB] pt-[0.5cm]"
    >
      <div className="grid gap-[0.5cm] sm:grid-cols-2">
        <Field label="Packaging condition *">
          <select
            value={form.packaging}
            onChange={(e) => update("packaging", e.target.value)}
            className="w-full rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-sm outline-none focus:border-[#2563EB]"
          >
            <option value="">Select...</option>
            {PACKAGING_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>

        {item.requiresTemperatureCheck ? (
          <Field label="Temperature check *">
            <select
              value={form.temperature}
              onChange={(e) => update("temperature", e.target.value)}
              className="w-full rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-sm outline-none focus:border-[#2563EB]"
            >
              <option value="">Select...</option>
              {TEMPERATURE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </Field>
        ) : null}

        <Field label="Visible spoilage *">
          <select
            value={form.spoilage}
            onChange={(e) => update("spoilage", e.target.value)}
            className="w-full rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-sm outline-none focus:border-[#2563EB]"
          >
            <option value="">Select...</option>
            {SPOILAGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Quantity received *">
          <input
            type="text"
            value={form.quantityReceived}
            onChange={(e) => update("quantityReceived", e.target.value)}
            placeholder={`Listed: ${item.listedQuantity}`}
            className="w-full rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-sm outline-none focus:border-[#2563EB]"
          />
        </Field>

        <Field label="Food category confirmation">
          <input
            type="text"
            value={form.categoryConfirmed}
            onChange={(e) => update("categoryConfirmed", e.target.value)}
            className="w-full rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-sm outline-none focus:border-[#2563EB]"
          />
        </Field>

        <Field label="Time received">
          <input
            type="text"
            value={item.arrivedAt}
            readOnly
            className="w-full rounded-none border border-[#E5E7EB] bg-[#F1F5F9] px-3 py-2 text-sm text-[#64748B]"
          />
        </Field>
      </div>

      <Field label="Inspection notes">
        <textarea
          rows={2}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          className="w-full resize-none rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-sm outline-none focus:border-[#2563EB]"
        />
      </Field>

      <Field label="Optional evidence photo">
        <input
          type="file"
          accept="image/*"
          className="w-full text-sm text-[#64748B] file:mr-3 file:rounded-none file:border-0 file:bg-[#2563EB] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
        />
      </Field>

      <fieldset className="flex flex-wrap gap-[0.5cm]">
        <legend className="mb-[0.3cm] w-full text-sm font-semibold text-[#0F172A]">
          Inspection result *
        </legend>
        <label className="flex cursor-pointer items-center gap-2 rounded-none border border-[#DCFCE7] bg-[#F0FDF4] px-4 py-2">
          <input
            type="radio"
            name={`result-${item.id}`}
            value="accept"
            checked={form.result === "accept"}
            onChange={() => update("result", "accept")}
            className="accent-[#16A34A]"
          />
          <span className="text-sm font-semibold text-[#15803D]">Accept for distribution</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2 rounded-none border border-red-100 bg-red-50 px-4 py-2">
          <input
            type="radio"
            name={`result-${item.id}`}
            value="reject"
            checked={form.result === "reject"}
            onChange={() => update("result", "reject")}
            className="accent-red-600"
          />
          <span className="text-sm font-semibold text-red-600">Reject with reason</span>
        </label>
      </fieldset>

      <button
        type="submit"
        className="self-start rounded-none bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8]"
      >
        Submit inspection
      </button>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-[0.3cm]">
      <label className="text-sm font-semibold text-[#0F172A]">{label}</label>
      {children}
    </div>
  );
}

export default function NGOReceiveFood() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);
  const [pending, setPending] = useState(PENDING_RECEIVING);
  const [completed, setCompleted] = useState([]);

  const handleInspection = (id, form) => {
    const item = pending.find((entry) => entry.id === id);
    setPending((prev) => prev.filter((entry) => entry.id !== id));
    setCompleted((prev) => [
      {
        ...item,
        inspection: form,
        finalStatus:
          form.result === "accept"
            ? RECEIVING_STATES.ACCEPTED
            : RECEIVING_STATES.REJECTED,
      },
      ...prev,
    ]);
  };

  return (
    <NGOLayout organizationName={orgName} unreadNotifications={5}>
      <Toaster position="top-center" />
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
      >
        <div className="flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6">
          <NGOPageHeader
            icon={FaClipboardCheck}
            title="Receive Food"
            description="Verify food on arrival before it enters inventory. Record packaging, temperature, quantity, and acceptance or rejection."
          />

          <div className="rounded-none border border-[#DBEAFE] bg-[#EFF6FF] p-[0.5cm] text-sm text-[#1D4ED8]">
            <strong>State model:</strong> ARRIVED → INSPECTION_PENDING → ACCEPTED_FOR_DISTRIBUTION
            · or INSPECTION_FAILED → REJECTED_WITH_REASON
          </div>

          <h2 className="text-lg font-bold text-[#0F172A]">Pending inspection</h2>
          {pending.length === 0 ? (
            <p className="text-sm text-[#64748B]">No food awaiting inspection.</p>
          ) : (
            pending.map((item) => (
              <article
                key={item.id}
                className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase text-[#94A3B8]">
                      {item.id} · {item.donationId}
                    </p>
                    <h3 className="text-lg font-bold text-[#0F172A]">{item.foodName}</h3>
                    <p className="text-sm text-[#64748B]">
                      {item.donorName} · {item.listedQuantity} · Volunteer: {item.volunteer}
                    </p>
                  </div>
                  <span className="rounded-none bg-[#FFEDD5] px-3 py-1 text-xs font-semibold text-[#C2410C]">
                    {STATE_LABELS[item.status]}
                  </span>
                </div>
                <ReceivingInspectionForm item={item} onSubmit={handleInspection} />
              </article>
            ))
          )}

          {completed.length > 0 ? (
            <div className="mt-[0.5cm]">
              <h2 className="mb-[0.5cm] text-lg font-bold text-[#0F172A]">Completed this session</h2>
              <ul className="flex flex-col gap-[0.5cm]">
                {completed.map((item) => (
                  <li
                    key={item.id}
                    className={`rounded-none border px-[0.5cm] py-[0.5cm] text-sm ${
                      item.finalStatus === RECEIVING_STATES.ACCEPTED
                        ? "border-[#DCFCE7] bg-[#F0FDF4] text-[#15803D]"
                        : "border-red-100 bg-red-50 text-red-700"
                    }`}
                  >
                    {item.foodName} —{" "}
                    {item.finalStatus === RECEIVING_STATES.ACCEPTED ? "Accepted" : "Rejected"} (
                    {item.inspection.quantityReceived} received)
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <h2 className="mt-[0.5cm] text-lg font-bold text-[#0F172A]">Recent receiving log</h2>
          <div className="overflow-x-auto rounded-none border border-[#E5E7EB] bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                <tr>
                  <th className="px-4 py-3">Donation</th>
                  <th className="px-4 py-3">Food</th>
                  <th className="px-4 py-3">Listed / Received</th>
                  <th className="px-4 py-3">Result</th>
                  <th className="px-4 py-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_RECEIVING_LOG.map((log) => (
                  <tr key={log.id} className="border-b border-[#E5E7EB] last:border-0">
                    <td className="px-4 py-3 font-medium">{log.donationId}</td>
                    <td className="px-4 py-3">{log.foodName}</td>
                    <td className="px-4 py-3">
                      {log.quantityListed} / {log.quantityReceived}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          log.result === "accepted_for_distribution"
                            ? "text-[#15803D]"
                            : "text-red-600"
                        }
                      >
                        {log.result === "accepted_for_distribution" ? "Accepted" : "Rejected"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#64748B]">{log.receivedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>
    </NGOLayout>
  );
}
