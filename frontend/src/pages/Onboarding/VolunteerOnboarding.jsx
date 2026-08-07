import { useState } from "react";
import { useLocation } from "react-router-dom";
import OnboardingLayout, {
  OnboardingTextInput,
} from "../../components/onboarding/OnboardingLayout";
import { AVAILABILITY_OPTIONS } from "../../constants/roles";
import { fieldLabelClass } from "../../components/auth/authStyles";
import useCompleteOnboarding from "../../hooks/useCompleteOnboarding";

export default function VolunteerOnboarding() {
  const { state } = useLocation();
  const completeOnboarding = useCompleteOnboarding();
  const [city, setCity] = useState("");
  const [availability, setAvailability] = useState([]);
  const [serviceRadius, setServiceRadius] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleAvailability = (slot) => {
    setAvailability((prev) =>
      prev.includes(slot)
        ? prev.filter((item) => item !== slot)
        : [...prev, slot],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!city.trim()) {
      setFormError("City is required.");
      return;
    }

    if (availability.length === 0) {
      setFormError("Select at least one availability slot.");
      return;
    }

    setLoading(true);

    try {
      await completeOnboarding({
        city: city.trim(),
        availability,
        serviceRadiusKm: serviceRadius.trim() ? Number(serviceRadius) : 10,
        vehicleType: "bike",
      });
    } catch (error) {
      setFormError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingLayout
      emoji="🚚"
      title="Volunteer Setup"
      subtitle="Share your availability so we can assign nearby food pickups."
      onSubmit={handleSubmit}
      formError={formError}
      loading={loading}
    >
      <OnboardingTextInput
        id="city"
        label="City"
        placeholder="Enter your city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={loading}
      />

      <fieldset>
        <legend className={fieldLabelClass}>Availability</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {AVAILABILITY_OPTIONS.map((slot) => {
            const isSelected = availability.includes(slot);

            return (
              <button
                key={slot}
                type="button"
                onClick={() => toggleAvailability(slot)}
                aria-pressed={isSelected}
                disabled={loading}
                className={[
                  "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-300 sm:text-base",
                  isSelected
                    ? "border-[#16A34A] bg-[#F0FDF4] text-[#15803D]"
                    : "border-[#E5E7EB] bg-[#F8FAFC] text-[#0F172A] hover:border-[#16A34A]/40",
                ].join(" ")}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </fieldset>

      <OnboardingTextInput
        id="service-radius"
        label="Service Radius (km)"
        type="number"
        placeholder="How far can you travel?"
        value={serviceRadius}
        onChange={(e) => setServiceRadius(e.target.value)}
        disabled={loading}
      />
    </OnboardingLayout>
  );
}
