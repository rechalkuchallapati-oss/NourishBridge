import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCamera,
  FaCheck,
  FaClock,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaPhone,
  FaRoute,
  FaTimes,
  FaUtensils,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import EventTypeBadge from "../../components/common/EventTypeBadge";
import DonationItemsList from "../../components/common/DonationItemsList";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";
import {
  MISSION_STATES,
  PICKUP_VERIFICATION_CHECKLIST,
} from "../../data/volunteerMission";
import {
  enrichPickupMission,
  getCountdownParts,
} from "../../data/volunteerPickupDetails";
import DonationProofThumbnail from "../../components/common/DonationProofThumbnail";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import {
  volunteerInteractive,
  VOLUNTEER_SECTION_PAD,
  VOLUNTEER_STACK_GAP,
} from "../../components/volunteer/volunteerDashboardStyles";

function SectionCard({ title, subtitle, children, className = "" }) {
  return (
    <section
      className={[
        "rounded-none border border-[#E5E7EB] bg-white shadow-sm",
        VOLUNTEER_SECTION_PAD,
        className,
      ].join(" ")}
    >
      <h2 className="text-sm font-bold text-[#0F172A]">{title}</h2>
      {subtitle ? <p className="mt-1 text-[10px] text-[#64748B]">{subtitle}</p> : null}
      <div className="mt-[0.5cm]">{children}</div>
    </section>
  );
}

function DetailRow({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">{label}</p>
      <p className="mt-0.5 text-xs font-semibold text-[#0F172A]">{value ?? "—"}</p>
    </div>
  );
}

