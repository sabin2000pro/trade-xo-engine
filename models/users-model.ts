import mongoose, { ObjectId } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// User Roles (RBAC) - Canonical typed permission catalog
export type UserRole = "USER" | "ADMIN" | "OPS" | "COMPLIANCE" | "SUPPORT";

export const USER_PERMISSIONS = [
  // ===== Authentication =====
  "auth:register",
  "auth:login",
  "auth:logout:self",
  "auth:logout:any",
  "auth:refresh",
  "auth:password:change:self",
  "auth:password:reset:initiate",
  "auth:password:reset:complete",
  "auth:2fa:enable",
  "auth:2fa:disable",
  "auth:2fa:enforce:any",
  "auth:sessions:view:self",
  "auth:email:verify",
  "auth:email:resend",

  // ===== User Wallets RBAC =====
  "view:wallets:self",
  "adjust:wallets:any",
  "create:wallets:self",
  "list:wallets:self",
  "view:wallets:any",
  "freeze:wallets:any",
  "unfreeze:wallets:any",
  "reconcile:wallets:any",
  "history:view:wallets:any",

  // ===== User Accounts RBAC =====
  "view:accounts:self",
  "view:accounts:any",
  "create:accounts:self",
  "edit:accounts:self",
  "delete:accounts:self",

  // ===== User Deposits RBAC =====
  "view:deposits:self",
  "view:deposits:any",
  "create:deposits:self",
  "create:deposits:any",

  // ===== User Withdrawals RBAC =====

  // ===== User Trade Orders =====
  "place:orders",
  "view:orders:self",
  "view:orders:any",
  "cancel:orders:self",
  "cancel:orders:any",

  // ===== User Transactions RBAC =====
];

export type UserStatus = "ACTIVE" | "PENDING" | "FROZEN" | "CLOSED";
export type KycStatus = "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED";
export type ITwoFactorMethodTypes = "TOTP" | "SMS";
export type MarginCallStatuses = "OPEN" | "RESOLVED" | "LIQUIDATED";
export type KycDocType = "ID_CARD" | "PASSPORT" | "DRIVING_LICENSE";

export type PositionStatus =
  | "OPEN"
  | "CLOSED"
  | "FROZEN"
  | "PENDING_SETTLEMENT"
  | "LIQUIDATING"
  | "PARTIALLY_CLOSED"
  | "ROLLED_OVER"
  | "TRANSFER_PENDING"
  | "ERROR"
  | "ARCHIVED";

export type AccountLevel =
  | "BRONZE"
  | "SILVER"
  | "GOLD"
  | "PLATINUM"
  | "DIAMOND";

export interface IApiKey {
  label?: string;
  keyPrefix: string;
  keyHash: string;
  scopes: string[];
  lastUsedAt?: Date | null;
  createdAt: Date;
  expiresAt?: Date | null;
  revokedAt?: Date | null;
}

export interface IActiveSession {
  sessionId: string;
  createdAt: Date;
  lastSeenAt: Date;
  ip: string;
  userAgent?: string;
  locationHint?: string;
}

