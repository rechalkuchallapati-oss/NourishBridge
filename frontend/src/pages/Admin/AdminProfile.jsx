import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import {
  fetchProfile,
  saveProfile,
  profileToAdminForm,
  adminFormToPayload,
} from "../../modules/profile/services/profileService";
import ProfileImageUpload from "../../components/profile/ProfileImageUpload";
import { getApiErrorMessage } from "../../utils/apiErrors";

const EASE = [0.22, 1, 0.36, 1];
const inputClass =
  "w-full rounded-[10px] border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-sm outline-none focus:border-[#4338CA] focus:bg-white sm:text-base";

export default function AdminProfile() {
  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await fetchProfile();
        if (mounted) {
          setProfile(profileToAdminForm(data));
          setProfileImage(data.common?.profileImage || "");
        }
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

  const update = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const updated = await saveProfile(adminFormToPayload(profile));
      setProfile(profileToAdminForm(updated));
      toast.success("Admin profile updated.");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-[16px] border border-[#E5E7EB] bg-white p-6 text-sm text-[#64748B]">
        Loading profile…
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-[16px] border border-[#E5E7EB] bg-white p-6 text-sm text-[#64748B]">
        Unable to load admin profile.
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-gradient-to-br from-[#EEF2FF]/60 via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
    >
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6">
        <AdminPageHeader
          title="Profile"
          description="Administrator account profile and credentials."
        />

        <ProfileImageUpload
          profileImage={profileImage}
          displayName={profile.fullName}
          accent="indigo"
          onUploaded={(url) => {
            setProfileImage(url);
            toast.success("Profile photo updated.");
          }}
          onError={(message) => toast.error(message)}
        />

        <div className="grid gap-[0.5cm] sm:grid-cols-2">
          <Field label="Full name">
            <input
              value={profile.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Email">
            <input value={profile.email} readOnly className={`${inputClass} opacity-70`} />
          </Field>
          <Field label="Phone">
            <input
              value={profile.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Department">
            <input
              value={profile.department}
              onChange={(e) => update("department", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Admin level">
            <input value={profile.adminLevel} readOnly className={`${inputClass} opacity-70`} />
          </Field>
          <Field label="Account status">
            <input value={profile.status} readOnly className={`${inputClass} opacity-70`} />
          </Field>
          <Field label="Permissions" className="sm:col-span-2">
            <input
              value={profile.permissions.join(", ")}
              readOnly
              className={`${inputClass} opacity-70`}
            />
          </Field>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-[10px] bg-[#4338CA] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3730A3] disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save profile"}
          </button>
        </div>
      </form>
    </motion.section>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-sm font-semibold text-[#0F172A]">{label}</span>
      {children}
    </label>
  );
}
