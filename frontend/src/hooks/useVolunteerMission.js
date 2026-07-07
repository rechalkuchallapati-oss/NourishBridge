import { useCallback, useEffect, useState } from "react";
import { VOLUNTEER_IDENTITY } from "../data/volunteerAssets";
import {
  AVAILABLE_PICKUP_REQUESTS,
  MISSION_STATES,
  RECENT_MISSIONS,
  VOLUNTEER_IMPACT,
  getMissionEta,
} from "../data/volunteerMission";
import { VOLUNTEER_REVIEWS } from "../data/volunteerProfileData";
import {
  buildAcceptNotifications,
  buildCompletionNotifications,
  buildCompletionReview,
  buildWorkflowNotifications,
  formatMissionTimestamps,
  getRouteAfterStatusChange,
} from "../utils/missionWorkflow";

const ACTIVE_MISSION_KEY = "nb_volunteer_active_mission";
const AVAILABILITY_KEY = "nb_volunteer_available";
const COMPLETED_TODAY_KEY = "nb_volunteer_completed_today";
const PICKUPS_KEY = "nb_volunteer_available_pickups_v2";
const RECENT_KEY = "nb_volunteer_recent_missions";
const LIVE_NOTIFICATIONS_KEY = "nb_volunteer_live_notifications";
const PROFILE_IMPACT_KEY = "nb_volunteer_profile_impact";
const LIVE_REVIEWS_KEY = "nb_volunteer_live_reviews";
const COMPLETION_CELEBRATION_KEY = "nb_volunteer_completion_celebration";

