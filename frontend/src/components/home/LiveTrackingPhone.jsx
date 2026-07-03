import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaBuilding,
  FaUser,
  FaUtensils,
  FaTruck,
  FaLeaf,
  FaSignal,
  FaWifi,
  FaBatteryFull,
} from "react-icons/fa";

function PhoneScreen() {
  return (
    <div className="flex h-full flex-col bg-[#F8FAFC]">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 text-[9px] font-semibold text-[#0F172A]">
        <span>9:41</span>
        <div className="flex items-center gap-1 text-[8px]">
          <FaSignal />
          <FaWifi />
          <FaBatteryFull />
        </div>
      </div>

      {/* App header */}
      <div className="border-b border-[#E5E7EB]/80 bg-white px-4 pb-3 pt-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E8F8EF]">
            <FaLeaf className="text-xs text-[#16A34A]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#0F172A]">NourishBridge</p>
            <p className="text-[8px] text-[#64748B]">Live Delivery</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden px-4 py-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
          Live Delivery Progress
        </p>

        {/* Progress */}
        <div className="mt-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-[#E5E7EB]/60">
          <div className="flex items-center justify-between text-[9px]">
            <span className="font-semibold text-[#0F172A]">In Transit</span>
            <span className="font-bold text-[#16A34A]">68%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E8F8EF]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#16A34A] to-[#22C55E]"
              initial={{ width: "0%" }}
              animate={{ width: "68%" }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[8px] text-[#94A3B8]">
            <span>Picked up</span>
            <span>Delivering</span>
            <span>NGO</span>
          </div>
        </div>

        {/* Mini map strip */}
        <div className="relative mt-3 h-20 overflow-hidden rounded-xl bg-gradient-to-br from-[#E8F8EF] to-[#DCFCE7] ring-1 ring-[#E5E7EB]/50">
          <div className="absolute inset-0 opacity-30">
            <svg className="h-full w-full" viewBox="0 0 200 80" preserveAspectRatio="none">
              <path d="M0 40 Q50 20 100 45 T200 35" stroke="#16A34A" strokeWidth="2" fill="none" strokeDasharray="4 4" />
            </svg>
          </div>
          <FaMapMarkerAlt className="absolute left-4 top-3 text-[#16A34A]" />
          <FaBuilding className="absolute bottom-3 right-4 text-[#16A34A]" />
          <motion.div
            className="absolute left-[45%] top-[38%] flex h-5 w-5 items-center justify-center rounded-full bg-[#16A34A] text-white shadow-md"
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaTruck className="text-[8px]" />
          </motion.div>
        </div>

        {/* Details */}
        <div className="mt-3 space-y-2">
          <DetailRow
            icon={FaMapMarkerAlt}
            label="Pickup"
            value="Spice Garden Restaurant, Banjara Hills"
          />
          <DetailRow
            icon={FaBuilding}
            label="NGO Destination"
            value="Akshaya Patra Community Kitchen"
          />
          <DetailRow icon={FaUser} label="Volunteer" value="Rahul Sharma" />
          <DetailRow icon={FaUtensils} label="Food Quantity" value="45 meals · Fresh" />
        </div>

        {/* Status badge */}
        <div className="mt-3 flex items-center justify-between rounded-xl bg-[#E8F8EF] px-3 py-2.5 ring-1 ring-[#16A34A]/15">
          <div>
            <p className="text-[8px] font-medium uppercase tracking-wider text-[#64748B]">
              Status
            </p>
            <p className="text-[11px] font-bold text-[#16A34A]">On the Way</p>
          </div>
          <motion.span
            className="h-2 w-2 rounded-full bg-[#16A34A]"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>

        {/* Track button */}
        <motion.button
          type="button"
          className="mt-4 w-full rounded-xl bg-[#16A34A] py-2.5 text-[11px] font-bold text-white shadow-[0_4px_14px_rgba(22,163,74,0.35)]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Track Live
        </motion.button>
      </div>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg bg-white px-2.5 py-2 ring-1 ring-[#E5E7EB]/50">
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#F0FDF4]">
        <Icon className="text-[8px] text-[#16A34A]" />
      </div>
      <div className="min-w-0">
        <p className="text-[8px] font-medium uppercase tracking-wide text-[#94A3B8]">
          {label}
        </p>
        <p className="text-[10px] font-semibold leading-snug text-[#0F172A]">{value}</p>
      </div>
    </div>
  );
}

export default function LiveTrackingPhone({ size = "full" }) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeMap = {
    compact: { screenH: "h-[280px]", screenW: "w-[148px]", notchW: "w-[60px]", maxW: "max-w-[160px]" },
    medium: { screenH: "h-[380px]", screenW: "w-[198px]", notchW: "w-[76px]", maxW: "max-w-[210px]" },
    full: { screenH: "h-[420px]", screenW: "w-[220px]", notchW: "w-[88px]", maxW: "max-w-[280px]" },
  };

  const { screenH, screenW, notchW, maxW } = sizeMap[size] ?? sizeMap.full;
  const isCompact = size === "compact";

  return (
    <div className={`relative mx-auto flex flex-col items-center ${maxW}`}>
      {/* Blurred green circles behind phone */}
      <div
        className="pointer-events-none absolute -left-8 top-8 h-32 w-32 rounded-full bg-[#22C55E]/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-6 bottom-16 h-28 w-28 rounded-full bg-[#16A34A]/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DCFCE7]/50 blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          y: [0, -10, 0],
          rotate: isHovered ? -4 : -1,
        }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        {/* Phone frame */}
        <div className="relative rounded-[2.25rem] border-[3px] border-[#1E293B] bg-[#1E293B] p-1.5 shadow-[0_24px_48px_rgba(15,23,42,0.2)]">
          <div
            className={`absolute left-1/2 top-2 z-20 h-[18px] ${notchW} -translate-x-1/2 rounded-full bg-[#1E293B]`}
          />

          <div
            className={`relative ${screenH} ${screenW} overflow-hidden rounded-[1.85rem] bg-white`}
          >
            <PhoneScreen />
          </div>

          {/* Side button */}
          <div className="absolute -right-[5px] top-24 h-10 w-[3px] rounded-full bg-[#334155]" />
          <div className="absolute -left-[5px] top-20 h-6 w-[3px] rounded-full bg-[#334155]" />
          <div className="absolute -left-[5px] top-32 h-10 w-[3px] rounded-full bg-[#334155]" />
        </div>
      </motion.div>

      {!isCompact && (
        <motion.div
          className="mt-4 h-4 w-[70%] rounded-[100%] bg-[#0F172A]/10 blur-md"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.35, 0.5, 0.35],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
