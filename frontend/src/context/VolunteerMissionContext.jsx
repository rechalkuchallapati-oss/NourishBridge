import { createContext, useContext } from "react";
import { useVolunteerMission } from "../hooks/useVolunteerMission";

const VolunteerMissionContext = createContext(null);

export function VolunteerMissionProvider({ children }) {
  const value = useVolunteerMission();
  return (
    <VolunteerMissionContext.Provider value={value}>{children}</VolunteerMissionContext.Provider>
  );
}

export function useVolunteerMissionContext() {
  const context = useContext(VolunteerMissionContext);
  if (!context) {
    throw new Error("useVolunteerMissionContext must be used within VolunteerMissionProvider");
  }
  return context;
}