export interface IUser {
  accounts: mongoose.Schema.Types.ObjectId[]; // The accounts that belong to the specified user
  wallets: mongoose.Schema.Types.ObjectId[]; // The wallets that the user has
  username: string | null; // Username of the user
  email: string | null; // E-mail of the user
  password: string | null; // Password of the user
  address: IAddress | null;
  profilePicture?: string | null;
  emailLower: string | null;
  dateOfBirth: Date | null;
  lastLoginAt?: Date | null;
  preferredLanguage: string | null;
  timeZone: string;
  lastLoginIpAddress: string; // Helps with Fraud Detection,
  failedLoginAttempts: number;
  loginCount: number;
  depositsCount: number;
  tradesCount: number;
  withdrawalsCount: number;
  totalDepositAmount: number;
  totalWithdrawalAmount: number;
  openPositionsCount: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  role: UserRole;
  userStatus: UserStatus;
  kycStatus: KycStatus;
  accountLevel: AccountLevel;
  isBanned: boolean;
  isPhoneVerified: boolean;
  isTwoFactorMandatory: boolean;
  isDemoAccount: boolean;
  isDepositsAllowed: boolean;
  isNotificationsMuted: boolean;
  isTradingEnabled: boolean;
  isTermsAccepted: boolean;
  isSuspiciousFlagged: boolean;
  isAccountLocked: boolean;
  isMarginCalled: boolean;
  isMarginCallResolved: boolean;
  isProfileComplete: boolean;
  emailVerifiedAt?: Date | null;
  marginCalledAt?: Date | null;
  marginCallResolvedAt?: Date | null;
  marginDeficitAmount: Number;
  marginCallDeadline: Date;
}

export interface UserDocument extends IUser, Document {
  compareLoginPasswords(enteredPassword: string): Promise<boolean>;
  generateAuthToken(): string;
  generateResetPasswordToken(): string;
}

export interface INotificationPreferences {
  email: boolean;
  sms: boolean;
  inApp: boolean;
}

export interface ITwoFactorSchema {
  isEnabled: boolean;
  method?: ITwoFactorMethodTypes;
  backupCodesHash: string;
}

export interface IMarginCall {
  isMarginCalled: boolean;
  marginCalledAt?: Date | null;
  marginDeficitAmount?: number;
  marginCallStatus?: MarginCallStatuses;
  marginCallIds: ObjectId[]; // History links keep small
  isTradingRestricted: boolean; // Block new orders from being placed when true
  isWithdrawalRestricted: boolean;
}

export interface IAddress {
  line1?: string;
  line2?: string;
  city: string;
  postalCode: string;
  country: string;
  countryCode?: string;
}

export const AddressSchema = new mongoose.Schema<IAddress>({
  line1: { type: String },
  line2: { type: String },

  city: {
    type: String,
    required: [true, "Please specify the users city"],
    default: "",
  },

  postalCode: {
    type: String,
    min: [5, "The postal code must have at least 5 characters"],
    max: [15, "The postal code must not exceed 15 characters"],
    default: "",
    required: [true, "Please specify the users postal code"],
  },

  country: {
    type: String,
    default: "",
    required: [true, "Please specify the users country of residence"],
  },

  countryCode: {
    type: String,
    default: "",
    required: [
      true,
      "Please provide the country code for the country of residence",
    ],
  },
});

export const NotificationPrefsSchema =
  new mongoose.Schema<INotificationPreferences>(
    {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      inApp: { type: Boolean, default: true },
    },
    { _id: false }
  );

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
  },
});

export const UserSchema = new mongoose.Schema<IUser>(
  {
    accounts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
      },
    ],

    wallets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet",
        default: [],
      },
    ],

    username: {
      type: String,
      required: [true, "Please provide a valid username"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please specify a valid e-mail address"],
    },

    password: {
      type: String,
      required: [true, "Please specify your passowrd"],
      select: false,
    },

    address: { type: AddressSchema },

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
      enum: ["BRONZE", "SILVER", "GOLD", "PLATINUM", "DIAMOND"],
      default: "BRONZE",
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

    isNotificationsMuted: { type: Boolean, default: false },
    isSuspiciousFlagged: { type: Boolean, default: false },
    isTermsAccepted: { type: Boolean, default: false },
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

  return next();
});

UserSchema.virtual("yieldPositions", {
  ref: "YieldPosition",
  localField: "_id",
  foreignField: "userId",
});

UserSchema.virtual("yieldDeposits", {
  ref: "YieldDeposit",
  localField: "_id",
  foreignField: "userId",
  justOne: false,
});

UserSchema.virtual("yieldRedemptions", {
  ref: "YieldRedemption",
  localField: "_id",
  foreignField: "userId",
  justOne: false,
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
