import { DASHBOARD_ROUTES } from "../constants/routes";
import { MISSION_STATES } from "../data/volunteerMission";

let notificationCounter = 0;

function nextNotificationId() {
  notificationCounter += 1;
  return `VN-LIVE-${Date.now()}-${notificationCounter}`;
}

function volunteerNotification(category, title, body) {
  return {
    id: nextNotificationId(),
    category,
    title,
    body,
    time: "Just now",
    unread: true,
    live: true,
  };
}

/** Route to open after advancing to this mission status. */
export function getRouteAfterStatusChange(nextStatus) {
  switch (nextStatus) {
    case MISSION_STATES.EN_ROUTE_TO_DONOR:
    case MISSION_STATES.EN_ROUTE_TO_NGO:
      return DASHBOARD_ROUTES.volunteerRoute;
    case MISSION_STATES.ARRIVED_AT_DONOR:
      return DASHBOARD_ROUTES.volunteerPickup;
    case MISSION_STATES.FOOD_COLLECTED:
      return DASHBOARD_ROUTES.volunteerDelivery;
    default:
      return null;
  }
}

export function buildAcceptNotifications(mission) {
  const food = mission?.foodName ?? "food donation";
  const donor = mission?.donorName ?? "donor";
  return [
    volunteerNotification(
      "mission",
      "Mission accepted",
      `You accepted the ${food} pickup from ${donor}. Confirm acceptance on Active Mission to begin.`,
    ),
  ];
}

export function buildWorkflowNotifications(mission, nextStatus) {
  if (!mission) return [];

  const donor = mission.donorName ?? "Donor";
  const ngo = mission.ngoName ?? "NGO";
  const food = mission.foodName ?? "food donation";
  const meals = mission.estimatedMeals ?? 0;

  switch (nextStatus) {
    case MISSION_STATES.ACCEPTED:
      return [
        volunteerNotification(
          "mission",
          "Mission confirmed",
          `Acceptance confirmed for ${food}. Tap "Start Route to Donor" when you are ready to leave.`,
        ),
      ];
    case MISSION_STATES.EN_ROUTE_TO_DONOR:
      return [
        volunteerNotification(
          "mission",
          "En route to donor",
          `Navigation started to ${donor}. Follow directions on the Route page.`,
        ),
        volunteerNotification(
          "pickup",
          "Donor notified",
          `${donor} has been notified that you are on the way for pickup.`,
        ),
      ];
    case MISSION_STATES.ARRIVED_AT_DONOR:
      return [
        volunteerNotification(
          "pickup",
          "Arrived at pickup site",
          `You have arrived at ${donor}. Complete safety checks on the Pickup page.`,
        ),
      ];
    case MISSION_STATES.FOOD_COLLECTED:
      return [
        volunteerNotification(
          "mission",
          "Pickup complete",
          `Food collected from ${donor}. Review NGO delivery details on the Delivery page.`,
        ),
        volunteerNotification(
          "pickup",
          "Donor pickup confirmed",
          `${donor} received confirmation that their food has been picked up safely.`,
        ),
        volunteerNotification(
          "ngo",
          "NGO notified — food en route",
          `${ngo} has been alerted that ~${meals} meals are on the way.`,
        ),
      ];
    case MISSION_STATES.EN_ROUTE_TO_NGO:
      return [
        volunteerNotification(
          "mission",
          "En route to NGO",
          `Navigation started to ${ngo}. Keep food safe until handover.`,
        ),
        volunteerNotification(
          "ngo",
          "NGO updated",
          `${ngo} notified: volunteer is en route with rescued food.`,
        ),
      ];
    case MISSION_STATES.ARRIVED_AT_NGO:
      return [
        volunteerNotification(
          "ngo",
          "Arrived at NGO",
          `${ngo} has been notified that you have arrived for food handover.`,
        ),
      ];
    default:
      return [];
  }
}

export function buildCompletionNotifications(mission, profileImpact) {
  if (!mission) return [];

  const ngo = mission.ngoName ?? "NGO";
  const food = mission.foodName ?? "food donation";
  const meals = mission.estimatedMeals ?? 0;
  const trustScore = profileImpact?.trustScore ?? 94;

  return [
    volunteerNotification(
      "mission",
      "Mission accomplished",
      `${food} delivered to ${ngo} — ~${meals} meals logged to your impact.`,
    ),
    volunteerNotification(
      "ngo",
      "Food received",
      `${ngo} confirmed receipt of the rescued food donation.`,
    ),
    volunteerNotification(
      "rating",
      "New NGO rating received",
      `${ngo} rated your handover 5★ for safe handling and on-time delivery.`,
    ),
    volunteerNotification(
      "system",
      "Trust score improved",
      `Your trust score increased to ${trustScore}/100 after this verified delivery.`,
    ),
  ];
}

export function buildCompletionReview(mission) {
  const now = new Date();
  const date = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return {
    id: `rev-live-${Date.now()}`,
    ngo: mission.ngoName ?? "NGO Partner",
    rating: 5,
    date,
    missionId: mission.missionId ?? mission.id ?? "MIS-NEW",
    text: `Smooth handover of ${mission.foodName ?? "rescued food"}. Packaging intact, on-time arrival, and clear communication throughout.`,
    tags: ["On-time", "Safe handling", "Professional"],
    live: true,
  };
}

export function formatMissionTimestamps() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return {
    pickupAt: `${dateStr} · ${timeStr}`,
    deliveredAt: "Just now",
  };
}
