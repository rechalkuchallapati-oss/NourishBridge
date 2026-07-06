import vegetableBiryaniRaita from "../assets/dashboard/food/vegetable-biryani-raita.jpg";
import vegetablesRice from "../assets/dashboard/food/vegetables-rice.jpg";
import sandwichesPastries from "../assets/dashboard/food/sandwiches-pastries.jpg";
import dalMakhaniNaan from "../assets/dashboard/food/dal-makhani-naan.jpg";
import fruitBoxesJuice from "../assets/dashboard/food/fruit-boxes-juice.jpg";
import idliSambar from "../assets/dashboard/food/idli-sambar.jpg";
import paneerTikkaRoti from "../assets/dashboard/food/paneer-tikka-roti.jpg";
import mixedRiceCurry from "../assets/dashboard/food/mixed-rice-curry.jpg";
import pulihoraCurdRice from "../assets/dashboard/food/pulihora-curd-rice.jpg";
import bobbatluAriselu from "../assets/dashboard/food/bobbatlu-ariselu.jpg";
import muttonHaleem from "../assets/dashboard/food/mutton-haleem.jpg";
import qubaniKaMeetha from "../assets/dashboard/food/qubani-ka-meetha.jpg";
import paradiseSpecialBiryani from "../assets/dashboard/food/paradise-special-biryani.jpg";
import vegPulao from "../assets/dashboard/food/veg-pulao.jpg";
import paneerCurryImg from "../assets/dashboard/food/paneer-curry.jpg";
import vegBiryani from "../assets/dashboard/food/veg-biryani.jpg";
import margheritaBbqPizza from "../assets/dashboard/food/margherita-bbq-pizza.jpg";
import garlicBreadPasta from "../assets/dashboard/food/garlic-bread-pasta-alfredo.jpg";
import butterChickenNaan from "../assets/dashboard/food/butter-chicken-naan.jpg";
import dalMakhaniJeeraRice from "../assets/dashboard/food/dal-makhani-jeera-rice.jpg";
import tomatoBath from "../assets/dashboard/food/tomato-bath-semiya.jpg";
import curdRicePickle from "../assets/dashboard/food/curd-rice-pickle.jpg";
import schezwanFriedRice from "../assets/dashboard/food/schezwan-fried-rice.jpg";
import vegManchurian from "../assets/dashboard/food/veg-manchurian.jpg";
import springRollsVeg from "../assets/dashboard/food/spring-rolls-veg.jpg";
import coconutChutney from "../assets/dashboard/food/coconut-chutney.jpg";
import sheerKhurma from "../assets/dashboard/food/sheer-khurma.jpg";
import datesFruitChaat from "../assets/dashboard/food/dates-fruit-chaat.jpg";
import grilledPaneerWraps from "../assets/dashboard/food/grilled-paneer-wraps.jpg";
import thaiBasilNoodles from "../assets/dashboard/food/thai-basil-noodles.jpg";
import caesarSalad from "../assets/dashboard/food/caesar-salad-bowls.jpg";
import vegChickenPizza from "../assets/dashboard/food/veg-chicken-pizza.jpg";
import brownieDonut from "../assets/dashboard/food/brownie-donut-assortment.jpg";
import andhraFishPulusu from "../assets/dashboard/food/andhra-fish-pulusu.jpg";
import ukadicheModak from "../assets/dashboard/food/ukadiche-modak.jpg";
import puliyodarai from "../assets/dashboard/food/puliyodarai.jpg";
import coconutLaddu from "../assets/dashboard/food/coconut-laddu.jpg";
import chettinadMuttonPepperFry from "../assets/dashboard/food/chettinad-mutton-pepper-fry.jpg";
import appamIshtu from "../assets/dashboard/food/appam-ishtu.jpg";
import payasam from "../assets/dashboard/food/payasam-pradhaman.jpg";
import mixedSeasonalFruits from "../assets/dashboard/food/mixed-seasonal-fruits.jpg";
import freshOrangeJuice from "../assets/dashboard/food/fresh-orange-juice.jpg";
import butterChickenGarlicNaan from "../assets/dashboard/food/butter-chicken-garlic-naan.jpg";
import paneerLababdarRoti from "../assets/dashboard/food/paneer-lababdar-roti.jpg";
import osmaniaBiscuits from "../assets/dashboard/food/osmania-biscuits-samosa.jpg";
import khovaNaanIraniChai from "../assets/dashboard/food/khova-naan-irani-chai.jpg";
import sambarRicePoriyal from "../assets/dashboard/food/sambar-rice-poriyal.jpg";
import chicken65FriedRice from "../assets/dashboard/food/chicken-65-fried-rice.jpg";
import assortedBreadLoaves from "../assets/dashboard/food/assorted-bread-loaves.jpg";
import vegCheeseSandwiches from "../assets/dashboard/food/veg-cheese-sandwiches.jpg";
import steamedRice from "../assets/dashboard/food/steamed-rice.jpg";
import mixedVegetableCurry from "../assets/dashboard/food/mixed-vegetable-curry.jpg";
import breadAndSandwiches from "../assets/dashboard/food/bread-and-sandwiches.jpg";
import riceAndCurry from "../assets/dashboard/food/rice-and-curry.jpg";
import ngoCookedCurry from "../assets/dashboard/ngo-food/ngo-cooked-curry-rice.jpg";
import ngoPackagedMeals from "../assets/dashboard/ngo-food/ngo-packaged-meals.jpg";
import ngoFreshFruits from "../assets/dashboard/ngo-food/ngo-fresh-fruits.jpg";
import ngoFestivalSamosas from "../assets/dashboard/ngo-food/ngo-festival-samosas.jpg";
import ngoWeddingBuffet from "../assets/dashboard/ngo-food/ngo-wedding-buffet.jpg";
import ngoCorporateLunch from "../assets/dashboard/ngo-food/ngo-corporate-lunch.jpg";
import volunteerBiryaniBulk from "../assets/dashboard/volunteer/volunteer-food-biryani.png";
import volunteerLunchTrays from "../assets/dashboard/volunteer/volunteer-food-lunch-trays.png";
import volunteerPaneer from "../assets/dashboard/volunteer/volunteer-food-paneer.png";
import volunteerIdli from "../assets/dashboard/volunteer/volunteer-food-idli.png";
import volunteerSandwiches from "../assets/dashboard/volunteer/volunteer-food-sandwiches.png";
import volunteerFruits from "../assets/dashboard/volunteer/volunteer-food-fruits.png";
import { resolveThumbnailKeyFromName } from "./foodItemThumbnails";

