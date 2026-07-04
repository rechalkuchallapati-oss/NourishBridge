import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import Button from "../common/Button";
import GoogleLogo from "./GoogleLogo";
import GoogleSignInMenu from "./GoogleSignInMenu";
import useClickOutside from "../../hooks/useClickOutside";
import {
  BOTTOM_SECTION_GAP,
  LINE_GAP,
  OAUTH_SECTION_GAP,
  fieldLabelClass,
  inputClassName,
  inputShellClass,
  oauthDividerClass,
  oauthGoogleButtonClass,
} from "./authStyles";
import { ROLE_ONBOARDING_ROUTES, USER_ROLES } from "../../constants/roles";
import { addRecentEmail, getRecentEmails } from "../../utils/recentEmails";

function PasswordField({
  id,
  label,
  placeholder,
  autoComplete,
  value,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={LINE_GAP}>
      <label htmlFor={id} className={fieldLabelClass}>
        {label}
      </label>
      <div className={inputShellClass}>
        {!value && (
          <FaLock
            className="shrink-0 text-base text-[#16A34A] sm:text-lg"
            aria-hidden="true"
          />
        )}
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          name={id}
          required
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputClassName}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="ml-auto flex shrink-0 items-center justify-center text-[#64748B] transition-colors duration-300 hover:text-[#16A34A]"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <FaEyeSlash className="text-base sm:text-lg" />
          ) : (
            <FaEye className="text-base sm:text-lg" />
          )}
        </button>
      </div>
    </div>
  );
}

