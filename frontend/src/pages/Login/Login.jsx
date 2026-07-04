import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../../components/common/Container";
import SignInForm from "../../components/auth/SignInForm";
import CreateAccountForm from "../../components/auth/CreateAccountForm";

const EASE = [0.22, 1, 0.36, 1];

const tabs = [
  { id: "signin", label: "Sign In" },
  { id: "create", label: "Create Account" },
];

const TAB_BUTTON_CLASS =
  "relative min-h-[72px] px-8 py-7 text-2xl font-bold transition-colors duration-300 sm:min-h-[80px] sm:py-8 sm:text-3xl";

function AuthTabs({ activeTab, onTabChange }) {
  return (
    <div className="grid grid-cols-2 border-y border-[#E5E7EB]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={[
              TAB_BUTTON_CLASS,
              isActive
                ? "text-[#16A34A]"
                : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]",
            ].join(" ")}
          >
            {tab.label}
            {isActive && (
              <motion.span
                layoutId="auth-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#16A34A]"
                transition={{ duration: 0.3, ease: EASE }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function AuthHeader() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl">
        Welcome to <span className="text-[#16A34A]">NourishBridge</span>
      </h1>
      <p className="mx-auto mt-3 max-w-md text-base leading-8 text-[#64748B] sm:mt-4 sm:max-w-lg sm:text-lg sm:leading-9">
        Sign in to connect donors, NGOs, and volunteers — reducing food waste
        and nourishing communities.
      </p>
    </div>
  );
}

export default function Login() {
  const [activeTab, setActiveTab] = useState("signin");
  const isSignIn = activeTab === "signin";

  return (
    <section className="relative min-h-[calc(100vh-90px)] overflow-hidden bg-gradient-to-b from-[#F8FFF8] via-white to-[#F0FDF4] py-12 sm:py-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,#ECFDF3_0%,transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-[15%] h-64 w-64 rounded-full bg-[#DCFCE7]/45 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-[10%] h-56 w-56 rounded-full bg-[#BBF7D0]/30 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10 flex flex-col items-center">
        <motion.div
          className="mx-auto w-full max-w-[720px] transition-all duration-300"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <div
            className={`mt-[1cm] rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_8px_40px_rgba(15,23,42,0.08)] ${
              isSignIn
                ? "flex min-h-[820px] max-h-[calc(100vh-100px)] flex-col gap-[1cm] overflow-y-auto px-8 py-[1cm] sm:min-h-[880px] sm:px-10"
                : "flex max-h-[calc(100vh-100px)] flex-col gap-[1cm] overflow-y-auto px-8 py-[1cm] sm:px-10"
            }`}
          >
            <AuthHeader />
            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <AnimatePresence mode="wait">
              {isSignIn ? (
                <motion.div
                  key="signin"
                  className="flex flex-1 flex-col"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <SignInForm onSwitchToCreate={() => setActiveTab("create")} />
                </motion.div>
              ) : (
                <motion.div
                  key="create"
                  className="flex flex-1 flex-col"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <CreateAccountForm onSwitchToSignIn={() => setActiveTab("signin")} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
