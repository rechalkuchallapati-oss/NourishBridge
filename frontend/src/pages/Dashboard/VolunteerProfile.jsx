import { useState, useEffect } from "react";
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
import {
  fetchProfile,
  saveProfile,
  profileToVolunteerForm,
  volunteerFormToPayload,
} from "../../modules/profile/services/profileService";
import ProfileImageUpload from "../../components/profile/ProfileImageUpload";
import { getApiErrorMessage } from "../../utils/apiErrors";

const inputClass =
  "w-full rounded-[10px] border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-3 text-sm outline-none focus:border-[#16A34A] focus:bg-white";

export default function VolunteerProfile() {
  const [profile, setProfile] = useState(getVolunteerProfile);
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingContact, setSavingContact] = useState(false);
  const [savingVehicle, setSavingVehicle] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const apiProfile = await fetchProfile();
        if (!mounted) return;
        const form = profileToVolunteerForm(apiProfile);
        setProfile(form);
        setProfileImage(apiProfile.common?.profileImage || "");
        saveVolunteerProfile(form);
      } catch (error) {
        toast.error(getApiErrorMessage(error));
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const update = (field, value) => setProfile((prev) => ({ ...prev, [field]: value }));

  const persistProfile = async (successMessage, setSaving) => {
    setSaving(true);
    try {
      const updated = await saveProfile(volunteerFormToPayload(profile));
      const form = profileToVolunteerForm(updated);
      setProfile(form);
      saveVolunteerProfile(form);
      toast.success(successMessage);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    persistProfile("Contact details saved.", setSavingContact);
  };

  const handleVehicleSubmit = (event) => {
    event.preventDefault();
    persistProfile("Vehicle & availability saved.", setSavingVehicle);
  };

  if (loading) {
    return <p className="text-sm text-[#64748B]">Loading profile…</p>;
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className={VOLUNTEER_PAGE_SECTION_GAP}>
        <ProfileImageUpload
          profileImage={profileImage}
          displayName={profile.fullName}
          accent="green"
          onUploaded={(url) => {
            setProfileImage(url);
            toast.success("Profile photo updated.");
          }}
          onError={(message) => toast.error(message)}
        />

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
