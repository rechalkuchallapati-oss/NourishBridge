import { useState } from "react";
import { useLocation } from "react-router-dom";
import OnboardingLayout, {
  OnboardingTextInput,
} from "../../components/onboarding/OnboardingLayout";
import { DONOR_TYPES } from "../../constants/roles";
import { fieldLabelClass } from "../../components/auth/authStyles";
import useCompleteOnboarding from "../../hooks/useCompleteOnboarding";
import usePendingSignupGuard from "../../hooks/usePendingSignupGuard";

export default function DonorOnboarding() {
  const { state } = useLocation();
  const signupReady = usePendingSignupGuard();
  const completeOnboarding = useCompleteOnboarding();
  const [donorType, setDonorType] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!signupReady) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!donorType) {
      setFormError("Please select a donor type to continue.");
      return;
    }

    setLoading(true);

    try {
      await completeOnboarding({
        donorTypeId: donorType,
        pickupLocation: pickupLocation.trim(),
        organizationName: state?.fullName,
      });
    } catch (error) {
      setFormError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingLayout
      emoji="🍱"
      title="Donor Setup"
      subtitle="Tell us about your food donations so we can match you with nearby NGOs."
      onSubmit={handleSubmit}
      formError={formError}
      loading={loading}
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
                disabled={loading}
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
        disabled={loading}
      />
    </OnboardingLayout>
  );
}
