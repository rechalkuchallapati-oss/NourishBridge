import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import VolunteerAchievementBadges from "../../components/volunteer/profile/VolunteerAchievementBadges";
import VolunteerImpactOverview from "../../components/volunteer/profile/VolunteerImpactOverview";
import VolunteerPerformanceMetrics from "../../components/volunteer/profile/VolunteerPerformanceMetrics";
import VolunteerProfileHeader from "../../components/volunteer/profile/VolunteerProfileHeader";
import VolunteerProfileMissionHistory from "../../components/volunteer/profile/VolunteerProfileMissionHistory";
import VolunteerReviewsFeedback from "../../components/volunteer/profile/VolunteerReviewsFeedback";
import VolunteerServiceAreaMap from "../../components/volunteer/profile/VolunteerServiceAreaMap";
import VolunteerVehicleAvailability from "../../components/volunteer/profile/VolunteerVehicleAvailability";
import { VOLUNTEER_STACK_GAP } from "../../components/volunteer/volunteerDashboardStyles";
import { getVolunteerProfile, saveVolunteerProfile } from "../../utils/authStorage";

const inputClass =
  "w-full rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2.5 text-xs outline-none focus:border-[#16A34A] focus:bg-white";

export default function VolunteerProfile() {
  const [profile, setProfile] = useState(getVolunteerProfile);

  const update = (field, value) => setProfile((prev) => ({ ...prev, [field]: value }));

  const handleContactSubmit = (event) => {
    event.preventDefault();
    saveVolunteerProfile(profile);
    toast.success("Contact details saved.");
  };

  const handleVehicleSubmit = (event) => {
    event.preventDefault();
    saveVolunteerProfile(profile);
    toast.success("Vehicle & availability saved.");
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className={VOLUNTEER_STACK_GAP}>
        <VolunteerProfileHeader />

        <VolunteerImpactOverview />

        <VolunteerPerformanceMetrics />

        <VolunteerAchievementBadges />

        <div className="grid gap-[0.5cm] lg:grid-cols-2">
          <VolunteerServiceAreaMap
            serviceRadiusKm={profile.serviceRadiusKm}
            city={profile.city}
          />
          <VolunteerVehicleAvailability
            profile={profile}
            onUpdate={update}
            onSubmit={handleVehicleSubmit}
          />
        </div>

        <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
          <h2 className="text-sm font-bold text-[#0F172A]">Contact Details</h2>
          <p className="mt-1 text-[10px] text-[#64748B]">
            Used by dispatch and NGOs for mission coordination.
          </p>
          <form onSubmit={handleContactSubmit} className="mt-[0.5cm] grid max-w-xl gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="text-[11px] font-semibold text-[#0F172A]">Full name</span>
              <input
                value={profile.fullName}
                onChange={(event) => update("fullName", event.target.value)}
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-[#0F172A]">Phone</span>
              <input
                value={profile.phone}
                onChange={(event) => update("phone", event.target.value)}
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-[#0F172A]">Email</span>
              <input
                type="email"
                value={profile.email ?? ""}
                onChange={(event) => update("email", event.target.value)}
                className={inputClass}
              />
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="rounded-none bg-[#16A34A] px-5 py-2.5 text-xs font-semibold text-white"
              >
                Save contact details
              </button>
            </div>
          </form>
        </section>

        <VolunteerProfileMissionHistory />

        <VolunteerReviewsFeedback />
      </div>
    </>
  );
}
