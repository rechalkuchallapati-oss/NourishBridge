import toast, { Toaster } from "react-hot-toast";
import { FaTasks } from "react-icons/fa";
import MissionWorkflowPanel from "../../components/volunteer/MissionWorkflowPanel";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../../components/volunteer/VolunteerSectionShell";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";
import { VOLUNTEER_PAGE_SECTION_GAP } from "../../components/volunteer/volunteerDashboardStyles";

export default function VolunteerActiveMission() {
  const { activeMission, setMissionStatus, completeMission } = useVolunteerMissionContext();

  return (
    <div className={VOLUNTEER_PAGE_SECTION_GAP}>
      <Toaster position="top-center" />
      <VolunteerSectionShell>
        <VolunteerSectionTitle
          heading="h1"
          title="Active Mission"
          subtitle="Controlled mission workflow — one action at a time."
          theme="green"
          icon={FaTasks}
        />
        <MissionWorkflowPanel
          mission={activeMission}
          onAdvance={setMissionStatus}
          onComplete={() => {
            completeMission();
            toast.success("Mission completed! Great work.");
          }}
        />
      </VolunteerSectionShell>
    </div>
  );
}