function PickupCountdown({ deadlineAt }) {
  const [parts, setParts] = useState(() => getCountdownParts(deadlineAt));

  useEffect(() => {
    const tick = () => setParts(getCountdownParts(deadlineAt));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [deadlineAt]);

  if (!parts) return null;

  return (
    <div
      className={[
        "rounded-none border px-4 py-3",
        parts.expired
          ? "border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]"
          : "border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]",
      ].join(" ")}
    >
      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide">
        <FaClock aria-hidden="true" />
        {parts.label}
      </p>
      {!parts.expired ? (
        <p className="mt-1 font-mono text-2xl font-extrabold">
          {String(parts.hours).padStart(2, "0")}:{String(parts.minutes).padStart(2, "0")}:
          {String(parts.seconds).padStart(2, "0")}
        </p>
      ) : (
        <p className="mt-1 text-sm font-bold">Contact dispatch — collection window may have closed.</p>
      )}
    </div>
  );
}

function PhotoUpload({ label, hint, preview, fileName, onSelect, onClear, inputRef }) {
  return (
    <div className="space-y-2">
      <span className="block text-[11px] font-semibold text-[#0F172A]">{label}</span>
      <input ref={inputRef} type="file" accept="image/*" capture="environment" onChange={onSelect} className="hidden" />
      {!preview ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-none border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 py-5 text-[11px] font-semibold text-[#475569] hover:border-[#16A34A] hover:bg-[#F0FDF4] hover:text-[#15803D]"
        >
          <FaCamera aria-hidden="true" />
          {hint}
        </button>
      ) : (
        <div className="overflow-hidden rounded-none border border-[#E5E7EB]">
          <div className="relative">
            <img src={preview} alt={label} className="max-h-40 w-full object-cover" />
            <button
              type="button"
              onClick={onClear}
              className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center bg-[#0F172A]/70 text-white"
              aria-label={`Remove ${label}`}
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
          <p className="truncate border-t border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-[10px] text-[#64748B]">
            {fileName}
          </p>
        </div>
      )}
    </div>
  );
}

export default function VolunteerPickup() {
  const navigate = useNavigate();
  const foodPhotoRef = useRef(null);
  const proofPhotoRef = useRef(null);
  const { activeMission, setMissionStatus } = useVolunteerMissionContext();
  const pickup = enrichPickupMission(activeMission);

  const [checklist, setChecklist] = useState(() =>
    Object.fromEntries(PICKUP_VERIFICATION_CHECKLIST.map((item) => [item.id, false])),
  );
  const [notes, setNotes] = useState("");
  const [foodPhoto, setFoodPhoto] = useState({ preview: null, name: "" });
  const [proofPhoto, setProofPhoto] = useState({ preview: null, name: "" });

  useEffect(
    () => () => {
      if (foodPhoto.preview) URL.revokeObjectURL(foodPhoto.preview);
      if (proofPhoto.preview) URL.revokeObjectURL(proofPhoto.preview);
    },
    [foodPhoto.preview, proofPhoto.preview],
  );

  const handlePhoto = (setter, prev) => (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }
    if (prev.preview) URL.revokeObjectURL(prev.preview);
    setter({ preview: URL.createObjectURL(file), name: file.name });
  };

  const allChecked = PICKUP_VERIFICATION_CHECKLIST.every((item) => checklist[item.id]);
  const canConfirm = allChecked && pickup;

  const handleConfirmPickup = (event) => {
    event.preventDefault();
    if (!pickup) {
      toast.error("No active pickup mission.");
      return;
    }
    if (!allChecked) {
      toast.error("Complete all safety verification checks first.");
      return;
    }
    setMissionStatus(MISSION_STATES.FOOD_COLLECTED);
    toast.success("Pickup confirmed — food collected safely.");
    navigate(DASHBOARD_ROUTES.volunteerActive);
  };

  if (!pickup) {
    return (
      <>
        <Toaster position="top-center" />
        <section className={`rounded-none border border-dashed border-[#CBD5E1] bg-[#F8FAFC] ${VOLUNTEER_SECTION_PAD}`}>
          <h1 className="text-lg font-bold text-[#0F172A]">Pickup</h1>
          <p className="mt-2 text-xs text-[#64748B]">
            No active pickup mission. Accept a request to view collection details, safety checks, and evidence upload.
          </p>
          <Link
            to={DASHBOARD_ROUTES.volunteerPickups}
            className={[
              "mt-4 inline-flex rounded-none bg-[#16A34A] px-4 py-2.5 text-xs font-semibold text-white",
              volunteerInteractive.button,
            ].join(" ")}
          >
            View Available Pickups
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <form onSubmit={handleConfirmPickup} className={VOLUNTEER_STACK_GAP}>
        <section className={`rounded-none border border-[#E5E7EB] bg-white shadow-sm ${VOLUNTEER_SECTION_PAD}`}>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#16A34A]">Pickup</p>
          <h1 className="mt-1 text-lg font-bold text-[#0F172A] sm:text-xl">Collect Donation</h1>
          <p className="mt-1 text-xs text-[#64748B]">
            What needs to be collected, from where, by when, and is it safe to transport?
          </p>
        </section>

        <SectionCard title="Current Pickup">
          <div className="flex flex-col gap-[0.5cm] sm:flex-row">
            {pickup ? (
              <div className="h-32 w-32 shrink-0 overflow-hidden border border-[#E5E7EB] bg-[#F8FAFC]">
                <DonationProofThumbnail record={pickup} />
              </div>
            ) : null}
            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              <DetailRow label="Mission ID" value={pickup.missionId} />
              <DetailRow label="Food name" value={pickup.foodName} />
              <DetailRow label="Quantity" value={pickup.quantity} />
              <DetailRow label="Estimated meals" value={`~${pickup.estimatedMeals}`} />
              <DetailRow label="Category" value={pickup.category} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">Urgency</p>
                <span
                  className={[
                    "mt-0.5 inline-flex items-center gap-1 rounded-none border px-2 py-0.5 text-[10px] font-bold uppercase",
                    pickup.urgency === "High"
                      ? "border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]"
                      : "border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]",
                  ].join(" ")}
                >
                  <FaExclamationTriangle className="text-[9px]" aria-hidden="true" />
                  {pickup.urgency}
                </span>
              </div>
              <div className="sm:col-span-2">
                <EventTypeBadge eventType={pickup.eventType} />
              </div>
            </div>
          </div>
        </SectionCard>

        <div className="grid gap-[0.5cm] lg:grid-cols-2">
          <SectionCard title="Donor Details" subtitle="Who to contact at the pickup site.">
            <div className="space-y-3">
              <DetailRow label="Donor / organization" value={pickup.donorName} />
              <DetailRow label="Contact person" value={pickup.contactPerson} />
              <a
                href={`tel:${pickup.contactPhone.replace(/\s/g, "")}`}
                className={[
                  "inline-flex items-center gap-2 rounded-none border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-2.5 text-xs font-semibold text-[#15803D]",
                  volunteerInteractive.buttonOutline,
                ].join(" ")}
              >
                <FaPhone aria-hidden="true" />
                Call {pickup.contactPhone}
              </a>
            </div>
          </SectionCard>

          <SectionCard title="Pickup Location" subtitle="Navigate to the donor site.">
            <div className="space-y-3">
              <p className="flex items-start gap-2 text-xs text-[#0F172A]">
                <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#16A34A]" aria-hidden="true" />
                {pickup.pickupAddress}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                <DetailRow label="Distance" value={`${pickup.pickupDistanceKm ?? "—"} km from you`} />
                <DetailRow label="ETA" value={pickup.pickupEta} />
              </div>
              <Link
                to={DASHBOARD_ROUTES.volunteerRoute}
                className={[
                  "inline-flex items-center gap-2 rounded-none bg-[#2563EB] px-4 py-2.5 text-xs font-semibold text-white",
                  volunteerInteractive.button,
                ].join(" ")}
              >
                <FaRoute aria-hidden="true" />
                Open Navigation
              </Link>
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Pickup Window" subtitle="Scheduled collection time and deadline.">
          <div className="grid gap-[0.5cm] lg:grid-cols-2">
            <DetailRow label="Scheduled time" value={pickup.scheduledPickupTime} />
            <DetailRow label="Collect before" value={pickup.collectBeforeDeadline} />
          </div>
          <div className="mt-[0.5cm]">
            <PickupCountdown deadlineAt={pickup.deadlineAt} />
          </div>
        </SectionCard>

        <SectionCard title="Food Details" subtitle="Preparation, packaging, and handling notes.">
          <div className="grid gap-3 sm:grid-cols-2">
            <DetailRow label="Preparation time" value={pickup.preparationTime} />
            <DetailRow label="Packaging type" value={pickup.packagingType} />
            <div className="sm:col-span-2">
              <DetailRow label="Storage instructions" value={pickup.storageInstructions} />
            </div>
            <div className="sm:col-span-2">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">Allergens</p>
              <p className="mt-0.5 flex items-start gap-1.5 text-xs font-medium text-[#B45309]">
                <FaUtensils className="mt-0.5 shrink-0 text-[10px]" aria-hidden="true" />
                {pickup.allergens}
              </p>
            </div>
          </div>
          {(pickup.items ?? []).length > 0 ? (
            <div className="mt-3 rounded-none border border-[#F1F5F9] bg-[#FAFAFA] p-3">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">Item list</p>
              <DonationItemsList record={pickup} className="mt-2" />
            </div>
          ) : null}
        </SectionCard>

        <SectionCard title="Safety Verification" subtitle="Confirm food is safe to transport before leaving.">
          <fieldset className="space-y-2">
            {PICKUP_VERIFICATION_CHECKLIST.map((item) => (
              <label
                key={item.id}
                className={[
                  "flex cursor-pointer items-center gap-3 rounded-none border px-3 py-2.5 transition-colors",
                  checklist[item.id]
                    ? "border-[#BBF7D0] bg-[#F0FDF4]"
                    : "border-[#E5E7EB] bg-white hover:bg-[#F8FAFC]",
                ].join(" ")}
              >
                <input
                  type="checkbox"
                  checked={checklist[item.id]}
                  onChange={() => setChecklist((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                  className="sr-only"
                />
                <span
                  className={[
                    "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-none border",
                    checklist[item.id]
                      ? "border-[#16A34A] bg-[#16A34A] text-white"
                      : "border-[#CBD5E1] bg-white text-transparent",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  <FaCheck className="text-[10px]" />
                </span>
                <span className="text-xs font-medium text-[#0F172A]">{item.label}</span>
              </label>
            ))}
          </fieldset>
        </SectionCard>

        <SectionCard title="Pickup Evidence" subtitle="Photos and notes for verified handover records.">
          <div className="grid gap-[0.5cm] sm:grid-cols-2">
            <PhotoUpload
              label="Food photo"
              hint="Upload food at pickup"
              preview={foodPhoto.preview}
              fileName={foodPhoto.name}
              inputRef={foodPhotoRef}
              onSelect={handlePhoto(setFoodPhoto, foodPhoto)}
              onClear={() => {
                if (foodPhoto.preview) URL.revokeObjectURL(foodPhoto.preview);
                setFoodPhoto({ preview: null, name: "" });
                if (foodPhotoRef.current) foodPhotoRef.current.value = "";
              }}
            />
            <PhotoUpload
              label="Pickup proof photo"
              hint="Upload handover proof"
              preview={proofPhoto.preview}
              fileName={proofPhoto.name}
              inputRef={proofPhotoRef}
              onSelect={handlePhoto(setProofPhoto, proofPhoto)}
              onClear={() => {
                if (proofPhoto.preview) URL.revokeObjectURL(proofPhoto.preview);
                setProofPhoto({ preview: null, name: "" });
                if (proofPhotoRef.current) proofPhotoRef.current.value = "";
              }}
            />
          </div>
          <label className="mt-[0.5cm] flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-[#0F172A]">Optional notes</span>
            <textarea
              rows={3}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Temperature, packaging condition, donor instructions..."
              className="rounded-none border border-[#E5E7EB] px-3 py-2 text-xs outline-none focus:border-[#16A34A]"
            />
          </label>
        </SectionCard>

        <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
          <button
            type="submit"
            disabled={!canConfirm}
            className={[
              "w-full rounded-none bg-[#16A34A] px-4 py-3.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-[#94A3B8]",
              volunteerInteractive.button,
            ].join(" ")}
          >
            Confirm Pickup
          </button>
          {!allChecked ? (
            <p className="mt-2 text-center text-[10px] text-[#64748B]">
              Complete all safety verification items to confirm pickup.
            </p>
          ) : null}
        </div>
      </form>
    </>
  );
}
