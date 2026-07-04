import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCog,
  FaEye,
  FaEyeSlash,
  FaSignOutAlt,
} from "react-icons/fa";
import Button from "../../components/common/Button";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  dashboardAlertSuccessClass,
  dashboardButtonClass,
  dashboardFieldClass,
  dashboardInputClass,
  dashboardLabelClass,
  dashboardSectionClass,
} from "../../components/dashboard/dashboardFormStyles";
import {
  getDonorDisplayName,
  getDonorSettings,
  getSessionUser,
  logoutDonor,
  saveDonorSettings,
} from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];
const BOX_INSET = "pl-[0.5cm] pr-[0.5cm] pt-[0.5cm] pb-[0.5cm]";

const SETTINGS_BUTTON_CLASS = [
  dashboardButtonClass,
  "!h-16 !min-h-[64px] !px-10 !py-4 !text-base !gap-3 !justify-center sm:!text-lg",
  "transition-all duration-300",
  "hover:!shadow-[0_8px_24px_rgba(22,163,74,0.35)]",
  "active:!scale-[0.97] active:!shadow-inner",
  "focus-visible:!ring-2 focus-visible:!ring-[#16A34A] focus-visible:!ring-offset-2",
].join(" ");

const NOTIFICATION_OPTIONS = [
  { key: "emailNotifications", label: "Email notifications" },
  { key: "smsNotifications", label: "SMS notifications" },
  { key: "pickupReminders", label: "Pickup reminders" },
  { key: "foodSafetyAlerts", label: "Food-safety deadline warnings" },
  { key: "ngoUpdates", label: "NGO acceptance & acknowledgement updates" },
  { key: "volunteerUpdates", label: "Volunteer assignment & pickup updates" },
  { key: "deliveryConfirmations", label: "Delivery confirmation alerts" },
  { key: "donationStatusUpdates", label: "Real-time donation status changes" },
  { key: "weeklyImpactSummary", label: "Weekly impact summary" },
];

const DASHBOARD_OPTIONS = [
  { key: "autoSaveDonationDrafts", label: "Auto-save create donation drafts" },
  { key: "showImpactSummary", label: "Show impact summary on dashboard overview" },
];

const PRIVACY_OPTIONS = [
  { key: "privacyHidePhone", label: "Hide phone number from assigned volunteers" },
];

