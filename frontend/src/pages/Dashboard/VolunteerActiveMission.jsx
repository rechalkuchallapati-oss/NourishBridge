import toast, { Toaster } from "react-hot-toast";
import MissionWorkflowPanel from "../../components/volunteer/MissionWorkflowPanel";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";
import { VOLUNTEER_SECTION_PAD, VOLUNTEER_STACK_GAP } from "../../components/volunteer/volunteerDashboardStyles";

export default function VolunteerActiveMission() {
  const { activeMission, setMissionStatus, completeMission } = useVolunteerMissionContext();

  return (
    <div className={VOLUNTEER_STACK_GAP}>
      <Toaster position="top-center" />
      <section
        className={`rounded-none border border-[#E5E7EB] bg-white shadow-sm ${VOLUNTEER_SECTION_PAD}`}
      >
        <h1 className="text-lg font-bold text-[#0F172A]">Active Mission</h1>
        <p className="mt-[0.3cm] text-xs text-[#64748B]">
          Controlled mission workflow — one action at a time.
        </p>

        <div className="mt-[0.5cm]">
          <MissionWorkflowPanel
            mission={activeMission}
            onAdvance={setMissionStatus}
            onComplete={() => {
              completeMission();
              toast.success("Mission completed! Great work.");
            }}
          />
        </div>
      </section>
    </div>
  );
}
