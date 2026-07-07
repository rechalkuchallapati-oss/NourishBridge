import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import MissionWorkflowPanel from "../../components/volunteer/MissionWorkflowPanel";
import VolunteerDashboardImpactPanel from "../../components/volunteer/VolunteerDashboardImpactPanel";
import VolunteerPickupsSection from "../../components/volunteer/VolunteerPickupsSection";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../../components/volunteer/VolunteerSectionShell";
import VolunteerTodaysSchedule from "../../components/volunteer/VolunteerTodaysSchedule";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { getVolunteerDisplayName, getSessionUser } from "../../utils/authStorage";
import {
  volunteerInteractive,
  VOLUNTEER_BTN,
  VOLUNTEER_EYEBROW,
  VOLUNTEER_INSET_LINE_GAP,
  VOLUNTEER_PAGE_SECTION_GAP,
} from "../../components/volunteer/volunteerDashboardStyles";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function VolunteerDashboard() {
  const navigate = useNavigate();
  const user = getSessionUser();
  const volunteerName = getVolunteerDisplayName(user);
  const {
    activeMission,
    availablePickups,
    completedToday,
    isAvailable,
    acceptMission,
    transitionMissionStatus,
    completeMission,
    toggleAvailability,
  } = useVolunteerMissionContext();

  const handleAccept = (pickup) => {
    if (activeMission) {
      toast.error("Complete your current mission first.");
      return;
    }
    if (acceptMission(pickup)) {
      toast.success("Mission assigned — opening Active Mission.");
      navigate(DASHBOARD_ROUTES.volunteerActive);
    }
  };

  return (
    <div className={`${VOLUNTEER_PAGE_SECTION_GAP} pb-[1cm]`}>
      <Toaster position="top-center" />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <VolunteerSectionShell>
          <div className="flex flex-wrap items-start justify-between gap-[0.5cm]">
            <div className="min-w-0 flex-1 pr-[1.5cm]">
              <p className={VOLUNTEER_EYEBROW}>Volunteer Account</p>
              <VolunteerSectionTitle
                heading="h1"
                title={`${getGreeting()}, ${volunteerName} 👋`}
                subtitle="Review pickups, follow your schedule, and track delivery impact."
                theme="emerald"
                className="!px-[0.5cm] !py-[0.45cm]"
              />
            </div>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={toggleAvailability}
              className={[
                VOLUNTEER_BTN,
                isAvailable
                  ? "bg-[#F0FDF4] text-[#15803D] ring-1 ring-[#BBF7D0]"
                  : "bg-[#F1F5F9] text-[#64748B] ring-1 ring-[#E2E8F0]",
                volunteerInteractive.buttonOutline,
              ].join(" ")}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${isAvailable ? "bg-[#16A34A] animate-pulse" : "bg-[#94A3B8]"}`}
              />
              {isAvailable ? "Available for Missions" : "Unavailable"}
            </motion.button>
          </div>
        </VolunteerSectionShell>
      </motion.div>

      {activeMission ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <MissionWorkflowPanel
            mission={activeMission}
            onAdvance={transitionMissionStatus}
            onComplete={() => {
              completeMission();
              navigate(DASHBOARD_ROUTES.volunteerMissions);
            }}
          />
        </motion.div>
      ) : null}

      <VolunteerPickupsSection
        availablePickups={availablePickups}
        onAccept={handleAccept}
        disabled={!!activeMission || !isAvailable}
      />

      <div className={`grid gap-[1cm] lg:grid-cols-2`}>
        <VolunteerTodaysSchedule
          activeMission={activeMission}
          completedToday={completedToday}
        />
        <VolunteerDashboardImpactPanel />
      </div>
    </div>
  );
}
