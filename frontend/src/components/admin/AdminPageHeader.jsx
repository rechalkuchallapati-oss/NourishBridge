import { FaShieldAlt } from "react-icons/fa";

export default function AdminPageHeader({ title, description }) {
  return (
    <div className="flex items-start gap-[0.5cm]">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-none bg-[#F0FDF4] text-[#16A34A]">
        <FaShieldAlt className="text-2xl" aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#16A34A]">Admin Console</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
