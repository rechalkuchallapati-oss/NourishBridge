import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function NGOModal({ title, children, onClose, wide = false }) {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ngo-modal-title"
      onClick={onClose}
    >
      <div
        className={[
          "max-h-[90vh] w-full overflow-y-auto rounded-none border border-[#E5E7EB] bg-white shadow-2xl",
          wide ? "max-w-3xl" : "max-w-lg",
        ].join(" ")}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-[#E5E7EB] bg-white px-5 py-4">
          <h2 id="ngo-modal-title" className="text-lg font-bold text-[#0F172A] sm:text-xl">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-none border border-[#E5E7EB] text-[#64748B] transition-colors hover:bg-[#F8FAFC] hover:text-[#0F172A]"
            aria-label="Close"
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
