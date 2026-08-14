import { motion } from "framer-motion";
import { FaBoxOpen, FaHandshake, FaTruck } from "react-icons/fa";
import Container from "../common/Container";
import Button from "../common/Button";
import {
  FORM_STACK,
  PAGE_TITLE,
  BODY_TEXT,
  ERROR_TEXT,
} from "../../styles/designTokens";
import {
  LINE_GAP,
  inputClassName,
  inputShellClass,
} from "../auth/authStyles";

const EASE = [0.22, 1, 0.36, 1];

const ONBOARDING_ICONS = {
  donor: FaBoxOpen,
  ngo: FaHandshake,
  volunteer: FaTruck,
  "🍱": FaBoxOpen,
  "🤝": FaHandshake,
  "🚚": FaTruck,
};

export function OnboardingField({ id, label, children }) {
  return (
    <div className={FORM_STACK}>
      <label htmlFor={id} className="block text-sm font-semibold text-[#0F172A] sm:text-base">
        {label}
      </label>
      {children}
    </div>
  );
}

export function OnboardingTextInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = true,
  autoComplete,
  disabled = false,
}) {
  return (
    <OnboardingField id={id} label={label}>
      <div className={inputShellClass}>
        <input
          id={id}
          type={type}
          name={id}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputClassName}
          disabled={disabled}
        />
      </div>
    </OnboardingField>
  );
}

export function OnboardingTextarea({
  id,
  label,
  placeholder,
  value,
  onChange,
  required = true,
  disabled = false,
}) {
  return (
    <OnboardingField id={id} label={label}>
      <div className={`${inputShellClass} h-auto min-h-[120px] items-start py-4`}>
        <textarea
          id={id}
          name={id}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={4}
          className={`${inputClassName} resize-none`}
          disabled={disabled}
        />
      </div>
    </OnboardingField>
  );
}

export default function OnboardingLayout({
  emoji,
  iconKey,
  title,
  subtitle,
  children,
  onSubmit,
  submitLabel = "Complete Setup",
  formError,
  loading = false,
}) {
  const Icon = ONBOARDING_ICONS[iconKey || emoji] || FaBoxOpen;

  return (
    <section className="relative min-h-[calc(100vh-90px)] overflow-hidden bg-gradient-to-b from-[#F8FFF8] via-white to-[#F0FDF4] py-12 sm:py-16">
      <Container className="relative z-10 flex flex-col items-center">
        <motion.div
          className="mx-auto w-full max-w-2xl rounded-2xl border border-[#E5E7EB] bg-white px-6 py-8 shadow-[0_8px_40px_rgba(15,23,42,0.08)] sm:px-10 sm:py-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <div className="text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0FDF4] text-[#16A34A]">
              <Icon className="text-2xl" aria-hidden="true" />
            </span>
            <h1 className={`mt-4 ${PAGE_TITLE}`}>{title}</h1>
            <p className={`mx-auto mt-3 max-w-lg ${BODY_TEXT}`}>{subtitle}</p>
          </div>

          <form onSubmit={onSubmit} className={`mt-8 ${LINE_GAP}`}>
            {children}

            {formError ? (
              <p className={`rounded-lg border border-red-100 bg-red-50 px-3 py-2 ${ERROR_TEXT}`}>
                {formError}
              </p>
            ) : null}

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                loading={loading}
                disabled={loading}
                className="h-12 min-w-[240px] px-10 sm:h-14 sm:min-w-[280px]"
              >
                {submitLabel}
              </Button>
            </div>
          </form>
        </motion.div>
      </Container>
    </section>
  );
}
