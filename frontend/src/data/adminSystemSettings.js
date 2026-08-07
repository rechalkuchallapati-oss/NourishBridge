import {
  FaBell,
  FaCloud,
  FaCog,
  FaDatabase,
  FaEnvelope,
  FaGlobe,
  FaHandHoldingHeart,
  FaLeaf,
  FaLock,
  FaPlug,
  FaSlidersH,
  FaTools,
  FaUserCheck,
  FaUserPlus,
  FaUtensils,
  FaWrench,
} from "react-icons/fa";

export const SETTINGS_TABS = [
  { id: "general", label: "General", icon: FaCog },
  { id: "notifications", label: "Notifications", icon: FaBell },
  { id: "security", label: "Security", icon: FaLock },
  { id: "integrations", label: "Integrations", icon: FaPlug },
  { id: "email", label: "Email", icon: FaEnvelope },
  { id: "localization", label: "Localization", icon: FaGlobe },
  { id: "backup", label: "Backup", icon: FaCloud },
  { id: "advanced", label: "Advanced", icon: FaSlidersH },
];

export const DEFAULT_GENERAL_SETTINGS = {
  platformName: "NourishBridge",
  platformTagline: "Connecting surplus food with communities in need",
  timezone: "Asia/Kolkata",
  dateFormat: "DD/MM/YYYY",
  currency: "INR (₹)",
  language: "English (US)",
};

export const TIMEZONE_OPTIONS = [
  { id: "Asia/Kolkata", label: "Asia/Kolkata (IST)" },
  { id: "Asia/Dubai", label: "Asia/Dubai (GST)" },
  { id: "Europe/London", label: "Europe/London (GMT)" },
  { id: "America/New_York", label: "America/New_York (EST)" },
];

export const DATE_FORMAT_OPTIONS = [
  { id: "DD/MM/YYYY", label: "DD/MM/YYYY" },
  { id: "MM/DD/YYYY", label: "MM/DD/YYYY" },
  { id: "YYYY-MM-DD", label: "YYYY-MM-DD" },
];

export const CURRENCY_OPTIONS = [
  { id: "INR (₹)", label: "INR (₹)" },
  { id: "USD ($)", label: "USD ($)" },
  { id: "EUR (€)", label: "EUR (€)" },
];

export const LANGUAGE_OPTIONS = [
  { id: "English (US)", label: "English (US)" },
  { id: "English (UK)", label: "English (UK)" },
  { id: "Hindi", label: "Hindi" },
  { id: "Telugu", label: "Telugu" },
];

export const SYSTEM_PREFERENCES = [
  {
    id: "allowRegistration",
    title: "Allow New User Registration",
    description: "Let donors, NGOs, and volunteers create accounts on the platform.",
    icon: FaUserPlus,
    iconBg: "bg-[#DCFCE7] text-[#16A34A]",
    defaultEnabled: true,
  },
  {
    id: "enableDonations",
    title: "Enable Donations",
    description: "Allow food donors to submit and manage donation listings.",
    icon: FaHandHoldingHeart,
    iconBg: "bg-[#DBEAFE] text-[#2563EB]",
    defaultEnabled: true,
  },
  {
    id: "emailVerification",
    title: "Email Verification Required",
    description: "Require users to verify email before accessing the dashboard.",
    icon: FaEnvelope,
    iconBg: "bg-[#EDE9FE] text-[#7C3AED]",
    defaultEnabled: true,
  },
  {
    id: "volunteerSignup",
    title: "Enable Volunteer Signup",
    description: "Open volunteer registration and onboarding workflows.",
    icon: FaUserCheck,
    iconBg: "bg-[#FEF3C7] text-[#D97706]",
    defaultEnabled: true,
  },
  {
    id: "autoApproveNgos",
    title: "Auto Approve NGOs",
    description: "Automatically approve NGO registrations after document upload.",
    icon: FaUtensils,
    iconBg: "bg-[#FFEDD5] text-[#EA580C]",
    defaultEnabled: false,
  },
  {
    id: "enableFoodRequests",
    title: "Enable Food Requests",
    description: "Allow NGOs to publish and manage food request listings.",
    icon: FaLeaf,
    iconBg: "bg-[#DCFCE7] text-[#15803D]",
    defaultEnabled: true,
  },
  {
    id: "maintenanceMode",
    title: "Maintenance Mode",
    description: "Restrict platform access and show a maintenance notice to users.",
    icon: FaWrench,
    iconBg: "bg-[#FEE2E2] text-[#DC2626]",
    defaultEnabled: false,
  },
  {
    id: "showLiveImpact",
    title: "Show Live Impact",
    description: "Display real-time impact metrics on dashboards and public pages.",
    icon: FaLeaf,
    iconBg: "bg-[#D1FAE5] text-[#059669]",
    defaultEnabled: true,
  },
];

export const SYSTEM_INFO = {
  version: "v2.4.1",
  environment: "Production",
  lastUpdated: "Aug 6, 2026 · 4:32 PM",
  updatedBy: "Platform Admin",
  databaseStatus: "Healthy",
  serverStatus: "Operational",
};

export const STORAGE_USAGE = {
  usedPercent: 68,
  usedGb: 23,
  totalGb: 50,
  segments: [
    { id: "images", label: "Images", share: 42, color: "#22C55E" },
    { id: "documents", label: "Documents", share: 28, color: "#3B82F6" },
    { id: "backups", label: "Backups", share: 22, color: "#F59E0B" },
    { id: "others", label: "Others", share: 8, color: "#94A3B8" },
  ],
};

export const QUICK_ACTIONS = [
  {
    id: "backup",
    title: "Backup Now",
    description: "Create a full system backup immediately.",
    icon: FaDatabase,
    iconBg: "bg-[#DCFCE7] text-[#16A34A]",
  },
  {
    id: "cache",
    title: "Clear Cache",
    description: "Flush application and CDN caches.",
    icon: FaTools,
    iconBg: "bg-[#DBEAFE] text-[#2563EB]",
  },
  {
    id: "logs",
    title: "System Logs",
    description: "View recent server and application logs.",
    icon: FaSlidersH,
    iconBg: "bg-[#FEF3C7] text-[#D97706]",
  },
  {
    id: "reindex",
    title: "Reindex Search",
    description: "Rebuild search indexes for faster queries.",
    icon: FaCog,
    iconBg: "bg-[#EDE9FE] text-[#7C3AED]",
  },
];

export const TAB_PLACEHOLDERS = {
  notifications: {
    title: "Notification Settings",
    description: "Configure email, SMS, and in-app notification preferences.",
  },
  security: {
    title: "Security Settings",
    description: "Manage authentication, session policies, and access controls.",
  },
  integrations: {
    title: "Integrations",
    description: "Connect third-party services, APIs, and webhooks.",
  },
  email: {
    title: "Email Configuration",
    description: "Set SMTP settings, templates, and delivery preferences.",
  },
  localization: {
    title: "Localization",
    description: "Configure languages, regions, and formatting defaults.",
  },
  backup: {
    title: "Backup & Recovery",
    description: "Schedule backups and manage restore points.",
  },
  advanced: {
    title: "Advanced Settings",
    description: "Feature flags, performance tuning, and developer options.",
  },
};
