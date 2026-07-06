import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import MissionWorkflowPanel from "../../components/volunteer/MissionWorkflowPanel";
import VolunteerDashboardImpactPanel from "../../components/volunteer/VolunteerDashboardImpactPanel";
import VolunteerPickupsSection from "../../components/volunteer/VolunteerPickupsSection";
import VolunteerTodaysSchedule from "../../components/volunteer/VolunteerTodaysSchedule";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";
import { getVolunteerDisplayName, getSessionUser } from "../../utils/authStorage";
import { volunteerInteractive } from "../../components/volunteer/volunteerDashboardStyles";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function VolunteerDashboard() {
  const user = getSessionUser();
  const volunteerName = getVolunteerDisplayName(user);
  const {
    activeMission,
    availablePickups,
    completedToday,
    isAvailable,
    acceptMission,
    setMissionStatus,
    completeMission,
    toggleAvailability,
  } = useVolunteerMissionContext();

  const handleAccept = (pickup) => {
    if (activeMission) {
      toast.error("Complete your current mission first.");
      return;
    }
    if (acceptMission(pickup)) {
      toast.success("Mission assigned — confirm acceptance to begin.");
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-5"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#16A34A]">
              Volunteer Account
            </p>
            <h1 className="mt-1 text-xl font-bold text-[#0F172A] sm:text-2xl">
              {getGreeting()}, {volunteerName} 👋
            </h1>
            <p className="mt-1 text-xs text-[#64748B] sm:text-sm">
              Review pickups, follow your schedule, and track delivery impact.
            </p>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={toggleAvailability}
            className={[
              "inline-flex items-center gap-2 rounded-none px-3 py-2 text-xs font-semibold",
              isAvailable
                ? "bg-[#F0FDF4] text-[#15803D] ring-1 ring-[#BBF7D0]"
                : "bg-[#F1F5F9] text-[#64748B] ring-1 ring-[#E2E8F0]",
              volunteerInteractive.buttonOutline,
            ].join(" ")}
          >
            <span
              className={`h-2 w-2 rounded-full ${isAvailable ? "bg-[#16A34A] animate-pulse" : "bg-[#94A3B8]"}`}
            />
            {isAvailable ? "Available for Missions" : "Unavailable"}
          </motion.button>
        </div>
      </motion.section>

      {activeMission ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <MissionWorkflowPanel
            mission={activeMission}
            onAdvance={setMissionStatus}
            onComplete={completeMission}
          />
        </motion.div>
      ) : null}

      <VolunteerPickupsSection
        availablePickups={availablePickups}
        onAccept={handleAccept}
        disabled={!!activeMission || !isAvailable}
      />

      <div className="grid gap-3 lg:grid-cols-2">
        <VolunteerTodaysSchedule
          activeMission={activeMission}
          completedToday={completedToday}
        />
        <VolunteerDashboardImpactPanel />
      </div>
    </>
  );
}
