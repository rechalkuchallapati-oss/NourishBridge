import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import OtpInput from "../../components/auth/OtpInput";
import GuestRoute from "../../components/auth/GuestRoute";
import {
  fieldLabelClass,
  inputClassName,
  inputShellClass,
  LINE_GAP,
} from "../../components/auth/authStyles";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { forgotPassword, resetPassword, validatePassword } from "../../services/authService";
import { getApiErrorMessage } from "../../utils/apiErrors";
import { OTP_LENGTH, OTP_VALIDITY_SECONDS, RESEND_COOLDOWN_SECONDS } from "../../constants/auth";

const EASE = [0.22, 1, 0.36, 1];

function PasswordField({ id, label, value, onChange, disabled }) {
  const [show, setShow] = useState(false);

  return (
    <div className={LINE_GAP}>
      <label htmlFor={id} className={fieldLabelClass}>
        {label}
      </label>
      <div className={inputShellClass}>
        {!value && <FaLock className="shrink-0 text-base text-[#16A34A] sm:text-lg" aria-hidden="true" />}
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          required
          disabled={disabled}
          className={inputClassName}
          autoComplete={id.includes("confirm") ? "new-password" : "new-password"}
        />
        <button
          type="button"
          onClick={() => setShow((p) => !p)}
          className="ml-auto text-[#64748B] hover:text-[#16A34A]"
          aria-label={show ? "Hide password" : "Show password"}
          disabled={disabled}
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
}

function ForgotPasswordContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefilledEmail = location.state?.email || "";

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(prefilledEmail);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [expiryTimer, setExpiryTimer] = useState(OTP_VALIDITY_SECONDS);

  useEffect(() => {
    if (step !== 2) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
      setExpiryTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  const sendOtp = async (event) => {
    event?.preventDefault();
    setFormError("");
    setLoading(true);

    try {
      await forgotPassword(email.trim());
      toast.success("If an account exists, a reset code has been sent to your email.");
      setStep(2);
      setResendTimer(RESEND_COOLDOWN_SECONDS);
      setExpiryTimer(OTP_VALIDITY_SECONDS);
      setOtp("");
    } catch (error) {
      const message = getApiErrorMessage(error, "Unable to send reset code.");
      setFormError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (event) => {
    event.preventDefault();
    setFormError("");

    const passwordError = validatePassword(password);
    if (passwordError) {
      setFormError(passwordError);
      toast.error(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    if (otp.length !== OTP_LENGTH) {
      setFormError("Please enter the complete 6-digit code.");
      return;
    }

    if (expiryTimer === 0) {
      setFormError("Code has expired. Please request a new one.");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({
        email: email.trim(),
        otp,
        password,
        confirmPassword,
      });
      toast.success("Password reset successful. Please sign in.");
      navigate("/login", { replace: true });
    } catch (error) {
      const message = getApiErrorMessage(error, "Unable to reset password.");
      setFormError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    await sendOtp();
  };

  return (
    <section className="relative min-h-[calc(100vh-90px)] overflow-hidden bg-gradient-to-b from-[#F8FFF8] via-white to-[#F0FDF4] py-12 sm:py-16">
      <Container className="relative z-10 flex flex-col items-center">
        <motion.div
          className="mx-auto w-full max-w-xl rounded-2xl border border-[#E5E7EB] bg-white px-8 py-[1cm] shadow-[0_8px_40px_rgba(15,23,42,0.08)] sm:px-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#0F172A] sm:text-4xl">
              {step === 1 ? "Forgot Password" : "Reset Password"}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base leading-7 text-[#64748B] sm:text-lg">
              {step === 1
                ? "Enter your email and we'll send you a verification code."
                : `Enter the 6-digit code sent to ${email.trim()} and choose a new password.`}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={sendOtp} className={`mt-[1cm] ${LINE_GAP}`}>
              <div className={LINE_GAP}>
                <label htmlFor="forgot-email" className={fieldLabelClass}>
                  Email Address
                </label>
                <div className={inputShellClass}>
                  {!email && (
                    <FaEnvelope className="shrink-0 text-base text-[#16A34A] sm:text-lg" aria-hidden="true" />
                  )}
                  <input
                    id="forgot-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClassName}
                    placeholder="you@example.com"
                    disabled={loading}
                  />
                </div>
              </div>

              {formError && (
                <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {formError}
                </p>
              )}

              <div className="flex justify-center pt-4">
                <Button type="submit" loading={loading} className="h-14 min-w-[240px] px-10">
                  Send Reset Code
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleReset} className={`mt-[1cm] ${LINE_GAP}`}>
              <OtpInput value={otp} onChange={setOtp} length={OTP_LENGTH} disabled={loading} />

              <p className="text-center text-sm text-[#64748B]">
                Code expires in{" "}
                <span className="font-semibold text-[#0F172A]">
                  {Math.floor(expiryTimer / 60)}:{String(expiryTimer % 60).padStart(2, "0")}
                </span>
              </p>

              <PasswordField
                id="new-password"
                label="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />

              <PasswordField
                id="confirm-password"
                label="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />

              {formError && (
                <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {formError}
                </p>
              )}

              <div className="flex justify-center pt-2">
                <Button type="submit" loading={loading} className="h-14 min-w-[240px] px-10">
                  Reset Password
                </Button>
              </div>

              <p className="text-center text-base text-[#64748B]">
                Didn&apos;t receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendTimer > 0 || loading}
                  className="font-semibold text-[#16A34A] hover:text-[#15803D] hover:underline disabled:cursor-not-allowed disabled:text-[#94A3B8]"
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend code"}
                </button>
              </p>
            </form>
          )}

          <p className="mt-8 text-center text-base text-[#64748B]">
            <Link to="/login" className="font-semibold text-[#16A34A] hover:text-[#15803D] hover:underline">
              Back to Sign In
            </Link>
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

export default function ForgotPassword() {
  return (
    <GuestRoute>
      <ForgotPasswordContent />
    </GuestRoute>
  );
}
