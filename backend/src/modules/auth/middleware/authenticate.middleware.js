import ApiError from "../../../utils/ApiError.js";
import { verifyAccessToken } from "../../../utils/jwt.js";
import { USER_ROLES } from "../../../constants/enums.js";
import { AUTH_MESSAGES } from "../constants/messages.js";
import { findUserById, assertUserCanAuthenticate } from "../utils/user.repository.js";

/**
 * Verify JWT access token and attach minimal user context to req.
 */
export const authenticate = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw ApiError.unauthorized(AUTH_MESSAGES.TOKEN_REQUIRED);
    }

    const token = authHeader.split(" ")[1];

    if (!token || token === "undefined" || token === "null") {
      throw ApiError.unauthorized(AUTH_MESSAGES.TOKEN_REQUIRED);
    }

    const decoded = verifyAccessToken(token);
    const user = await findUserById(decoded.sub);
    assertUserCanAuthenticate(user);

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

export const protect = authenticate;

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

export const restrictTo = authorize;

export const guard = (...allowedRoles) => [authenticate, authorize(...allowedRoles)];

export const adminOnly = guard(USER_ROLES.ADMIN);
export const ngoOnly = guard(USER_ROLES.NGO);
export const volunteerOnly = guard(USER_ROLES.VOLUNTEER);
export const donorOnly = guard(USER_ROLES.DONOR);
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
