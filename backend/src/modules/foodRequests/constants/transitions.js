import { FOOD_REQUEST_STATUS, USER_ROLES } from "../../../constants/enums.js";

export const FOOD_REQUEST_ACTIONS = Object.freeze({
  SUBMIT: "submit",
  REVIEW: "review",
  APPROVE: "approve",
  MATCH_DONATION: "match_donation",
  ASSIGN_VOLUNTEER: "assign_volunteer",
  SCHEDULE_DELIVERY: "schedule_delivery",
  FULFILL: "fulfill",
  CANCEL: "cancel",
  EXPIRE: "expire",
});

const S = FOOD_REQUEST_STATUS;
const R = USER_ROLES;

export const FOOD_REQUEST_TRANSITIONS = Object.freeze({
  [FOOD_REQUEST_ACTIONS.SUBMIT]: {
    from: [null],
    to: S.REQUESTED,
    roles: [R.NGO],
  },
  [FOOD_REQUEST_ACTIONS.REVIEW]: {
    from: [S.REQUESTED],
    to: S.UNDER_REVIEW,
    roles: [R.ADMIN],
  },
  [FOOD_REQUEST_ACTIONS.APPROVE]: {
    from: [S.UNDER_REVIEW, S.REQUESTED],
    to: S.APPROVED,
    roles: [R.ADMIN],
  },
  [FOOD_REQUEST_ACTIONS.MATCH_DONATION]: {
    from: [S.APPROVED],
    to: S.DONATION_MATCHED,
    roles: [R.ADMIN, R.NGO],
  },
  [FOOD_REQUEST_ACTIONS.ASSIGN_VOLUNTEER]: {
    from: [S.DONATION_MATCHED],
    to: S.VOLUNTEER_ASSIGNED,
    roles: [R.ADMIN, R.VOLUNTEER],
  },
  [FOOD_REQUEST_ACTIONS.SCHEDULE_DELIVERY]: {
    from: [S.VOLUNTEER_ASSIGNED],
    to: S.DELIVERY_SCHEDULED,
    roles: [R.ADMIN, R.VOLUNTEER],
  },
  [FOOD_REQUEST_ACTIONS.FULFILL]: {
    from: [S.DELIVERY_SCHEDULED, S.VOLUNTEER_ASSIGNED, S.DONATION_MATCHED],
    to: S.FULFILLED,
    roles: [R.NGO, R.ADMIN],
  },
  [FOOD_REQUEST_ACTIONS.CANCEL]: {
    from: [S.REQUESTED, S.UNDER_REVIEW, S.APPROVED, S.DONATION_MATCHED],
    to: S.CANCELLED,
    roles: [R.NGO, R.ADMIN],
  },
  [FOOD_REQUEST_ACTIONS.EXPIRE]: {
    from: [S.REQUESTED, S.UNDER_REVIEW, S.APPROVED],
    to: S.EXPIRED,
    roles: [R.ADMIN],
  },
});

export default { FOOD_REQUEST_ACTIONS, FOOD_REQUEST_TRANSITIONS };
