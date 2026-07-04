import { FaClock, FaEnvelope, FaTimes } from "react-icons/fa";
import { authMenuClass, authMenuItemClass } from "./authStyles";
import { removeRecentEmail } from "../../utils/recentEmails";

export default function EmailSuggestions({
  emails,
  onSelect,
  onDismiss,
  title = "Previously used",
}) {
  if (!emails.length) return null;

  return (
    <div className={authMenuClass} role="listbox" aria-label="Previously used emails">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-[#F8FAFC] px-4 py-2.5">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#64748B] sm:text-sm">
          <FaClock className="text-[#16A34A]" aria-hidden="true" />
          {title}
        </p>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-md p-1 text-[#94A3B8] transition-colors hover:bg-white hover:text-[#64748B]"
          aria-label="Close suggestions"
        >
          <FaTimes className="text-sm" />
        </button>
      </div>

      <ul>
        {emails.map((item) => (
          <li key={item}>
            <div className="group flex items-center">
              <button
                type="button"
                role="option"
                onClick={() => onSelect(item)}
                className={`${authMenuItemClass} flex-1`}
              >
                <FaEnvelope
                  className="shrink-0 text-[#16A34A]"
                  aria-hidden="true"
                />
                <span className="truncate">{item}</span>
              </button>
              <button
                type="button"
                onClick={() => removeRecentEmail(item)}
                className="mr-3 rounded-md p-1.5 text-[#94A3B8] opacity-0 transition-all hover:bg-[#FEE2E2] hover:text-red-500 group-hover:opacity-100"
                aria-label={`Remove ${item} from suggestions`}
              >
                <FaTimes className="text-xs" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
