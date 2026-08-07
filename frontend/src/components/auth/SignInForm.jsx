import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import Button from "../common/Button";
import EmailSuggestions from "./EmailSuggestions";
import GoogleLogo from "./GoogleLogo";
import GoogleSignInMenu from "./GoogleSignInMenu";
import useClickOutside from "../../hooks/useClickOutside";
import {
  OAUTH_SECTION_GAP,
  SIGN_IN_FIELD_GAP,
  SIGN_IN_GAP,
  fieldLabelClass,
  inputClassName,
  inputShellClass,
  oauthDividerClass,
  oauthGoogleButtonClass,
} from "./authStyles";
import {
  addRecentEmail,
  filterRecentEmails,
  getRecentEmails,
} from "../../utils/recentEmails";
import { USER_ROLES } from "../../constants/roles";
import { getDashboardRouteForRole, getRegisteredUser } from "../../utils/authStorage";
import { useAuth } from "../../context/AuthContext";
import { getApiErrorMessage } from "../../utils/apiErrors";

export default function SignInForm({ onSwitchToCreate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const emailFieldRef = useRef(null);
  const googleMenuRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [recentEmails, setRecentEmails] = useState([]);
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const [showGoogleMenu, setShowGoogleMenu] = useState(false);
  const [googleMessage, setGoogleMessage] = useState("");
  const [role, setRole] = useState("donor");

  const refreshRecentEmails = useCallback(() => {
    setRecentEmails(getRecentEmails());
  }, []);

  useEffect(() => {
    refreshRecentEmails();
  }, [refreshRecentEmails]);

  useEffect(() => {
    const registered = getRegisteredUser(email);
    if (registered?.role) {
      setRole(registered.role);
    }
  }, [email]);

  const suggestedEmails = filterRecentEmails(email);

  const closeEmailSuggestions = useCallback(() => {
    setShowEmailSuggestions(false);
  }, []);

  const closeGoogleMenu = useCallback(() => {
    setShowGoogleMenu(false);
  }, []);

  useClickOutside(emailFieldRef, closeEmailSuggestions, showEmailSuggestions);
  useClickOutside(googleMenuRef, closeGoogleMenu, showGoogleMenu);

  const handleEmailFocus = () => {
    refreshRecentEmails();
    if (getRecentEmails().length > 0) {
      setShowEmailSuggestions(true);
    }
  };

  const handleEmailSelect = (value) => {
    setEmail(value);
    setShowEmailSuggestions(false);
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setLoading(true);

    try {
      addRecentEmail(email);
      refreshRecentEmails();

      const sessionUser = await login({
        email: email.trim(),
        password,
        rememberMe,
      });

      toast.success(`Welcome back, ${sessionUser.fullName?.split(" ")[0] || "there"}!`);

      const redirectTo =
        location.state?.from || getDashboardRouteForRole(sessionUser.role);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const message = getApiErrorMessage(error, "Invalid email or password.");
      setFormError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setFormError("");
    setOtpMessage("");

    if (!email.trim()) {
      setFormError("Enter your email address first to receive an OTP.");
      setShowEmailSuggestions(getRecentEmails().length > 0);
      return;
    }

    addRecentEmail(email);
    refreshRecentEmails();

    setOtpMessage(
      `An OTP has been sent to ${email.trim()}. Check your inbox to reset your password.`,
    );
  };

  const handleGoogleContinue = ({ success, email: googleEmail, message }) => {
    if (success && googleEmail) {
      setEmail(googleEmail);
      addRecentEmail(googleEmail);
      refreshRecentEmails();
      setFormError("");
      setGoogleMessage(
        message ||
          `Using ${googleEmail} to continue with NourishBridge. Enter your password to sign in.`,
      );
      return;
    }

    if (message) {
      setGoogleMessage(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-1 flex-col ${SIGN_IN_GAP}`}>
      <div className={SIGN_IN_FIELD_GAP}>
        <label htmlFor="signin-email" className={fieldLabelClass}>
          Email Address
        </label>
        <div ref={emailFieldRef} className="relative">
          <div className={inputShellClass}>
            {!email && (
              <FaEnvelope
                className="shrink-0 text-base text-[#16A34A] sm:text-lg"
                aria-hidden="true"
              />
            )}
            <input
              id="signin-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setShowEmailSuggestions(true);
                setFormError("");
              }}
              onFocus={handleEmailFocus}
              onClick={handleEmailFocus}
              className={inputClassName}
              aria-expanded={showEmailSuggestions}
              aria-haspopup="listbox"
              aria-controls="signin-email-suggestions"
              disabled={loading}
            />
          </div>

          {showEmailSuggestions && suggestedEmails.length > 0 && (
            <div id="signin-email-suggestions">
              <EmailSuggestions
                emails={suggestedEmails}
                onSelect={handleEmailSelect}
                onDismiss={closeEmailSuggestions}
              />
            </div>
          )}
        </div>
      </div>

      <div className={SIGN_IN_FIELD_GAP}>
        <label htmlFor="signin-password" className={fieldLabelClass}>
          Password
        </label>
        <div className={inputShellClass}>
          {!password && (
            <FaLock
              className="shrink-0 text-base text-[#16A34A] sm:text-lg"
              aria-hidden="true"
            />
          )}
          <input
            id="signin-password"
            type={showPassword ? "text" : "password"}
            name="password"
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFormError("");
            }}
            className={inputClassName}
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="ml-auto flex shrink-0 items-center justify-center text-[#64748B] transition-colors duration-300 hover:text-[#16A34A]"
            aria-label={showPassword ? "Hide password" : "Show password"}
            disabled={loading}
          >
            {showPassword ? (
              <FaEyeSlash className="text-base sm:text-lg" />
            ) : (
              <FaEye className="text-base sm:text-lg" />
            )}
          </button>
        </div>
      </div>

      <fieldset className={SIGN_IN_FIELD_GAP}>
        <legend className={fieldLabelClass}>Sign in as</legend>
        <div className="grid grid-cols-3 gap-2">
          {USER_ROLES.map((item) => {
            const isSelected = role === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setRole(item.id)}
                aria-pressed={isSelected}
                disabled={loading}
                className={[
                  "flex flex-col items-center rounded-xl border px-2 py-3 text-center transition-all duration-300",
                  isSelected
                    ? "border-[#16A34A] bg-[#F0FDF4] shadow-[0_4px_14px_rgba(22,163,74,0.12)]"
                    : "border-[#E5E7EB] bg-[#F8FAFC] hover:border-[#16A34A]/40 hover:bg-white",
                ].join(" ")}
              >
                <span className="text-xl" aria-hidden="true">
                  {item.emoji}
                </span>
                <span className="mt-1 text-xs font-semibold text-[#0F172A] sm:text-sm">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-[#94A3B8] sm:text-sm">
          Your account role is determined by your registration. This selector is for display only.
        </p>
      </fieldset>

      <div className="flex items-center justify-between gap-4">
        <label className="flex cursor-pointer items-center gap-2.5">
          <span className="text-base text-[#64748B] sm:text-lg">Remember me</span>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 shrink-0 cursor-pointer rounded border-[#CBD5E1] text-[#16A34A] accent-[#16A34A] focus:ring-[#16A34A]/30"
            aria-label="Remember me"
            disabled={loading}
          />
        </label>

        <button
          type="button"
          onClick={handleForgotPassword}
          className="shrink-0 text-base font-medium text-[#16A34A] transition-colors duration-300 hover:text-[#15803D] hover:underline sm:text-lg"
          disabled={loading}
        >
          Forgot password?
        </button>
      </div>

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

      {otpMessage && (
        <p className="rounded-lg border border-[#DCFCE7] bg-[#F0FDF4] px-3 py-2 text-xs leading-5 text-[#15803D] sm:text-sm">
          {otpMessage}
        </p>
      )}

      <div className="flex justify-center">
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          className="h-14 min-w-[260px] px-12 text-base sm:min-w-[280px] sm:text-lg"
        >
          Sign In
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
              refreshRecentEmails();
              setShowGoogleMenu((prev) => !prev);
              setShowEmailSuggestions(false);
            }}
            disabled={loading}
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
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToCreate}
          className="font-semibold text-[#16A34A] transition-colors duration-300 hover:text-[#15803D] hover:underline"
          disabled={loading}
        >
          Create account
        </button>
      </p>
    </form>
  );
}
