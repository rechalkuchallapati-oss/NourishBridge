import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowDown, FaArrowRight, FaBoxOpen } from "react-icons/fa";
import VolunteerPickupRequestCard from "../../components/volunteer/VolunteerPickupRequestCard";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../../components/volunteer/VolunteerSectionShell";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { VOLUNTEER_CONTENT_STACK, VOLUNTEER_PAGE_SECTION_GAP } from "../../components/volunteer/volunteerDashboardStyles";

export default function VolunteerAvailablePickups() {
  const navigate = useNavigate();
  const { activeMission, availablePickups, isAvailable, acceptMission } =
    useVolunteerMissionContext();

  return (
    <div className={VOLUNTEER_PAGE_SECTION_GAP}>
      <Toaster position="top-center" />
      <VolunteerSectionShell>
        <div className="relative">
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -left-1 top-1/2 hidden -translate-y-1/2 text-[#16A34A]/40 sm:block"
            animate={{ x: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaArrowRight className="text-2xl" />
          </motion.span>
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -right-1 top-1/2 hidden -translate-y-1/2 text-[#16A34A]/40 sm:block"
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          >
            <FaArrowRight className="rotate-180 text-2xl" />
          </motion.span>

          <VolunteerSectionTitle
            heading="h1"
            title="Available Pickups"
            subtitle="All nearby donation requests you can accept for pickup and delivery."
            theme="green"
            icon={FaBoxOpen}
          />
        </div>

        <motion.div
          aria-hidden="true"
          className="flex justify-center text-[#16A34A]/50"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaArrowDown />
        </motion.div>

        <ul className={VOLUNTEER_CONTENT_STACK}>
          {availablePickups.map((pickup, index) => (
            <VolunteerPickupRequestCard
              key={pickup.id}
              pickup={pickup}
              disabled={!!activeMission || !isAvailable}
              index={index}
              onAccept={(item) => {
                if (acceptMission(item)) {
                  toast.success("Mission accepted — opening Active Mission.");
                  navigate(DASHBOARD_ROUTES.volunteerActive);
                } else {
                  toast.error("Cannot accept — check availability or active mission.");
                }
              }}
            />
          ))}
        </ul>
      </VolunteerSectionShell>
    </div>
  );
}
