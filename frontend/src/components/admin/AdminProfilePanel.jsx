import { FaEnvelope, FaPhone, FaShieldAlt, FaUser } from "react-icons/fa";
import { ADMIN_PROFILE } from "../../data/adminDashboard";

export default function AdminProfilePanel() {
  return (
    <aside className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm lg:sticky lg:top-6">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-none bg-[#EEF2FF] text-2xl font-bold text-[#4338CA]">
          PA
        </span>
        <h2 className="mt-3 text-lg font-bold text-[#0F172A]">{ADMIN_PROFILE.name}</h2>
        <span className="mt-1 inline-flex items-center gap-1 rounded-none border border-[#E0E7FF] bg-[#EEF2FF] px-2.5 py-1 text-xs font-semibold text-[#4338CA]">
          <FaShieldAlt aria-hidden="true" />
          {ADMIN_PROFILE.role}
        </span>
      </div>

      <dl className="mt-5 flex flex-col gap-3 border-t border-[#E5E7EB] pt-4 text-sm">
        <div className="flex items-start gap-2">
          <FaUser className="mt-0.5 shrink-0 text-[#94A3B8]" aria-hidden="true" />
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">Department</dt>
            <dd className="mt-0.5 font-medium text-[#0F172A]">{ADMIN_PROFILE.department}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <FaEnvelope className="mt-0.5 shrink-0 text-[#94A3B8]" aria-hidden="true" />
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">Email</dt>
            <dd className="mt-0.5 break-all font-medium text-[#0F172A]">{ADMIN_PROFILE.email}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <FaPhone className="mt-0.5 shrink-0 text-[#94A3B8]" aria-hidden="true" />
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">Phone</dt>
            <dd className="mt-0.5 font-medium text-[#0F172A]">{ADMIN_PROFILE.phone}</dd>
          </div>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">Last Login</dt>
          <dd className="mt-0.5 font-medium text-[#64748B]">{ADMIN_PROFILE.lastLogin}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">Member Since</dt>
          <dd className="mt-0.5 font-medium text-[#64748B]">{ADMIN_PROFILE.memberSince}</dd>
        </div>
      </dl>
    </aside>
  );
}