/** Visual scale — individual home packs vs bulk catering containers. */
export const PACKAGING_SCALES = {
  individual: "Individual · home boxes & tiffins",
  bulk: "Bulk · hotel pans & hot boxes",
};

/** One unique thumbnail per food item — used across all dashboards. */
export const DONATION_THUMBNAILS = {
  individual_biryani: vegetableBiryaniRaita,
  individual_curry_roti: paneerTikkaRoti,
  individual_rice_sambar: idliSambar,
  individual_snacks: sandwichesPastries,
  individual_fruit: fruitBoxesJuice,
  restaurant_biryani_bulk: ngoWeddingBuffet,
  restaurant_mixed_bulk: mixedRiceCurry,
  restaurant_curry_bulk: ngoCookedCurry,
  wedding_buffet: ngoWeddingBuffet,
  party_trays: ngoPackagedMeals,
  festival_spread: ngoFestivalSamosas,
  ramzan_iftar: dalMakhaniNaan,
  christmas_feast: sandwichesPastries,
  corporate_lunch: ngoCorporateLunch,
  hotel_banquet: ngoCookedCurry,
  corporate_trays: ngoCorporateLunch,
  diwali_sweets: ngoFestivalSamosas,
  pongal_feast: vegetablesRice,
  ganesh_prasad: ngoFreshFruits,
  veg_biryani: vegBiryani,
  paradise_biryani: paradiseSpecialBiryani,
  qubani_meetha: qubaniKaMeetha,
  margherita_bbq_pizza: margheritaBbqPizza,
  garlic_bread_pasta: garlicBreadPasta,
  veg_pulao: vegPulao,
  idli_sambar: idliSambar,
  coconut_chutney: coconutChutney,
  assorted_bread_loaves: assortedBreadLoaves,
  veg_cheese_sandwiches: vegCheeseSandwiches,
  bread_and_sandwiches: breadAndSandwiches,
  bread_sandwiches: breadAndSandwiches,
  steamed_rice: steamedRice,
  mixed_vegetable_curry: mixedVegetableCurry,
  rice_and_curry: riceAndCurry,
  rice_curry: riceAndCurry,
  butter_chicken_naan: butterChickenNaan,
  dal_makhani_jeera_rice: dalMakhaniJeeraRice,
  tomato_bath: tomatoBath,
  curd_rice_pickle: curdRicePickle,
  schezwan_fried_rice: schezwanFriedRice,
  veg_manchurian: vegManchurian,
  spring_rolls_veg: springRollsVeg,
  mutton_haleem: muttonHaleem,
  sheer_khurma: sheerKhurma,
  dates_fruit_chaat: datesFruitChaat,
  grilled_paneer_wraps: grilledPaneerWraps,
  thai_basil_noodles: thaiBasilNoodles,
  caesar_salad: caesarSalad,
  veg_chicken_pizza: vegChickenPizza,
  brownie_donut: brownieDonut,
  andhra_fish_pulusu: andhraFishPulusu,
  ukadiche_modak: ukadicheModak,
  puliyodarai: puliyodarai,
  pulihora_curd_rice: pulihoraCurdRice,
  bobbatlu_ariselu: bobbatluAriselu,
  coconut_laddu: coconutLaddu,
  chettinad_mutton_pepper_fry: chettinadMuttonPepperFry,
  appam_ishtu: appamIshtu,
  payasam: payasam,
  mixed_seasonal_fruits: mixedSeasonalFruits,
  fresh_orange_juice: freshOrangeJuice,
  butter_chicken_garlic_naan: butterChickenGarlicNaan,
  paneer_lababdar_roti: paneerLababdarRoti,
  paneer_curry: paneerCurryImg,
  osmania_biscuits: osmaniaBiscuits,
  khova_naan_irani_chai: khovaNaanIraniChai,
  sambar_rice_poriyal: sambarRicePoriyal,
  chicken_65_fried_rice: chicken65FriedRice,
  pizza_italian: margheritaBbqPizza,
  chinese_noodles: schezwanFriedRice,
  fish_curry: andhraFishPulusu,
  fish_pulusu: andhraFishPulusu,
  fruit_boxes: mixedSeasonalFruits,
  modak_sweets: ukadicheModak,
  payasam_dessert: payasam,
  paneer_wraps: grilledPaneerWraps,
  thai_noodles: thaiBasilNoodles,
  pizza_boxes: vegChickenPizza,
  brownie_dessert: brownieDonut,
  mutton_pepper_fry: chettinadMuttonPepperFry,
  sambar_rice: sambarRicePoriyal,
  chicken_65: chicken65FriedRice,
  osmania_snacks: osmaniaBiscuits,
};

