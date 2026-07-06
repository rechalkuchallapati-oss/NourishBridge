import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FaUsers } from "react-icons/fa";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOLayout from "../../components/dashboard/NGOLayout";
import { BENEFICIARY_GROUPS, DISTRIBUTION_RECORDS } from "../../data/ngoDistribution";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

export default function NGODistributionRecords() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);
  const [records] = useState(DISTRIBUTION_RECORDS);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Distribution record saved (demo).");
    setShowForm(false);
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
            icon={FaUsers}
            title="Distribution Records"
            description="Record what happened after food left inventory — the final link from donation to community impact."
            actions={
              <button
                type="button"
                onClick={() => setShowForm((prev) => !prev)}
                className="rounded-none bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1D4ED8]"
              >
                {showForm ? "Cancel" : "New record"}
              </button>
            }
          />

          {showForm ? (
            <form
              onSubmit={handleSubmit}
              className="grid gap-[0.5cm] rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] sm:grid-cols-2"
            >
              <FormField label="Distribution location" required>
                <input type="text" required className={inputClass} placeholder="Shelter / kitchen name" />
              </FormField>
              <FormField label="Date & time" required>
                <input type="datetime-local" required className={inputClass} />
              </FormField>
              <FormField label="Food type" required>
                <input type="text" required className={inputClass} />
              </FormField>
              <FormField label="Quantity distributed" required>
                <input type="text" required className={inputClass} placeholder="e.g. 20 kg" />
              </FormField>
              <FormField label="Meals served" required>
                <input type="number" required className={inputClass} min={1} />
              </FormField>
              <FormField label="Number of beneficiaries" required>
                <input type="number" required className={inputClass} min={1} />
              </FormField>
              <FormField label="Beneficiary group" required>
                <select required className={inputClass}>
                  <option value="">Select...</option>
                  {BENEFICIARY_GROUPS.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label="Remaining quantity">
                <input type="text" className={inputClass} placeholder="0 if fully distributed" />
              </FormField>
              <FormField label="Proof photo (optional)" className="sm:col-span-2">
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-sm file:mr-3 file:rounded-none file:border-0 file:bg-[#2563EB] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                />
              </FormField>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="rounded-none bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8]"
                >
                  Save distribution record
                </button>
              </div>
            </form>
          ) : null}

          <div className="flex flex-col gap-[0.5cm]">
            {records.map((record, index) => (
              <motion.article
                key={record.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 * index, ease: EASE }}
                className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase text-[#94A3B8]">{record.id}</p>
                    <h3 className="text-lg font-bold text-[#0F172A]">{record.location}</h3>
                    <p className="text-sm text-[#64748B]">{record.dateTime}</p>
                  </div>
                  <span className="rounded-none bg-[#DBEAFE] px-3 py-1 text-xs font-semibold text-[#1D4ED8]">
                    {record.beneficiaryGroup}
                  </span>
                </div>
                <div className="mt-[0.5cm] grid gap-[0.5cm] sm:grid-cols-2 lg:grid-cols-4">
                  <Stat label="Food" value={record.foodType} />
                  <Stat label="Distributed" value={record.quantityDistributed} />
                  <Stat label="Meals served" value={record.mealsServed} />
                  <Stat label="Beneficiaries" value={record.beneficiaries} />
                  <Stat label="Remaining" value={record.remainingQuantity} />
                  <Stat label="Volunteer" value={record.volunteer} />
                  <Stat
                    label="Proof photo"
                    value={record.hasProofPhoto ? "Attached" : "None"}
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>
    </NGOLayout>
  );
}

const inputClass =
  "w-full rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-sm outline-none focus:border-[#2563EB] focus:bg-white";

function FormField({ label, required, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-[0.3cm] ${className}`}>
      <label className="text-sm font-semibold text-[#0F172A]">
        {label}
        {required ? " *" : ""}
      </label>
      {children}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-[#94A3B8]">{label}</p>
      <p className="mt-[0.3cm] text-sm font-semibold text-[#0F172A]">{value}</p>
    </div>
  );
}
