import toast, { Toaster } from "react-hot-toast";
import MissionWorkflowPanel from "../../components/volunteer/MissionWorkflowPanel";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";

export default function VolunteerActiveMission() {
  const { activeMission, setMissionStatus, completeMission } = useVolunteerMissionContext();

  return (
    <>
      <Toaster position="top-center" />
      <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm">
        <h1 className="text-lg font-bold text-[#0F172A]">Active Mission</h1>
        <p className="mt-1 text-xs text-[#64748B]">
          Controlled mission workflow — one action at a time.
        </p>

        <div className="mt-4">
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
    </>
  );
}
