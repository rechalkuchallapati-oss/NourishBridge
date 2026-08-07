import { useState } from "react";
import { useLocation } from "react-router-dom";
import OnboardingLayout, {
  OnboardingTextInput,
  OnboardingTextarea,
} from "../../components/onboarding/OnboardingLayout";
import { fieldLabelClass } from "../../components/auth/authStyles";
import useCompleteOnboarding from "../../hooks/useCompleteOnboarding";

export default function NGOOnboarding() {
  const { state } = useLocation();
  const completeOnboarding = useCompleteOnboarding();
  const [orgName, setOrgName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [address, setAddress] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!orgName.trim()) {
      setFormError("Organization name is required.");
      return;
    }

    if (!registrationNumber.trim()) {
      setFormError("Registration number is required.");
      return;
    }

    setLoading(true);

    try {
      await completeOnboarding({
        ngoName: orgName.trim(),
        organizationName: orgName.trim(),
        registrationNumber: registrationNumber.trim(),
        address: address.trim(),
        addressLine1: address.trim() || orgName.trim(),
        serviceArea: serviceArea.trim(),
        city: serviceArea.trim() || "Hyderabad",
      });
    } catch (error) {
      setFormError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingLayout
      emoji="🤝"
      title="NGO Setup"
      subtitle="Complete your organization profile for verification and food distribution."
      onSubmit={handleSubmit}
      formError={formError}
      loading={loading}
    >
      <OnboardingTextInput
        id="org-name"
        label="Organization Name"
        placeholder="Enter your NGO name"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
        disabled={loading}
      />

      <OnboardingTextInput
        id="registration-number"
        label="Registration Number"
        placeholder="Enter official registration number"
        value={registrationNumber}
        onChange={(e) => setRegistrationNumber(e.target.value)}
        disabled={loading}
      />

      <OnboardingTextarea
        id="address"
        label="Address"
        placeholder="Enter your organization address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        disabled={loading}
      />

      <OnboardingTextInput
        id="service-area"
        label="Service Area"
        placeholder="City or region you serve"
        value={serviceArea}
        onChange={(e) => setServiceArea(e.target.value)}
        disabled={loading}
      />

      <div>
        <label htmlFor="verification-doc" className={fieldLabelClass}>
          Verification Document
        </label>
        <input
          id="verification-doc"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          disabled={loading}
          className="mt-3 block w-full cursor-pointer rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 py-6 text-sm text-[#64748B] file:mr-4 file:rounded-lg file:border-0 file:bg-[#16A34A] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#15803D]"
        />
      </div>
    </OnboardingLayout>
  );
}
