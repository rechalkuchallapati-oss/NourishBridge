import { useState } from "react";
import { Link } from "react-router-dom";
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
import { volunteerInteractive } from "./volunteerDashboardStyles";

const COL = {
  id: "w-[88px] min-w-[88px]",
  summary: "min-w-[340px] w-[38%]",
  donor: "min-w-[130px] w-[14%]",
  ngo: "min-w-[150px] w-[16%]",
  load: "min-w-[120px] w-[12%]",
  status: "min-w-[110px] w-[10%]",
  action: "min-w-[100px] w-[10%]",
};

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
    <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8] whitespace-nowrap">
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
    <li className="rounded-none border border-[#F1F5F9] bg-white">
      <div className="flex items-start gap-2 p-2">
        <button
          type="button"
          onClick={handleToggle}
          className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-none border border-[#E5E7EB] bg-[#F8FAFC] text-[#64748B] hover:border-[#BBF7D0] hover:text-[#16A34A]"
          aria-expanded={open}
          aria-label={`${open ? "Collapse" : "Expand"} details for ${item.name}`}
        >
          <FaChevronDown
            className={["text-[10px] transition-transform duration-200", open ? "rotate-180" : ""].join(" ")}
          />
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-medium leading-snug text-[#0F172A]">{item.name}</p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-[#64748B]">
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
        <div className="border-t border-[#F1F5F9] bg-[#FAFAFA] p-3">
          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              <div className="grid grid-cols-4 gap-3">
                <ExpandableColumnHeader>Food Image</ExpandableColumnHeader>
                <ExpandableColumnHeader>Pickup Time</ExpandableColumnHeader>
                <ExpandableColumnHeader>Delivered Time</ExpandableColumnHeader>
                <ExpandableColumnHeader>Food Details</ExpandableColumnHeader>
              </div>

              <div className="mt-2 grid grid-cols-4 gap-3 items-start">
                <div>
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={item.name}
                      className="h-28 w-full rounded-none border border-[#E5E7EB] object-cover"
                      onError={() => {
                        if (fallbackImage && imageSrc !== fallbackImage) {
                          setImageSrc(fallbackImage);
                        }
                      }}
                    />
                  ) : (
                    <div className="flex h-28 items-center justify-center rounded-none border border-dashed border-[#CBD5E1] bg-[#F8FAFC] text-[10px] text-[#94A3B8]">
                      No image
                    </div>
                  )}
                </div>

                <p className="rounded-none border border-[#E5E7EB] bg-white px-2.5 py-2 text-[11px] font-semibold leading-relaxed text-[#0F172A]">
                  {mission.pickupAt ?? "—"}
                </p>

                <p className="rounded-none border border-[#E5E7EB] bg-white px-2.5 py-2 text-[11px] font-semibold leading-relaxed text-[#0F172A]">
                  {mission.deliveredAt ?? "—"}
                </p>

                <div className="flex flex-col gap-2">
                  <div className="rounded-none border border-[#E5E7EB] bg-white p-2.5 text-[11px] leading-relaxed text-[#64748B]">
                    <p className="font-semibold text-[#0F172A]">{item.name}</p>
                    <p className="mt-1">{item.quantity}</p>
                    {item.cuisine ? <p className="mt-1">Cuisine: {item.cuisine}</p> : null}
                    <p className="mt-1">Mission: {mission.missionId}</p>
                  </div>
                  {isDelivered ? (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#15803D]">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#16A34A] text-white">
                        <FaCheck className="text-[9px]" aria-hidden="true" />
                      </span>
                      Verified
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-[#94A3B8]">Verification pending</span>
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
    <div className="space-y-2.5 py-0.5">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[13px] font-semibold leading-snug text-[#0F172A]">{mission.foodName}</p>
        {mission.eventType ? <EventTypeBadge eventType={mission.eventType} /> : null}
      </div>
      <ul className="space-y-2">
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
          "inline-flex whitespace-nowrap rounded-none bg-[#16A34A] px-3 py-1.5 text-[11px] font-semibold text-white",
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
          "inline-flex whitespace-nowrap rounded-none bg-[#2563EB] px-3 py-1.5 text-[11px] font-semibold text-white",
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
        "inline-flex whitespace-nowrap rounded-none border border-[#E5E7EB] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#475569]",
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
      <p className="mt-[0.5cm] rounded-none border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-[0.5cm] text-center text-xs text-[#64748B]">
        No missions recorded yet.
      </p>
    );
  }

  return (
    <div className="mt-[0.5cm] overflow-x-auto rounded-none border border-[#E5E7EB]">
      <table className="w-full min-w-[980px] table-fixed border-collapse text-left text-[12px]">
        <thead>
          <tr className="border-b border-[#E5E7EB] bg-[#F8FAFC]">
            <th className={`${COL.id} px-3 py-3 text-[11px] font-bold uppercase tracking-wide text-[#64748B]`}>
              Mission ID
            </th>
            <th className={`${COL.summary} px-3 py-3 text-[11px] font-bold uppercase tracking-wide text-[#64748B]`}>
              Donation Summary
            </th>
            <th className={`${COL.donor} px-3 py-3 text-[11px] font-bold uppercase tracking-wide text-[#64748B]`}>
              Donor
            </th>
            <th className={`${COL.ngo} px-3 py-3 text-[11px] font-bold uppercase tracking-wide text-[#64748B]`}>
              Receiving NGO
            </th>
            <th className={`${COL.load} px-3 py-3 text-[11px] font-bold uppercase tracking-wide text-[#64748B]`}>
              Total Load
            </th>
            <th className={`${COL.status} px-3 py-3 text-[11px] font-bold uppercase tracking-wide text-[#64748B]`}>
              Mission Status
            </th>
            <th className={`${COL.action} px-3 py-3 text-[11px] font-bold uppercase tracking-wide text-[#64748B]`}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const statusKey = row.deliveryStatus ?? "delivered";
            const statusLabel = DELIVERY_STATUS_LABELS[statusKey] ?? statusKey;
            const statusStyle = DELIVERY_STATUS_STYLES[statusKey] ?? DELIVERY_STATUS_STYLES.delivered;

            return (
              <tr
                key={row.missionId}
                className="border-b border-[#F1F5F9] align-top transition-colors hover:bg-[#FAFAFA]"
              >
                <td className={`${COL.id} px-3 py-3 font-bold text-[#16A34A]`}>{row.missionId}</td>
                <td className={`${COL.summary} px-3 py-3`}>
                  <DonationSummaryCell mission={row} />
                </td>
                <td className={`${COL.donor} px-3 py-3`}>
                  <p className="font-medium leading-relaxed text-[#0F172A]">{row.donor}</p>
                </td>
                <td className={`${COL.ngo} px-3 py-3`}>
                  <p className="font-semibold leading-relaxed text-[#2563EB]">{row.ngo}</p>
                </td>
                <td className={`${COL.load} px-3 py-3 text-[#64748B]`}>
                  <p className="font-semibold text-[#0F172A]">~{row.meals} meals</p>
                  <p className="mt-1 text-[11px] leading-relaxed">{row.totalLoad}</p>
                </td>
                <td className={`${COL.status} px-3 py-3`}>
                  <span
                    className={`inline-block rounded-none px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusStyle}`}
                  >
                    {statusLabel}
                  </span>
                </td>
                <td className={`${COL.action} px-3 py-3`}>
                  <MissionAction mission={row} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
