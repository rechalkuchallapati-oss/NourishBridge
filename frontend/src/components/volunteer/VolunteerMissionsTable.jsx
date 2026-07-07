import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import {
  DONATION_THUMBNAILS,
  resolveItemThumbnail,
} from "../../data/donationThumbnails";
import { resolveThumbnailKeyFromName } from "../../data/foodItemThumbnails";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import EventTypeBadge from "../common/EventTypeBadge";
import {
  DELIVERY_STATUS_LABELS,
  DELIVERY_STATUS_STYLES,
} from "../../data/volunteerMissionHistory";
import {
  volunteerInteractive,
  VOLUNTEER_BTN_COMPACT,
  VOLUNTEER_CONTENT_STACK,
  VOLUNTEER_INSET_LINE_GAP,
} from "./volunteerDashboardStyles";

const COL = {
  id: "w-[96px] min-w-[96px]",
  summary: "min-w-[340px] w-[38%]",
  donor: "min-w-[130px] w-[14%]",
  ngo: "min-w-[150px] w-[16%]",
  load: "min-w-[120px] w-[12%]",
  status: "min-w-[120px] w-[10%]",
  action: "min-w-[110px] w-[10%]",
};

const TH_CLASS =
  "px-4 py-4 text-center text-xs font-bold uppercase tracking-wide text-[#64748B]";

const TD_CLASS = "px-4 py-4 align-top text-sm leading-relaxed";

const FOOD_IMAGE_FALLBACKS = {
  bread_and_sandwiches: DONATION_THUMBNAILS.assorted_bread_loaves,
  bread_sandwiches: DONATION_THUMBNAILS.assorted_bread_loaves,
  rice_and_curry: DONATION_THUMBNAILS.restaurant_mixed_bulk,
  rice_curry: DONATION_THUMBNAILS.restaurant_mixed_bulk,
};

function resolveThumbnailKey(item, mission) {
  return (
    item?.thumbnailKey ??
    mission?.thumbnailKey ??
    resolveThumbnailKeyFromName(item?.name) ??
    resolveThumbnailKeyFromName(mission?.foodName)
  );
}

function getExpandableFoodImage(item, mission) {
  if (item?.imageSrc) return item.imageSrc;
  const key = resolveThumbnailKey(item, mission);
  if (key && DONATION_THUMBNAILS[key]) return DONATION_THUMBNAILS[key];
  const resolved = resolveItemThumbnail(item);
  if (resolved) return resolved;
  if (key && FOOD_IMAGE_FALLBACKS[key]) return FOOD_IMAGE_FALLBACKS[key];
  return null;
}

function ExpandableColumnHeader({ children }) {
  return (
    <p className="text-center text-[11px] font-bold uppercase tracking-wide text-[#94A3B8]">
      {children}
    </p>
  );
}

