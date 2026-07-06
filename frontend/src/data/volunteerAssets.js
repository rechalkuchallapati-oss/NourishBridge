import ngoCookedCurry from "../assets/dashboard/ngo-food/ngo-cooked-curry-rice.jpg";
import ngoCorporateLunch from "../assets/dashboard/ngo-food/ngo-corporate-lunch.jpg";
import ngoFreshFruits from "../assets/dashboard/ngo-food/ngo-fresh-fruits.jpg";
import volunteerPortrait from "../assets/how-it-works/volunteer-pickup.jpg";

export const VOLUNTEER_AVATAR = volunteerPortrait;

export const VOLUNTEER_FOOD_IMAGES = {
  "VL-FOOD-001": ngoCookedCurry,
  "VL-FOOD-002": ngoCorporateLunch,
  "VL-FOOD-003": ngoFreshFruits,
};

export function getVolunteerFoodImage(key) {
  return VOLUNTEER_FOOD_IMAGES[key] ?? null;
}
