import { Link } from "react-router-dom";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../../components/volunteer/VolunteerSectionShell";
import { DASHBOARD_ROUTES } from "../../constants/routes";

const FAQ = [
  {
    q: "How do I accept a pickup mission?",
    a: "Go to Available Pickups, review the route details, and accept a mission that fits your schedule.",
  },
  {
    q: "What if I cannot complete a delivery?",
    a: "Contact support immediately from Active Mission so the donation can be reassigned safely.",
  },
  {
    q: "How do I update my availability?",
    a: "Open Profile and update your city, service radius, and availability preferences.",
  },
];

export default function VolunteerHelp() {
  return (
    <VolunteerSectionShell>
      <VolunteerSectionTitle title="Help & Support" subtitle="Quick answers for volunteers" />
      <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:support@nourishbridge.org"
            className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 transition hover:border-[#BBF7D0]"
          >
            <p className="font-semibold text-[#15803D]">Email support</p>
            <p className="mt-1 text-sm text-[#64748B]">support@nourishbridge.org</p>
          </a>
          <Link
            to="/contact"
            className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 transition hover:border-[#BBF7D0]"
          >
            <p className="font-semibold text-[#15803D]">Contact page</p>
            <p className="mt-1 text-sm text-[#64748B]">Reach the NourishBridge team</p>
          </Link>
        </div>

        <div className="mt-6 space-y-3">
          {FAQ.map((item) => (
            <details key={item.q} className="rounded-xl border border-[#E5E7EB] p-4">
              <summary className="cursor-pointer font-semibold text-[#0F172A]">{item.q}</summary>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">{item.a}</p>
            </details>
          ))}
        </div>

        <Link
          to={DASHBOARD_ROUTES.volunteerProfile}
          className="mt-6 inline-flex text-sm font-semibold text-[#16A34A] hover:text-[#15803D]"
        >
          Update profile & availability →
        </Link>
      </section>
    </VolunteerSectionShell>
  );
}
