import foodDonorPortrait from "../assets/how-it-works/food-donor.jpg";

export const DEFAULT_DONOR_AVATAR = foodDonorPortrait;

export function getDonorAvatarUrl(profile) {
  return profile?.avatarUrl || DEFAULT_DONOR_AVATAR;
}
