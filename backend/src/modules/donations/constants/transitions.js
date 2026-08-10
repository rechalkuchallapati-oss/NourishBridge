import { DONATION_STATUS, USER_ROLES } from "../../../constants/enums.js";

/** Named workflow actions — clients never send raw status strings */
export const DONATION_ACTIONS = Object.freeze({
  VERIFY: "verify",
  REJECT: "reject",
  CANCEL: "cancel",
  EXPIRE: "expire",
  ACCEPT: "accept",
  ASSIGN_VOLUNTEER: "assign_volunteer",
  SCHEDULE_PICKUP: "schedule_pickup",
  MARK_PICKED_UP: "mark_picked_up",
  MARK_IN_TRANSIT: "mark_in_transit",
  MARK_DELIVERED: "mark_delivered",
  COMPLETE: "complete",
});

const S = DONATION_STATUS;
const R = USER_ROLES;

/**
 * Controlled transition table.
 * Each action maps from-statuses, to-status, and authorized roles.
 */
export const DONATION_TRANSITIONS = Object.freeze({
  [DONATION_ACTIONS.VERIFY]: {
    from: [S.PENDING],
    to: S.VERIFIED,
    roles: [R.ADMIN],
  },
  [DONATION_ACTIONS.REJECT]: {
    from: [S.PENDING, S.VERIFIED],
    to: S.REJECTED,
    roles: [R.ADMIN, R.NGO],
  },
  [DONATION_ACTIONS.CANCEL]: {
    from: [S.PENDING, S.VERIFIED, S.NGO_ACCEPTED],
    to: S.CANCELLED,
    roles: [R.DONOR],
  },
  [DONATION_ACTIONS.EXPIRE]: {
    from: [S.PENDING, S.VERIFIED],
    to: S.EXPIRED,
    roles: [R.ADMIN],
  },
  [DONATION_ACTIONS.ACCEPT]: {
    from: [S.VERIFIED],
    to: S.NGO_ACCEPTED,
    roles: [R.NGO],
  },
  [DONATION_ACTIONS.ASSIGN_VOLUNTEER]: {
    from: [S.NGO_ACCEPTED],
    to: S.VOLUNTEER_ASSIGNED,
    roles: [R.VOLUNTEER, R.ADMIN],
  },
  [DONATION_ACTIONS.SCHEDULE_PICKUP]: {
    from: [S.VOLUNTEER_ASSIGNED],
    to: S.PICKUP_SCHEDULED,
    roles: [R.VOLUNTEER],
  },
  [DONATION_ACTIONS.MARK_PICKED_UP]: {
    from: [S.PICKUP_SCHEDULED, S.VOLUNTEER_ASSIGNED],
    to: S.PICKED_UP,
    roles: [R.VOLUNTEER],
  },
  [DONATION_ACTIONS.MARK_IN_TRANSIT]: {
    from: [S.PICKED_UP],
    to: S.IN_TRANSIT,
    roles: [R.VOLUNTEER],
  },
  [DONATION_ACTIONS.MARK_DELIVERED]: {
    from: [S.IN_TRANSIT],
    to: S.DELIVERED,
    roles: [R.VOLUNTEER],
  },
  [DONATION_ACTIONS.COMPLETE]: {
    from: [S.DELIVERED],
    to: S.COMPLETED,
    roles: [R.NGO],
  },
});

export const TERMINAL_DONATION_STATUSES = new Set([
  S.COMPLETED,
  S.REJECTED,
  S.CANCELLED,
  S.EXPIRED,
]);

export default {
  DONATION_ACTIONS,
  DONATION_TRANSITIONS,
  TERMINAL_DONATION_STATUSES,
};
