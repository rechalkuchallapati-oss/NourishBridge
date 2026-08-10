import BrandLogo from "../common/BrandLogo";

/**
 * Shared loading screen shown while authentication state is being restored.
 */
export default function AuthLoadingScreen({ fullPage = false }) {
  return (
    <div
      className={[
        "flex flex-col items-center justify-center bg-gradient-to-b from-[#F8FFF8] via-white to-[#F0FDF4]",
        fullPage ? "min-h-screen" : "min-h-[50vh]",
      ].join(" ")}
      role="status"
      aria-live="polite"
      aria-label="Checking authentication"
    >
      <BrandLogo size="compact" showTagline={false} className="mb-8 opacity-90" />
      <div
        className="h-11 w-11 animate-spin rounded-full border-4 border-[#DCFCE7] border-t-[#16A34A]"
        aria-hidden="true"
      />
      <p className="mt-5 text-sm font-medium text-[#64748B] sm:text-base">
        Restoring your session…
      </p>
    </div>
  );
}
