import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaStar,
  FaTruck,
  FaUtensils,
} from "react-icons/fa";
import VolunteerLayout, { VolunteerStatCard } from "../../components/dashboard/VolunteerLayout";
import CurrentMissionPanel, { AvailablePickupCard } from "../../components/volunteer/CurrentMissionPanel";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";
import { getVolunteerFoodImage } from "../../data/volunteerAssets";
import {
  TODAYS_SCHEDULE,
  UPCOMING_MISSIONS,
  VOLUNTEER_IMPACT,
} from "../../data/volunteerMission";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { getVolunteerDisplayName, getSessionUser } from "../../utils/authStorage";

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
    recentMissions,
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
      toast.success("Mission accepted — en route to donor.");
    }
  };

  return (
    <VolunteerLayout>
      <Toaster position="top-center" />

      <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-[#0F172A] sm:text-2xl">
              {getGreeting()}, {volunteerName} 👋
            </h1>
            <p className="mt-1 text-xs text-[#64748B] sm:text-sm">
              Ready to rescue food and create impact today?
            </p>
          </div>
          <button
            type="button"
            onClick={toggleAvailability}
            className={[
              "inline-flex items-center gap-2 rounded-none px-3 py-1.5 text-xs font-semibold",
              isAvailable
                ? "bg-[#F0FDF4] text-[#15803D]"
                : "bg-[#F1F5F9] text-[#64748B]",
            ].join(" ")}
          >
            <span
              className={`h-2 w-2 rounded-full ${isAvailable ? "bg-[#16A34A]" : "bg-[#94A3B8]"}`}
            />
            {isAvailable ? "Available for Missions" : "Unavailable"}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          <VolunteerStatCard
            label="Available Pickups"
            value={availablePickups.length}
            icon={FaBoxOpen}
            accent="amber"
          />
          <VolunteerStatCard
            label="Active Mission"
            value={activeMission ? 1 : 0}
            icon={FaTruck}
            accent="green"
          />
          <VolunteerStatCard
            label="Completed Today"
            value={completedToday}
            icon={FaCheckCircle}
            accent="blue"
          />
          <VolunteerStatCard
            label="Meals Delivered"
            value={VOLUNTEER_IMPACT.mealsDelivered}
            caption="All time"
            icon={FaUtensils}
            accent="purple"
          />
          <VolunteerStatCard
            label="Impact Points"
            value="1,240"
            icon={FaStar}
            accent="slate"
          />
        </div>
      </section>

      <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0F172A]">Available Pickup Requests</h2>
            <Link
              to={DASHBOARD_ROUTES.volunteerPickups}
              className="text-xs font-semibold text-[#16A34A] hover:text-[#15803D]"
            >
              View all
            </Link>
          </div>
          <ul className="mt-3 flex flex-col gap-2">
            {availablePickups.slice(0, 3).map((pickup) => (
              <AvailablePickupCard
                key={pickup.id}
                pickup={pickup}
                foodImage={getVolunteerFoodImage(pickup.foodKey)}
                onAccept={handleAccept}
                disabled={!!activeMission || !isAvailable}
              />
            ))}
          </ul>
        </section>

        <CurrentMissionPanel
          mission={activeMission}
          onAdvance={setMissionStatus}
          onComplete={completeMission}
          compact
        />
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <h2 className="text-sm font-bold text-[#0F172A]">Today&apos;s Schedule</h2>
          <ul className="mt-2 space-y-2">
            {TODAYS_SCHEDULE.map((item) => (
              <li
                key={item.id}
                className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-2.5 py-2 text-xs"
              >
                <span className="font-semibold text-[#16A34A]">{item.time}</span>
                <p className="mt-0.5 font-medium text-[#0F172A]">{item.title}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0F172A]">Recent Missions</h2>
            <Link
              to={DASHBOARD_ROUTES.volunteerMissions}
              className="text-xs font-semibold text-[#16A34A]"
            >
              View all
            </Link>
          </div>
          <ul className="mt-2 space-y-2">
            {recentMissions.slice(0, 3).map((item) => (
              <li key={item.id} className="text-xs">
                <p className="font-semibold text-[#0F172A]">{item.foodName}</p>
                <p className="text-[10px] text-[#64748B]">
                  {item.donor} → {item.ngo} · {item.completedAt}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0F172A]">My Impact</h2>
            <Link
              to={DASHBOARD_ROUTES.volunteerImpact}
              className="text-xs font-semibold text-[#16A34A]"
            >
              View all
            </Link>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-none border border-[#DCFCE7] bg-[#F0FDF4] p-2">
              <p className="text-lg font-bold text-[#15803D]">{VOLUNTEER_IMPACT.missionsCompleted}</p>
              <p className="text-[10px] text-[#64748B]">Missions completed</p>
            </div>
            <div className="rounded-none border border-[#DBEAFE] bg-[#EFF6FF] p-2">
              <p className="text-lg font-bold text-[#2563EB]">
                {VOLUNTEER_IMPACT.mealsDelivered.toLocaleString("en-IN")}
              </p>
              <p className="text-[10px] text-[#64748B]">Meals delivered</p>
            </div>
            <div className="rounded-none border border-[#FEF3C7] bg-[#FFFBEB] p-2">
              <p className="text-lg font-bold text-[#D97706]">{VOLUNTEER_IMPACT.foodRescuedKg} kg</p>
              <p className="text-[10px] text-[#64748B]">Food rescued</p>
            </div>
            <div className="rounded-none border border-[#EDE9FE] bg-[#F5F3FF] p-2">
              <p className="text-lg font-bold text-[#7C3AED]">{VOLUNTEER_IMPACT.peopleSupported}</p>
              <p className="text-[10px] text-[#64748B]">People supported</p>
            </div>
          </div>
          {UPCOMING_MISSIONS.length > 0 ? (
            <p className="mt-2 text-[10px] text-[#64748B]">
              Next: {UPCOMING_MISSIONS[0].foodName} — {UPCOMING_MISSIONS[0].pickup}
            </p>
          ) : null}
        </section>
      </div>
    </VolunteerLayout>
  );
}
