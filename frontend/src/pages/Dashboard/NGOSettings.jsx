import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FaCog } from "react-icons/fa";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOLayout from "../../components/dashboard/NGOLayout";
import { getDonorSettings, getNgoDisplayName, getSessionUser, saveDonorSettings } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

const NGO_SETTING_GROUPS = [
  {
    title: "Donation alerts",
    items: [
      { key: "donationStatusUpdates", label: "New incoming donation alerts" },
      { key: "ngoUpdates", label: "Donor communication updates" },
    ],
  },
  {
    title: "Logistics",
    items: [
      { key: "volunteerUpdates", label: "Volunteer assignment updates" },
      { key: "deliveryConfirmations", label: "Delivery arrival confirmations" },
      { key: "pickupReminders", label: "Pickup deadline reminders" },
    ],
  },
  {
    title: "Reports",
    items: [
      { key: "weeklyImpactSummary", label: "Weekly impact summary email" },
      { key: "showImpactSummary", label: "Show impact summary on dashboard" },
    ],
  },
  {
    title: "Safety",
    items: [
      { key: "foodSafetyAlerts", label: "Food safety & expiry alerts" },
      { key: "smsNotifications", label: "SMS notifications" },
      { key: "emailNotifications", label: "Email notifications" },
    ],
  },
];

export default function NGOSettings() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);
  const [settings, setSettings] = useState(getDonorSettings);

  const toggle = (key) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveDonorSettings(next);
      return next;
    });
    toast.success("Setting updated.");
  };

  return (
    <NGOLayout organizationName={orgName} unreadNotifications={5}>
      <Toaster position="top-center" />
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
      >
        <div className="flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6">
          <NGOPageHeader
            icon={FaCog}
            title="Settings"
            description="Configure notification preferences and dashboard behaviour for your NGO team."
          />

          {NGO_SETTING_GROUPS.map((group) => (
            <section
              key={group.title}
              className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm"
            >
              <h2 className="text-base font-bold text-[#0F172A]">{group.title}</h2>
              <ul className="mt-[0.5cm] flex flex-col gap-[0.5cm]">
                {group.items.map((item) => (
                  <li
                    key={item.key}
                    className="flex items-center justify-between gap-4 border-b border-[#F1F5F9] pb-[0.5cm] last:border-0 last:pb-0"
                  >
                    <span className="text-sm font-medium text-[#0F172A]">{item.label}</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={settings[item.key]}
                      onClick={() => toggle(item.key)}
                      className={[
                        "relative h-7 w-12 shrink-0 rounded-none transition-colors",
                        settings[item.key] ? "bg-[#2563EB]" : "bg-[#CBD5E1]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "absolute top-0.5 h-6 w-6 bg-white shadow transition-transform",
                          settings[item.key] ? "translate-x-5" : "translate-x-0.5",
                        ].join(" ")}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </motion.section>
    </NGOLayout>
  );
}
