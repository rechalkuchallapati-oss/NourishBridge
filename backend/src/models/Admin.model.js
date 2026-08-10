import mongoose from "mongoose";
import { ADMIN_LEVELS, ADMIN_PERMISSIONS, enumValues } from "../constants/enums.js";

/**
 * Admin — platform administrator profile linked to User with role=admin.
 */
const adminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      unique: true,
    },

    adminLevel: {
      type: String,
      enum: enumValues(ADMIN_LEVELS),
      default: ADMIN_LEVELS.ADMIN,
    },

    permissions: {
      type: [String],
      enum: enumValues(ADMIN_PERMISSIONS),
      default: [
        ADMIN_PERMISSIONS.USERS,
        ADMIN_PERMISSIONS.DONORS,
        ADMIN_PERMISSIONS.NGOS,
        ADMIN_PERMISSIONS.VOLUNTEERS,
        ADMIN_PERMISSIONS.DONATIONS,
        ADMIN_PERMISSIONS.REPORTS,
        ADMIN_PERMISSIONS.VERIFICATION,
      ],
    },

    department: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "Platform Operations",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

adminSchema.index({ adminLevel: 1 });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
