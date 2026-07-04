import { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPlus, FaTrash, FaUser } from "react-icons/fa";
import Button from "../../components/common/Button";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  dashboardAddressBoxClass,
  dashboardAddressInputClass,
  dashboardAlertSuccessClass,
  dashboardButtonClass,
  dashboardFieldClass,
  dashboardInputClass,
  dashboardLabelClass,
  dashboardSectionClass,
  dashboardSelectClass,
} from "../../components/dashboard/dashboardFormStyles";
import { DONOR_TYPES } from "../../constants/roles";
import {
  getDonorDisplayName,
  getDonorProfile,
  getSavedAddresses,
  getSessionUser,
  saveDonorProfile,
  saveSavedAddresses,
} from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];
const BOX_INSET = "pl-[0.5cm] pr-[0.5cm] pt-[0.5cm] pb-[0.5cm]";

const PROFILE_BUTTON_CLASS = [
  dashboardButtonClass,
  "!h-16 !min-h-[64px] !px-10 !py-4 !text-base !gap-3 !justify-center sm:!text-lg",
  "transition-all duration-300",
  "hover:!shadow-[0_8px_24px_rgba(22,163,74,0.35)]",
  "active:!scale-[0.97] active:!bg-[#15803D] active:!shadow-inner",
  "focus-visible:!ring-2 focus-visible:!ring-[#16A34A] focus-visible:!ring-offset-2",
].join(" ");

