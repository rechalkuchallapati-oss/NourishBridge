import User from "../../../models/User.model.js";
import ApiError from "../../../utils/ApiError.js";
import { USER_STATUS } from "../../../constants/enums.js";
import { AUTH_MESSAGES } from "../constants/messages.js";

const ACTIVE_USER_FILTER = { isDeleted: false };

/** Fields needed for auth middleware and token issuance */
export const AUTH_USER_SELECT = "_id email role fullName status";

/**
 * Find an active user by email. Optionally include password hash.
 */
export async function findUserByEmail(email, { withPassword = false } = {}) {
  let query = User.findOne({
    email: email.toLowerCase(),
    ...ACTIVE_USER_FILTER,
  });

  if (withPassword) {
    query = query.select("+password");
  } else {
    query = query.select(AUTH_USER_SELECT);
  }

  return query.lean({ virtuals: false });
}

/**
 * Find an active user by ID with minimal fields for auth checks.
 */
export async function findUserById(userId, { withPassword = false } = {}) {
  let query = User.findOne({ _id: userId, ...ACTIVE_USER_FILTER });

  if (withPassword) {
    query = query.select("+password");
  } else {
    query = query.select(AUTH_USER_SELECT);
  }

  return query.lean({ virtuals: false });
}

/**
 * Ensure user exists and can authenticate (not suspended/inactive).
 */
export function assertUserCanAuthenticate(user) {
  if (!user) {
    throw ApiError.unauthorized(AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  if (user.status === USER_STATUS.SUSPENDED) {
    throw ApiError.forbidden(AUTH_MESSAGES.ACCOUNT_SUSPENDED);
  }

  if (user.status === USER_STATUS.INACTIVE) {
    throw ApiError.forbidden(AUTH_MESSAGES.ACCOUNT_INACTIVE);
  }

  return user;
}

export default {
  findUserByEmail,
  findUserById,
  assertUserCanAuthenticate,
  AUTH_USER_SELECT,
};
