import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { VOLUNTEER_IDENTITY } from "../../../data/volunteerAssets";
import { VOLUNTEER_REVIEWS } from "../../../data/volunteerProfileData";

function StarRating({ rating }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar
          key={index}
          className={[
            "text-[10px]",
            rating >= index + 1 ? "text-[#F59E0B]" : "text-[#E2E8F0]",
          ].join(" ")}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export default function VolunteerReviewsFeedback() {
  const avgRating = VOLUNTEER_IDENTITY.rating;

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-[#0F172A]">Reviews & NGO Feedback</h2>
          <p className="mt-1 text-[10px] text-[#64748B]">
            Verified feedback from NGOs after food handover — builds donor and partner trust.
          </p>
        </div>
        <div className="rounded-none border border-[#FDE68A] bg-[#FFFBEB] px-4 py-2 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#B45309]">
            Average Rating
          </p>
          <p className="text-xl font-extrabold text-[#0F172A]">{avgRating.toFixed(1)} ★</p>
          <p className="text-[10px] text-[#64748B]">
            {VOLUNTEER_IDENTITY.reviewCount} verified reviews
          </p>
        </div>
      </div>

      <ul className="mt-[0.5cm] space-y-3">
        {VOLUNTEER_REVIEWS.map((review) => (
          <li
            key={review.id}
            className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-3"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-xs font-bold text-[#0F172A]">{review.ngo}</p>
                <p className="mt-0.5 text-[10px] text-[#64748B]">
                  {review.date} · {review.missionId}
                </p>
              </div>
              <StarRating rating={review.rating} />
            </div>

            <div className="relative mt-2 pl-4">
              <FaQuoteLeft
                className="absolute left-0 top-0.5 text-[10px] text-[#CBD5E1]"
                aria-hidden="true"
              />
              <p className="text-[11px] leading-relaxed text-[#475569]">{review.text}</p>
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {review.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-none border border-[#BBF7D0] bg-[#F0FDF4] px-2 py-0.5 text-[10px] font-semibold text-[#15803D]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
