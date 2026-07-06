import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOLayout from "../../components/dashboard/NGOLayout";
import {
  AVAILABILITY_OPTIONS,
  DEFAULT_NGO_PROFILE,
  FOOD_TYPE_OPTIONS,
} from "../../data/ngoProfile";
import {
  getNgoDisplayName,
  getNgoProfile,
  getSessionUser,
  saveNgoProfile,
} from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];
const inputClass =
  "w-full rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-sm outline-none focus:border-[#2563EB] focus:bg-white sm:text-base";

export default function NGOProfileCapacity() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);
  const [profile, setProfile] = useState(() => ({ ...DEFAULT_NGO_PROFILE, ...getNgoProfile() }));

  const update = (field, value) => setProfile((prev) => ({ ...prev, [field]: value }));

  const toggleFoodType = (type) => {
    setProfile((prev) => ({
      ...prev,
      foodTypesAccepted: prev.foodTypesAccepted.includes(type)
        ? prev.foodTypesAccepted.filter((item) => item !== type)
        : [...prev.foodTypesAccepted, type],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveNgoProfile(profile);
    toast.success("Profile & capacity settings saved.");
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6"
        >
          <NGOPageHeader
            icon={FaUser}
            title="Profile & Capacity"
            description="Operational information used for donation matching — service areas, capacity, storage, and availability."
          />

          <div className="rounded-none border border-[#DBEAFE] bg-[#EFF6FF] p-[0.5cm] text-sm text-[#1D4ED8]">
            Future matching score:{" "}
            <code className="text-xs">
              distanceScore + capacityScore + urgencyScore + foodCompatibilityScore +
              availabilityScore
            </code>
          </div>

          <div className="grid gap-[0.5cm] sm:grid-cols-2">
            <Field label="Organization name">
              <input
                type="text"
                value={profile.organizationName}
                onChange={(e) => update("organizationName", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Registration ID">
              <input
                type="text"
                value={profile.registrationId}
                onChange={(e) => update("registrationId", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={profile.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Phone">
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Address" className="sm:col-span-2">
              <textarea
                rows={2}
                value={profile.address}
                onChange={(e) => update("address", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Service areas (comma-separated)" className="sm:col-span-2">
              <input
                type="text"
                value={profile.serviceAreas.join(", ")}
                onChange={(e) =>
                  update(
                    "serviceAreas",
                    e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  )
                }
                className={inputClass}
              />
            </Field>
            <Field label="Max daily capacity (kg)">
              <input
                type="number"
                value={profile.maxDailyCapacityKg}
                onChange={(e) => update("maxDailyCapacityKg", Number(e.target.value))}
                className={inputClass}
                min={0}
              />
            </Field>
            <Field label="Max daily meals">
              <input
                type="number"
                value={profile.maxDailyMeals}
                onChange={(e) => update("maxDailyMeals", Number(e.target.value))}
                className={inputClass}
                min={0}
              />
            </Field>
            <Field label="Preferred pickup radius (km)">
              <input
                type="number"
                value={profile.preferredPickupRadiusKm}
                onChange={(e) => update("preferredPickupRadiusKm", Number(e.target.value))}
                className={inputClass}
                min={1}
              />
            </Field>
            <Field label="Operating hours">
              <input
                type="text"
                value={profile.operatingHours}
                onChange={(e) => update("operatingHours", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Emergency contact name">
              <input
                type="text"
                value={profile.emergencyContactName}
                onChange={(e) => update("emergencyContactName", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Emergency contact phone">
              <input
                type="tel"
                value={profile.emergencyContact}
                onChange={(e) => update("emergencyContact", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Refrigerator available">
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={profile.hasRefrigerator}
                  onChange={(e) => update("hasRefrigerator", e.target.checked)}
                  className="h-4 w-4 accent-[#2563EB]"
                />
                Yes — cold storage available
              </label>
            </Field>
            {profile.hasRefrigerator ? (
              <Field label="Refrigerator capacity (kg)">
                <input
                  type="number"
                  value={profile.refrigeratorCapacityKg}
                  onChange={(e) => update("refrigeratorCapacityKg", Number(e.target.value))}
                  className={inputClass}
                  min={0}
                />
              </Field>
            ) : null}
            <Field label="Availability status" className="sm:col-span-2">
              <select
                value={profile.availabilityStatus}
                onChange={(e) => update("availabilityStatus", e.target.value)}
                className={inputClass}
              >
                {AVAILABILITY_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Storage facilities" className="sm:col-span-2">
              <textarea
                rows={2}
                value={profile.storageFacilities.join("\n")}
                onChange={(e) =>
                  update(
                    "storageFacilities",
                    e.target.value.split("\n").filter(Boolean),
                  )
                }
                className={inputClass}
              />
            </Field>
          </div>

          <fieldset className="flex flex-col gap-[0.3cm]">
            <legend className="text-sm font-semibold text-[#0F172A]">Food types accepted</legend>
            <div className="flex flex-wrap gap-2">
              {FOOD_TYPE_OPTIONS.map((type) => (
                <label
                  key={type}
                  className={[
                    "cursor-pointer rounded-none border px-3 py-2 text-sm font-medium transition-colors",
                    profile.foodTypesAccepted.includes(type)
                      ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]"
                      : "border-[#E5E7EB] bg-white text-[#64748B]",
                  ].join(" ")}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={profile.foodTypesAccepted.includes(type)}
                    onChange={() => toggleFoodType(type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            className="self-start rounded-none bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8]"
          >
            Save profile & capacity
          </button>
        </form>
      </motion.section>
    </NGOLayout>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-[0.3cm] ${className}`}>
      <label className="text-sm font-semibold text-[#0F172A]">{label}</label>
      {children}
    </div>
  );
}
