import { DONATION_FOOD_IMAGES, getDonationFoodImage } from "./donationFoodAssets";

export { DONATION_FOOD_IMAGES };

export function getDonationImage(donation) {
  return getDonationFoodImage(donation);
}

export function getDonationImageAlt(donation) {
  return `${donation.food} — donation photo`;
}
