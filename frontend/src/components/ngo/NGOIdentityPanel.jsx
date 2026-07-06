import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { NGO_LOGO } from "../../data/ngoFoodAssets";
import { getNgoDisplayName, getNgoProfile } from "../../utils/authStorage";

const DEFAULT_IDENTITY = {
  ngoId: "NGO1298",
  location: "Hyderabad",
  verified: true,
};

function resolveLocation(profile) {
  if (profile.serviceAreas?.length) {
    const city = profile.serviceAreas[0];
    if (/delhi/i.test(city)) return "Delhi";
    if (/bangalore|bengaluru/i.test(city)) return "Bangalore";
    if (/hyderabad|secunderabad|telangana/i.test(city)) return "Hyderabad";
    return city.split(",")[0];
  }

  if (profile.address?.trim()) {
    const lower = profile.address.toLowerCase();
    if (lower.includes("delhi")) return "Delhi";
    if (lower.includes("bangalore") || lower.includes("bengaluru")) return "Bangalore";
    if (lower.includes("hyderabad")) return "Hyderabad";
  }

  return DEFAULT_IDENTITY.location;
}

export default function NGOIdentityPanel() {
  const profile = getNgoProfile();
  const organizationName = getNgoDisplayName();
  const ngoId = profile.registrationId?.trim() || DEFAULT_IDENTITY.ngoId;
  const location = resolveLocation(profile);

  return (
    <div className="mt-auto shrink-0 border-t border-[#E5E7EB] pt-3">
      <div className="flex flex-col items-center gap-2 px-1 pb-1 text-center">
        <img
          src={NGO_LOGO}
          alt=""
          className="h-14 w-14 rounded-full border-2 border-[#BBF7D0] bg-white object-cover p-1"
        />

        <div className="flex w-full items-center justify-center gap-1.5">
          <p className="truncate text-xs font-bold leading-tight text-[#0F172A]">
            {organizationName}
          </p>
          {DEFAULT_IDENTITY.verified ? (
            <span
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#16A34A] text-white"
              title="Approved NGO"
            >
              <FaCheckCircle className="text-[9px]" aria-hidden="true" />
            </span>
          ) : null}
        </div>

        <p className="text-[10px] font-medium text-[#64748B]">NGO ID: {ngoId}</p>
        <p className="text-[10px] text-[#94A3B8]">{location}</p>

        <Link
          to={DASHBOARD_ROUTES.ngoProfile}
          className="mt-1 flex w-full items-center justify-center rounded-none bg-[#16A34A] px-2 py-2 text-[10px] font-semibold text-white transition-colors duration-300 hover:bg-[#15803D] sm:text-xs"
        >
          View NGO Profile
        </Link>
      </div>
    </div>
  );
}
