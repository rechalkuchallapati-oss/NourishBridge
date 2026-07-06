import {
  VOLUNTEER_PICKUP_IDS,
  VOLUNTEER_PICKUP_THUMBNAILS,
  resolveDonationThumbnail,
} from "./donationThumbnails";
import volunteerPrimary from "../assets/dashboard/volunteer/volunteer-account-primary.png";
import volunteerAlt1 from "../assets/dashboard/volunteer/volunteer-account-alt1.png";
import volunteerAlt2 from "../assets/dashboard/volunteer/volunteer-account-alt2.png";
import foodBiryani from "../assets/dashboard/volunteer/volunteer-food-biryani.png";
import foodPaneer from "../assets/dashboard/volunteer/volunteer-food-paneer.png";
import foodFruits from "../assets/dashboard/volunteer/volunteer-food-fruits.png";
import foodLunchTrays from "../assets/dashboard/volunteer/volunteer-food-lunch-trays.png";
import foodIdli from "../assets/dashboard/volunteer/volunteer-food-idli.png";
import foodSandwiches from "../assets/dashboard/volunteer/volunteer-food-sandwiches.png";

export const VOLUNTEER_AVATAR_OPTIONS = [
  { id: "primary", src: volunteerPrimary, label: "Primary profile" },
  { id: "alt1", src: volunteerAlt1, label: "Delivery rider" },
  { id: "alt2", src: volunteerAlt2, label: "Rescue partner" },
];

export const VOLUNTEER_AVATAR = volunteerPrimary;

export const VOLUNTEER_IDENTITY = {
  volunteerId: "VOL3847",
  rating: 4.9,
  reviewCount: 86,
  verified: true,
};

export const VOLUNTEER_FOOD_IMAGES = {
  ...VOLUNTEER_PICKUP_THUMBNAILS,
};

export const VOLUNTEER_PICKUP_LOGO = foodBiryani;
export const VOLUNTEER_NGO_LOGO = foodPaneer;

export function getVolunteerFoodImage(keyOrRecord) {
  if (typeof keyOrRecord === "object" && keyOrRecord?.id && VOLUNTEER_PICKUP_IDS[keyOrRecord.id]) {
    return VOLUNTEER_PICKUP_IDS[keyOrRecord.id];
  }
  const key = typeof keyOrRecord === "string" ? keyOrRecord : keyOrRecord?.foodKey;
  if (key && VOLUNTEER_FOOD_IMAGES[key]) return VOLUNTEER_FOOD_IMAGES[key];
  return resolveDonationThumbnail(keyOrRecord) ?? foodBiryani;
}

export function getVolunteerAvatar(profileOrAvatarId) {
  if (profileOrAvatarId && typeof profileOrAvatarId === "object") {
    if (profileOrAvatarId.customAvatarDataUrl) {
      return profileOrAvatarId.customAvatarDataUrl;
    }
    const avatarId = profileOrAvatarId.avatarId ?? "primary";
    return (
      VOLUNTEER_AVATAR_OPTIONS.find((item) => item.id === avatarId)?.src ?? volunteerPrimary
    );
  }

  const avatarId = profileOrAvatarId ?? "primary";
  return VOLUNTEER_AVATAR_OPTIONS.find((item) => item.id === avatarId)?.src ?? volunteerPrimary;
}
