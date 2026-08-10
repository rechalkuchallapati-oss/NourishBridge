import mongoose from "mongoose";
import { USER_ROLES, USER_STATUS, VERIFICATION_STATUS, enumValues } from "../constants/enums.js";
import { addressSchema } from "./shared/schemas.js";
import { emailValidator, phoneValidator } from "../utils/validators.js";

/**
 * User — base account for every platform actor (donor, volunteer, NGO admin, platform admin).
 * Role-specific data lives in Donor / Volunteer / NGO profile collections.
 */
const userSchema = new mongoose.Schema(
  {
    /** Display name shown across dashboards */
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    /** Login identifier — unique across platform */
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: emailValidator,
    },

    /** Hashed password — excluded from default queries (select: false) */
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    /** Contact number for OTP, delivery coordination */
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: phoneValidator,
    },

    /** Determines RBAC and which profile collection to link */
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: enumValues(USER_ROLES),
        message: "Invalid user role",
      },
    },

    /** Profile photo URL or storage path */
    profileImage: {
      type: String,
      trim: true,
      default: null,
    },

    /** Primary postal address */
    address: {
      type: addressSchema,
      required: [true, "Address is required"],
    },

    /** Account lifecycle state */
    status: {
      type: String,
      enum: enumValues(USER_STATUS),
      default: USER_STATUS.PENDING,
    },

    /** Identity / document verification state */
    verificationStatus: {
      type: String,
      enum: enumValues(VERIFICATION_STATUS),
      default: VERIFICATION_STATUS.PENDING,
    },

    /** Track engagement for admin analytics */
    lastLoginAt: {
      type: Date,
      default: null,
    },

    /** Soft-delete without losing audit trail */
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ─── Indexes ───
userSchema.index({ phone: 1 });
userSchema.index({ role: 1, status: 1 });
userSchema.index({ verificationStatus: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ isDeleted: 1 });

// ─── Virtual populate hooks to role profiles (optional, populated on demand) ───
userSchema.virtual("donorProfile", {
  ref: "Donor",
  localField: "_id",
  foreignField: "userId",
  justOne: true,
});

userSchema.virtual("volunteerProfile", {
  ref: "Volunteer",
  localField: "_id",
  foreignField: "userId",
  justOne: true,
});

userSchema.virtual("ngoProfile", {
  ref: "NGO",
  localField: "_id",
  foreignField: "userId",
  justOne: true,
});

userSchema.virtual("adminProfile", {
  ref: "Admin",
  localField: "_id",
  foreignField: "userId",
  justOne: true,
});

const User = mongoose.model("User", userSchema);

export default User;
