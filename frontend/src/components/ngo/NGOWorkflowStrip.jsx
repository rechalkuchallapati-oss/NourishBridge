import { FaArrowDown } from "react-icons/fa";

const DEFAULT_STEPS = [
  "NGO Creates Food Request",
  "Donor Creates Donation",
  "System Matches Request",
  "NGO Accepts Donation",
  "Volunteer Assigned",
  "Volunteer Picks Up",
  "NGO Receives",
  "Food Distributed",
  "Impact Updated",
];

export default function NGOWorkflowStrip({ steps = DEFAULT_STEPS, title = "Professional Workflow" }) {
  return (
    <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">{title}</p>
      <div className="mt-[0.5cm] flex flex-wrap items-center gap-2">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <span className="rounded-none border border-[#DBEAFE] bg-[#EFF6FF] px-2.5 py-1 text-xs font-semibold text-[#1D4ED8]">
              {step}
            </span>
            {index < steps.length - 1 ? (
              <FaArrowDown className="hidden rotate-[-90deg] text-[#94A3B8] sm:inline" aria-hidden="true" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
