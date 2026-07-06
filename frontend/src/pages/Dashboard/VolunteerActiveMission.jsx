import toast, { Toaster } from "react-hot-toast";
import VolunteerLayout from "../../components/dashboard/VolunteerLayout";
import CurrentMissionPanel from "../../components/volunteer/CurrentMissionPanel";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";
import { MISSION_STATES } from "../../data/volunteerMission";

const FLOW = [
  "assigned",
  "accepted",
  "en_route_to_donor",
  "arrived_at_donor",
  "pickup_verified",
  "food_collected",
  "en_route_to_ngo",
  "arrived_at_ngo",
  "handover_confirmed",
  "completed",
];

export default function VolunteerActiveMission() {
  const { activeMission, setMissionStatus, completeMission } = useVolunteerMissionContext();

  return (
    <VolunteerLayout>
      <Toaster position="top-center" />
      <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm">
        <h1 className="text-lg font-bold text-[#0F172A]">Active Mission</h1>
        <p className="mt-1 text-xs text-[#64748B]">
          Controlled mission workflow — one action at a time.
        </p>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <CurrentMissionPanel
            mission={activeMission}
            onAdvance={setMissionStatus}
            onComplete={() => {
              completeMission();
              toast.success("Mission completed! Great work.");
            }}
          />

          <div className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-[#64748B]">
              Mission lifecycle
            </p>
            <ol className="mt-3 space-y-1.5">
              {FLOW.map((step) => {
                const isCurrent = activeMission?.status === step;
                const isPast =
                  activeMission &&
                  FLOW.indexOf(step) < FLOW.indexOf(activeMission.status);
                return (
                  <li
                    key={step}
                    className={[
                      "rounded-none px-2 py-1 text-[10px] font-medium uppercase",
                      isCurrent
                        ? "bg-[#DCFCE7] text-[#15803D]"
                        : isPast
                          ? "text-[#94A3B8] line-through"
                          : "text-[#CBD5E1]",
                    ].join(" ")}
                  >
                    {step.replace(/_/g, " ")}
                  </li>
                );
              })}
            </ol>
            {!activeMission ? (
              <p className="mt-3 text-xs text-[#64748B]">
                Accept a pickup from the overview to start at{" "}
                <strong>{MISSION_STATES.EN_ROUTE_TO_DONOR.replace(/_/g, " ")}</strong>.
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </VolunteerLayout>
  );
}
