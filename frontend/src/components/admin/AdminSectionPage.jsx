import { motion } from "framer-motion";
import AdminPageHeader from "./AdminPageHeader";
import { AdminStatCard } from "../dashboard/AdminLayout";
import { ADMIN_SECTIONS } from "../../data/adminSections";

const EASE = [0.22, 1, 0.36, 1];

export default function AdminSectionPage({ sectionId }) {
  const section = ADMIN_SECTIONS[sectionId];

  if (!section) {
    return (
      <div className="rounded-none border border-[#E5E7EB] bg-white p-6">
        <p className="text-sm text-[#64748B]">Section not found.</p>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#EEF2FF]/60 via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
    >
      <div className="flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6">
        <AdminPageHeader title={section.title} description={section.description} />

        {section.stats.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {section.stats.map((stat) => (
              <AdminStatCard
                key={stat.key}
                label={stat.label}
                value={stat.value}
                accent={stat.accent}
              />
            ))}
          </div>
        ) : null}

        <div className="overflow-x-auto rounded-none border border-[#E5E7EB] bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
              <tr>
                {section.columns.map((col) => (
                  <th key={col} className="px-4 py-3">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-[#E5E7EB] transition-colors last:border-0 hover:bg-[#F8FAFC]"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={[
                        "px-4 py-3",
                        cellIndex === 0 ? "font-semibold text-[#4338CA]" : "text-[#64748B]",
                      ].join(" ")}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  );
}
