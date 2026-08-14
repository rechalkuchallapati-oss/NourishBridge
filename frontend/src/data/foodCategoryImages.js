import mixedRiceCurry from "../assets/dashboard/food/mixed-rice-curry.jpg";
import paradiseSpecialBiryani from "../assets/dashboard/food/paradise-special-biryani.jpg";
import paneerTikkaRoti from "../assets/dashboard/food/paneer-tikka-roti.jpg";
import mixedSeasonalFruits from "../assets/dashboard/food/mixed-seasonal-fruits.jpg";
import assortedBreadLoaves from "../assets/dashboard/food/assorted-bread-loaves.jpg";
import ngoPackagedMeals from "../assets/dashboard/ngo-food/ngo-packaged-meals.jpg";
import freshOrangeJuice from "../assets/dashboard/food/fresh-orange-juice.jpg";
import sandwichesPastries from "../assets/dashboard/food/sandwiches-pastries.jpg";
import genericMeal from "../assets/dashboard/food/vegetables-rice.jpg";

/** API category slug → default food image */
export const CATEGORY_DEFAULT_IMAGES = {
  cooked_meals: mixedRiceCurry,
  biryani: paradiseSpecialBiryani,
  non_veg: paradiseSpecialBiryani,
  vegetarian: paneerTikkaRoti,
  vegetables: mixedSeasonalFruits,
  fruits: mixedSeasonalFruits,
  bakery: assortedBreadLoaves,
  packaged: ngoPackagedMeals,
  beverages: freshOrangeJuice,
  dry_goods: sandwichesPastries,
  snacks: sandwichesPastries,
  other: genericMeal,
};

export const GENERIC_FOOD_PLACEHOLDER = genericMeal;

export function getCategoryDefaultImage(category) {
  if (!category) return GENERIC_FOOD_PLACEHOLDER;
  const normalized = String(category).toLowerCase().replace(/\s+/g, "_");
  return CATEGORY_DEFAULT_IMAGES[normalized] || GENERIC_FOOD_PLACEHOLDER;
}

export default {
  CATEGORY_DEFAULT_IMAGES,
  GENERIC_FOOD_PLACEHOLDER,
  getCategoryDefaultImage,
};
