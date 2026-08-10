import { USER_ROLES } from "../../../constants/enums.js";

/** Roles allowed via public registration — admin is seed-only */
export const PUBLIC_REGISTER_ROLES = [
  USER_ROLES.DONOR,
  USER_ROLES.VOLUNTEER,
  USER_ROLES.NGO,
];

export default { PUBLIC_REGISTER_ROLES };
