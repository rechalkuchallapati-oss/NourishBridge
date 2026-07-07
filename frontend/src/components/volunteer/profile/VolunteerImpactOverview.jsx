import { motion } from "framer-motion";
import { FaChartPie } from "react-icons/fa";
import { useVolunteerMissionContext } from "../../../context/VolunteerMissionContext";
import { VOLUNTEER_IMPACT } from "../../../data/volunteerMission";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../VolunteerSectionShell";
import { volunteerInteractive, VOLUNTEER_CONTENT_STACK, VOLUNTEER_INSET_LINE_GAP } from "../volunteerDashboardStyles";

const ACCENT_STYLES = {
  green: "border-[#BBF7D0] bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7]/50 text-[#15803D]",
  blue: "border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE]/50 text-[#2563EB]",
  amber: "border-[#FDE68A] bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7]/50 text-[#B45309]",
  purple: "border-[#DDD6FE] bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE]/50 text-[#7C3AED]",
};

export default function VolunteerImpactOverview() {
  const { profileImpact } = useVolunteerMissionContext();

  const impactItems = [
    {
      id: "missions",
      label: "Missions Completed",
      displayValue: String(profileImpact.missionsCompleted),
      accent: "green",
    },
    {
      id: "meals",
      label: "Meals Delivered",
      displayValue: profileImpact.mealsDelivered.toLocaleString(),
      accent: "blue",
    },
    {
      id: "food_rescued",
      label: "Food Rescued",
      displayValue: `${VOLUNTEER_IMPACT.foodRescuedKg} kg`,
      accent: "amber",
    },
    {
      id: "people",
      label: "People Supported",
      displayValue: VOLUNTEER_IMPACT.peopleSupported.toLocaleString(),
      accent: "purple",
    },
  ];

  return (
    <VolunteerSectionShell>
      <VolunteerSectionTitle
        title="Impact Overview"
        subtitle="Your cumulative contribution across all completed rescue missions."
        theme="green"
        icon={FaChartPie}
        compact
      />

      <div className={`grid ${VOLUNTEER_CONTENT_STACK} sm:grid-cols-2 lg:grid-cols-4`}>
        {impactItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className={[
              "rounded-none border p-[0.5cm]",
              ACCENT_STYLES[item.accent] ?? ACCENT_STYLES.green,
              volunteerInteractive.card,
            ].join(" ")}
          >
            <p className="text-xs font-bold uppercase tracking-wide opacity-80">{item.label}</p>
            <p className={`${VOLUNTEER_INSET_LINE_GAP} text-2xl font-extrabold tabular-nums`}>
              {item.displayValue}
            </p>
          </motion.div>
        ))}
      </div>
    </VolunteerSectionShell>
  );
}