function PasswordField({ id, label, show, onToggle, value, onChange }) {
  return (
    <div className={dashboardFieldClass}>
      <label htmlFor={id} className={dashboardLabelClass}>
        {label}
      </label>
      <div className="flex items-stretch gap-[0.5cm]">
        <button
          type="button"
          onClick={onToggle}
          className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-none border border-[#E5E7EB] bg-[#F8FAFC] text-[#64748B] transition-all duration-300 hover:border-[#16A34A]/40 hover:bg-[#F0FDF4] hover:text-[#16A34A] active:scale-95 active:bg-[#DCFCE7]"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
        </button>
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="••••••••"
          className={`${dashboardInputClass} !min-h-[56px] !py-4 transition-all duration-300 hover:border-[#16A34A]/40 focus:border-[#16A34A]`}
        />
      </div>
    </div>
  );
}

function SettingToggle({ option, checked, onToggle }) {
  return (
    <motion.label
      whileHover={{ x: 4 }}
      className="flex cursor-pointer items-center justify-between gap-[0.5cm] rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-5 py-4 transition-all duration-300 hover:border-[#16A34A]/30 hover:bg-[#F0FDF4] sm:py-5"
    >
      <span className="text-sm font-medium leading-6 text-[#0F172A] sm:text-base">
        {option.label}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="h-5 w-5 shrink-0 accent-[#16A34A]"
      />
    </motion.label>
  );
}

export default function Settings() {
  const user = getSessionUser();
  const donorName = getDonorDisplayName(user);
  const [settings, setSettings] = useState(getDonorSettings());
  const [savedMessage, setSavedMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveDonorSettings(settings);
    setSavedMessage("Settings saved.");
  };

  const handleLogout = () => {
    logoutDonor();
  };

  return (
    <DashboardLayout
      emoji="🍱"
      title="Donor Dashboard"
      subtitle="Security and preferences"
      userName={donorName}
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative flex flex-col gap-[0.5cm] overflow-hidden bg-gradient-to-br from-[#F0FDF4] via-[#F8FAFC] to-white"
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#16A34A]/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-8 left-1/4 h-36 w-36 rounded-full bg-[#22C55E]/10 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-[8%] top-[30%] h-28 w-28 rounded-full bg-[#BBF7D0]/35 blur-2xl"
          aria-hidden="true"
        />

        <motion.header
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative flex items-start gap-[0.5cm] sm:items-center"
        >
          <motion.span
            className="group flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#16A34A]/15 text-[#16A34A] transition-colors duration-300 hover:bg-[#16A34A]/25"
            animate={{ rotate: [0, 8, 0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.06 }}
          >
            <FaCog
              className="text-2xl transition-transform duration-300 group-hover:rotate-90"
              aria-hidden="true"
            />
          </motion.span>
          <div className="flex flex-col gap-[0.5cm]">
            <p className="text-base font-semibold uppercase tracking-[0.18em] text-[#16A34A] sm:text-lg">
              Preferences
            </p>
            <h1 className="bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
              Settings
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg">
              Password, security, notification preferences, and dashboard options.
            </p>
          </div>
        </motion.header>

        {savedMessage ? (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={dashboardAlertSuccessClass}
          >
            {savedMessage}
          </motion.p>
        ) : null}

        <form onSubmit={handleSave} className="relative flex flex-col gap-[0.5cm]">
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
            whileHover={{ y: -2 }}
            className={`${dashboardSectionClass} flex flex-col gap-[0.5cm] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(15,23,42,0.08)] ${BOX_INSET}`}
          >
            <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">
              Password & security
            </h2>
            <p className="text-sm leading-7 text-[#64748B] sm:text-base">
              UI-only preview — connect to your auth API for production password
              changes.
            </p>
            <div className="grid gap-[0.5cm] sm:grid-cols-2">
              <PasswordField
                id="currentPassword"
                label="Current password"
                show={showCurrentPassword}
                onToggle={() => setShowCurrentPassword((prev) => !prev)}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <PasswordField
                id="newPassword"
                label="New password"
                show={showNewPassword}
                onToggle={() => setShowNewPassword((prev) => !prev)}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
            whileHover={{ y: -2 }}
            className={`${dashboardSectionClass} flex flex-col gap-[0.5cm] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(15,23,42,0.08)] ${BOX_INSET}`}
          >
            <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">
              Notification preferences
            </h2>
            <div className="flex flex-col gap-[0.5cm]">
              {NOTIFICATION_OPTIONS.map((option) => (
                <SettingToggle
                  key={option.key}
                  option={option}
                  checked={settings[option.key]}
                  onToggle={() => toggleSetting(option.key)}
                />
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: EASE }}
            whileHover={{ y: -2 }}
            className={`${dashboardSectionClass} flex flex-col gap-[0.5cm] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(15,23,42,0.08)] ${BOX_INSET}`}
          >
            <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">
              Dashboard preferences
            </h2>
            <div className="flex flex-col gap-[0.5cm]">
              {DASHBOARD_OPTIONS.map((option) => (
                <SettingToggle
                  key={option.key}
                  option={option}
                  checked={settings[option.key]}
                  onToggle={() => toggleSetting(option.key)}
                />
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: EASE }}
            whileHover={{ y: -2 }}
            className={`${dashboardSectionClass} flex flex-col gap-[0.5cm] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(15,23,42,0.08)] ${BOX_INSET}`}
          >
            <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">Privacy</h2>
            <div className="flex flex-col gap-[0.5cm]">
              {PRIVACY_OPTIONS.map((option) => (
                <SettingToggle
                  key={option.key}
                  option={option}
                  checked={settings[option.key]}
                  onToggle={() => toggleSetting(option.key)}
                />
              ))}
            </div>
          </motion.section>

          <div className="flex flex-col gap-[0.5cm] sm:flex-row sm:justify-between">
            <Link to="/login" onClick={handleLogout} className="inline-flex">
              <Button
                type="button"
                variant="outline"
                icon={FaSignOutAlt}
                className={`w-full min-w-[160px] border-red-200 !text-red-600 hover:!bg-red-50 sm:w-auto ${SETTINGS_BUTTON_CLASS}`}
              >
                Logout
              </Button>
            </Link>
            <Button type="submit" className={`min-w-[200px] ${SETTINGS_BUTTON_CLASS}`}>
              Save settings
            </Button>
          </div>
        </form>
      </motion.section>
    </DashboardLayout>
  );
}
