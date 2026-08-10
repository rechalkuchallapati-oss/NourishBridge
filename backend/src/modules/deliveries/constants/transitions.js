import { DELIVERY_STATUS, USER_ROLES } from "../../../constants/enums.js";

export const DELIVERY_ACTIONS = Object.freeze({
  SCHEDULE_PICKUP: "schedule_pickup",
  ARRIVE_AT_PICKUP: "arrive_at_pickup",
  VERIFY_PICKUP: "verify_pickup",
  COLLECT_FOOD: "collect_food",
  START_DELIVERY: "start_delivery",
  ARRIVE_AT_NGO: "arrive_at_ngo",
  VERIFY_DELIVERY: "verify_delivery",
  COMPLETE: "complete",
  FAIL: "fail",
  CANCEL: "cancel",
});

const S = DELIVERY_STATUS;
const R = USER_ROLES;

export const DELIVERY_TRANSITIONS = Object.freeze({
  [DELIVERY_ACTIONS.SCHEDULE_PICKUP]: {
    from: [S.ASSIGNED],
    to: S.PICKUP_SCHEDULED,
    roles: [R.VOLUNTEER],
  },
  [DELIVERY_ACTIONS.ARRIVE_AT_PICKUP]: {
    from: [S.PICKUP_SCHEDULED, S.EN_ROUTE_PICKUP],
    to: S.AT_PICKUP,
    roles: [R.VOLUNTEER],
  },
  [DELIVERY_ACTIONS.VERIFY_PICKUP]: {
    from: [S.AT_PICKUP],
    to: S.PICKUP_VERIFIED,
    roles: [R.VOLUNTEER],
    requiresProof: true,
  },
  [DELIVERY_ACTIONS.COLLECT_FOOD]: {
    from: [S.PICKUP_VERIFIED, S.AT_PICKUP],
    to: S.PICKED_UP,
    roles: [R.VOLUNTEER],
  },
  [DELIVERY_ACTIONS.START_DELIVERY]: {
    from: [S.PICKED_UP],
    to: S.IN_TRANSIT,
    roles: [R.VOLUNTEER],
  },
  [DELIVERY_ACTIONS.ARRIVE_AT_NGO]: {
    from: [S.IN_TRANSIT],
    to: S.AT_DROPOFF,
    roles: [R.VOLUNTEER],
  },
  [DELIVERY_ACTIONS.VERIFY_DELIVERY]: {
    from: [S.AT_DROPOFF],
    to: S.DELIVERY_VERIFIED,
    roles: [R.VOLUNTEER],
    requiresProof: true,
  },
  [DELIVERY_ACTIONS.COMPLETE]: {
    from: [S.DELIVERY_VERIFIED, S.DELIVERED],
    to: S.COMPLETED,
    roles: [R.NGO],
  },
  [DELIVERY_ACTIONS.FAIL]: {
    from: [
      S.ASSIGNED,
      S.PICKUP_SCHEDULED,
      S.EN_ROUTE_PICKUP,
      S.AT_PICKUP,
      S.PICKUP_VERIFIED,
      S.PICKED_UP,
      S.IN_TRANSIT,
      S.AT_DROPOFF,
    ],
    to: S.FAILED,
    roles: [R.VOLUNTEER, R.ADMIN],
  },
  [DELIVERY_ACTIONS.CANCEL]: {
    from: [S.ASSIGNED, S.PICKUP_SCHEDULED, S.EN_ROUTE_PICKUP],
    to: S.CANCELLED,
    roles: [R.VOLUNTEER, R.ADMIN, R.NGO],
  },
});

/** Maps delivery completion steps to donation status sync */
export const DELIVERY_TO_DONATION_STATUS = Object.freeze({
  [S.PICKUP_SCHEDULED]: "pickup_scheduled",
  [S.PICKED_UP]: "picked_up",
  [S.IN_TRANSIT]: "in_transit",
  [S.DELIVERY_VERIFIED]: "delivered",
  [S.DELIVERED]: "delivered",
  [S.COMPLETED]: "completed",
});

export const TERMINAL_DELIVERY_STATUSES = new Set([
  S.COMPLETED,
  S.FAILED,
  S.CANCELLED,
]);

export default {
  DELIVERY_ACTIONS,
  DELIVERY_TRANSITIONS,
  DELIVERY_TO_DONATION_STATUS,
  TERMINAL_DELIVERY_STATUSES,
};
