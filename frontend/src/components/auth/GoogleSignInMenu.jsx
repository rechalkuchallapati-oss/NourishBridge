import GoogleLogo from "./GoogleLogo";
import { authMenuItemClass, authMenuPanelClass } from "./authStyles";
import {
  continueWithGoogleForApp,
  getRecentGoogleAccounts,
  isGoogleMailAddress,
  openGoogleAccountChooser,
} from "../../utils/recentEmails";

function AccountAvatar({ email }) {
  const initial = email.charAt(0).toUpperCase();

  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F8EF] text-sm font-bold text-[#16A34A]"
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}

export default function GoogleSignInMenu({
  emails,
  onContinueWithGoogle,
  onClose,
}) {
  const savedGoogleAccounts = (emails.length ? emails : getRecentGoogleAccounts()).filter(
    isGoogleMailAddress
  );
  const existingEmail = savedGoogleAccounts[0] ?? "";

  const handleContinue = (account) => {
    const result = continueWithGoogleForApp(account);

    if (result.success) {
      onContinueWithGoogle?.(result);
    }

    onClose();
  };

  const handleOpenExistingAccount = () => {
    if (existingEmail) {
      handleContinue(existingEmail);
      return;
    }

    openGoogleAccountChooser();
    onContinueWithGoogle?.({
      success: false,
      message:
        "Choose your Google account in the popup. Then enter your Gmail above to continue with NourishBridge.",
    });
    onClose();
  };

  return (
    <div
      className={authMenuPanelClass}
      role="menu"
      aria-label="Continue with Google options"
    >
      <div className="border-b border-[#E5E7EB] bg-[#F8FAFC] px-5 py-4">
        <p className="text-sm font-semibold text-[#0F172A] sm:text-base">
          Continue with Google
        </p>
        <p className="mt-2 text-xs leading-6 text-[#64748B] sm:text-sm">
          Choose a Google account to continue with NourishBridge.
        </p>
      </div>

      {savedGoogleAccounts.length > 0 ? (
        <div className="space-y-1 border-b border-[#E5E7EB] py-2">
          <p className="px-5 py-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
            Your Google accounts
          </p>
          {savedGoogleAccounts.map((account) => (
            <button
              key={account}
              type="button"
              role="menuitem"
              onClick={() => handleContinue(account)}
              className={authMenuItemClass}
            >
              <AccountAvatar email={account} />
              <span className="min-w-0 flex-1 truncate">{account}</span>
              <GoogleLogo className="h-4 w-4 shrink-0 opacity-80" />
            </button>
          ))}
        </div>
      ) : (
        <div className="border-b border-[#E5E7EB] px-5 py-4">
          <p className="text-sm leading-6 text-[#64748B]">
            Enter your Gmail in the email field first — it will appear here next
            time.
          </p>
        </div>
      )}

      <div className="py-2">
        <button
          type="button"
          role="menuitem"
          onClick={handleOpenExistingAccount}
          className={authMenuItemClass}
        >
          <GoogleLogo className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
          <span className="min-w-0 flex-1 text-left">
            Open with existing account
          </span>
          {existingEmail ? (
            <span className="ml-2 truncate text-xs text-[#94A3B8] sm:text-sm">
              {existingEmail}
            </span>
          ) : null}
        </button>
      </div>
    </div>
  );
}
