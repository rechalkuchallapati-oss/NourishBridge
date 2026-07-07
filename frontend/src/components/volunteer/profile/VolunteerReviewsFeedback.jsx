import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useVolunteerMissionContext } from "../../../context/VolunteerMissionContext";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../VolunteerSectionShell";
import { VOLUNTEER_CONTENT_STACK, VOLUNTEER_INSET_LINE_GAP } from "../volunteerDashboardStyles";

function StarRating({ rating }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar
          key={index}
          className={[
            "text-sm",
            rating >= index + 1 ? "text-[#F59E0B]" : "text-[#E2E8F0]",
          ].join(" ")}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export default function VolunteerReviewsFeedback() {
  const { profileImpact, allReviews } = useVolunteerMissionContext();
  const avgRating = profileImpact.rating;

  return (
    <VolunteerSectionShell>
      <div className="flex flex-wrap items-start justify-between gap-[0.5cm]">
        <VolunteerSectionTitle
          title="Reviews & NGO Feedback"
          subtitle="Verified feedback from NGOs after food handover — builds donor and partner trust."
          theme="amber"
          icon={FaStar}
          compact
        />
        <div className="rounded-none border border-[#FDE68A] bg-[#FFFBEB] px-5 py-3 text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-[#B45309]">Average Rating</p>
          <p className={`${VOLUNTEER_INSET_LINE_GAP} text-2xl font-extrabold text-[#0F172A]`}>
            {avgRating.toFixed(1)} ★
          </p>
          <p className="text-xs text-[#64748B]">{profileImpact.reviewCount} verified reviews</p>
        </div>
      </div>

      <ul className={VOLUNTEER_CONTENT_STACK}>
        {allReviews.map((review, index) => (
          <motion.li
            key={review.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01, x: 4 }}
            className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-[0.5cm] transition-colors hover:border-[#BBF7D0] hover:bg-[#FAFFFA]"
          >
            <div className="flex flex-wrap items-start justify-between gap-[0.5cm]">
              <div>
                <p className="text-sm font-bold text-[#0F172A]">{review.ngo}</p>
                <p className={`${VOLUNTEER_INSET_LINE_GAP} text-xs text-[#64748B]`}>
                  {review.date} · {review.missionId}
                </p>
              </div>
              <StarRating rating={review.rating} />
            </div>

            <div className={`relative ${VOLUNTEER_INSET_LINE_GAP} pl-5`}>
              <FaQuoteLeft
                className="absolute left-0 top-1 text-xs text-[#CBD5E1]"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-[#475569]">{review.text}</p>
            </div>

            <div className={`flex flex-wrap gap-[0.5cm] ${VOLUNTEER_INSET_LINE_GAP}`}>
              {review.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-none border border-[#BBF7D0] bg-[#F0FDF4] px-2.5 py-1 text-xs font-semibold text-[#15803D]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.li>
        ))}
      </ul>
    </VolunteerSectionShell>
  );
}
