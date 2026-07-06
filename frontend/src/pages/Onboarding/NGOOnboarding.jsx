import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OnboardingLayout, {
  OnboardingTextInput,
  OnboardingTextarea,
} from "../../components/onboarding/OnboardingLayout";
import { goToVerifyOtp } from "../../constants/auth";
import { fieldLabelClass } from "../../components/auth/authStyles";

export default function NGOOnboarding() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [orgName, setOrgName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [address, setAddress] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    goToVerifyOtp(navigate, {
      email: state?.email,
      phone: state?.phone,
      role: state?.role || "ngo",
      fullName: state?.fullName,
      organizationName: orgName.trim(),
      organization: orgName.trim(),
      registrationId: registrationNumber.trim(),
      address: address.trim(),
      serviceAreas: serviceArea
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });
  };

  return (
    <OnboardingLayout
      emoji="🤝"
      title="NGO Setup"
      subtitle="Complete your organization profile for verification and food distribution."
      onSubmit={handleSubmit}
      formError={formError}
    >
      <OnboardingTextInput
        id="org-name"
        label="Organization Name"
        placeholder="Enter your NGO name"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
      />

      <OnboardingTextInput
        id="registration-number"
        label="Registration Number"
        placeholder="Enter official registration number"
        value={registrationNumber}
        onChange={(e) => setRegistrationNumber(e.target.value)}
      />

      <OnboardingTextarea
        id="address"
        label="Address"
        placeholder="Enter your organization address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <OnboardingTextInput
        id="service-area"
        label="Service Area"
        placeholder="City or region you serve"
        value={serviceArea}
        onChange={(e) => setServiceArea(e.target.value)}
      />

      <div>
        <label htmlFor="verification-doc" className={fieldLabelClass}>
          Verification Document
        </label>
        <input
          id="verification-doc"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="mt-3 block w-full cursor-pointer rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 py-6 text-sm text-[#64748B] file:mr-4 file:rounded-lg file:border-0 file:bg-[#16A34A] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#15803D]"
        />
      </div>
    </OnboardingLayout>
  );
}
