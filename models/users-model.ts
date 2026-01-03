import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { IUser } from "../interfaces/users-interface";
import { AddressSchema } from "./user-address-model";
import { AccountLevels } from "../enums/account-levels";

// User Roles (RBAC) - Canonical typed permission catalog

export enum ITwoFactorMethodTypes {
  TOTP = "TOTP",
  SMS = "SMS"
}

export type KycDocType = "ID_CARD" | "PASSPORT" | "DRIVING_LICENSE";


export interface UserDocument extends IUser, Document {
  compareLoginPasswords(enteredPassword: string): Promise<boolean>;
  generateAuthToken(): string;
  generateResetPasswordToken(): string;
}

export const UserSchema = new mongoose.Schema<IUser>(

  {

    accounts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        default: []
      },

    ],

    wallets: [

      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet",
        default: [],
      }

    ],

    username: { // Username of the User
      type: String,
      required: [true, "Please provide a valid username"],
    },

    email: { // User E-mail Address
      type: String,
      unique: true,
      required: [true, "Please specify a valid e-mail address"],
    },

    emailLower: {
      type: String,
      required: false,
      default: ''
    },

    password: { // Password of the user
      type: String,
      required: [true, "Please specify a valid password"],
    },

    address: {
      type: AddressSchema
    },

    dateOfBirth: {
      type: Date,
      default: Date.now,
      required: [true, "Please provide a valid date of birth"],
    },

    lastLoginAt: {
      type: Date,
      default: Date.now,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    profilePicture: {
      type: String,
      default: "",
      required: [true, "Please upload the users profile picture"],
    },

    role: {
      type: String,
      default: "USER",
      enum: ["USER", "ADMIN", "OPS", "COMPLIANCE", "SUPPORT"],
      index: true,
    },

    userStatus: {
      type: String,
      enum: ["ACTIVE", "PENDING", "FROZEN", "CLOSED"],
      default: "ACTIVE",
      index: true,
    },

    kycStatus: {
      type: String,
      enum: ["UNVERIFIED", "PENDING", "VERIFIED", "REJECTED"],
      default: "UNVERIFIED",
      index: true,
    },

    accountLevel: {
      type: String,
      enum: AccountLevels,
      default: AccountLevels.Bronze,
      required: [true, 'Please specify the account level you want to assign this User']
    },

    failedLoginAttempts: {
      type: Number,
      default: 0,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },

    deletedAt: { type: Date },

    isBanned: {
      type: Boolean,
      default: false,
    },

    isPhoneVerified: {
      type: Boolean,
      default: false,
    },

    isTwoFactorMandatory: {
      type: Boolean,
      default: false,
    },

    isDemoAccount: {
      type: Boolean,
      default: false,
    },

    isTradingEnabled: {
      type: Boolean,
      default: false,
    },

    isMarginCalled: {
      type: Boolean,
      default: false,
    },

    isDepositsAllowed: {
      type: Boolean,
      default: false,
    },

    isAccountLocked: {
      type: Boolean,
      default: false,
    },

    isProfileComplete: {
      type: Boolean,
      default: false,
    },

    marginDeficitAmount: {
      type: Number,
      default: 0,
    },

    marginCallDeadline: {
      type: Date,
      default: null,
    },

    marginCallResolvedAt: {
      type: Date,
      default: Date.now,
    },

    isMarginCallResolved: {
      type: Boolean,
      default: false,
    },

    marginCalledAt: {
      type: Date,
      default: Date.now,
    },

    isNotificationsMuted: {
        type: Boolean,
        default: false
    },

    isSuspiciousFlagged: {
        type: Boolean,
        default: false
    },

    isTermsAccepted: {
       type: Boolean,
       default: false
    }

  },


  {
    timestamps: true,

    toJSON: {
      versionKey: false,

      transform(_doc, ret: Record<string, any>) {
        delete ret?.password;
        delete ret?.emailLower;
        return ret;
      },
    },
  }
);

// Hash password before registering
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const SALT_ROUNDS = 12
  const PASSWORD_SALT = await bcrypt.genSalt(SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password!, PASSWORD_SALT) as string;

  return next();
});

UserSchema.methods.compareLoginPasswords = async function (
  enteredPassword: string
): Promise<Boolean> {
  return await bcrypt.compare(this.password, enteredPassword);
};

UserSchema.methods.generateAuthToken = function () {};

UserSchema.methods.generateResetPasswordToken = function () {};

const User = mongoose.model("User", UserSchema);
export default User;
