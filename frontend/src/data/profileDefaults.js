import foodDonor from "../assets/how-it-works/food-donor.jpg";
import ngoLogo from "../assets/partners/feeding-india.png";
import volunteerPrimary from "../assets/dashboard/volunteer/volunteer-account-primary.png";

export const ROLE_DEFAULT_AVATARS = {
  donor: foodDonor,
  ngo: ngoLogo,
  volunteer: volunteerPrimary,
  admin: volunteerPrimary,
};

export function getRoleDefaultAvatar(role = "donor") {
  return ROLE_DEFAULT_AVATARS[role] || ROLE_DEFAULT_AVATARS.donor;
}

export default {
  ROLE_DEFAULT_AVATARS,
  getRoleDefaultAvatar,
};
