import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaAddressCard } from "react-icons/fa";
import VolunteerAchievementBadges from "../../components/volunteer/profile/VolunteerAchievementBadges";
import VolunteerImpactOverview from "../../components/volunteer/profile/VolunteerImpactOverview";
import VolunteerPerformanceMetrics from "../../components/volunteer/profile/VolunteerPerformanceMetrics";
import VolunteerProfileHeader from "../../components/volunteer/profile/VolunteerProfileHeader";
import VolunteerReviewsFeedback from "../../components/volunteer/profile/VolunteerReviewsFeedback";
import VolunteerServiceAreaMap from "../../components/volunteer/profile/VolunteerServiceAreaMap";
import VolunteerVehicleAvailability from "../../components/volunteer/profile/VolunteerVehicleAvailability";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../../components/volunteer/VolunteerSectionShell";
import {
  volunteerInteractive,
  VOLUNTEER_BTN,
  VOLUNTEER_CONTENT_STACK,
  VOLUNTEER_INSET_LINE_GAP,
  VOLUNTEER_PAGE_SECTION_GAP,
} from "../../components/volunteer/volunteerDashboardStyles";
import { getVolunteerProfile, saveVolunteerProfile } from "../../utils/authStorage";

const inputClass =
  "w-full rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-3 text-sm outline-none focus:border-[#16A34A] focus:bg-white";

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
      <div className={VOLUNTEER_PAGE_SECTION_GAP}>
        <VolunteerProfileHeader />

        <VolunteerImpactOverview />

        <VolunteerPerformanceMetrics />

        <VolunteerAchievementBadges />

        <div className={`grid ${VOLUNTEER_CONTENT_STACK} lg:grid-cols-2`}>
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

        <VolunteerSectionShell>
          <VolunteerSectionTitle
            title="Contact Details"
            subtitle="Used by dispatch and NGOs for mission coordination."
            theme="green"
            icon={FaAddressCard}
            compact
          />
          <form onSubmit={handleContactSubmit} className={`grid max-w-xl ${VOLUNTEER_CONTENT_STACK} sm:grid-cols-2`}>
            <label className={`flex flex-col ${VOLUNTEER_CONTENT_STACK} sm:col-span-2`}>
              <span className="text-sm font-semibold text-[#0F172A]">Full name</span>
              <input
                value={profile.fullName}
                onChange={(event) => update("fullName", event.target.value)}
                className={inputClass}
              />
            </label>
            <label className={`flex flex-col ${VOLUNTEER_CONTENT_STACK}`}>
              <span className="text-sm font-semibold text-[#0F172A]">Phone</span>
              <input
                value={profile.phone}
                onChange={(event) => update("phone", event.target.value)}
                className={inputClass}
              />
            </label>
            <label className={`flex flex-col ${VOLUNTEER_CONTENT_STACK}`}>
              <span className="text-sm font-semibold text-[#0F172A]">Email</span>
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
                className={[VOLUNTEER_BTN, "bg-[#16A34A] text-white", volunteerInteractive.button].join(" ")}
              >
                Save contact details
              </button>
            </div>
          </form>
        </VolunteerSectionShell>

        <VolunteerReviewsFeedback />
      </div>
    </>
  );
}
