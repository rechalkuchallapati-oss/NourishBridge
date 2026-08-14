import { createContext, useCallback, useContext, useMemo, useState } from "react";
import AuthPromptModal from "../components/auth/AuthPromptModal.jsx";

const AuthPromptContext = createContext(null);

export function AuthPromptProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const promptLogin = useCallback((customMessage) => {
    setMessage(customMessage || "Sign in or create an account to continue.");
    setOpen(true);
  }, []);

  const closePrompt = useCallback(() => {
    setOpen(false);
    setMessage("");
  }, []);

  const value = useMemo(
    () => ({
      promptLogin,
      closePrompt,
    }),
    [promptLogin, closePrompt],
  );

  return (
    <AuthPromptContext.Provider value={value}>
      {children}
      <AuthPromptModal open={open} message={message} onClose={closePrompt} />
    </AuthPromptContext.Provider>
  );
}

export function useAuthPrompt() {
  const context = useContext(AuthPromptContext);
  if (!context) {
    throw new Error("useAuthPrompt must be used within AuthPromptProvider");
  }
  return context;
}

export default AuthPromptContext;
