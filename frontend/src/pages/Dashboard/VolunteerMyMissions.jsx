import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import MissionSuccessModal from "../../components/volunteer/MissionSuccessModal";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";
import VolunteerMissionsTable from "../../components/volunteer/VolunteerMissionsTable";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../../components/volunteer/VolunteerSectionShell";
import {
  COMPLETED_MISSIONS_HISTORY,
  getMissionTableRows,
  UPCOMING_MISSIONS_EXTENDED,
} from "../../data/volunteerMissionHistory";
import {
  VOLUNTEER_CONTENT_STACK,
  VOLUNTEER_PAGE_SECTION_GAP,
} from "../../components/volunteer/volunteerDashboardStyles";
import { DASHBOARD_ROUTES } from "../../constants/routes";

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
  const navigate = useNavigate();
  const { recentMissions, completionCelebration, clearCompletionCelebration } =
    useVolunteerMissionContext();

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
  const completedCount =
    COMPLETED_MISSIONS_HISTORY.length +
    recentMissions.filter(
      (m) => !COMPLETED_MISSIONS_HISTORY.some((h) => h.id === (m.id ?? m.missionId)),
    ).length;

  return (
    <div className={VOLUNTEER_PAGE_SECTION_GAP}>
      <VolunteerSectionShell>
        <VolunteerSectionTitle
          heading="h1"
          title="My Missions"
          subtitle="Expand any food item to view proof, timings, and verification details."
          theme="emerald"
          icon={FaClipboardList}
        />

        <div className="flex flex-wrap gap-[0.5cm]">
          <span className="rounded-none bg-[#EFF6FF] px-3 py-1.5 text-xs font-semibold text-[#1D4ED8] transition-colors hover:bg-[#DBEAFE]">
            {upcomingCount} upcoming
          </span>
          <span className="rounded-none bg-[#F0FDF4] px-3 py-1.5 text-xs font-semibold text-[#15803D] transition-colors hover:bg-[#DCFCE7]">
            {completedCount} completed this month
          </span>
          <span className="rounded-none bg-[#F1F5F9] px-3 py-1.5 text-xs font-semibold text-[#475569] transition-colors hover:bg-[#E2E8F0]">
            {tableRows.length} missions logged
          </span>
        </div>

        <VolunteerMissionsTable rows={tableRows} />
      </VolunteerSectionShell>

      <MissionSuccessModal
        mission={completionCelebration}
        onClose={() => {
          clearCompletionCelebration();
          navigate(DASHBOARD_ROUTES.volunteerMissions);
        }}
      />
    </div>
  );
}