export default function CreateAccountForm({ onSwitchToSignIn }) {
  const navigate = useNavigate();
  const googleMenuRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formError, setFormError] = useState("");
  const [recentEmails, setRecentEmails] = useState(getRecentEmails());
  const [showGoogleMenu, setShowGoogleMenu] = useState(false);
  const [googleMessage, setGoogleMessage] = useState("");

  const closeGoogleMenu = useCallback(() => {
    setShowGoogleMenu(false);
  }, []);

  const handleGoogleContinue = ({ success, email, message }) => {
    if (success && email) {
      setEmail(email);
      addRecentEmail(email);
      setRecentEmails(getRecentEmails());
      setFormError("");
      setGoogleMessage(
        message || `Using ${email} to continue with NourishBridge.`
      );
      return;
    }

    if (message) {
      setGoogleMessage(message);
    }
  };

  useClickOutside(googleMenuRef, closeGoogleMenu, showGoogleMenu);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (password !== confirmPassword) {
      setFormError("Passwords do not match. Please try again.");
      return;
    }

    if (!role) {
      setFormError("Please choose your role to continue.");
      return;
    }

    if (!agreedToTerms) {
      setFormError("You must agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    addRecentEmail(email);
    setRecentEmails(getRecentEmails());

    navigate(ROLE_ONBOARDING_ROUTES[role], {
      state: { email, phone, role, fullName: name },
    });
  };

  return (
    <form onSubmit={handleSubmit} className={LINE_GAP}>
      <div className={LINE_GAP}>
        <label htmlFor="register-name" className={fieldLabelClass}>
          Full Name
        </label>
        <div className={inputShellClass}>
          {!name && (
            <FaUser
              className="shrink-0 text-base text-[#16A34A] sm:text-lg"
              aria-hidden="true"
            />
          )}
          <input
            id="register-name"
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClassName}
          />
        </div>
      </div>

      <div className={LINE_GAP}>
        <label htmlFor="register-email" className={fieldLabelClass}>
          Email Address
        </label>
        <div className={inputShellClass}>
          {!email && (
            <FaEnvelope
              className="shrink-0 text-base text-[#16A34A] sm:text-lg"
              aria-hidden="true"
            />
          )}
          <input
            id="register-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClassName}
          />
        </div>
      </div>

      <div className={LINE_GAP}>
        <label htmlFor="register-phone" className={fieldLabelClass}>
          Phone Number
        </label>
        <div className={inputShellClass}>
          {!phone && (
            <FaPhone
              className="shrink-0 text-base text-[#16A34A] sm:text-lg"
              aria-hidden="true"
            />
          )}
          <input
            id="register-phone"
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            placeholder="+91 XXXXX XXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClassName}
          />
        </div>
      </div>

      <PasswordField
        id="register-password"
        label="Password"
        placeholder="Enter your password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <PasswordField
        id="register-confirm-password"
        label="Confirm Password"
        placeholder="Re-enter your password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <fieldset className={LINE_GAP}>
        <legend className={fieldLabelClass}>Choose Your Role</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {USER_ROLES.map((item) => {
            const isSelected = role === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setRole(item.id)}
                aria-pressed={isSelected}
                className={[
                  "flex flex-col items-center rounded-xl border px-3 py-4 text-center transition-all duration-300",
                  isSelected
                    ? "border-[#16A34A] bg-[#F0FDF4] shadow-[0_4px_14px_rgba(22,163,74,0.12)]"
                    : "border-[#E5E7EB] bg-[#F8FAFC] hover:border-[#16A34A]/40 hover:bg-white",
                ].join(" ")}
              >
                <span className="text-2xl" aria-hidden="true">
                  {item.emoji}
                </span>
                <span className="mt-2 text-base font-semibold text-[#0F172A] sm:text-lg">
                  {item.title}
                </span>
                <span className="mt-1 text-sm leading-5 text-[#64748B] sm:text-base">
                  {item.description}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-[#CBD5E1] text-[#16A34A] accent-[#16A34A] focus:ring-[#16A34A]/30"
          aria-label="Agree to terms and privacy policy"
        />
        <span className="text-base leading-7 text-[#64748B] sm:text-lg sm:leading-8">
          I agree to the{" "}
          <a
            href="/terms"
            className="font-medium text-[#16A34A] hover:text-[#15803D] hover:underline"
          >
            Terms &amp; Conditions
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="font-medium text-[#16A34A] hover:text-[#15803D] hover:underline"
          >
            Privacy Policy
          </a>
        </span>
      </label>

      {googleMessage && (
        <p className="rounded-lg border border-[#DCFCE7] bg-[#F0FDF4] px-3 py-2 text-xs leading-5 text-[#15803D] sm:text-sm">
          {googleMessage}
        </p>
      )}

      {formError && (
        <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs leading-5 text-red-600 sm:text-sm">
          {formError}
        </p>
      )}

      <div className={`mt-[1cm] ${BOTTOM_SECTION_GAP}`}>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="h-14 min-w-[280px] px-12 text-base sm:min-w-[300px] sm:text-lg"
          >
            Create Account
          </Button>
        </div>

        <div className={OAUTH_SECTION_GAP}>
          <div className={oauthDividerClass}>
            <div className="relative flex w-full items-center">
              <div className="h-px flex-1 bg-[#E5E7EB]" aria-hidden="true" />
              <span className="px-4 text-sm font-medium uppercase tracking-wide text-[#94A3B8] sm:text-base">
                or continue with
              </span>
              <div className="h-px flex-1 bg-[#E5E7EB]" aria-hidden="true" />
            </div>
          </div>

          <div ref={googleMenuRef} className="flex flex-col gap-4">
            <button
              type="button"
              className={oauthGoogleButtonClass}
              aria-expanded={showGoogleMenu}
              aria-haspopup="menu"
              onClick={() => {
                setRecentEmails(getRecentEmails());
                setShowGoogleMenu((prev) => !prev);
              }}
            >
              <GoogleLogo className="h-5 w-5 sm:h-6 sm:w-6" />
              Continue with Google
            </button>

            {showGoogleMenu && (
              <GoogleSignInMenu
                emails={recentEmails}
                onContinueWithGoogle={handleGoogleContinue}
                onClose={closeGoogleMenu}
              />
            )}
          </div>
        </div>

        <p className="text-center text-base text-[#64748B] sm:text-lg">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="font-semibold text-[#16A34A] transition-colors duration-300 hover:text-[#15803D] hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </form>
  );
}
