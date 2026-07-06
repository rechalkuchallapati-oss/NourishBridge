import { useCallback, useEffect, useState } from "react";
import {
  AVAILABLE_PICKUP_REQUESTS,
  MISSION_STATES,
  RECENT_MISSIONS,
  getMissionEta,
} from "../data/volunteerMission";

const ACTIVE_MISSION_KEY = "nb_volunteer_active_mission";
const AVAILABILITY_KEY = "nb_volunteer_available";
const COMPLETED_TODAY_KEY = "nb_volunteer_completed_today";
const PICKUPS_KEY = "nb_volunteer_available_pickups";
const RECENT_KEY = "nb_volunteer_recent_missions";

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
      return true;
    },
    [activeMission],
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

      const completed = {
        id: prev.missionId ?? prev.id,
        eventType: prev.eventType,
        foodName: prev.foodName,
        items: prev.items,
        donor: prev.donorName,
        ngo: prev.ngoName,
        meals: prev.estimatedMeals,
        completedAt: "Just now",
        status: "completed",
      };

      setRecentMissions((recent) => [completed, ...recent.slice(0, 4)]);
      setCompletedToday((count) => count + 1);
      return null;
    });
  }, []);

  const toggleAvailability = useCallback(() => {
    setIsAvailable((prev) => !prev);
  }, []);

  return {
    activeMission,
    availablePickups,
    recentMissions,
    completedToday,
    isAvailable,
    acceptMission,
    setMissionStatus,
    completeMission,
    toggleAvailability,
  };

}
