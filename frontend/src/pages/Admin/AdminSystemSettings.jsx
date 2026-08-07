import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaCloudUploadAlt,
  FaCog,
  FaRedo,
  FaSave,
  FaThLarge,
} from "react-icons/fa";
import AdminInteractivePanel from "../../components/admin/AdminInteractivePanel";
import AdminPageToolbar from "../../components/admin/AdminPageToolbar";
import SettingsAllCategoriesModal from "../../components/admin/settings/SettingsAllCategoriesModal";
import SettingsRightPanel from "../../components/admin/settings/SettingsRightPanel";
import SettingsToggle from "../../components/admin/settings/SettingsToggle";
import {
  ADMIN_FILTER_INPUT,
  ADMIN_PAGE_BG,
  ADMIN_PRIMARY_BTN,
  ADMIN_SECONDARY_BTN,
} from "../../components/admin/adminStyles";
import {
  CURRENCY_OPTIONS,
  DATE_FORMAT_OPTIONS,
  DEFAULT_GENERAL_SETTINGS,
  LANGUAGE_OPTIONS,
  SETTINGS_TABS,
  SYSTEM_PREFERENCES,
  TAB_PLACEHOLDERS,
  TIMEZONE_OPTIONS,
} from "../../data/adminSystemSettings";

const EASE = [0.22, 1, 0.36, 1];

const INPUT_CLASS = `${ADMIN_FILTER_INPUT} h-[48px] px-4 text-base`;
const LABEL_CLASS = "mb-2 block text-xs font-semibold uppercase tracking-wide text-[#64748B]";

function SettingsCard({ children }) {
  return (
    <AdminInteractivePanel className="!p-8 sm:!p-10">
      {children}
    </AdminInteractivePanel>
  );
}

function GeneralSettingsForm({ values, onChange }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <label>
        <span className={LABEL_CLASS}>Platform Name</span>
        <input
          type="text"
          value={values.platformName}
          onChange={(e) => onChange("platformName", e.target.value)}
          className={INPUT_CLASS}
        />
      </label>
      <label>
        <span className={LABEL_CLASS}>Default Timezone</span>
        <select
          value={values.timezone}
          onChange={(e) => onChange("timezone", e.target.value)}
          className={INPUT_CLASS}
        >
          {TIMEZONE_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>{o.label}</option>
          ))}
        </select>
      </label>
      <label className="sm:col-span-2">
        <span className={LABEL_CLASS}>Platform Tagline</span>
        <input
          type="text"
          value={values.platformTagline}
          onChange={(e) => onChange("platformTagline", e.target.value)}
          className={INPUT_CLASS}
        />
      </label>
      <label>
        <span className={LABEL_CLASS}>Date Format</span>
        <select
          value={values.dateFormat}
          onChange={(e) => onChange("dateFormat", e.target.value)}
          className={INPUT_CLASS}
        >
          {DATE_FORMAT_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>{o.label}</option>
          ))}
        </select>
      </label>
      <label>
        <span className={LABEL_CLASS}>Currency</span>
        <select
          value={values.currency}
          onChange={(e) => onChange("currency", e.target.value)}
          className={INPUT_CLASS}
        >
          {CURRENCY_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>{o.label}</option>
          ))}
        </select>
      </label>
      <label className="sm:col-span-2">
        <span className={LABEL_CLASS}>Language</span>
        <select
          value={values.language}
          onChange={(e) => onChange("language", e.target.value)}
          className={INPUT_CLASS}
        >
          {LANGUAGE_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>{o.label}</option>
          ))}
        </select>
      </label>
      <div className="sm:col-span-2">
        <span className={LABEL_CLASS}>System Logo</span>
        <div className="mt-1 flex flex-wrap items-center gap-6 rounded-[16px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-6">
          <span className="flex h-20 w-20 items-center justify-center rounded-[16px] bg-[#DCFCE7] text-3xl font-bold text-[#16A34A]">
            NB
          </span>
          <div className="min-w-[200px] flex-1">
            <p className="text-base font-semibold text-[#0F172A]">NourishBridge Logo</p>
            <p className="mt-1 text-sm text-[#64748B]">PNG or SVG · Max 2MB · 512×512 recommended</p>
          </div>
          <button
            type="button"
            onClick={() => toast("Logo upload coming soon", { icon: "📤" })}
            className={`${ADMIN_SECONDARY_BTN} h-[48px] px-6`}
          >
            <FaCloudUploadAlt aria-hidden="true" /> Change Logo
          </button>
        </div>
      </div>
    </div>
  );
}