function FoodItemExpandable({ item, mission }) {
  const [open, setOpen] = useState(false);
  const thumbnailKey = resolveThumbnailKey(item, mission);
  const primaryImage = getExpandableFoodImage(item, mission);
  const fallbackImage =
    (thumbnailKey && FOOD_IMAGE_FALLBACKS[thumbnailKey]) ||
    DONATION_THUMBNAILS.individual_snacks;
  const [imageSrc, setImageSrc] = useState(primaryImage);
  const isDelivered = mission.deliveryStatus === "delivered";

  const handleToggle = () => {
    setOpen((prev) => {
      if (!prev) setImageSrc(primaryImage);
      return !prev;
    });
  };

  return (
    <li className="rounded-none border border-[#F1F5F9] bg-white transition-colors hover:border-[#BBF7D0] hover:bg-[#FAFFFA]">
      <div className="flex items-start gap-[0.5cm] p-[0.5cm]">
        <button
          type="button"
          onClick={handleToggle}
          className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-none border border-[#E5E7EB] bg-[#F8FAFC] text-[#64748B] hover:border-[#BBF7D0] hover:text-[#16A34A]"
          aria-expanded={open}
          aria-label={`${open ? "Collapse" : "Expand"} details for ${item.name}`}
        >
          <FaChevronDown
            className={["text-[10px] transition-transform duration-200", open ? "rotate-180" : ""].join(" ")}
          />
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium leading-relaxed text-[#0F172A]">{item.name}</p>
          <p className={`${VOLUNTEER_INSET_LINE_GAP} text-xs leading-relaxed text-[#64748B]`}>
            {item.quantity}
            {item.cuisine ? (
              <span className="ml-1.5 inline-block rounded-none bg-[#F1F5F9] px-1.5 py-px text-[10px] font-semibold text-[#475569]">
                {item.cuisine}
              </span>
            ) : null}
          </p>
        </div>
      </div>

      {open ? (
        <div className={`border-t border-[#F1F5F9] bg-[#FAFAFA] p-[0.5cm] ${VOLUNTEER_CONTENT_STACK}`}>
          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              <div className="grid grid-cols-4 gap-[0.5cm]">
                <ExpandableColumnHeader>Food Image</ExpandableColumnHeader>
                <ExpandableColumnHeader>Pickup Time</ExpandableColumnHeader>
                <ExpandableColumnHeader>Delivered Time</ExpandableColumnHeader>
                <ExpandableColumnHeader>Food Details</ExpandableColumnHeader>
              </div>

              <div className="mt-[0.5cm] grid grid-cols-4 items-start gap-[0.5cm]">
                <div className="flex justify-center">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={item.name}
                      className="h-28 w-full max-w-[140px] rounded-none border border-[#E5E7EB] object-cover"
                      onError={() => {
                        if (fallbackImage && imageSrc !== fallbackImage) {
                          setImageSrc(fallbackImage);
                        }
                      }}
                    />
                  ) : (
                    <div className="flex h-28 w-full max-w-[140px] items-center justify-center rounded-none border border-dashed border-[#CBD5E1] bg-[#F8FAFC] text-[10px] text-[#94A3B8]">
                      No image
                    </div>
                  )}
                </div>

                <p className="rounded-none border border-[#E5E7EB] bg-white px-3 py-2.5 text-center text-xs font-semibold leading-relaxed text-[#0F172A]">
                  {mission.pickupAt ?? "—"}
                </p>

                <p className="rounded-none border border-[#E5E7EB] bg-white px-3 py-2.5 text-center text-xs font-semibold leading-relaxed text-[#0F172A]">
                  {mission.deliveredAt ?? "—"}
                </p>

                <div className={`${VOLUNTEER_CONTENT_STACK}`}>
                  <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] text-xs leading-relaxed text-[#64748B]">
                    <p className="font-semibold text-[#0F172A]">{item.name}</p>
                    <p className={VOLUNTEER_INSET_LINE_GAP}>{item.quantity}</p>
                    {item.cuisine ? (
                      <p className={VOLUNTEER_INSET_LINE_GAP}>Cuisine: {item.cuisine}</p>
                    ) : null}
                    <p className={VOLUNTEER_INSET_LINE_GAP}>Mission: {mission.missionId}</p>
                  </div>
                  {isDelivered ? (
                    <span className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#15803D]">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#16A34A] text-white">
                        <FaCheck className="text-[9px]" aria-hidden="true" />
                      </span>
                      Verified
                    </span>
                  ) : (
                    <span className="text-center text-xs font-medium text-[#94A3B8]">
                      Verification pending
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </li>
  );
}

function DonationSummaryCell({ mission }) {
  const items = mission.items ?? [];

  return (
    <div className={VOLUNTEER_CONTENT_STACK}>
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold leading-relaxed text-[#0F172A]">{mission.foodName}</p>
        {mission.eventType ? <EventTypeBadge eventType={mission.eventType} /> : null}
      </div>
      <ul className={VOLUNTEER_CONTENT_STACK}>
        {items.map((item, index) => (
          <FoodItemExpandable
            key={`${mission.missionId}-${item.name}-${index}`}
            item={item}
            mission={mission}
          />
        ))}
      </ul>
    </div>
  );
}

function MissionAction({ mission }) {
  const status = mission.deliveryStatus ?? "delivered";

  if (status === "to_be_picked") {
    return (
      <Link
        to={DASHBOARD_ROUTES.volunteerPickups}
        className={[
          VOLUNTEER_BTN_COMPACT,
          "inline-flex whitespace-nowrap bg-[#16A34A] text-white",
          volunteerInteractive.button,
        ].join(" ")}
      >
        Start pickup
      </Link>
    );
  }

  if (status === "to_be_delivered") {
    return (
      <Link
        to={DASHBOARD_ROUTES.volunteerActive}
        className={[
          VOLUNTEER_BTN_COMPACT,
          "inline-flex whitespace-nowrap bg-[#2563EB] text-white",
          volunteerInteractive.button,
        ].join(" ")}
      >
        Continue
      </Link>
    );
  }

  return (
    <Link
      to={DASHBOARD_ROUTES.volunteerMissions}
      className={[
        VOLUNTEER_BTN_COMPACT,
        "inline-flex whitespace-nowrap border border-[#E5E7EB] bg-white text-[#475569]",
        volunteerInteractive.buttonOutline,
      ].join(" ")}
    >
      Receipt
    </Link>
  );
}

export default function VolunteerMissionsTable({ rows }) {
  if (!rows.length) {
    return (
      <p className="rounded-none border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-[0.5cm] text-center text-sm leading-relaxed text-[#64748B]">
        No missions recorded yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-none border border-[#E5E7EB] shadow-[0_4px_20px_rgba(22,163,74,0.06)]">
      <table className="w-full min-w-[980px] table-fixed border-collapse text-left">
        <thead>
          <tr className="border-b border-[#E5E7EB] bg-gradient-to-r from-[#F8FAFC] via-[#F0FDF4]/40 to-[#F8FAFC]">
            <th className={`${COL.id} ${TH_CLASS}`}>Mission ID</th>
            <th className={`${COL.summary} ${TH_CLASS}`}>Donation Summary</th>
            <th className={`${COL.donor} ${TH_CLASS}`}>Donor</th>
            <th className={`${COL.ngo} ${TH_CLASS}`}>Receiving NGO</th>
            <th className={`${COL.load} ${TH_CLASS}`}>Total Load</th>
            <th className={`${COL.status} ${TH_CLASS}`}>Mission Status</th>
            <th className={`${COL.action} ${TH_CLASS}`}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const statusKey = row.deliveryStatus ?? "delivered";
            const statusLabel = DELIVERY_STATUS_LABELS[statusKey] ?? statusKey;
            const statusStyle = DELIVERY_STATUS_STYLES[statusKey] ?? DELIVERY_STATUS_STYLES.delivered;

            return (
              <motion.tr
                key={row.missionId}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ backgroundColor: "rgba(240, 253, 244, 0.65)" }}
                className="border-b border-[#F1F5F9] transition-colors"
              >
                <td className={`${COL.id} ${TD_CLASS} text-center font-bold text-[#16A34A]`}>
                  {row.missionId}
                </td>
                <td className={`${COL.summary} ${TD_CLASS}`}>
                  <DonationSummaryCell mission={row} />
                </td>
                <td className={`${COL.donor} ${TD_CLASS} text-center`}>
                  <p className="font-medium text-[#0F172A]">{row.donor}</p>
                </td>
                <td className={`${COL.ngo} ${TD_CLASS} text-center`}>
                  <p className="font-semibold text-[#2563EB]">{row.ngo}</p>
                </td>
                <td className={`${COL.load} ${TD_CLASS} text-center text-[#64748B]`}>
                  <p className="font-semibold text-[#0F172A]">~{row.meals} meals</p>
                  <p className={VOLUNTEER_INSET_LINE_GAP}>{row.totalLoad}</p>
                </td>
                <td className={`${COL.status} ${TD_CLASS} text-center`}>
                  <span
                    className={`inline-block rounded-none px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${statusStyle}`}
                  >
                    {statusLabel}
                  </span>
                </td>
                <td className={`${COL.action} ${TD_CLASS} text-center`}>
                  <MissionAction mission={row} />
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
