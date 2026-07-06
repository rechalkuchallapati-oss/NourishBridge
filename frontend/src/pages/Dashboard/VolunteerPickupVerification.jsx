import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaCheck, FaTimes } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import VolunteerLayout from "../../components/dashboard/VolunteerLayout";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";
import {
  MISSION_STATES,
  PICKUP_VERIFICATION_CHECKLIST,
} from "../../data/volunteerMission";
import { DASHBOARD_ROUTES } from "../../constants/routes";

function parseQuantityKg(quantityLabel) {
  const match = String(quantityLabel ?? "").match(/([\d.]+)/);
  return match ? match[1] : "24.5";
}

export default function VolunteerPickupVerification() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { activeMission, setMissionStatus } = useVolunteerMissionContext();

  const [checklist, setChecklist] = useState(() =>
    Object.fromEntries(PICKUP_VERIFICATION_CHECKLIST.map((item) => [item.id, false]))
  );
  const [actualQuantity, setActualQuantity] = useState(() =>
    parseQuantityKg(activeMission?.quantity)
  );
  const [notes, setNotes] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoName, setPhotoName] = useState("");

  useEffect(() => {
    if (activeMission?.quantity) {
      setActualQuantity(parseQuantityKg(activeMission.quantity));
    }
  }, [activeMission?.quantity]);

  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const toggleChecklistItem = (id) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }

    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }

    setPhotoPreview(URL.createObjectURL(file));
    setPhotoName(file.name);
  };

  const clearPhoto = () => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoPreview(null);
    setPhotoName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const allChecked = PICKUP_VERIFICATION_CHECKLIST.every((item) => checklist[item.id]);
  const quantityValid = actualQuantity.trim() !== "" && !Number.isNaN(Number(actualQuantity));

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!activeMission) {
      toast.error("No active mission.");
      return;
    }

    if (!allChecked) {
      toast.error("Complete all checklist items before confirming collection.");
      return;
    }

    if (!quantityValid) {
      toast.error("Enter a valid actual quantity.");
      return;
    }

    setMissionStatus(MISSION_STATES.FOOD_COLLECTED);
    toast.success("Food collection confirmed.");
    navigate(DASHBOARD_ROUTES.volunteerActive);
  };

  return (
    <VolunteerLayout>
      <Toaster position="top-center" />
      <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm">
        <h1 className="text-lg font-bold text-[#0F172A]">Pickup Verification</h1>
        <p className="mt-1 text-xs text-[#64748B]">
          Before collecting food, complete this short safety checklist.
        </p>

        {activeMission ? (
          <form onSubmit={handleSubmit} className="mt-4 max-w-xl space-y-4 text-xs">
            <div className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-3">
              <p className="font-semibold text-[#0F172A]">{activeMission.foodName}</p>
              <p className="mt-0.5 text-[10px] text-[#64748B]">
                {activeMission.donorName} · Listed: {activeMission.quantity}
              </p>
            </div>

            <fieldset className="space-y-2">
              <legend className="mb-1 text-xs font-bold uppercase tracking-wide text-[#334155]">
                Pickup Verification
              </legend>
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
                    onChange={() => toggleChecklistItem(item.id)}
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
                  <span className="font-medium text-[#0F172A]">{item.label}</span>
                </label>
              ))}
            </fieldset>

            <label className="flex flex-col gap-1">
              <span className="font-semibold text-[#0F172A]">Actual Quantity (kg)</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  required
                  value={actualQuantity}
                  onChange={(event) => setActualQuantity(event.target.value)}
                  className="w-full max-w-[140px] rounded-none border border-[#E5E7EB] px-3 py-2"
                />
                <span className="text-[10px] text-[#64748B]">kg</span>
              </div>
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-semibold text-[#0F172A]">Optional Notes</span>
              <textarea
                rows={3}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Any observations about packaging, temperature, or donor instructions..."
                className="rounded-none border border-[#E5E7EB] px-3 py-2"
              />
            </label>

            <div className="space-y-2">
              <span className="block font-semibold text-[#0F172A]">Upload Pickup Proof</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoChange}
                className="hidden"
              />
              {!photoPreview ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full items-center justify-center gap-2 rounded-none border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 py-6 text-xs font-semibold text-[#475569] transition-colors hover:border-[#16A34A] hover:bg-[#F0FDF4] hover:text-[#15803D]"
                >
                  <FaCamera aria-hidden="true" />
                  Upload Photo
                </button>
              ) : (
                <div className="overflow-hidden rounded-none border border-[#E5E7EB]">
                  <div className="relative">
                    <img
                      src={photoPreview}
                      alt="Pickup proof preview"
                      className="max-h-56 w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={clearPhoto}
                      className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-none bg-[#0F172A]/70 text-white hover:bg-[#0F172A]"
                      aria-label="Remove photo"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-t border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2">
                    <p className="truncate text-[10px] text-[#64748B]">{photoName}</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="shrink-0 text-[10px] font-semibold text-[#16A34A] hover:text-[#15803D]"
                    >
                      Replace
                    </button>
                  </div>
                </div>
              )}
              <p className="text-[10px] text-[#64748B]">
                Stored locally for preview only. Cloud upload will be added later.
              </p>
            </div>

            <button
              type="submit"
              disabled={!allChecked || !quantityValid}
              className="w-full rounded-none bg-[#16A34A] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#15803D] disabled:cursor-not-allowed disabled:bg-[#94A3B8]"
            >
              Confirm Food Collection
            </button>
          </form>
        ) : (
          <p className="mt-4 text-xs text-[#64748B]">No active mission at donor location.</p>
        )}
      </section>
    </VolunteerLayout>
  );
}
