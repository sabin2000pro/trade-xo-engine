import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { IUser } from "../interfaces/users-interface";
import { AddressSchema } from "./user-address-model";
import { AccountLevels } from "../enums/account-levels";
import { KycStatus } from "../enums/user-kyc-statuses";
import { UserRole } from "../enums/user-roles";
import { UserStatus } from "../enums/user-status";


export interface UserDocument extends IUser, Document {
  compareLoginPasswords(enteredPassword: string): Promise<boolean>;
  generateAuthToken(): string;
  generateResetPasswordToken(): string;
}

export const UserSchema = new mongoose.Schema<IUser>(

  {

    accounts: [ // The Accounts that the User has created
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        default: []
      },

    ],

    wallets: [ // The wallet IDs which correspond to a user

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

    password: { // Password of the user
      type: String,
      required: [true, "Please specify a valid password"],
    },

    address: {
      type: AddressSchema
    },

    profilePicture: {
      type: String,
      default: "",
      required: [true, "Please upload the users profile picture"],
    },

    emailLower: { // User's E-mail address in lowercase format
      type: String,
      required: false,
      default: ''
    },

    dateOfBirth: {
      type: Date,
      default: Date.now,
      required: [true, "Please provide a valid date of birth"],
    },

    lastLoginAt: { // The date at which the user was last logged into the platform at
      type: Date,
      default: Date.now,
    },

    preferredLanguage: {
      type: String,
      default: '',
      required: false
    },

    timeZone: {
      type: String,
      default: '',
      required: false
    },

    lastLoginIpAddress: {
      type: String,
      default: null,
      required: false
    },

    failedLoginAttempts: {
      type: Number,
      default: 0,
    },

    loginCount: {
      type: Number,
      default: 0,
      required: false
    },

    // Dashboard Purpose Counters
    depositsCount: {
      type: Number,
      default: 0,
      required: false
    },

    tradesCount: {
      type: Number,
      default: 0,
      required: false
    },

    withdrawalsCount: {
      type: Number,
      default: 0,
      required: false
    },

    openPositionsCount: {
      type: Number,
      default: 0,
      required: false
    },

    createdAt: { // The date at which the User was created at
      type: Date,
      default: Date.now,
    },

    role: {
      type: String,
      default: UserRole.User,
      enum: UserRole
    },

    userStatus: {
      type: String,
      enum: UserStatus,
      default: UserStatus.Active,
    },

    kycStatus: {
      type: String,
      enum: Object.values(KycStatus),
      default: KycStatus.Unverified,
    },

    accountLevel: {
      type: String,
      enum: AccountLevels,
      default: AccountLevels.Bronze,
      required: [true, 'Please specify the account level you want to assign this User']
    },

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

    updatedAt: {
      type: Date,
      default: Date.now,
    },

    deletedAt: {
      type: Date,
      default: Date.now
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
      required: false
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
    },

    emailVerifiedAt: {
      type: Date,
      default: Date.now
    },



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
