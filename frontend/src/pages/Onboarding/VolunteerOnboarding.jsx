import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OnboardingLayout, {
  OnboardingTextInput,
} from "../../components/onboarding/OnboardingLayout";
import { goToVerifyOtp } from "../../constants/auth";
import { AVAILABILITY_OPTIONS } from "../../constants/roles";
import { fieldLabelClass } from "../../components/auth/authStyles";

export default function VolunteerOnboarding() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [city, setCity] = useState("");
  const [availability, setAvailability] = useState([]);
  const [serviceRadius, setServiceRadius] = useState("");
  const [formError, setFormError] = useState("");

  const toggleAvailability = (slot) => {
    setAvailability((prev) =>
      prev.includes(slot)
        ? prev.filter((item) => item !== slot)
        : [...prev, slot]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (availability.length === 0) {
      setFormError("Select at least one availability slot.");
      return;
    }

    goToVerifyOtp(navigate, {
      email: state?.email,
      phone: state?.phone,
      role: state?.role || "volunteer",
      fullName: state?.fullName,
    });
  };

  return (
    <OnboardingLayout
      emoji="🚚"
      title="Volunteer Setup"
      subtitle="Share your availability so we can assign nearby food pickups."
      onSubmit={handleSubmit}
      formError={formError}
    >
      <OnboardingTextInput
        id="city"
        label="City"
        placeholder="Enter your city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
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
      />
    </OnboardingLayout>
  );
}
