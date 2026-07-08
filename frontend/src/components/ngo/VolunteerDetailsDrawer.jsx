import { FaCertificate, FaPhone, FaStar } from "react-icons/fa";
import { getVolunteerAvatar } from "../../data/volunteerAssets";
import {
  VOLUNTEER_STATUS_COLORS,
  VOLUNTEER_STATUS_ICONS,
  VOLUNTEER_STATUS_LABELS,
} from "../../data/ngoVolunteers";
import NGODetailsDrawer from "./NGODetailsDrawer";

function DetailBlock({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">{label}</p>
      <p className="mt-1 text-sm font-medium text-[#0F172A]">{value}</p>
    </div>
  );
}

function getProfilePhoto(key) {
  const map = {
    volunteer_primary: "primary",
    volunteer_alt1: "alt1",
    volunteer_alt2: "alt2",
  };
  return getVolunteerAvatar(map[key] ?? "primary");
}

export default function VolunteerDetailsDrawer({ volunteer, onClose }) {
  if (!volunteer) return null;

  const photo = getProfilePhoto(volunteer.profilePhotoKey);

  return (
    <NGODetailsDrawer
      open={Boolean(volunteer)}
      title={`${volunteer.name} · ${volunteer.id}`}
      onClose={onClose}
    >
      <div className="flex flex-col gap-[0.5cm]">
        {photo ? (
          <img
            src={photo}
            alt={volunteer.name}
            className="mx-auto h-24 w-24 rounded-none object-cover ring-2 ring-[#E5E7EB]"
          />
        ) : (
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-none bg-[#F1F5F9] text-2xl font-bold text-[#64748B]">
            {volunteer.name.charAt(0)}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-600">
            <FaStar aria-hidden="true" />
            {volunteer.rating}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-none px-2.5 py-1 text-xs font-semibold ${VOLUNTEER_STATUS_COLORS[volunteer.status]}`}
          >
            {VOLUNTEER_STATUS_ICONS[volunteer.status]} {VOLUNTEER_STATUS_LABELS[volunteer.status]}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <DetailBlock label="Contact" value={volunteer.phone} />
          <DetailBlock label="Email" value={volunteer.email} />
          <DetailBlock label="Vehicle" value={volunteer.vehicleDetails} />
          <DetailBlock label="Availability" value={volunteer.availability} />
          <DetailBlock label="Current Mission" value={volunteer.currentMission} />
          <DetailBlock label="Location" value={volunteer.location} />
        </div>

        <section className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-[0.5cm]">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#64748B]">
            <FaCertificate aria-hidden="true" />
            Certificates
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {volunteer.certificates.map((cert) => (
              <li
                key={cert}
                className="rounded-none border border-[#DBEAFE] bg-[#EFF6FF] px-2 py-1 text-xs font-medium text-[#1D4ED8]"
              >
                {cert}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
            Today&apos;s Schedule
          </p>
          <ul className="mt-2 flex flex-col gap-2">
            {volunteer.todaysSchedule.map((item) => (
              <li
                key={item.time + item.task}
                className="flex gap-3 rounded-none border border-[#E5E7EB] bg-white px-3 py-2 text-sm"
              >
                <span className="shrink-0 font-semibold text-[#2563EB]">{item.time}</span>
                <span className="text-[#64748B]">{item.task}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
            Mission History
          </p>
          {volunteer.missionHistory.length ? (
            <ul className="mt-2 flex flex-col gap-2">
              {volunteer.missionHistory.map((m) => (
                <li
                  key={m.id}
                  className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-sm"
                >
                  <p className="font-semibold text-[#0F172A]">
                    {m.id} · {m.type}
                  </p>
                  <p className="text-xs text-[#64748B]">
                    {m.date} · {m.destination} · {m.status}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-[#64748B]">No recent missions.</p>
          )}
        </section>

        {volunteer.reviews.length ? (
          <section>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">Reviews</p>
            <ul className="mt-2 flex flex-col gap-2">
              {volunteer.reviews.map((review) => (
                <li
                  key={review.author + review.text}
                  className="rounded-none border border-[#FEF3C7] bg-[#FFFBEB] px-3 py-2 text-sm"
                >
                  <p className="font-semibold text-[#0F172A]">
                    {review.author} · {"⭐".repeat(review.rating)}
                  </p>
                  <p className="text-[#64748B]">{review.text}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <a
          href={`tel:${volunteer.phone.replace(/\s/g, "")}`}
          className="flex items-center justify-center gap-2 rounded-none bg-[#16A34A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#15803D]"
        >
          <FaPhone aria-hidden="true" />
          Call Volunteer
        </a>
      </div>
    </NGODetailsDrawer>
  );
}
