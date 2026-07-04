import { useRef } from "react";

export default function OtpInput({ value, onChange, length = 6, disabled = false }) {
  const inputsRef = useRef([]);

  const digits = value.padEnd(length, " ").slice(0, length).split("");

  const focusInput = (index) => {
    inputsRef.current[index]?.focus();
  };

  const handleChange = (index, nextValue) => {
    const digit = nextValue.replace(/\D/g, "").slice(-1);
    const nextDigits = [...digits.map((item) => (item === " " ? "" : item))];
    nextDigits[index] = digit;
    onChange(nextDigits.join("").trimEnd());

    if (digit && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !digits[index]?.trim() && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    focusInput(Math.min(pasted.length, length - 1));
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            inputsRef.current[index] = node;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit.trim()}
          disabled={disabled}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          aria-label={`OTP digit ${index + 1}`}
          className="h-14 w-11 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-center text-xl font-semibold text-[#0F172A] outline-none transition-all focus:border-[#16A34A] focus:bg-white focus:ring-1 focus:ring-[#16A34A]/20 sm:h-16 sm:w-14 sm:text-2xl"
        />
      ))}
    </div>
  );
}
