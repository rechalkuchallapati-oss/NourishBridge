import { DONATION_THUMBNAILS, resolveDonationThumbnail } from "./donationThumbnails";

/** Donor-upload style thumbnails keyed by donation ID (donor dashboard). */
export const DONATION_FOOD_IMAGES = {
  "DN-2401": DONATION_THUMBNAILS.individual_biryani,
  "DN-2398": DONATION_THUMBNAILS.individual_curry_roti,
  "DN-2395": DONATION_THUMBNAILS.individual_rice_sambar,
  "DN-2388": DONATION_THUMBNAILS.restaurant_biryani_bulk,
  "DN-2382": DONATION_THUMBNAILS.diwali_sweets,
  "DN-2375": DONATION_THUMBNAILS.individual_snacks,
  "DN-2368": DONATION_THUMBNAILS.party_trays,
  "DN-2360": DONATION_THUMBNAILS.corporate_lunch,
};

export function getDonationFoodImage(donation) {
  if (donation?.image) return donation.image;
  if (donation?.id && DONATION_FOOD_IMAGES[donation.id]) {
    return DONATION_FOOD_IMAGES[donation.id];
  }
  return resolveDonationThumbnail(donation);
}
