import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCamera,
  FaCheck,
  FaClipboardList,
  FaExclamationCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaRoute,
  FaShieldAlt,
  FaTimes,
  FaTruck,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import DonationItemsList from "../../components/common/DonationItemsList";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";
import { MISSION_STATES } from "../../data/volunteerMission";
import {
  DELIVERY_ISSUE_OPTIONS,
  DELIVERY_PROGRESS_STEPS,
  enrichDeliveryMission,
  getDeliveryProgressIndex,
  isDeliveryPhase,
} from "../../data/volunteerDeliveryDetails";
import DonationProofThumbnail from "../../components/common/DonationProofThumbnail";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import VolunteerSectionShell, { VolunteerSectionTitle, VolunteerSubsection } from "../../components/volunteer/VolunteerSectionShell";
import {
  volunteerInteractive,
  VOLUNTEER_BTN,
  VOLUNTEER_CONTENT_STACK,
  VOLUNTEER_INSET_LINE_GAP,
  VOLUNTEER_PAGE_SECTION_GAP,
} from "../../components/volunteer/volunteerDashboardStyles";

function SectionCard({ title, subtitle, children, icon, theme = "green" }) {
  return (
    <VolunteerSubsection title={title} subtitle={subtitle} icon={icon} theme={theme}>
      {children}
    </VolunteerSubsection>
  );
}

function DetailRow({ label, value }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">{label}</p>
      <p className={`${VOLUNTEER_INSET_LINE_GAP} text-sm font-semibold leading-relaxed text-[#0F172A]`}>
        {value ?? "—"}
      </p>
    </div>
  );
}

