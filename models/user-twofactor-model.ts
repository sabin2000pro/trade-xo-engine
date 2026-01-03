import mongoose from "mongoose";

export const TwoFactorSchema = new mongoose.Schema({

  isEnabled: {
    type: Boolean,
    default: false,
  },

  method: {
    type: String,
    enum: ["TOTP", "SMS"],
  },

  backupCodesHash: {
    type: [String],
    select: false,
  }

}, {timestamps: true});