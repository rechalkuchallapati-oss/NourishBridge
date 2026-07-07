import { FaBicycle, FaClock, FaToggleOn } from "react-icons/fa";
import { AVAILABILITY_OPTIONS } from "../../../constants/roles";
import { VEHICLE_OPTIONS } from "../../../data/volunteerProfileData";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../VolunteerSectionShell";
import {
  volunteerInteractive,
  VOLUNTEER_BTN,
  VOLUNTEER_CONTENT_STACK,
} from "../volunteerDashboardStyles";

const inputClass =
  "w-full rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-3 text-sm outline-none focus:border-[#16A34A] focus:bg-white";

export default function VolunteerVehicleAvailability({ profile, onUpdate, onSubmit }) {
  return (
    <VolunteerSectionShell className="h-full">
      <div className="flex flex-wrap items-start justify-between gap-[0.5cm]">
        <VolunteerSectionTitle
          title="Vehicle & Availability"
          subtitle="Used for realistic mission assignment and pickup capacity matching."
          theme="blue"
          icon={FaBicycle}
          compact
        />
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-[0.5cm] py-[0.4cm]">
          <FaToggleOn
            className={profile.isAvailable ? "text-[#16A34A]" : "text-[#CBD5E1]"}
            aria-hidden="true"
          />
          <span className="text-sm font-semibold text-[#0F172A]">
            {profile.isAvailable ? "Available for missions" : "Unavailable"}
          </span>
          <input
            type="checkbox"
            checked={profile.isAvailable ?? true}
            onChange={(event) => onUpdate("isAvailable", event.target.checked)}
            className="sr-only"
          />
        </label>
      </div>

      <form onSubmit={onSubmit} className={`grid ${VOLUNTEER_CONTENT_STACK} sm:grid-cols-2`}>
        <label className={`flex flex-col ${VOLUNTEER_CONTENT_STACK} sm:col-span-2`}>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-[#0F172A]">
            <FaBicycle className="text-[#16A34A]" aria-hidden="true" />
            Vehicle
          </span>
          <select
            value={profile.vehicle}
            onChange={(event) => onUpdate("vehicle", event.target.value)}
            className={inputClass}
          >
            {VEHICLE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className={`flex flex-col ${VOLUNTEER_CONTENT_STACK}`}>
          <span className="text-sm font-semibold text-[#0F172A]">Service radius (km)</span>
          <input
            type="number"
            min={1}
            max={50}
            value={profile.serviceRadiusKm}
            onChange={(event) => onUpdate("serviceRadiusKm", Number(event.target.value))}
            className={inputClass}
          />
        </label>

        <label className={`flex flex-col ${VOLUNTEER_CONTENT_STACK}`}>
          <span className="text-sm font-semibold text-[#0F172A]">City</span>
          <input
            value={profile.city}
            onChange={(event) => onUpdate("city", event.target.value)}
            className={inputClass}
          />
        </label>

        <fieldset className={`sm:col-span-2 ${VOLUNTEER_CONTENT_STACK}`}>
          <legend className="flex items-center gap-1.5 text-sm font-semibold text-[#0F172A]">
            <FaClock className="text-[#16A34A]" aria-hidden="true" />
            Weekly availability
          </legend>
          <div className={`grid ${VOLUNTEER_CONTENT_STACK} sm:grid-cols-2 lg:grid-cols-3`}>
            {AVAILABILITY_OPTIONS.map((slot) => {
              const checked = profile.availability?.includes(slot);
              return (
                <label
                  key={slot}
                  className={[
                    "flex cursor-pointer items-center gap-2 rounded-none border px-[0.5cm] py-[0.4cm] text-sm transition-colors",
                    checked
                      ? "border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]"
                      : "border-[#E5E7EB] bg-white text-[#64748B]",
                  ].join(" ")}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      const next = checked
                        ? profile.availability.filter((s) => s !== slot)
                        : [...(profile.availability ?? []), slot];
                      onUpdate("availability", next);
                    }}
                    className="accent-[#16A34A]"
                  />
                  {slot}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className={[VOLUNTEER_BTN, "bg-[#16A34A] text-white", volunteerInteractive.button].join(" ")}
          >
            Save vehicle & availability
          </button>
        </div>
      </form>
    </VolunteerSectionShell>
  );
}
