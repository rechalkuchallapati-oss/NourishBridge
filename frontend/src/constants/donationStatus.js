export const DONATION_TIMELINE_STEPS = [
  { id: "posted", label: "Posted" },
  { id: "ngo_matched", label: "NGO Matched" },
  { id: "volunteer_assigned", label: "Volunteer Assigned" },
  { id: "picked_up", label: "Picked Up" },
  { id: "in_transit", label: "In Transit" },
  { id: "delivered", label: "Delivered" },
  { id: "ngo_confirmed", label: "NGO Confirmed" },
];

export function getTimelineStepIndex(statusId) {
  return DONATION_TIMELINE_STEPS.findIndex((step) => step.id === statusId);
}

export function getStatusLabel(statusId) {
  return (
    DONATION_TIMELINE_STEPS.find((step) => step.id === statusId)?.label ??
    "Unknown"
  );
}