function DeliveryProgressBar({ currentIndex }) {
  return (
    <ol className="flex flex-col gap-0 sm:flex-row sm:items-center sm:gap-0">
      {DELIVERY_PROGRESS_STEPS.map((step, index) => {
        const isComplete = currentIndex > index;
        const isCurrent = currentIndex === index;
        const isLast = index === DELIVERY_PROGRESS_STEPS.length - 1;

        return (
          <li key={step.id} className="flex flex-1 items-center gap-2 sm:flex-col sm:gap-1.5 sm:text-center">
            <div className="flex items-center sm:flex-col">
              <span
                className={[
                  "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold",
                  isComplete
                    ? "border-[#16A34A] bg-[#16A34A] text-white"
                    : isCurrent
                      ? "border-[#2563EB] bg-white text-[#2563EB] shadow-[0_0_0_3px_rgba(37,99,235,0.15)]"
                      : "border-[#CBD5E1] bg-[#F1F5F9] text-[#94A3B8]",
                ].join(" ")}
              >
                {isComplete ? <FaCheck className="text-[10px]" aria-hidden="true" /> : index + 1}
              </span>
              {!isLast ? (
                <span
                  className={[
                    "hidden h-0.5 flex-1 sm:block sm:h-0.5 sm:w-full sm:min-w-[24px]",
                    isComplete ? "bg-[#16A34A]" : "bg-[#CBD5E1]",
                  ].join(" ")}
                  aria-hidden="true"
                />
              ) : null}
            </div>
            <p
              className={[
                "text-[11px] leading-snug",
                isComplete ? "font-semibold text-[#15803D]" : isCurrent ? "font-bold text-[#0F172A]" : "text-[#64748B]",
              ].join(" ")}
            >
              {step.label}
            </p>
            {!isLast ? (
              <span
                className={[
                  "ml-2 h-4 w-0.5 sm:hidden",
                  isComplete ? "bg-[#16A34A]" : "bg-[#CBD5E1]",
                ].join(" ")}
                aria-hidden="true"
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export default function VolunteerDelivery() {
  const navigate = useNavigate();
  const proofRef = useRef(null);
  const { activeMission, transitionMissionStatus } = useVolunteerMissionContext();
  const delivery = enrichDeliveryMission(activeMission);
  const progressIndex = getDeliveryProgressIndex(activeMission?.status);
  const inDeliveryPhase = isDeliveryPhase(activeMission?.status);
  const readyForNavigation = activeMission?.status === MISSION_STATES.FOOD_COLLECTED;
  const readyForHandover = activeMission?.status === MISSION_STATES.ARRIVED_AT_NGO;

  const [handoverQuantity, setHandoverQuantity] = useState(
    () => delivery?.collectedQuantity ?? "",
  );
  const [receiverName, setReceiverName] = useState("");
  const [proofPhoto, setProofPhoto] = useState({ preview: null, name: "" });
  const [reportedIssues, setReportedIssues] = useState({});
  const [issueNote, setIssueNote] = useState("");
  const [handoverRequested, setHandoverRequested] = useState(false);

  useEffect(() => {
    if (delivery?.collectedQuantity) {
      setHandoverQuantity(delivery.collectedQuantity);
    }
  }, [delivery?.collectedQuantity]);

  useEffect(
    () => () => {
      if (proofPhoto.preview) URL.revokeObjectURL(proofPhoto.preview);
    },
    [proofPhoto.preview],
  );

  const toggleIssue = (id) => {
    setReportedIssues((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRequestHandover = () => {
    setHandoverRequested(true);
    toast.success(`Handover request sent to ${delivery?.ngoName ?? "NGO"}.`);
  };

  const handleContinueToNavigation = (event) => {
    event.preventDefault();
    if (!delivery) return;
    const navTo = transitionMissionStatus(MISSION_STATES.EN_ROUTE_TO_NGO);
    toast.success("Opening Route & Navigation to NGO.");
    navigate(navTo ?? DASHBOARD_ROUTES.volunteerRoute);
  };

  const handleConfirmDelivery = (event) => {
    event.preventDefault();
    if (!delivery) {
      toast.error("No active delivery.");
      return;
    }
    if (!receiverName.trim()) {
      toast.error("Enter the NGO receiver name.");
      return;
    }
    if (!handoverQuantity.trim()) {
      toast.error("Enter the quantity handed over.");
      return;
    }

    const navTo = transitionMissionStatus(MISSION_STATES.ARRIVED_AT_NGO);
    toast.success("Handover details saved — confirm delivery on Route page.");
    navigate(navTo ?? DASHBOARD_ROUTES.volunteerRoute);
  };

  if (!delivery || !inDeliveryPhase) {
    return (
      <>
        <Toaster position="top-center" />
        <VolunteerSectionShell>
          <VolunteerSectionTitle
            heading="h1"
            title="Delivery"
            subtitle="Complete pickup first. This page shows destination, delivery progress, and NGO handover once food is collected."
            theme="green"
            icon={FaTruck}
          />
          <div className={`flex flex-wrap ${VOLUNTEER_CONTENT_STACK} sm:flex-row`}>
            <Link
              to={DASHBOARD_ROUTES.volunteerPickup}
              className={[VOLUNTEER_BTN, "inline-flex bg-[#16A34A] text-white", volunteerInteractive.button].join(" ")}
            >
              Go to Pickup
            </Link>
            <Link
              to={DASHBOARD_ROUTES.volunteerActive}
              className={[VOLUNTEER_BTN, "inline-flex border border-[#E5E7EB] text-[#475569]", volunteerInteractive.buttonOutline].join(" ")}
            >
              Active Mission
            </Link>
          </div>
        </VolunteerSectionShell>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <form onSubmit={handleConfirmDelivery} className={VOLUNTEER_PAGE_SECTION_GAP}>
        <VolunteerSectionShell>
          <VolunteerSectionTitle
            heading="h1"
            title="Deliver to NGO"
            subtitle="Where is the food going, what is the delivery status, and has the NGO accepted the handover?"
            theme="emerald"
            icon={FaTruck}
          />
          <p className="inline-flex items-center gap-1.5 rounded-none border border-[#BBF7D0] bg-[#F0FDF4] px-2.5 py-1 text-xs font-bold uppercase text-[#15803D]">
            <FaTruck aria-hidden="true" />
            Status: {delivery.deliveryStatusLabel}
          </p>
        </VolunteerSectionShell>

        <VolunteerSectionShell>
        <SectionCard title="Active Delivery" icon={FaClipboardList}>
          <div className="flex flex-col gap-[0.5cm] sm:flex-row">
            {delivery ? (
              <div className="h-28 w-28 shrink-0 overflow-hidden border border-[#E5E7EB] bg-[#F8FAFC]">
                <DonationProofThumbnail record={delivery} />
              </div>
            ) : null}
            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              <DetailRow label="Mission ID" value={delivery.missionId} />
              <DetailRow label="Food summary" value={delivery.foodName} />
              <DetailRow label="Collected quantity" value={delivery.collectedQuantity} />
              <DetailRow label="Estimated meals" value={`~${delivery.estimatedMeals}`} />
            </div>
          </div>
          {(delivery.items ?? []).length > 0 ? (
            <div className="mt-3 rounded-none border border-[#F1F5F9] bg-[#FAFAFA] p-3">
              <DonationItemsList record={delivery} />
            </div>
          ) : null}
        </SectionCard>

        <div className="grid gap-[0.5cm] lg:grid-cols-2">
          <SectionCard title="Destination NGO" subtitle="Verified receiving partner.">
            <div className="space-y-3">
              <DetailRow label="NGO name" value={delivery.ngoName} />
              {delivery.ngoVerified ? (
                <span className="inline-flex items-center gap-1 rounded-none border border-[#BBF7D0] bg-[#F0FDF4] px-2.5 py-1 text-[10px] font-semibold text-[#16A34A]">
                  <FaShieldAlt className="text-[9px]" aria-hidden="true" />
                  Verified NGO Partner
                </span>
              ) : null}
              <DetailRow label="Contact person" value={delivery.ngoContactPerson} />
              <a
                href={`tel:${delivery.ngoContactPhone.replace(/\s/g, "")}`}
                className={[
                  VOLUNTEER_BTN,
                  "inline-flex border border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
                  volunteerInteractive.buttonOutline,
                ].join(" ")}
              >
                <FaPhone aria-hidden="true" />
                Call {delivery.ngoContactPhone}
              </a>
            </div>
          </SectionCard>

          <SectionCard title="Destination" subtitle="Navigate to the NGO drop-off point.">
            <div className="space-y-3">
              <p className="flex items-start gap-2 text-xs font-semibold text-[#0F172A]">
                <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#2563EB]" aria-hidden="true" />
                {delivery.ngoAddress}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                <DetailRow label="Distance remaining" value={`${delivery.deliveryDistanceKm} km`} />
                <DetailRow label="ETA" value={delivery.deliveryEta} />
              </div>
              <Link
                to={DASHBOARD_ROUTES.volunteerRoute}
                className={[
                  VOLUNTEER_BTN,
                  "inline-flex bg-[#2563EB] text-white",
                  volunteerInteractive.button,
                ].join(" ")}
              >
                <FaRoute aria-hidden="true" />
                Open Navigation
              </Link>
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Delivery Progress" subtitle="Track each stage from pickup to completion.">
          <DeliveryProgressBar currentIndex={progressIndex} />
        </SectionCard>

        <SectionCard title="Handling Reminder" subtitle="Keep food safe until NGO acceptance.">
          <ul className="space-y-2 text-xs text-[#475569]">
            <li className="flex items-start gap-2 rounded-none border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2.5">
              <FaExclamationCircle className="mt-0.5 shrink-0 text-[#B45309]" aria-hidden="true" />
              <span>{delivery.handlingUpright}</span>
            </li>
            <li className="flex items-start gap-2 rounded-none border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-2.5">
              <FaExclamationCircle className="mt-0.5 shrink-0 text-[#2563EB]" aria-hidden="true" />
              <span>{delivery.handlingTemperature}</span>
            </li>
            <li className="flex items-start gap-2 rounded-none border border-[#FECACA] bg-[#FEF2F2] px-3 py-2.5 font-semibold text-[#B91C1C]">
              <FaExclamationCircle className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>{delivery.deliveryDeadline}</span>
            </li>
          </ul>
        </SectionCard>

        <SectionCard title="Handover Verification" subtitle={readyForNavigation ? "Complete after arriving at the NGO on the Route page." : "Record what the NGO received."}>
          <div className={`grid gap-3 sm:grid-cols-2 ${readyForNavigation ? "pointer-events-none opacity-50" : ""}`}>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-[#0F172A]">Actual quantity handed over</span>
              <input
                required
                value={handoverQuantity}
                onChange={(event) => setHandoverQuantity(event.target.value)}
                className="rounded-none border border-[#E5E7EB] px-3 py-2.5 text-xs outline-none focus:border-[#2563EB]"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-[#0F172A]">NGO receiver name</span>
              <input
                required
                value={receiverName}
                onChange={(event) => setReceiverName(event.target.value)}
                placeholder="Name of person accepting food"
                className="rounded-none border border-[#E5E7EB] px-3 py-2.5 text-xs outline-none focus:border-[#2563EB]"
              />
            </label>
          </div>
          <div className="mt-[0.5cm]">
            <span className="block text-[11px] font-semibold text-[#0F172A]">Delivery proof photo</span>
            <input
              ref={proofRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file?.type.startsWith("image/")) {
                  toast.error("Please upload an image.");
                  return;
                }
                if (proofPhoto.preview) URL.revokeObjectURL(proofPhoto.preview);
                setProofPhoto({ preview: URL.createObjectURL(file), name: file.name });
              }}
            />
            {!proofPhoto.preview ? (
              <button
                type="button"
                onClick={() => proofRef.current?.click()}
                className={[
                  VOLUNTEER_BTN,
                  "mt-2 w-full border border-dashed border-[#CBD5E1] bg-[#F8FAFC] text-[#475569] hover:border-[#2563EB] hover:bg-[#EFF6FF]",
                  volunteerInteractive.buttonOutline,
                ].join(" ")}
              >
                <FaCamera aria-hidden="true" />
                Upload delivery proof
              </button>
            ) : (
              <div className="relative mt-2 overflow-hidden border border-[#E5E7EB]">
                <img src={proofPhoto.preview} alt="Delivery proof" className="max-h-44 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    if (proofPhoto.preview) URL.revokeObjectURL(proofPhoto.preview);
                    setProofPhoto({ preview: null, name: "" });
                    if (proofRef.current) proofRef.current.value = "";
                  }}
                  className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center bg-[#0F172A]/70 text-white"
                  aria-label="Remove photo"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Issue Reporting" subtitle="Flag problems during transit or at handover.">
          <div className="flex flex-wrap gap-2">
            {DELIVERY_ISSUE_OPTIONS.map((issue) => (
              <button
                key={issue.id}
                type="button"
                onClick={() => toggleIssue(issue.id)}
                className={[
                  VOLUNTEER_BTN,
                  "border transition-colors",
                  reportedIssues[issue.id]
                    ? "border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]"
                    : "border-[#E5E7EB] bg-white text-[#64748B]",
                  volunteerInteractive.buttonOutline,
                ].join(" ")}
              >
                {issue.label}
              </button>
            ))}
          </div>
          <label className="mt-[0.5cm] flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-[#0F172A]">Issue details (optional)</span>
            <textarea
              rows={2}
              value={issueNote}
              onChange={(event) => setIssueNote(event.target.value)}
              placeholder="Describe delay, damage, or contact issues..."
              className="rounded-none border border-[#E5E7EB] px-3 py-2 text-xs outline-none focus:border-[#2563EB]"
            />
          </label>
          {Object.values(reportedIssues).some(Boolean) ? (
            <p className="mt-2 text-[10px] font-medium text-[#B45309]">
              Issue logged locally — dispatch will be notified in production.
            </p>
          ) : null}
        </SectionCard>

        </VolunteerSectionShell>

        <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
          {readyForNavigation ? (
            <button
              type="button"
              onClick={handleContinueToNavigation}
              className={[
                VOLUNTEER_BTN,
                "w-full bg-[#16A34A] text-white",
                volunteerInteractive.button,
              ].join(" ")}
            >
              Continue to Navigation
            </button>
          ) : (
            <div className={`flex flex-col ${VOLUNTEER_CONTENT_STACK} sm:flex-row`}>
              <button
                type="button"
                onClick={handleRequestHandover}
                disabled={handoverRequested}
                className={[
                  VOLUNTEER_BTN,
                  "flex-1 border border-[#16A34A] bg-white text-[#15803D] disabled:opacity-50",
                  volunteerInteractive.buttonOutline,
                ].join(" ")}
              >
                {handoverRequested ? "Handover Requested" : "Request Handover"}
              </button>
              <button
                type="submit"
                className={[
                  VOLUNTEER_BTN,
                  "flex-1 bg-[#16A34A] text-white",
                  volunteerInteractive.button,
                ].join(" ")}
              >
                {readyForHandover ? "Save & Confirm on Route" : "Continue to Route"}
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
