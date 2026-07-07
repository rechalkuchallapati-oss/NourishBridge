/** Maps mission item names (lowercase) to thumbnail keys in donationThumbnails.js */
export const FOOD_NAME_TO_THUMBNAIL_KEY = {
  "coconut chutney": "coconut_chutney",
  "bread and sandwiches": "bread_and_sandwiches",
  "rice and curry": "rice_and_curry",
  "assorted bread loaves": "assorted_bread_loaves",
  "veg & cheese sandwiches": "veg_cheese_sandwiches",
  "steamed rice": "steamed_rice",
  "mixed vegetable curry": "mixed_vegetable_curry",
  "pulihora & curd rice": "pulihora_curd_rice",
  "veg pulao": "veg_pulao",
  "veg biryani": "veg_biryani",
  "veg dum biryani": "veg_biryani",
  "hyderabadi chicken biryani": "paradise_biryani",
  "mutton keema biryani": "paradise_biryani",
  "fish fry biryani (pomfret)": "paradise_biryani",
  "prawn biryani": "paradise_biryani",
  "egg biryani": "paradise_biryani",
  "paradise special biryani": "paradise_biryani",
  "qubani ka meetha": "qubani_meetha",
  "margherita & bbq chicken pizza": "margherita_bbq_pizza",
  "garlic bread & pasta alfredo": "garlic_bread_pasta",
  "idli & sambar": "idli_sambar",
  "butter chicken & naan": "butter_chicken_naan",
  "dal makhani & jeera rice": "dal_makhani_jeera_rice",
  "tomato bath (semiya)": "tomato_bath",
  "curd rice with pickle": "curd_rice_pickle",
  "schezwan fried rice": "schezwan_fried_rice",
  "veg manchurian gravy": "veg_manchurian",
  "spring rolls (veg)": "spring_rolls_veg",
  "mutton haleem": "mutton_haleem",
  "sheer khurma": "sheer_khurma",
  "dates & fruit chaat": "dates_fruit_chaat",
  "grilled paneer wraps": "grilled_paneer_wraps",
  "thai basil noodles": "thai_basil_noodles",
  "caesar salad bowls": "caesar_salad",
  "veg & chicken pizza (large)": "veg_chicken_pizza",
  "brownie & donut assortment": "brownie_donut",
  "andhra fish pulusu": "andhra_fish_pulusu",
  "andhra fish pulusu (homemade)": "andhra_fish_pulusu",
  "ukadiche modak": "ukadiche_modak",
  "fried modak": "ukadiche_modak",
  "puliyodarai (tamarind rice)": "puliyodarai",
  "coconut laddu": "coconut_laddu",
  "laddu & mysore pak": "bobbatlu_ariselu",
  "chettinad mutton pepper fry": "chettinad_mutton_pepper_fry",
  "appam & ishtu": "appam_ishtu",
  "payasam (ada pradhaman)": "payasam",
  "double ka meetha": "qubani_meetha",
  "mixed seasonal fruits": "mixed_seasonal_fruits",
  "fresh orange juice": "fresh_orange_juice",
  "butter chicken & garlic naan": "butter_chicken_garlic_naan",
  "paneer lababdar & roti": "paneer_lababdar_roti",
  "paneer curry": "paneer_curry",
  "paneer curry & roti": "paneer_curry",
  "paneer tikka & hara bhara kebab": "paneer_curry",
  "osmania biscuits & tea samosa": "osmania_biscuits",
  "khova naan & irani chai": "khova_naan_irani_chai",
  "sambar rice & mixed poriyal": "sambar_rice_poriyal",
  "chicken 65 & fried rice": "chicken_65_fried_rice",
  "bobbatlu & ariselu": "bobbatlu_ariselu",
  "andhra chicken curry": "butter_chicken_naan",
  "jeera rice & ghee rice": "steamed_rice",
};

/** Partial name match — first hit wins (more specific rules first). */
const FOOD_KEYWORD_RULES = [
  { pattern: /biryani|pulao|fried rice/i, key: "paradise_biryani" },
  { pattern: /modak|prasad|ganesh/i, key: "ukadiche_modak" },
  { pattern: /laddu|mysore pak|bobbatlu|ariselu|sweet|meetha|payasam|kulfi|dessert|halwa|sheer khurma/i, key: "payasam" },
  { pattern: /pizza|burger|slider|wings|fries/i, key: "veg_chicken_pizza" },
  { pattern: /brownie|donut|pastry/i, key: "brownie_donut" },
  { pattern: /fish|pulusu|pomfret|prawn/i, key: "andhra_fish_pulusu" },
  { pattern: /idli|sambar|dosa|appam|ishtu/i, key: "appam_ishtu" },
  { pattern: /mutton|pepper fry|haleem|keema/i, key: "chettinad_mutton_pepper_fry" },
  { pattern: /paneer|tikka|kebab|naan|roti|curry(?! rice)/i, key: "paneer_curry" },
  { pattern: /sandwich|bread/i, key: "bread_and_sandwiches" },
  { pattern: /fruit|juice|chaat/i, key: "mixed_seasonal_fruits" },
  { pattern: /rice(?! and curry)/i, key: "steamed_rice" },
  { pattern: /sundal|puliyodarai|pulihora|avial|thoran/i, key: "puliyodarai" },
];

export function resolveThumbnailKeyFromName(name) {
  if (!name) return null;
  const normalized = name.trim().toLowerCase();

  if (FOOD_NAME_TO_THUMBNAIL_KEY[normalized]) {
    return FOOD_NAME_TO_THUMBNAIL_KEY[normalized];
  }

  for (const rule of FOOD_KEYWORD_RULES) {
    if (rule.pattern.test(normalized)) {
      return rule.key;
    }
  }

  return null;
}
