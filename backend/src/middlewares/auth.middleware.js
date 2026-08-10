/** @deprecated Import from `modules/auth` — kept for backward compatibility */
export {
  authenticate,
  protect,
  authorize,
  restrictTo,
  guard,
  adminOnly,
  ngoOnly,
  volunteerOnly,
  donorOnly,
  adminOrNgo,
  adminOrVolunteer,
} from "../modules/auth/middleware/authenticate.middleware.js";

export { default } from "../modules/auth/middleware/authenticate.middleware.js";
