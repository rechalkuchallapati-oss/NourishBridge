import { Link } from "react-router-dom";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../../components/volunteer/VolunteerSectionShell";
import { DASHBOARD_ROUTES } from "../../constants/routes";

export default function VolunteerSettings() {
  return (
    <VolunteerSectionShell>
      <VolunteerSectionTitle title="Settings" subtitle="Manage your volunteer preferences" />
      <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <p className="text-sm leading-6 text-[#64748B] sm:text-base">
          Notification preferences and profile details are managed from your profile page.
        </p>
        <Link
          to={DASHBOARD_ROUTES.volunteerProfile}
          className="mt-4 inline-flex h-11 items-center rounded-xl bg-[#16A34A] px-5 text-sm font-semibold text-white transition hover:bg-[#15803D]"
        >
          Open Profile
        </Link>
      </section>
    </VolunteerSectionShell>
  );
}
