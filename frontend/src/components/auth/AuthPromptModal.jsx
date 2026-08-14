import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

export default function AuthPromptModal({ open, message, onClose }) {
  const navigate = useNavigate();

  if (!open) return null;

  const goToLogin = () => {
    onClose();
    navigate("/login");
  };

  const goToRegister = () => {
    onClose();
    navigate("/login", { state: { tab: "create" } });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/45 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-prompt-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.18)] sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="auth-prompt-title" className="text-xl font-bold text-[#0F172A] sm:text-2xl">
          Login / Create Account to Continue
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#64748B] sm:text-base">{message}</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button type="button" className="h-11 flex-1" onClick={goToLogin}>
            Sign In
          </Button>
          <Button type="button" variant="outline" className="h-11 flex-1" onClick={goToRegister}>
            Create Account
          </Button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full text-sm font-medium text-[#64748B] transition hover:text-[#16A34A]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
