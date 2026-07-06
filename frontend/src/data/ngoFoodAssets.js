import {
  NGO_INCOMING_THUMBNAILS,
  resolveDonationThumbnail,
} from "./donationThumbnails";
import ngoCookedCurry from "../assets/dashboard/ngo-food/ngo-cooked-curry-rice.jpg";
import ngoPackagedMeals from "../assets/dashboard/ngo-food/ngo-packaged-meals.jpg";
import ngoFreshFruits from "../assets/dashboard/ngo-food/ngo-fresh-fruits.jpg";
import ngoDryGoods from "../assets/dashboard/ngo-food/ngo-dry-goods.jpg";
import ngoFestivalSamosas from "../assets/dashboard/ngo-food/ngo-festival-samosas.jpg";
import ngoWeddingBuffet from "../assets/dashboard/ngo-food/ngo-wedding-buffet.jpg";
import ngoCorporateLunch from "../assets/dashboard/ngo-food/ngo-corporate-lunch.jpg";
import ngoLogo from "../assets/dashboard/ngo-food/ngo-logo-helping-hands.png";

export const NGO_LOGO = ngoLogo;

export const NGO_FOOD_IMAGES = {
  ...NGO_INCOMING_THUMBNAILS,
  "IN-2841": ngoWeddingBuffet,
  "IN-2838": ngoWeddingBuffet,
  "IN-2835": ngoPackagedMeals,
  "IN-2832": ngoFestivalSamosas,
  "IN-2829": ngoCookedCurry,
  "IN-2826": ngoCorporateLunch,
};

export function getNgoFoodImage(keyOrRecord) {
  const key = typeof keyOrRecord === "string" ? keyOrRecord : keyOrRecord?.foodKey ?? keyOrRecord?.id;
  if (key && NGO_FOOD_IMAGES[key]) return NGO_FOOD_IMAGES[key];
  return resolveDonationThumbnail(keyOrRecord);
}
