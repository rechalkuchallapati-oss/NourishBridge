import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCamera, FaChevronDown, FaUser } from "react-icons/fa";
import { getVolunteerAvatar } from "../../data/volunteerAssets";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import {
  getVolunteerDisplayName,
  getVolunteerProfile,
  saveVolunteerProfile,
} from "../../utils/authStorage";
import { volunteerInteractive, VOLUNTEER_BTN } from "../volunteer/volunteerDashboardStyles";

const MAX_AVATAR_BYTES = 5 * 1024 * 1024;

export default function VolunteerAccountMenu() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(() => getVolunteerProfile());
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);
  const volunteerName = getVolunteerDisplayName();
  const avatarSrc = getVolunteerAvatar(profile);

  const refreshProfile = useCallback(() => {
    setProfile(getVolunteerProfile());
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, closeMenu]);

  useEffect(() => {
    window.addEventListener("nb-volunteer-profile-updated", refreshProfile);
    return () => window.removeEventListener("nb-volunteer-profile-updated", refreshProfile);
  }, [refreshProfile]);

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file from your gallery.");
      return;
    }

    if (file.size > MAX_AVATAR_BYTES) {
      toast.error("Photo must be smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : null;
      if (!dataUrl) {
        toast.error("Could not read the selected photo.");
        return;
      }

      const updated = {
        ...getVolunteerProfile(),
        customAvatarDataUrl: dataUrl,
      };
      saveVolunteerProfile(updated);
      setProfile(updated);
      toast.success("Profile photo updated.");
      closeMenu();
    };
    reader.onerror = () => toast.error("Could not read the selected photo.");
    reader.readAsDataURL(file);
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex max-w-[220px] items-center gap-2 rounded-none border border-[#E5E7EB] py-1 pl-1 pr-2 transition-colors hover:border-[#BBF7D0] hover:bg-[#F8FFF8]"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <img
          src={avatarSrc}
          alt={volunteerName}
          className="h-9 w-9 rounded-full border-2 border-[#BBF7D0] object-cover object-center"
        />
        <span className="hidden min-w-0 flex-col items-start text-left sm:flex">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#16A34A]">
            Volunteer Account
          </span>
          <span className="truncate text-xs font-semibold text-[#0F172A]">{volunteerName}</span>
        </span>
        <FaChevronDown
          className={[
            "shrink-0 text-[10px] text-[#94A3B8] transition-transform",
            open ? "rotate-180" : "",
          ].join(" ")}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-64 rounded-none border border-[#E5E7EB] bg-white p-3 shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
            Profile photo
          </p>

          <div className="mt-3 flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={avatarSrc}
                alt={volunteerName}
                className="h-20 w-20 rounded-full border-2 border-[#BBF7D0] object-cover"
              />
              <span className="absolute -bottom-1 -right-1 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#16A34A] text-white">
                <FaCamera className="text-[10px]" aria-hidden="true" />
              </span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handlePhotoUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={[
                VOLUNTEER_BTN,
                "w-full border-2 border-[#16A34A] bg-[#F0FDF4] text-[#15803D]",
                volunteerInteractive.buttonOutline,
              ].join(" ")}
            >
              <FaCamera aria-hidden="true" />
              Upload from gallery
            </button>
            <p className="text-center text-[10px] leading-4 text-[#94A3B8]">
              JPG, PNG, or WebP · max 5 MB
            </p>
          </div>

          <Link
            to={DASHBOARD_ROUTES.volunteerProfile}
            onClick={closeMenu}
            className={[
              VOLUNTEER_BTN,
              "mt-3 w-full border border-[#E5E7EB] bg-white text-[#64748B]",
              volunteerInteractive.buttonOutline,
            ].join(" ")}
          >
            <FaUser aria-hidden="true" />
            View Profile
          </Link>
        </div>
      ) : null}
    </div>
  );
}
