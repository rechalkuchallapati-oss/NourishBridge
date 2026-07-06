import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";
import { RECENT_MISSIONS, UPCOMING_MISSIONS } from "../../data/volunteerMission";

export default function VolunteerMyMissions() {
  const { recentMissions } = useVolunteerMissionContext();

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm">
        <h1 className="text-lg font-bold text-[#0F172A]">My Missions</h1>
        <p className="mt-1 text-xs text-[#64748B]">Upcoming and completed assignments.</p>

        <h2 className="mt-4 text-sm font-bold text-[#0F172A]">Upcoming</h2>
        <ul className="mt-2 space-y-2">
          {UPCOMING_MISSIONS.map((item) => (
            <li key={item.id} className="rounded-none border border-[#DBEAFE] bg-[#EFF6FF] p-3 text-xs">
              <p className="font-bold text-[#0F172A]">{item.foodName}</p>
              <p className="text-[#64748B]">{item.pickup} · {item.ngo}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-4 text-sm font-bold text-[#0F172A]">Completed</h2>
        <ul className="mt-2 space-y-2">
          {[...recentMissions, ...RECENT_MISSIONS].slice(0, 6).map((item, index) => (
            <li key={`${item.id}-${index}`} className="rounded-none border border-[#E5E7EB] p-3 text-xs">
              <p className="font-bold text-[#0F172A]">{item.foodName}</p>
              <p className="text-[#64748B]">
                {item.donor} → {item.ngo} · ~{item.meals} meals · {item.completedAt}
              </p>
            </li>
          ))}
        </ul>
      </section>
  );
}
