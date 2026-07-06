import ngoCookedCurry from "../assets/dashboard/ngo-food/ngo-cooked-curry-rice.jpg";
import ngoPackagedMeals from "../assets/dashboard/ngo-food/ngo-packaged-meals.jpg";
import ngoFreshFruits from "../assets/dashboard/ngo-food/ngo-fresh-fruits.jpg";
import ngoDryGoods from "../assets/dashboard/ngo-food/ngo-dry-goods.jpg";
import ngoFestivalSamosas from "../assets/dashboard/ngo-food/ngo-festival-samosas.jpg";
import ngoWeddingBuffet from "../assets/dashboard/ngo-food/ngo-wedding-buffet.jpg";
import ngoCorporateLunch from "../assets/dashboard/ngo-food/ngo-corporate-lunch.jpg";
import ngoLogo from "../assets/dashboard/ngo-food/ngo-logo-helping-hands.png";

export const NGO_LOGO = ngoLogo;

/** NGO dashboard food images — separate from donor donation assets. */
export const NGO_FOOD_IMAGES = {
  "NGO-INC-001": ngoWeddingBuffet,
  "NGO-INC-002": ngoCorporateLunch,
  "NGO-INC-003": ngoFestivalSamosas,
  "NGO-DEL-001": ngoCookedCurry,
  "NGO-DEL-002": ngoPackagedMeals,
  "NGO-DEL-003": ngoDryGoods,
  "NGO-INV-COOKED": ngoCookedCurry,
  "NGO-INV-PACKAGED": ngoPackagedMeals,
  "NGO-INV-FRUITS": ngoFreshFruits,
  "NGO-INV-DRY": ngoDryGoods,
};

export function getNgoFoodImage(key) {
  return NGO_FOOD_IMAGES[key] ?? null;
}