function loadJson(key, fallback) {
  try {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function getDefaultProfileImpact() {
  return {
    missionsCompleted: VOLUNTEER_IMPACT.missionsCompleted,
    mealsDelivered: VOLUNTEER_IMPACT.mealsDelivered,
    trustScore: 94,
    rating: VOLUNTEER_IDENTITY.rating,
    reviewCount: VOLUNTEER_IDENTITY.reviewCount,
  };
}

export function useVolunteerMission() {
  const [activeMission, setActiveMission] = useState(() =>
    loadJson(ACTIVE_MISSION_KEY, null),
  );
  const [availablePickups, setAvailablePickups] = useState(() =>
    loadJson(PICKUPS_KEY, AVAILABLE_PICKUP_REQUESTS),
  );
  const [recentMissions, setRecentMissions] = useState(() =>
    loadJson(RECENT_KEY, RECENT_MISSIONS),
  );
  const [completedToday, setCompletedToday] = useState(() =>
    loadJson(COMPLETED_TODAY_KEY, 2),
  );
  const [isAvailable, setIsAvailable] = useState(() => {
    const stored = sessionStorage.getItem(AVAILABILITY_KEY);
    return stored !== "false";
  });
  const [liveNotifications, setLiveNotifications] = useState(() =>
    loadJson(LIVE_NOTIFICATIONS_KEY, []),
  );
  const [profileImpact, setProfileImpact] = useState(() =>
    loadJson(PROFILE_IMPACT_KEY, getDefaultProfileImpact()),
  );
  const [liveReviews, setLiveReviews] = useState(() =>
    loadJson(LIVE_REVIEWS_KEY, []),
  );
  const [completionCelebration, setCompletionCelebration] = useState(() =>
    loadJson(COMPLETION_CELEBRATION_KEY, null),
  );

  useEffect(() => {
    saveJson(ACTIVE_MISSION_KEY, activeMission);
  }, [activeMission]);

  useEffect(() => {
    saveJson(PICKUPS_KEY, availablePickups);
  }, [availablePickups]);

  useEffect(() => {
    saveJson(RECENT_KEY, recentMissions);
  }, [recentMissions]);

  useEffect(() => {
    saveJson(COMPLETED_TODAY_KEY, completedToday);
  }, [completedToday]);

  useEffect(() => {
    sessionStorage.setItem(AVAILABILITY_KEY, String(isAvailable));
  }, [isAvailable]);

  useEffect(() => {
    saveJson(LIVE_NOTIFICATIONS_KEY, liveNotifications);
  }, [liveNotifications]);

  useEffect(() => {
    saveJson(PROFILE_IMPACT_KEY, profileImpact);
  }, [profileImpact]);

  useEffect(() => {
    saveJson(LIVE_REVIEWS_KEY, liveReviews);
  }, [liveReviews]);

  useEffect(() => {
    saveJson(COMPLETION_CELEBRATION_KEY, completionCelebration);
  }, [completionCelebration]);

  const pushNotifications = useCallback((items) => {
    if (!items?.length) return;
    setLiveNotifications((prev) => [...items, ...prev]);
  }, []);

  const acceptMission = useCallback(
    (pickup) => {
      if (activeMission) return false;

      const mission = {
        ...pickup,
        missionId: `MIS-${Date.now().toString().slice(-4)}`,
        status: MISSION_STATES.ASSIGNED,
        eta: getMissionEta(MISSION_STATES.ASSIGNED),
        acceptedAt: new Date().toISOString(),
      };

      setActiveMission(mission);
      setAvailablePickups((prev) => prev.filter((item) => item.id !== pickup.id));
      pushNotifications(buildAcceptNotifications(mission));
      return true;
    },
    [activeMission, pushNotifications],
  );

  const transitionMissionStatus = useCallback(
    (nextStatus) => {
      let navigateTo = getRouteAfterStatusChange(nextStatus);

      setActiveMission((prev) => {
        if (!prev) return prev;
        pushNotifications(buildWorkflowNotifications(prev, nextStatus));
        return {
          ...prev,
          status: nextStatus,
          eta: getMissionEta(nextStatus) ?? prev.eta,
        };
      });

      return navigateTo;
    },
    [pushNotifications],
  );

  const setMissionStatus = useCallback((status) => {
    setActiveMission((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        status,
        eta: getMissionEta(status) ?? prev.eta,
      };
    });
  }, []);

  const completeMission = useCallback(() => {
    setActiveMission((prev) => {
      if (!prev) return null;

      const timestamps = formatMissionTimestamps();
      const completed = {
        id: prev.missionId ?? prev.id,
        eventType: prev.eventType,
        thumbnailKey: prev.thumbnailKey,
        packagingScale: prev.packagingScale,
        foodName: prev.foodName,
        items: prev.items,
        donor: prev.donorName,
        ngo: prev.ngoName,
        meals: prev.estimatedMeals,
        quantity: prev.quantity,
        pickupAt: timestamps.pickupAt,
        deliveredAt: timestamps.deliveredAt,
        completedAt: timestamps.deliveredAt,
        deliveryStatus: "delivered",
        status: "completed",
      };

      setRecentMissions((recent) => [completed, ...recent.slice(0, 9)]);
      setCompletedToday((count) => count + 1);
      setLiveReviews((reviews) => [buildCompletionReview(prev), ...reviews]);

      setProfileImpact((impact) => {
        const meals = prev.estimatedMeals ?? 0;
        const nextReviewCount = impact.reviewCount + 1;
        const nextImpact = {
          missionsCompleted: impact.missionsCompleted + 1,
          mealsDelivered: impact.mealsDelivered + meals,
          trustScore: Math.min(100, impact.trustScore + 1),
          reviewCount: nextReviewCount,
          rating: Math.min(
            5,
            Math.round(((impact.rating * impact.reviewCount + 5) / nextReviewCount) * 10) / 10,
          ),
        };
        pushNotifications(buildCompletionNotifications(prev, nextImpact));
        return nextImpact;
      });

      setCompletionCelebration({
        missionId: prev.missionId ?? prev.id,
        ngoName: prev.ngoName,
        foodName: prev.foodName,
        estimatedMeals: prev.estimatedMeals,
      });

      window.dispatchEvent(new Event("nb-volunteer-profile-updated"));
      return null;
    });
  }, [pushNotifications]);

  const clearCompletionCelebration = useCallback(() => {
    setCompletionCelebration(null);
  }, []);

  const toggleAvailability = useCallback(() => {
    setIsAvailable((prev) => !prev);
  }, []);

  const allReviews = [...liveReviews, ...VOLUNTEER_REVIEWS];

  return {
    activeMission,
    availablePickups,
    recentMissions,
    completedToday,
    isAvailable,
    liveNotifications,
    profileImpact,
    liveReviews,
    allReviews,
    completionCelebration,
    acceptMission,
    setMissionStatus,
    transitionMissionStatus,
    completeMission,
    clearCompletionCelebration,
    pushNotifications,
    toggleAvailability,
  };
}
