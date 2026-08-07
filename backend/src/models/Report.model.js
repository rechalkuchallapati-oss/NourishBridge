import mongoose from "mongoose";
import {
  REPORT_TYPES,
  REPORT_FORMATS,
  REPORT_STATUS,
  enumValues,
} from "../constants/enums.js";

/**
 * Report period subdocument — defines the date range covered by a report.
 */
const reportPeriodSchema = new mongoose.Schema(
  {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    label: { type: String, trim: true, maxlength: 100 },
  },
  { _id: false },
);

/**
 * Report — generated analytics exports (PDF, CSV, Excel) for admins and NGOs.
 */
const reportSchema = new mongoose.Schema(
  {
    /** Human-readable reference */
    reportCode: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      uppercase: true,
    },

    /** User who requested the report */
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Generator is required"],
    },

    /** Report category */
    reportType: {
      type: String,
      enum: enumValues(REPORT_TYPES),
      required: [true, "Report type is required"],
    },

    /** Display title */
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    /** Date range covered */
    period: {
      type: reportPeriodSchema,
      required: [true, "Report period is required"],
    },

    /** Output file format */
    format: {
      type: String,
      enum: enumValues(REPORT_FORMATS),
      default: REPORT_FORMATS.PDF,
    },

    /** Generation pipeline state */
    status: {
      type: String,
      enum: enumValues(REPORT_STATUS),
      default: REPORT_STATUS.PENDING,
    },

    /** Stored file URL (S3, Cloudinary, local) */
    fileUrl: {
      type: String,
      trim: true,
      default: null,
    },

    /** File size in bytes */
    fileSizeBytes: {
      type: Number,
      default: 0,
      min: 0,
    },

    /** Filters applied when generating e.g. { ngoId, city, status } */
    filters: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    /** Summary metrics embedded for quick preview without downloading */
    summary: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    /** When file became available */
    generatedAt: {
      type: Date,
      default: null,
    },

    /** Auto-delete generated files after this date */
    expiresAt: {
      type: Date,
      default: null,
    },

    /** Error message if generation failed */
    errorMessage: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ─── Indexes ───
reportSchema.index({ generatedBy: 1, createdAt: -1 });
reportSchema.index({ reportType: 1, status: 1 });
reportSchema.index({ status: 1, createdAt: -1 });
reportSchema.index({ "period.start": 1, "period.end": 1 });
reportSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, partialFilterExpression: { expiresAt: { $type: "date" } } });

reportSchema.pre("save", async function generateCode(next) {
  if (this.reportCode) return next();
  const count = await mongoose.model("Report").countDocuments();
  this.reportCode = `RPT-${String(count + 1).padStart(4, "0")}`;
  next();
});

const Report = mongoose.model("Report", reportSchema);

export default Report;
