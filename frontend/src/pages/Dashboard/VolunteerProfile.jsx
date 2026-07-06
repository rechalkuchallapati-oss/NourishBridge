import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AVAILABILITY_OPTIONS } from "../../constants/roles";
import { getVolunteerProfile, saveVolunteerProfile } from "../../utils/authStorage";

export default function VolunteerProfile() {
  const [profile, setProfile] = useState(getVolunteerProfile);
  const inputClass = "rounded-none border border-[#E5E7EB] px-3 py-2 text-xs w-full";

  const update = (field, value) => setProfile((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    saveVolunteerProfile(profile);
    toast.success("Profile saved.");
  };

  return (
    <>
      <Toaster position="top-center" />
      <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm">
        <h1 className="text-lg font-bold text-[#0F172A]">Profile</h1>
        <p className="mt-1 text-xs text-[#64748B]">Availability, service radius, vehicle and contact.</p>

        <form onSubmit={handleSubmit} className="mt-4 grid max-w-lg gap-3 text-xs">
          <label className="flex flex-col gap-1">
            <span className="font-semibold">Full name</span>
            <input value={profile.fullName} onChange={(e) => update("fullName", e.target.value)} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold">Phone</span>
            <input value={profile.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold">City</span>
            <input value={profile.city} onChange={(e) => update("city", e.target.value)} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold">Service radius (km)</span>
            <input type="number" value={profile.serviceRadiusKm} onChange={(e) => update("serviceRadiusKm", Number(e.target.value))} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold">Vehicle</span>
            <input value={profile.vehicle} onChange={(e) => update("vehicle", e.target.value)} className={inputClass} />
          </label>
          <fieldset>
            <legend className="font-semibold">Availability</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {AVAILABILITY_OPTIONS.map((slot) => (
                <label key={slot} className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={profile.availability?.includes(slot)}
                    onChange={() => {
                      const next = profile.availability?.includes(slot)
                        ? profile.availability.filter((s) => s !== slot)
                        : [...(profile.availability ?? []), slot];
                      update("availability", next);
                    }}
                  />
                  {slot}
                </label>
              ))}
            </div>
          </fieldset>
          <button type="submit" className="w-fit rounded-none bg-[#16A34A] px-4 py-2 font-semibold text-white">
            Save profile
          </button>
        </form>
      </section>
    </>
  );
}