function PreferenceToggleCard({ preference, enabled, onToggle }) {
  const Icon = preference.icon;
  return (
    <div className="flex items-center justify-between gap-6 rounded-[16px] border border-[#E5E7EB] bg-[#FAFBFC] p-6 transition-all duration-300 hover:border-[#BBF7D0] hover:bg-white hover:shadow-md">
      <div className="flex min-w-0 items-start gap-4">
        <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] ${preference.iconBg}`}>
          <Icon className="text-xl" aria-hidden="true" />
        </span>
        <div>
          <p className="text-base font-bold text-[#0F172A]">{preference.title}</p>
          <p className="mt-2 text-sm leading-6 text-[#64748B]">{preference.description}</p>
        </div>
      </div>
      <SettingsToggle enabled={enabled} onChange={onToggle} label={preference.title} />
    </div>
  );
}

export default function AdminSystemSettings() {
  const [activeSection, setActiveSection] = useState("general");
  const [modalOpen, setModalOpen] = useState(false);
  const [generalSettings, setGeneralSettings] = useState(DEFAULT_GENERAL_SETTINGS);
  const [preferences, setPreferences] = useState(() =>
    Object.fromEntries(SYSTEM_PREFERENCES.map((p) => [p.id, p.defaultEnabled])),
  );

  const activeTab = SETTINGS_TABS.find((t) => t.id === activeSection);
  const placeholder = TAB_PLACEHOLDERS[activeSection];

  return (
    <>
      <Toaster position="top-center" />
      <SettingsAllCategoriesModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={setActiveSection}
        activeId={activeSection}
      />
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={ADMIN_PAGE_BG}
      >
        <div className="flex flex-col gap-8 p-6 sm:p-8">
          <AdminPageToolbar
            title="System Settings"
            subtitle="Configure platform information, preferences, and operational controls."
            searchPlaceholder="Search for settings..."
            onFilterClick={() => setModalOpen(true)}
            unreadCount={4}
          />

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => toast.success("Settings saved")} className={`${ADMIN_PRIMARY_BTN} h-[48px] px-6`}>
              <FaSave aria-hidden="true" /> Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setGeneralSettings(DEFAULT_GENERAL_SETTINGS);
                setPreferences(Object.fromEntries(SYSTEM_PREFERENCES.map((p) => [p.id, p.defaultEnabled])));
                toast("Settings reset");
              }}
              className={`${ADMIN_SECONDARY_BTN} h-[48px] px-6`}
            >
              <FaRedo aria-hidden="true" /> Reset
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className={`${ADMIN_SECONDARY_BTN} h-[48px] px-6`}
            >
              <FaThLarge aria-hidden="true" /> View All Settings
            </button>
            {activeTab ? (
              <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-2.5 text-sm font-semibold text-[#15803D]">
                <activeTab.icon aria-hidden="true" />
                {activeTab.label}
              </span>
            ) : null}
          </div>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="flex flex-col gap-8">
              {activeSection === "general" ? (
                <>
                  <SettingsCard>
                    <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">General Settings</h2>
                    <p className="mt-2 text-sm leading-6 text-[#64748B]">
                      Configure platform information and global preferences.
                    </p>
                    <div className="mt-8">
                      <GeneralSettingsForm
                        values={generalSettings}
                        onChange={(key, val) => setGeneralSettings((p) => ({ ...p, [key]: val }))}
                      />
                    </div>
                  </SettingsCard>
                  <SettingsCard>
                    <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">System Preferences</h2>
                    <p className="mt-2 text-sm leading-6 text-[#64748B]">
                      Control platform features and operational behavior.
                    </p>
                    <div className="mt-8 flex flex-col gap-4">
                      {SYSTEM_PREFERENCES.map((pref) => (
                        <PreferenceToggleCard
                          key={pref.id}
                          preference={pref}
                          enabled={preferences[pref.id]}
                          onToggle={(val) => setPreferences((p) => ({ ...p, [pref.id]: val }))}
                        />
                      ))}
                    </div>
                  </SettingsCard>
                </>
              ) : (
                <SettingsCard>
                  <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">{placeholder?.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#64748B]">{placeholder?.description}</p>
                  <div className="mt-10 flex flex-col items-center rounded-[16px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] py-20 text-center">
                    <FaCog className="text-4xl text-[#CBD5E1]" aria-hidden="true" />
                    <p className="mt-4 text-base font-semibold text-[#64748B]">{placeholder?.title} coming soon</p>
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className={`${ADMIN_PRIMARY_BTN} mt-6 h-[48px] px-6`}
                    >
                      Browse All Settings
                    </button>
                  </div>
                </SettingsCard>
              )}
            </div>
            <SettingsRightPanel onAction={(id) => toast.success(`Action: ${id}`)} />
          </div>
        </div>
      </motion.section>
    </>
  );
}
