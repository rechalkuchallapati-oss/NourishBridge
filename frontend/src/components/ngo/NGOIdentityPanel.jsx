import { Link } from "react-router-dom";
import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { getNgoDisplayName, getNgoProfile } from "../../utils/authStorage";

const DEFAULT_IDENTITY = {
  ngoId: "NGO1298",
  location: "Hyderabad, Telangana",
  verified: true,
};

function resolveLocation(profile) {
  if (profile.address?.trim()) {
    const parts = profile.address.split(",").map((part) => part.trim());
    if (parts.length >= 2) {
      return `${parts[parts.length - 2]}, ${parts[parts.length - 1]}`;
    }
    return profile.address.trim();
  }

  if (profile.serviceAreas?.length) {
    return `${profile.serviceAreas[0]}, Telangana`;
  }

  return DEFAULT_IDENTITY.location;
}

export default function NGOIdentityPanel() {
  const profile = getNgoProfile();
  const organizationName = getNgoDisplayName();
  const ngoId = profile.registrationId?.trim() || DEFAULT_IDENTITY.ngoId;
  const location = resolveLocation(profile);

  return (
    <div className="mt-auto shrink-0 border-t border-[#E5E7EB] pt-[0.5cm]">
      <div className="rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#F0FDF4] via-white to-[#F8FAFC] p-[0.5cm] shadow-sm">
        <p className="truncate text-sm font-bold leading-snug text-[#0F172A] sm:text-base">
          {organizationName}
        </p>

        {DEFAULT_IDENTITY.verified ? (
          <p className="mt-[0.3cm] flex items-center gap-1.5 text-xs font-semibold text-[#16A34A]">
            <FaCheckCircle className="shrink-0 text-sm" aria-hidden="true" />
            Verified NGO
          </p>
        ) : null}

        <p className="mt-[0.3cm] text-xs font-medium text-[#64748B]">NGO ID: {ngoId}</p>

        <p className="mt-[0.3cm] flex items-start gap-1.5 text-xs leading-5 text-[#64748B]">
          <FaMapMarkerAlt
            className="mt-0.5 shrink-0 text-[#16A34A]"
            aria-hidden="true"
          />
          <span>{location}</span>
        </p>

        <Link
          to={DASHBOARD_ROUTES.ngoProfile}
          className="mt-[0.5cm] flex w-full items-center justify-center rounded-none border border-[#16A34A]/30 bg-white px-3 py-2.5 text-xs font-semibold text-[#15803D] transition-colors duration-300 hover:border-[#16A34A] hover:bg-[#F0FDF4] sm:text-sm"
        >
          View NGO Profile
        </Link>
      </div>
    </div>
  );
}