export default function Profile() {
  const user = getSessionUser();
  const donorName = getDonorDisplayName(user);
  const [profile, setProfile] = useState(getDonorProfile());
  const [addresses, setAddresses] = useState(getSavedAddresses());
  const [newAddress, setNewAddress] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  const updateProfile = (field) => (e) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveDonorProfile(profile);
    saveSavedAddresses(addresses);
    setSavedMessage("Profile updated successfully.");
  };

  const addAddress = () => {
    const trimmed = newAddress.trim();
    if (!trimmed || addresses.includes(trimmed)) return;
    setAddresses((prev) => [...prev, trimmed]);
    setNewAddress("");
  };

  const removeAddress = (address) => {
    setAddresses((prev) => prev.filter((item) => item !== address));
  };

  return (
    <DashboardLayout
      emoji="🍱"
      title="Donor Dashboard"
      subtitle="Profile and organization details"
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
          className="pointer-events-none absolute -bottom-8 left-1/3 h-32 w-32 rounded-full bg-[#BBF7D0]/40 blur-2xl"
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
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.06 }}
          >
            <FaUser
              className="text-2xl transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
          </motion.span>
          <div className="flex flex-col gap-[0.5cm]">
            <p className="text-base font-semibold uppercase tracking-[0.18em] text-[#16A34A] sm:text-lg">
              Account details
            </p>
            <h1 className="bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
              My Profile
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg">
              Manage personal or organization information and saved pickup locations.
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
              Personal / organization information
            </h2>
            <div className="grid gap-[0.5cm] sm:grid-cols-2">
              <div className={dashboardFieldClass}>
                <label htmlFor="fullName" className={dashboardLabelClass}>
                  Full name
                </label>
                <input
                  id="fullName"
                  value={profile.fullName}
                  onChange={updateProfile("fullName")}
                  className={`${dashboardInputClass} !min-h-[56px] !py-4 transition-all duration-300 hover:border-[#16A34A]/40 focus:border-[#16A34A]`}
                />
              </div>
              <div className={dashboardFieldClass}>
                <label htmlFor="organization" className={dashboardLabelClass}>
                  Organization name
                </label>
                <input
                  id="organization"
                  value={profile.organization}
                  onChange={updateProfile("organization")}
                  placeholder="Optional for businesses"
                  className={`${dashboardInputClass} !min-h-[56px] !py-4 transition-all duration-300 hover:border-[#16A34A]/40 focus:border-[#16A34A]`}
                />
              </div>
              <div className={dashboardFieldClass}>
                <label htmlFor="donorType" className={dashboardLabelClass}>
                  Donor type
                </label>
                <select
                  id="donorType"
                  value={profile.donorType}
                  onChange={updateProfile("donorType")}
                  className={`${dashboardSelectClass} !min-h-[56px] !py-4 transition-all duration-300 hover:border-[#16A34A]/40 focus:border-[#16A34A]`}
                >
                  {DONOR_TYPES.map((item) => (
                    <option key={item.id} value={item.label}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className={dashboardFieldClass}>
                <label htmlFor="contactPerson" className={dashboardLabelClass}>
                  Contact person
                </label>
                <input
                  id="contactPerson"
                  value={profile.contactPerson}
                  onChange={updateProfile("contactPerson")}
                  className={`${dashboardInputClass} !min-h-[56px] !py-4 transition-all duration-300 hover:border-[#16A34A]/40 focus:border-[#16A34A]`}
                />
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
            whileHover={{ y: -2 }}
            className={`${dashboardSectionClass} flex flex-col gap-[0.5cm] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(15,23,42,0.08)] ${BOX_INSET}`}
          >
            <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">Contact details</h2>
            <div className="grid gap-[0.5cm] sm:grid-cols-2">
              <div className={dashboardFieldClass}>
                <label htmlFor="email" className={dashboardLabelClass}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={updateProfile("email")}
                  className={`${dashboardInputClass} !min-h-[56px] !py-4 transition-all duration-300 hover:border-[#16A34A]/40 focus:border-[#16A34A]`}
                />
              </div>
              <div className={dashboardFieldClass}>
                <label htmlFor="phone" className={dashboardLabelClass}>
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={updateProfile("phone")}
                  className={`${dashboardInputClass} !min-h-[56px] !py-4 transition-all duration-300 hover:border-[#16A34A]/40 focus:border-[#16A34A]`}
                />
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: EASE }}
            whileHover={{ y: -2 }}
            className={`${dashboardSectionClass} flex flex-col gap-[0.5cm] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(15,23,42,0.08)] ${BOX_INSET}`}
          >
            <h2 className="flex items-center gap-[0.5cm] text-lg font-bold text-[#0F172A] sm:text-xl">
              <FaMapMarkerAlt className="text-[#16A34A]" aria-hidden="true" />
              Saved pickup addresses
            </h2>
            <div className="flex flex-col gap-[0.5cm] sm:flex-row sm:items-stretch">
              <input
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Add a pickup address"
                className={`${dashboardAddressInputClass} flex-1 transition-all duration-300 hover:border-[#16A34A]/40 focus:border-[#16A34A]`}
              />
              <Button
                type="button"
                icon={FaPlus}
                onClick={addAddress}
                className={`min-w-[140px] shrink-0 sm:min-w-[160px] ${PROFILE_BUTTON_CLASS}`}
              >
                Add
              </Button>
            </div>
            {addresses.length > 0 ? (
              <ul className="flex flex-col gap-[0.5cm]">
                {addresses.map((address) => (
                  <motion.li
                    key={address}
                    whileHover={{ x: 4 }}
                    className={`${dashboardAddressBoxClass} transition-colors duration-300 hover:border-[#16A34A]/30 hover:bg-[#F0FDF4]`}
                  >
                    <span className="text-base leading-7 text-[#0F172A] sm:text-lg">{address}</span>
                    <button
                      type="button"
                      onClick={() => removeAddress(address)}
                      className="flex h-10 w-10 items-center justify-center text-[#94A3B8] transition-colors hover:text-red-500"
                      aria-label={`Remove ${address}`}
                    >
                      <FaTrash />
                    </button>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-7 text-[#64748B] sm:text-base">
                No saved addresses yet. Add your default pickup locations here.
              </p>
            )}
          </motion.section>

          <div className="flex justify-end">
            <Button type="submit" className={`min-w-[200px] ${PROFILE_BUTTON_CLASS}`}>
              Save profile
            </Button>
          </div>
        </form>
      </motion.section>
    </DashboardLayout>
  );
}