export const VOLUNTEER_PICKUP_THUMBNAILS = {
  "VL-FOOD-001": volunteerBiryaniBulk,
  "VL-FOOD-002": volunteerLunchTrays,
  "VL-FOOD-003": volunteerPaneer,
  "VL-FOOD-004": ngoFestivalSamosas,
  "VL-FOOD-005": volunteerSandwiches,
  "VL-FOOD-006": volunteerFruits,
  "VL-FOOD-007": volunteerLunchTrays,
  "VL-FOOD-008": volunteerIdli,
  "VL-FOOD-009": butterChickenNaan,
};

export const VOLUNTEER_PICKUP_IDS = {
  "PKP-001": volunteerBiryaniBulk,
  "PKP-002": volunteerLunchTrays,
  "PKP-003": volunteerPaneer,
  "PKP-004": ngoFestivalSamosas,
  "PKP-005": volunteerSandwiches,
};

export const NGO_INCOMING_THUMBNAILS = {
  "IN-2841": ngoWeddingBuffet,
  "IN-2838": ngoWeddingBuffet,
  "IN-2835": paneerTikkaRoti,
  "IN-2832": ngoFestivalSamosas,
  "IN-2829": ngoCookedCurry,
  "IN-2826": sandwichesPastries,
  "NGO-INC-001": ngoWeddingBuffet,
  "NGO-INC-002": ngoCorporateLunch,
  "NGO-INC-003": ngoFestivalSamosas,
  "NGO-DEL-001": ngoWeddingBuffet,
  "NGO-DEL-002": paneerTikkaRoti,
  "NGO-DEL-003": ngoFestivalSamosas,
  "NGO-INV-COOKED": ngoWeddingBuffet,
  "NGO-INV-PACKAGED": ngoPackagedMeals,
  "NGO-INV-FRUITS": ngoFreshFruits,
  "NGO-INV-DRY": mixedRiceCurry,
};

