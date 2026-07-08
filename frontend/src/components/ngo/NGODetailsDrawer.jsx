import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export default function NGODetailsDrawer({ open, title, onClose, children, footer }) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-[#E5E7EB] bg-white shadow-2xl sm:max-w-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ngo-drawer-title"
          >
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
              <h2 id="ngo-drawer-title" className="text-lg font-bold text-[#0F172A]">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-none border border-[#E5E7EB] text-[#64748B] transition-colors hover:bg-[#F8FAFC]"
                aria-label="Close drawer"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">{children}</div>
            {footer ? (
              <div className="border-t border-[#E5E7EB] bg-[#F8FAFC] p-5">{footer}</div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
