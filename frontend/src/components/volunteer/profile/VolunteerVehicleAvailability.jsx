import { FaBicycle, FaClock, FaToggleOn } from "react-icons/fa";
import { AVAILABILITY_OPTIONS } from "../../../constants/roles";
import { VEHICLE_OPTIONS } from "../../../data/volunteerProfileData";
import { volunteerInteractive } from "../volunteerDashboardStyles";

const inputClass =
  "w-full rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2.5 text-xs outline-none focus:border-[#16A34A] focus:bg-white";

export default function VolunteerVehicleAvailability({ profile, onUpdate, onSubmit }) {
  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold text-[#0F172A]">Vehicle & Availability</h2>
          <p className="mt-1 text-[10px] text-[#64748B]">
            Used for realistic mission assignment and pickup capacity matching.
          </p>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2">
          <FaToggleOn
            className={profile.isAvailable ? "text-[#16A34A]" : "text-[#CBD5E1]"}
            aria-hidden="true"
          />
          <span className="text-[11px] font-semibold text-[#0F172A]">
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

      <form onSubmit={onSubmit} className="mt-[0.5cm] grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0F172A]">
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

        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-[#0F172A]">Service radius (km)</span>
          <input
            type="number"
            min={1}
            max={50}
            value={profile.serviceRadiusKm}
            onChange={(event) => onUpdate("serviceRadiusKm", Number(event.target.value))}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-[#0F172A]">City</span>
          <input
            value={profile.city}
            onChange={(event) => onUpdate("city", event.target.value)}
            className={inputClass}
          />
        </label>

        <fieldset className="sm:col-span-2">
          <legend className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0F172A]">
            <FaClock className="text-[#2563EB]" aria-hidden="true" />
            Weekly availability
          </legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {AVAILABILITY_OPTIONS.map((slot) => {
              const checked = profile.availability?.includes(slot);
              return (
                <label
                  key={slot}
                  className={[
                    "flex cursor-pointer items-center gap-2 rounded-none border px-3 py-2 text-[11px] transition-colors",
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
            className={[
              "rounded-none bg-[#16A34A] px-5 py-2.5 text-xs font-semibold text-white",
              volunteerInteractive.button,
            ].join(" ")}
          >
            Save vehicle & availability
          </button>
        </div>
      </form>
    </section>
  );
}