const EVENT_THUMBNAIL_DEFAULTS = {
  individual: "individual_curry_roti",
  restaurant: "restaurant_biryani_bulk",
  wedding: "wedding_buffet",
  party: "party_trays",
  festival: "festival_spread",
  ramzan: "ramzan_iftar",
  christmas: "christmas_feast",
  corporate: "corporate_lunch",
  hotel: "hotel_banquet",
  catering: "restaurant_mixed_bulk",
};

export function resolveItemThumbnail(item) {
  if (!item) return null;
  const key = item.thumbnailKey ?? resolveThumbnailKeyFromName(item.name);
  if (key && DONATION_THUMBNAILS[key]) return DONATION_THUMBNAILS[key];
  return resolveFoodItemThumbnail(item.name);
}

export function resolveFoodItemThumbnail(itemName) {
  const key = resolveThumbnailKeyFromName(itemName);
  if (key && DONATION_THUMBNAILS[key]) return DONATION_THUMBNAILS[key];
  return null;
}

export function resolveDonationThumbnail(record) {
  if (record?.thumbnailKey && DONATION_THUMBNAILS[record.thumbnailKey]) {
    return DONATION_THUMBNAILS[record.thumbnailKey];
  }
  const primaryItem = record?.items?.[0];
  if (primaryItem) {
    const itemThumb = resolveItemThumbnail(primaryItem);
    if (itemThumb) return itemThumb;
  }
  const primaryName = record?.items?.[0]?.name ?? record?.foodName ?? record?.food;
  const itemThumb = resolveFoodItemThumbnail(primaryName);
  if (itemThumb) return itemThumb;
  if (record?.packagingScale === "individual") {
    return DONATION_THUMBNAILS.individual_snacks;
  }
  if (record?.eventType && EVENT_THUMBNAIL_DEFAULTS[record.eventType]) {
    return DONATION_THUMBNAILS[EVENT_THUMBNAIL_DEFAULTS[record.eventType]];
  }
  return null;
}

export function getPackagingLabel(record) {
  if (record?.packagingLabel) return record.packagingLabel;
  if (record?.packagingScale === "individual") {
    return PACKAGING_SCALES.individual;
  }
  if (record?.packagingScale === "bulk") {
    return PACKAGING_SCALES.bulk;
  }
  return null;
}
