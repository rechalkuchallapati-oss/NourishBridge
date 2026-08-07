import ApiError from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/jwt.js";
import User from "../models/User.model.js";
import { USER_ROLES, USER_STATUS } from "../constants/enums.js";

/**
 * Verify JWT access token from Authorization header and attach user to req.
 * Rejects missing, malformed, expired, or invalid tokens with 401.
 */
export const authenticate = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Access token required");
    }

    const token = authHeader.split(" ")[1];

    if (!token || token === "undefined" || token === "null") {
      throw ApiError.unauthorized("Access token required");
    }

    const decoded = verifyAccessToken(token);

    const user = await User.findOne({
      _id: decoded.sub,
      isDeleted: false,
    });

    if (!user) {
      throw ApiError.unauthorized("User account not found");
    }

    if (user.status === USER_STATUS.SUSPENDED) {
      throw ApiError.forbidden("Your account has been suspended");
    }

    if (user.status === USER_STATUS.INACTIVE) {
      throw ApiError.forbidden("Your account is inactive");
    }

    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    };

    next();
  } catch (error) {
    next(error);
  }
};

/** Alias — common naming in Express APIs */
export const protect = authenticate;

/**
 * Restrict route access to one or more roles.
 * Must run after authenticate/protect.
 *
 * Usage: router.get("/dashboard", protect, authorize(USER_ROLES.ADMIN), handler)
 */
export const authorize =
  (...allowedRoles) =>
  (req, _res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized("Authentication required"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        ApiError.forbidden(
          `Access denied — requires role: ${allowedRoles.join(" or ")}`,
        ),
      );
    }

    next();
  };

/** Alias — restrictTo("admin", "ngo") */
export const restrictTo = authorize;

/**
 * Compose authenticate + role check into a reusable middleware chain.
 *
 * Usage: router.get("/dashboard", ...guard(USER_ROLES.ADMIN), handler)
 */
export const guard = (...allowedRoles) => [authenticate, authorize(...allowedRoles)];

/** Pre-built role guards — drop into any route definition */
export const adminOnly = guard(USER_ROLES.ADMIN);
export const ngoOnly = guard(USER_ROLES.NGO);
export const volunteerOnly = guard(USER_ROLES.VOLUNTEER);
export const donorOnly = guard(USER_ROLES.DONOR);

/** Routes accessible by admin or the specified operational roles */
export const adminOrNgo = guard(USER_ROLES.ADMIN, USER_ROLES.NGO);
export const adminOrVolunteer = guard(USER_ROLES.ADMIN, USER_ROLES.VOLUNTEER);

export default {
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
};
