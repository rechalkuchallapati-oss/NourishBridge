import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHandsHelping, FaMapMarkedAlt } from "react-icons/fa";
import { AREAS_IMPACTED, COMMUNITIES_SUPPORTED } from "../../../data/volunteerImpactPageData";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../VolunteerSectionShell";
import { VOLUNTEER_CONTENT_STACK, VOLUNTEER_INSET_LINE_GAP } from "../volunteerDashboardStyles";

export default function VolunteerCommunitiesAreasPanel() {
  const [activeAreaId, setActiveAreaId] = useState(AREAS_IMPACTED.find((a) => a.active)?.id ?? null);

  const activeArea = AREAS_IMPACTED.find((area) => area.id === activeAreaId);

  return (
    <div className={`grid ${VOLUNTEER_CONTENT_STACK} lg:grid-cols-2`}>
      <VolunteerSectionShell>
        <VolunteerSectionTitle
          title="Communities Supported"
          subtitle="Breakdown by receiving NGO partner."
          theme="emerald"
          icon={FaHandsHelping}
          compact
        />

        <ul className={VOLUNTEER_CONTENT_STACK}>
          {COMMUNITIES_SUPPORTED.map((community) => (
            <motion.li
              key={community.id}
              whileHover={{ scale: 1.01, x: 4 }}
              className="rounded-none border border-transparent p-[0.35cm] transition-colors hover:border-[#BBF7D0] hover:bg-[#F0FDF4]/60"
            >
              <div className="flex items-center justify-between gap-[0.5cm] text-sm">
                <span className="min-w-0 truncate font-semibold text-[#0F172A]">{community.name}</span>
                <span className="shrink-0 font-bold text-[#15803D]">{community.meals} meals</span>
              </div>
              <div className={`${VOLUNTEER_INSET_LINE_GAP} flex items-center gap-[0.5cm]`}>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E2E8F0]">
                  <div
                    className="h-full rounded-full bg-[#16A34A] transition-all"
                    style={{ width: `${community.share}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs font-semibold text-[#64748B]">
                  {community.share}%
                </span>
              </div>
              <p className={`${VOLUNTEER_INSET_LINE_GAP} text-xs text-[#94A3B8]`}>
                {community.missions} missions
              </p>
            </motion.li>
          ))}
        </ul>
      </VolunteerSectionShell>

      <VolunteerSectionShell>
        <VolunteerSectionTitle
          title="Areas Impacted"
          subtitle="Tap a circle to see the area served across Hyderabad."
          theme="green"
          icon={FaMapMarkedAlt}
          compact
        />

        <div className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-[#F8FAFC]">
          <svg viewBox="0 0 100 80" className="h-48 w-full" role="img" aria-label="Areas impacted map">
            <rect width="100" height="80" fill="#F0FDF4" />
            <circle
              cx="50"
              cy="40"
              r="28"
              fill="#BBF7D0"
              fillOpacity="0.35"
              stroke="#16A34A"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />
            {AREAS_IMPACTED.map((area, index) => {
              const angle = (index / AREAS_IMPACTED.length) * Math.PI * 2 - Math.PI / 2;
              const cx = 50 + Math.cos(angle) * 22;
              const cy = 40 + Math.sin(angle) * 18;
              const isActive = activeAreaId === area.id;

              return (
                <g key={area.id}>
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r={isActive ? 5 : area.active ? 3.5 : 2.5}
                    fill={isActive ? "#15803D" : area.active ? "#16A34A" : "#94A3B8"}
                    fillOpacity={isActive ? 1 : area.active ? 0.9 : 0.6}
                    stroke="#fff"
                    strokeWidth="0.8"
                    className="cursor-pointer"
                    onClick={() => setActiveAreaId(area.id)}
                    whileHover={{ scale: 1.35 }}
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 1.2, repeat: isActive ? Infinity : 0 }}
                  />
                  {isActive ? (
                    <motion.circle
                      cx={cx}
                      cy={cy}
                      r="8"
                      fill="none"
                      stroke="#16A34A"
                      strokeWidth="0.6"
                      strokeOpacity="0.5"
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ scale: 1.4, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  ) : null}
                </g>
              );
            })}
            <circle cx="50" cy="40" r="2" fill="#16A34A" stroke="#fff" strokeWidth="0.5" />
          </svg>

          <AnimatePresence mode="wait">
            {activeArea ? (
              <motion.div
                key={activeArea.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute bottom-[0.5cm] left-[0.5cm] right-[0.5cm] rounded-none border border-[#BBF7D0] bg-[#F0FDF4]/95 px-[0.5cm] py-[0.4cm] shadow-md"
              >
                <p className="text-sm font-bold text-[#15803D]">{activeArea.label}</p>
                <p className={`${VOLUNTEER_INSET_LINE_GAP} text-xs text-[#64748B]`}>
                  {activeArea.missions} missions · {activeArea.meals} meals delivered
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <ul className={VOLUNTEER_CONTENT_STACK}>
          {AREAS_IMPACTED.map((area) => (
            <motion.li
              key={area.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => setActiveAreaId(area.id)}
              className={[
                "flex cursor-pointer items-center justify-between gap-[0.5cm] rounded-none border px-[0.5cm] py-[0.4cm] text-sm transition-colors",
                activeAreaId === area.id
                  ? "border-[#BBF7D0] bg-[#F0FDF4]"
                  : "border-[#F1F5F9] bg-[#FAFAFA] hover:border-[#BBF7D0]",
              ].join(" ")}
            >
              <span className="font-semibold text-[#0F172A]">{area.label}</span>
              <span className="text-xs text-[#64748B]">
                {area.missions} missions · {area.meals} meals
              </span>
            </motion.li>
          ))}
        </ul>
      </VolunteerSectionShell>
    </div>
  );
}
