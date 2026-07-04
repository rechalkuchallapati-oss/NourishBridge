import { motion } from "framer-motion";
import Container from "../common/Container";
import Button from "../common/Button";
import {
  LINE_GAP,
  fieldLabelClass,
  inputClassName,
  inputShellClass,
} from "../auth/authStyles";

const EASE = [0.22, 1, 0.36, 1];

export function OnboardingField({ id, label, children }) {
  return (
    <div className={LINE_GAP}>
      <label htmlFor={id} className={fieldLabelClass}>
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
        />
      </div>
    </OnboardingField>
  );
}

export default function OnboardingLayout({
  emoji,
  title,
  subtitle,
  children,
  onSubmit,
  submitLabel = "Complete Setup",
  formError,
}) {
  return (
    <section className="relative min-h-[calc(100vh-90px)] overflow-hidden bg-gradient-to-b from-[#F8FFF8] via-white to-[#F0FDF4] py-12 sm:py-16">
      <Container className="relative z-10 flex flex-col items-center">
        <motion.div
          className="mx-auto w-full max-w-2xl rounded-2xl border border-[#E5E7EB] bg-white px-8 py-[1cm] shadow-[0_8px_40px_rgba(15,23,42,0.08)] sm:px-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <div className="text-center">
            <span className="text-4xl" aria-hidden="true">
              {emoji}
            </span>
            <h1 className="mt-3 text-3xl font-bold text-[#0F172A] sm:text-4xl">
              {title}
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-[#64748B] sm:text-lg">
              {subtitle}
            </p>
          </div>

          <form onSubmit={onSubmit} className={`mt-[1cm] ${LINE_GAP}`}>
            {children}

            {formError && (
              <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
                {formError}
              </p>
            )}

            <div className="flex justify-center pt-[1cm]">
              <Button
                type="submit"
                className="h-14 min-w-[280px] px-12 text-base sm:text-lg"
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
