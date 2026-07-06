import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OnboardingLayout, {
  OnboardingTextInput,
} from "../../components/onboarding/OnboardingLayout";
import { goToVerifyOtp } from "../../constants/auth";
import { DONOR_TYPES } from "../../constants/roles";
import { fieldLabelClass } from "../../components/auth/authStyles";

export default function DonorOnboarding() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [donorType, setDonorType] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!donorType) {
      setFormError("Please select a donor type to continue.");
      return;
    }

    goToVerifyOtp(navigate, {
      email: state?.email,
      phone: state?.phone,
      role: state?.role || "donor",
      fullName: state?.fullName,
      donorType:
        DONOR_TYPES.find((item) => item.id === donorType)?.label ?? "Individual",
    });
  };

  return (
    <OnboardingLayout
      emoji="🍱"
      title="Donor Setup"
      subtitle="Tell us about your food donations so we can match you with nearby NGOs."
      onSubmit={handleSubmit}
      formError={formError}
    >
      <fieldset>
        <legend className={fieldLabelClass}>Donor Type</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {DONOR_TYPES.map((item) => {
            const isSelected = donorType === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setDonorType(item.id)}
                aria-pressed={isSelected}
                className={[
                  "rounded-xl border px-4 py-3 text-left text-base font-medium transition-all duration-300",
                  isSelected
                    ? "border-[#16A34A] bg-[#F0FDF4] text-[#15803D]"
                    : "border-[#E5E7EB] bg-[#F8FAFC] text-[#0F172A] hover:border-[#16A34A]/40",
                ].join(" ")}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <OnboardingTextInput
        id="pickup-location"
        label="Default Pickup Location"
        placeholder="Enter your usual pickup address"
        value={pickupLocation}
        onChange={(e) => setPickupLocation(e.target.value)}
      />
    </OnboardingLayout>
  );
}
