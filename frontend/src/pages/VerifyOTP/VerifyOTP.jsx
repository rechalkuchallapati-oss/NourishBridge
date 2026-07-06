import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import OtpInput from "../../components/auth/OtpInput";
import {
  DEMO_VALID_OTP,
  OTP_LENGTH,
  OTP_VALIDITY_SECONDS,
  RESEND_COOLDOWN_SECONDS,
  readVerifyContact,
} from "../../constants/auth";
import { maskContact } from "../../utils/maskContact";
import { completeAuthSession } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const contact = readVerifyContact(location.state);

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN_SECONDS);
  const [expiryTimer, setExpiryTimer] = useState(OTP_VALIDITY_SECONDS);

  useEffect(() => {
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
      setExpiryTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVerify = async (event) => {
    event.preventDefault();
    setError("");

    if (otp.length !== OTP_LENGTH) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    if (expiryTimer === 0) {
      setError("OTP has expired. Please request a new one.");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (otp === DEMO_VALID_OTP) {
      const dashboardRoute = completeAuthSession(contact);
      navigate(dashboardRoute);
      return;
    }

    setError("Invalid OTP. Use 123456 for demo verification.");
    setLoading(false);
  };

  const handleResend = () => {
    if (resendTimer > 0) return;

    setError("");
    setOtp("");
    setResendTimer(RESEND_COOLDOWN_SECONDS);
    setExpiryTimer(OTP_VALIDITY_SECONDS);
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
              Verify OTP
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base leading-7 text-[#64748B] sm:text-lg">
              Enter the 6-digit code sent to{" "}
              <span className="font-semibold text-[#0F172A]">
                {maskContact(contact)}
              </span>
            </p>
          </div>

          <form onSubmit={handleVerify} className="mt-[1cm] space-y-[1cm]">
            <OtpInput value={otp} onChange={setOtp} length={OTP_LENGTH} disabled={loading} />

            <p className="text-center text-sm text-[#64748B]">
              Code expires in{" "}
              <span className="font-semibold text-[#0F172A]">
                {Math.floor(expiryTimer / 60)}:
                {String(expiryTimer % 60).padStart(2, "0")}
              </span>
            </p>

            {error && (
              <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="flex justify-center">
              <Button
                type="submit"
                loading={loading}
                className="h-14 min-w-[240px] px-10 text-base sm:text-lg"
              >
                Verify
              </Button>
            </div>

            <p className="text-center text-base text-[#64748B]">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={resendTimer > 0}
                className="font-semibold text-[#16A34A] transition-colors hover:text-[#15803D] hover:underline disabled:cursor-not-allowed disabled:text-[#94A3B8] disabled:no-underline"
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
              </button>
            </p>
          </form>
        </motion.div>
      </Container>
    </section>
  );
}
