import { useMemo } from "react";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";
import VolunteerMissionsTable from "../../components/volunteer/VolunteerMissionsTable";
import {
  COMPLETED_MISSIONS_HISTORY,
  getMissionTableRows,
  UPCOMING_MISSIONS_EXTENDED,
} from "../../data/volunteerMissionHistory";
import { VOLUNTEER_SECTION_PAD, VOLUNTEER_STACK_GAP } from "../../components/volunteer/volunteerDashboardStyles";

function mapRecentMission(m) {
  return {
    ...m,
    id: m.id ?? m.missionId,
    donor: m.donor ?? m.donorName,
    ngo: m.ngo ?? m.ngoName,
    pickupAt: m.pickupAt ?? m.completedAt ?? "Just now",
    deliveredAt: m.deliveredAt ?? m.completedAt ?? "Just now",
    deliveryStatus: m.deliveryStatus ?? "delivered",
    items: m.items ?? [{ name: m.foodName, quantity: m.quantity ?? "—", cuisine: "Indian" }],
  };
}

function getMissionKey(mission) {
  return mission.id ?? mission.missionId ?? mission.foodName;
}

function isDuplicateVegBiryani(mission, seenVegBiryani) {
  const label = `${mission.foodName ?? ""} ${(mission.items ?? []).map((i) => i.name).join(" ")}`.toLowerCase();
  const isVegBiryani = label.includes("veg biryani");
  const id = String(getMissionKey(mission));

  if (id.includes("3460")) return true;
  if (!isVegBiryani) return false;
  if (seenVegBiryani) return true;
  return false;
}

function dedupeMissions(missions) {
  const seenIds = new Set();
  let seenVegBiryani = false;

  return missions.filter((mission) => {
    const id = getMissionKey(mission);
    if (seenIds.has(id)) return false;
    if (isDuplicateVegBiryani(mission, seenVegBiryani)) return false;

    seenIds.add(id);
    if (`${mission.foodName ?? ""}`.toLowerCase().includes("veg biryani")) {
      seenVegBiryani = true;
    }
    for (const item of mission.items ?? []) {
      if (item.name?.toLowerCase().includes("veg biryani")) seenVegBiryani = true;
    }

    return true;
  });
}

export default function VolunteerMyMissions() {
  const { recentMissions } = useVolunteerMissionContext();

  const tableRows = useMemo(() => {
    const historyIds = new Set(COMPLETED_MISSIONS_HISTORY.map((m) => m.id));
    const sessionOnly = recentMissions
      .map(mapRecentMission)
      .filter((m) => !historyIds.has(m.id));

    const allMissions = dedupeMissions([
      ...UPCOMING_MISSIONS_EXTENDED,
      ...sessionOnly,
      ...COMPLETED_MISSIONS_HISTORY,
    ]);

    return getMissionTableRows(allMissions);
  }, [recentMissions]);

  const upcomingCount = UPCOMING_MISSIONS_EXTENDED.length;
  const completedCount = COMPLETED_MISSIONS_HISTORY.length + recentMissions.filter(
    (m) => !COMPLETED_MISSIONS_HISTORY.some((h) => h.id === (m.id ?? m.missionId)),
  ).length;

  return (
    <div className={VOLUNTEER_STACK_GAP}>
      <section className={`rounded-none border border-[#E5E7EB] bg-white shadow-sm ${VOLUNTEER_SECTION_PAD}`}>
        <h1 className="text-lg font-bold text-[#0F172A]">My Missions</h1>
        <p className="mt-[0.3cm] text-xs text-[#64748B]">
          Expand any food item to view proof, timings, and verification details.
        </p>

        <div className="mt-[0.5cm] flex flex-wrap gap-[0.5cm] text-[10px] font-semibold">
          <span className="rounded-none bg-[#EFF6FF] px-2 py-1 text-[#1D4ED8]">
            {upcomingCount} upcoming
          </span>
          <span className="rounded-none bg-[#F0FDF4] px-2 py-1 text-[#15803D]">
            {completedCount} completed this month
          </span>
          <span className="rounded-none bg-[#F1F5F9] px-2 py-1 text-[#475569]">
            {tableRows.length} missions logged
          </span>
        </div>

        <VolunteerMissionsTable rows={tableRows} />
      </section>
    </div>
  );
}
