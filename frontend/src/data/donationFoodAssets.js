import vegetableBiryaniRaita from "../assets/dashboard/food/vegetable-biryani-raita.jpg";
import vegetablesRice from "../assets/dashboard/food/vegetables-rice.jpg";
import sandwichesPastries from "../assets/dashboard/food/sandwiches-pastries.jpg";
import dalMakhaniNaan from "../assets/dashboard/food/dal-makhani-naan.jpg";
import fruitBoxesJuice from "../assets/dashboard/food/fruit-boxes-juice.jpg";
import idliSambar from "../assets/dashboard/food/idli-sambar.jpg";
import paneerTikkaRoti from "../assets/dashboard/food/paneer-tikka-roti.jpg";
import mixedRiceCurry from "../assets/dashboard/food/mixed-rice-curry.jpg";

/** Donor-upload style thumbnails keyed by donation ID. */
export const DONATION_FOOD_IMAGES = {
  "DN-2401": vegetableBiryaniRaita,
  "DN-2398": vegetablesRice,
  "DN-2395": sandwichesPastries,
  "DN-2388": dalMakhaniNaan,
  "DN-2375": fruitBoxesJuice,
  "DN-2362": idliSambar,
  "DN-2350": paneerTikkaRoti,
  "DN-2338": mixedRiceCurry,
};

export function getDonationFoodImage(donation) {
  if (donation?.image) return donation.image;
  return DONATION_FOOD_IMAGES[donation?.id] ?? null;
}
