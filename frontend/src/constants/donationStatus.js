/** Backend-aligned donation timeline statuses */
export const DONATION_TIMELINE_STEPS = [
  { id: "pending", label: "Posted" },
  { id: "verified", label: "Verified" },
  { id: "ngo_accepted", label: "NGO Accepted" },
  { id: "volunteer_assigned", label: "Volunteer Assigned" },
  { id: "pickup_scheduled", label: "Pickup Scheduled" },
  { id: "picked_up", label: "Picked Up" },
  { id: "in_transit", label: "In Transit" },
  { id: "delivered", label: "Delivered" },
  { id: "completed", label: "Completed" },
];

/** Legacy mock status aliases → backend status */
const STATUS_ALIASES = {
  posted: "pending",
  ngo_matched: "ngo_accepted",
  ngo_confirmed: "completed",
};

export function normalizeStatus(statusId) {
  return STATUS_ALIASES[statusId] || statusId;
}

export function getTimelineStepIndex(statusId) {
  const normalized = normalizeStatus(statusId);
  return DONATION_TIMELINE_STEPS.findIndex((step) => step.id === normalized);
}

const TERMINAL_STATUS_LABELS = {
  rejected: "Rejected",
  cancelled: "Cancelled",
  expired: "Expired",
};

export function getStatusLabel(statusId) {
  const normalized = normalizeStatus(statusId);
  return (
    DONATION_TIMELINE_STEPS.find((step) => step.id === normalized)?.label ??
    TERMINAL_STATUS_LABELS[normalized] ??
    statusId ??
    "Unknown"
  );
}
