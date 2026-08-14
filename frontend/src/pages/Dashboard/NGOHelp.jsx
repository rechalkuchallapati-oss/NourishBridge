import { Link } from "react-router-dom";
import NGOLayout from "../../components/dashboard/NGOLayout";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const FAQ = [
  {
    q: "How do I accept incoming donations?",
    a: "Open Incoming Donations, review details, and accept donations that match your capacity and service area.",
  },
  {
    q: "How do volunteers get assigned?",
    a: "After you accept a donation, the platform notifies nearby verified volunteers for pickup and delivery.",
  },
  {
    q: "Who do I contact for verification issues?",
    a: "Email support@nourishbridge.org with your NGO registration details and we will assist you.",
  },
];

export default function NGOHelp() {
  const user = getSessionUser();

  return (
    <NGOLayout title="NGO Dashboard" subtitle="Help & Support" userName={getNgoDisplayName(user)}>
      <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-[#0F172A]">Help & Support</h1>
        <p className="mt-2 text-sm leading-6 text-[#64748B] sm:text-base">
          Need assistance with donations, volunteers, or verification? We are here to help.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:support@nourishbridge.org"
            className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 transition hover:border-[#BBF7D0] hover:bg-[#F0FDF4]"
          >
            <p className="font-semibold text-[#15803D]">Email support</p>
            <p className="mt-1 text-sm text-[#64748B]">support@nourishbridge.org</p>
          </a>
          <Link
            to="/contact"
            className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 transition hover:border-[#BBF7D0] hover:bg-[#F0FDF4]"
          >
            <p className="font-semibold text-[#15803D]">Contact page</p>
            <p className="mt-1 text-sm text-[#64748B]">Send us a message through the website</p>
          </Link>
        </div>

        <div className="mt-8 space-y-4">
          {FAQ.map((item) => (
            <details key={item.q} className="rounded-xl border border-[#E5E7EB] bg-white p-4">
              <summary className="cursor-pointer font-semibold text-[#0F172A]">{item.q}</summary>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </NGOLayout>
  );
}
