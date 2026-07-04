import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaCamera,
  FaDrumstickBite,
  FaEgg,
  FaLeaf,
  FaMagic,
  FaMapMarkerAlt,
  FaPlus,
  FaSeedling,
  FaUpload,
  FaUtensils,
} from "react-icons/fa";
import Button from "../../components/common/Button";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  dashboardAddressInputClass,
  dashboardAlertErrorClass,
  dashboardButtonClass,
  dashboardFieldClass,
  dashboardInputClass,
  dashboardLabelClass,
  dashboardPageStackClass,
  dashboardSelectClass,
  dashboardTextareaClass,
} from "../../components/dashboard/dashboardFormStyles";
import {
  ALLERGEN_OPTIONS,
  DIET_TYPES,
  FOOD_CATEGORIES,
  PACKAGING_OPTIONS,
} from "../../constants/donationForm";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { getDonorDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

const CREATE_SECTION_CLASS =
  "relative overflow-hidden rounded-none border border-[#E5E7EB] bg-white/95 p-5 shadow-sm backdrop-blur-sm sm:p-6";

const CREATE_ACTION_BUTTON_CLASS = `${dashboardButtonClass} !h-16 !min-h-[64px] !px-10 !py-4 !text-lg`;

const DIET_STYLES = {
  vegetarian: {
    icon: FaLeaf,
    badge: "bg-[#DCFCE7] text-[#16A34A]",
    active: "border-[#16A34A] bg-[#F0FDF4] text-[#15803D]",
  },
  non_vegetarian: {
    icon: FaDrumstickBite,
    badge: "bg-[#FEE2E2] text-[#DC2626]",
    active: "border-[#DC2626] bg-[#FEF2F2] text-[#B91C1C]",
  },
  vegan: {
    icon: FaSeedling,
    badge: "bg-[#D1FAE5] text-[#059669]",
    active: "border-[#059669] bg-[#ECFDF5] text-[#047857]",
  },
  eggetarian: {
    icon: FaEgg,
    badge: "bg-[#FEF3C7] text-[#D97706]",
    active: "border-[#D97706] bg-[#FFFBEB] text-[#B45309]",
  },
};

const CREATE_CONTROL_CLASS = `${dashboardInputClass} !min-h-[52px] !py-4 sm:!text-base`;

const CREATE_SELECT_CLASS = `${dashboardSelectClass} !min-h-[52px] !py-4 sm:!text-base`;

const SECTION_HEADINGS = {
  food: { icon: FaUtensils, label: "Food details", accent: "bg-[#F0FDF4] text-[#16A34A]" },
  pickup: { icon: FaMapMarkerAlt, label: "Pickup details", accent: "bg-[#EFF6FF] text-[#2563EB]" },
  photos: { icon: FaCamera, label: "Food photos", accent: "bg-[#FFFBEB] text-[#D97706]" },
};

function formatDdMmYy(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  const parts = [];
  if (digits.length > 0) parts.push(digits.slice(0, 2));
  if (digits.length > 2) parts.push(digits.slice(2, 4));
  if (digits.length > 4) parts.push(digits.slice(4, 8));
  return parts.join(" ");
}

function formatHhMm(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  const parts = [];
  if (digits.length > 0) parts.push(digits.slice(0, 2));
  if (digits.length > 2) parts.push(digits.slice(2, 4));
  return parts.join(" ");
}

function SectionHeading({ icon: Icon, label, accent, optional }) {
  return (
    <div className="flex items-center gap-[0.5cm] border-b border-[#E5E7EB] pb-[0.5cm]">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-none ${accent}`}
      >
        <Icon className="text-lg" aria-hidden="true" />
      </span>
      <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">
        {label}
        {optional ? (
          <span className="ml-2 text-base font-normal text-[#64748B]">(optional)</span>
        ) : null}
      </h2>
    </div>
  );
}

function FormField({ label, htmlFor, children, className = "" }) {
  return (
    <div className={`${dashboardFieldClass} ${className}`}>
      <label htmlFor={htmlFor} className={dashboardLabelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}

function DateTimeField({ dateId, timeId, dateLabel, timeLabel, dateValue, timeValue, onDateChange, onTimeChange, required = false }) {
  return (
    <div className={`${dashboardFieldClass} sm:col-span-1`}>
      <span className={dashboardLabelClass}>{dateLabel}</span>
      <input
        id={dateId}
        type="text"
        inputMode="numeric"
        required={required}
        value={dateValue}
        onChange={(e) => onDateChange(formatDdMmYy(e.target.value).toUpperCase())}
        placeholder="DD MM YYYY"
        className={`${dashboardInputClass} uppercase tracking-widest !min-h-[52px] !py-4`}
        aria-label={dateLabel}
      />
      <span className={`${dashboardLabelClass} mt-[0.5cm]`}>{timeLabel}</span>
      <input
        id={timeId}
        type="text"
        inputMode="numeric"
        required={required}
        value={timeValue}
        onChange={(e) => onTimeChange(formatHhMm(e.target.value))}
        placeholder="HH MM"
        className={`${dashboardInputClass} uppercase tracking-widest !min-h-[52px] !py-4`}
        aria-label={timeLabel}
      />
    </div>
  );
}

export default function CreateDonation() {
  const navigate = useNavigate();
  const user = getSessionUser();
  const donorName = getDonorDisplayName(user);

  const [form, setForm] = useState({
    category: "",
    foodName: "",
    dietType: "vegetarian",
    quantity: "",
    estimatedServings: "",
    preparationDate: "",
    preparationTime: "",
    consumptionDate: "",
    consumptionTime: "",
    packagingStatus: "",
    allergenInfo: "",
    pickupAddress: "",
    pickupStartDate: "",
    pickupStartTime: "",
    pickupEndDate: "",
    pickupEndTime: "",
  });
  const [photos, setPhotos] = useState([]);
  const [formError, setFormError] = useState("");

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const updateValue = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files ?? []);
    setPhotos((prev) => [
      ...prev,
      ...files.map((file) => ({
        id: `${file.name}-${file.lastModified}`,
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
      })),
    ]);
    e.target.value = "";
  };

  const removePhoto = (id) => {
    setPhotos((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.category || !form.foodName || !form.quantity || !form.pickupAddress) {
      setFormError("Please fill in food category, food name, quantity, and pickup address.");
      return;
    }

    if (
      !form.pickupStartDate ||
      !form.pickupStartTime ||
      !form.pickupEndDate ||
      !form.pickupEndTime
    ) {
      setFormError("Please set pickup window dates and times (DD MM YYYY and HH MM).");
      return;
    }

    navigate(DASHBOARD_ROUTES.donorDonations, {
      state: {
        message: `"${form.foodName}" was posted successfully. NGOs will be notified shortly.`,
      },
    });
  };

  return (
    <DashboardLayout
      emoji="🍱"
      title="Donor Dashboard"
      subtitle="Create a new food donation"
      userName={donorName}
    >
      <div className="relative">
        <motion.div
          className="pointer-events-none absolute -left-6 top-0 h-56 w-56 rounded-none bg-[#16A34A]/10 blur-3xl"
          animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute -right-4 top-32 h-48 w-48 rounded-none bg-[#2563EB]/10 blur-3xl"
          animate={{ opacity: [0.25, 0.5, 0.25], x: [0, 12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute bottom-24 left-1/3 h-40 w-40 rounded-none bg-[#D97706]/10 blur-3xl"
          animate={{ opacity: [0.2, 0.45, 0.2], y: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className={`relative ${dashboardPageStackClass}`}
        >
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="flex flex-col gap-[0.5cm] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col gap-[0.5cm]">
              <Link
                to={DASHBOARD_ROUTES.donor}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] transition-colors hover:text-[#16A34A]"
              >
                <FaArrowLeft aria-hidden="true" />
                Back to overview
              </Link>

              <div className="flex items-center gap-[0.5cm]">
                <motion.span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-none bg-gradient-to-br from-[#16A34A] to-[#15803D] text-white shadow-[0_8px_24px_rgba(22,163,74,0.35)]"
                  animate={{ rotate: [0, 4, 0, -4, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FaPlus className="text-2xl" aria-hidden="true" />
                </motion.span>
                <div>
                  <h1 className="bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
                    Create Donation
                  </h1>
                  <p className="mt-[0.5cm] max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
                    List surplus food with pickup details so verified NGOs and volunteers
                    can collect and deliver it safely.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
            className="rounded-none border border-dashed border-[#BBF7D0] bg-gradient-to-r from-[#F0FDF4] to-[#ECFDF5] px-5 py-4 pt-[calc(0.5cm+1rem)]"
          >
            <div className="flex flex-col gap-[0.5cm] sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-[0.5cm]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-none bg-[#E0E7FF] text-[#4338CA]">
                  <FaMagic aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-[#0F172A]">
                    AI meal estimation — coming soon
                  </p>
                  <p className="mt-[0.5cm] text-sm leading-6 text-[#64748B]">
                    Enter food type and quantity, and NourishBridge will suggest
                    approximate servings automatically. Manual entry works for the MVP.
                  </p>
                </div>
              </div>
              <span className="inline-flex w-fit rounded-none bg-[#DCFCE7] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#15803D]">
                Enhancement
              </span>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[0.5cm]">
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: EASE }}
              className={`${CREATE_SECTION_CLASS} bg-gradient-to-br from-white via-[#FAFFFE] to-[#F0FDF4]/40`}
            >
              <div className="flex flex-col gap-[0.5cm] pt-[0.5cm]">
                <SectionHeading {...SECTION_HEADINGS.food} />

                <div className="grid gap-[0.5cm] sm:grid-cols-2">
                  <FormField label="Food category" htmlFor="category">
                    <select
                      id="category"
                      required
                      value={form.category}
                      onChange={updateField("category")}
                      className={CREATE_SELECT_CLASS}
                    >
                      <option value="">Select category</option>
                      {FOOD_CATEGORIES.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Food name" htmlFor="foodName">
                    <input
                      id="foodName"
                      required
                      value={form.foodName}
                      onChange={updateField("foodName")}
                      placeholder="e.g. Vegetable Pulao & Salad"
                      className={CREATE_CONTROL_CLASS}
                    />
                  </FormField>

                  <fieldset className="sm:col-span-2">
                    <legend className={dashboardLabelClass}>Classification</legend>
                    <div className="flex flex-wrap gap-[0.5cm]">
                      {DIET_TYPES.map((item) => {
                        const styles = DIET_STYLES[item.id];
                        const Icon = styles?.icon;
                        const isActive = form.dietType === item.id;

                        return (
                          <label
                            key={item.id}
                            className={[
                              "inline-flex min-h-[68px] cursor-pointer items-center gap-3 rounded-none border px-7 py-5 text-base font-semibold transition-all sm:min-h-[72px] sm:text-lg",
                              isActive
                                ? `${styles.active} shadow-[0_4px_14px_rgba(15,23,42,0.08)]`
                                : "border-[#E5E7EB] bg-white text-[#64748B] hover:border-[#16A34A]/40 hover:bg-[#FAFFFE]",
                            ].join(" ")}
                          >
                            <input
                              type="radio"
                              name="dietType"
                              value={item.id}
                              checked={isActive}
                              onChange={updateField("dietType")}
                              className="sr-only"
                            />
                            <span>{item.label}</span>
                            {Icon ? (
                              <span
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-none ${styles.badge}`}
                              >
                                <Icon className="text-2xl" aria-hidden="true" />
                              </span>
                            ) : null}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <FormField label="Quantity" htmlFor="quantity">
                    <input
                      id="quantity"
                      required
                      value={form.quantity}
                      onChange={updateField("quantity")}
                      placeholder="e.g. 40 servings or 25 kg"
                      className={CREATE_CONTROL_CLASS}
                    />
                  </FormField>

                  <FormField label="Estimated servings" htmlFor="estimatedServings">
                    <input
                      id="estimatedServings"
                      type="number"
                      min="1"
                      value={form.estimatedServings}
                      onChange={updateField("estimatedServings")}
                      placeholder="Approximate number of meals"
                      className={CREATE_CONTROL_CLASS}
                    />
                  </FormField>

                  <DateTimeField
                    dateId="preparationDate"
                    timeId="preparationTime"
                    dateLabel="Preparation date (DD MM YYYY)"
                    timeLabel="Preparation time (HH MM)"
                    dateValue={form.preparationDate}
                    timeValue={form.preparationTime}
                    onDateChange={updateValue("preparationDate")}
                    onTimeChange={updateValue("preparationTime")}
                  />

                  <DateTimeField
                    dateId="consumptionDate"
                    timeId="consumptionTime"
                    dateLabel="Safe consumption date (DD MM YYYY)"
                    timeLabel="Safe consumption time (HH MM)"
                    dateValue={form.consumptionDate}
                    timeValue={form.consumptionTime}
                    onDateChange={updateValue("consumptionDate")}
                    onTimeChange={updateValue("consumptionTime")}
                  />

                  <FormField label="Packaging status" htmlFor="packagingStatus">
                    <select
                      id="packagingStatus"
                      value={form.packagingStatus}
                      onChange={updateField("packagingStatus")}
                      className={CREATE_SELECT_CLASS}
                    >
                      <option value="">Select packaging status</option>
                      {PACKAGING_OPTIONS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Allergen information" htmlFor="allergenInfo">
                    <select
                      id="allergenInfo"
                      value={form.allergenInfo}
                      onChange={updateField("allergenInfo")}
                      className={CREATE_SELECT_CLASS}
                    >
                      <option value="">Select allergen info</option>
                      {ALLERGEN_OPTIONS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField
                    label="Additional allergen notes"
                    htmlFor="allergenNotes"
                    className="sm:col-span-2"
                  >
                    <textarea
                      id="allergenNotes"
                      rows={3}
                      placeholder="List any specific allergens or handling instructions"
                      className={dashboardTextareaClass}
                    />
                  </FormField>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
              className={`${CREATE_SECTION_CLASS} bg-gradient-to-br from-white via-[#FAFCFF] to-[#EFF6FF]/40`}
            >
              <div className="flex flex-col gap-[0.5cm] pt-[0.5cm]">
                <SectionHeading {...SECTION_HEADINGS.pickup} />

                <div className="grid gap-[0.5cm] sm:grid-cols-2">
                  <FormField
                    label="Pickup address"
                    htmlFor="pickupAddress"
                    className="sm:col-span-2"
                  >
                    <textarea
                      id="pickupAddress"
                      required
                      rows={3}
                      value={form.pickupAddress}
                      onChange={updateField("pickupAddress")}
                      placeholder="Full address with landmark and contact at pickup"
                      className={dashboardAddressInputClass}
                    />
                  </FormField>

                  <DateTimeField
                    dateId="pickupStartDate"
                    timeId="pickupStartTime"
                    dateLabel="Pickup window start date (DD MM YYYY)"
                    timeLabel="Pickup window start time (HH MM)"
                    dateValue={form.pickupStartDate}
                    timeValue={form.pickupStartTime}
                    onDateChange={updateValue("pickupStartDate")}
                    onTimeChange={updateValue("pickupStartTime")}
                    required
                  />

                  <DateTimeField
                    dateId="pickupEndDate"
                    timeId="pickupEndTime"
                    dateLabel="Pickup window end date (DD MM YYYY)"
                    timeLabel="Pickup window end time (HH MM)"
                    dateValue={form.pickupEndDate}
                    timeValue={form.pickupEndTime}
                    onDateChange={updateValue("pickupEndDate")}
                    onTimeChange={updateValue("pickupEndTime")}
                    required
                  />
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
              className={`${CREATE_SECTION_CLASS} bg-gradient-to-br from-white via-[#FFFEF8] to-[#FFFBEB]/40`}
            >
              <div className="flex flex-col gap-[0.5cm] pt-[0.5cm]">
                <SectionHeading {...SECTION_HEADINGS.photos} optional />

                <p className="text-sm text-[#64748B]">
                  Upload clear photos to help NGOs assess food quality and quantity.
                </p>

                <label className="flex min-h-[128px] cursor-pointer flex-col items-center justify-center rounded-none border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-6 py-12 transition-colors hover:border-[#16A34A]/40 hover:bg-[#F0FDF4]">
                  <FaUpload className="text-3xl text-[#16A34A]" aria-hidden="true" />
                  <span className="mt-[0.5cm] text-base font-semibold text-[#0F172A]">
                    Click to upload photos
                  </span>
                  <span className="mt-[0.5cm] text-xs uppercase tracking-wide text-[#94A3B8]">
                    PNG JPG up to 5 MB each
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoChange}
                    className="sr-only"
                  />
                </label>

                {photos.length > 0 ? (
                  <div className="grid grid-cols-2 gap-[0.5cm] sm:grid-cols-4">
                    {photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="overflow-hidden rounded-none border border-[#E5E7EB] bg-white"
                      >
                        <img
                          src={photo.preview}
                          alt={photo.name}
                          className="h-28 w-full object-cover"
                        />
                        <div className="flex items-center justify-between gap-2 px-3 py-2">
                          <span className="truncate text-xs text-[#64748B]">{photo.name}</span>
                          <button
                            type="button"
                            onClick={() => removePhoto(photo.id)}
                            className="min-h-[44px] px-3 py-2 text-xs font-semibold text-red-500 hover:underline sm:text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.section>

            {formError ? <p className={dashboardAlertErrorClass}>{formError}</p> : null}

            <div className="flex flex-col gap-[0.5cm] sm:flex-row sm:justify-end">
              <Link to={DASHBOARD_ROUTES.donor}>
                <Button
                  type="button"
                  variant="outline"
                  className={`w-full sm:w-auto ${CREATE_ACTION_BUTTON_CLASS}`}
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                icon={FaPlus}
                className={`w-full sm:w-auto ${CREATE_ACTION_BUTTON_CLASS}`}
              >
                Post Donation
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
