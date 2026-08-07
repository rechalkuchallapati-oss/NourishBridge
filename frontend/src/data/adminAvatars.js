import volunteerPrimary from "../assets/dashboard/volunteer/volunteer-account-primary.png";
import volunteerAlt1 from "../assets/dashboard/volunteer/volunteer-account-alt1.png";
import volunteerAlt2 from "../assets/dashboard/volunteer/volunteer-account-alt2.png";
import foodDonor from "../assets/how-it-works/food-donor.jpg";
import ngoHelpingHands from "../assets/dashboard/ngo-food/ngo-logo-helping-hands.png";
import feedingIndia from "../assets/partners/feeding-india.png";
import goonj from "../assets/partners/goonj.png";
import akshayaPatra from "../assets/partners/akshaya-patra.png";
import robinhoodArmy from "../assets/partners/robinhood-army.png";

const VOLUNTEER_AVATARS = [volunteerPrimary, volunteerAlt1, volunteerAlt2];
const DONOR_AVATARS = [foodDonor, volunteerAlt1, volunteerAlt2];
const NGO_LOGOS = [ngoHelpingHands, feedingIndia, goonj, akshayaPatra, robinhoodArmy];
const ADMIN_AVATARS = [volunteerPrimary, volunteerAlt1];

const AVATAR_BY_ID = {
  "USR-1001": volunteerPrimary,
  "USR-1002": volunteerAlt2,
  "USR-1003": volunteerAlt1,
  "USR-1004": volunteerAlt2,
  "USR-1005": volunteerAlt1,
  "USR-1006": volunteerPrimary,
  "USR-1007": volunteerAlt1,
  "USR-1008": volunteerPrimary,
  "NGO-2045": ngoHelpingHands,
  "NGO-1088": feedingIndia,
  "NGO-3012": goonj,
  "NGO-2042": akshayaPatra,
  "NGO-1080": robinhoodArmy,
};

export function getAvatarSrc({ id, name, role, userType, type } = {}) {
  if (id && AVATAR_BY_ID[id]) return AVATAR_BY_ID[id];

  const resolvedRole = role || userType || type;
  const hash = (name || id || "default").length;

  if (resolvedRole === "ngo" || resolvedRole === "NGO Admin") {
    return NGO_LOGOS[hash % NGO_LOGOS.length];
  }
  if (resolvedRole === "donor" || resolvedRole === "Donor") {
    return DONOR_AVATARS[hash % DONOR_AVATARS.length];
  }
  if (resolvedRole === "volunteer" || resolvedRole === "Volunteer") {
    return VOLUNTEER_AVATARS[hash % VOLUNTEER_AVATARS.length];
  }
  if (resolvedRole === "admin" || resolvedRole === "super_admin" || resolvedRole === "Admin") {
    return ADMIN_AVATARS[hash % ADMIN_AVATARS.length];
  }
  if (resolvedRole === "system" || resolvedRole === "System") {
    return null;
  }
  return VOLUNTEER_AVATARS[hash % VOLUNTEER_AVATARS.length];
}

export { volunteerPrimary, ngoHelpingHands, foodDonor };
