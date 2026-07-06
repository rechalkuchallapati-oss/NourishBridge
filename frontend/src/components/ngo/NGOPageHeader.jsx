import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export default function NGOPageHeader({ icon: Icon, title, description, actions }) {
  return (
    <motion.header
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex flex-col gap-[0.5cm] sm:flex-row sm:items-start sm:justify-between"
    >
      <div className="flex items-start gap-[0.5cm] sm:items-center">
        {Icon ? (
          <motion.span
            className="group flex h-14 w-14 shrink-0 items-center justify-center rounded-none bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)]"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.06 }}
          >
            <Icon className="text-2xl" aria-hidden="true" />
          </motion.span>
        ) : null}
        <div className="flex flex-col gap-[0.3cm]">
          <h1 className="bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </motion.header>
  );
}
