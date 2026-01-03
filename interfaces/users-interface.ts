import mongoose from "mongoose";
import { KycStatus } from "../enums/user-kyc-statuses";
import { UserRole } from "../enums/user-roles";
import { IAddress } from "./address-interface";
import { UserStatus } from "../enums/user-status";
import { AccountLevels } from "../enums/account-levels";

export interface IUser {
  accounts: mongoose.Schema.Types.ObjectId[]; // The accounts that belong to the specified user
  wallets: mongoose.Schema.Types.ObjectId[]; // The wallets that the user has
  username: string | null; // Username of the user
  email: string | null; // E-mail of the user
  password: string | null; // Password of the user
  address: IAddress | null; // The address of the user using the trading platform
  profilePicture?: string | null;
  emailLower: string | null;
  dateOfBirth: Date | null; // user's date of birth
  lastLoginAt?: Date | null;
  preferredLanguage: string | null;
  timeZone: string;
  lastLoginIpAddress: string; // Helps with Fraud Detection,
  failedLoginAttempts: number;
  loginCount: number;
  depositsCount: number; // How many deposits the user has placed
  tradesCount: number; // How many trades the particular user has placed
  withdrawalsCount: number; // How many withdrawals the user with particular ID has made
  totalDepositAmount: number;
  totalWithdrawalAmount: number;
  openPositionsCount: number;
  createdAt?: Date | null; // The date at which the user was created at
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  role: UserRole;
  userStatus: UserStatus;
  kycStatus: KycStatus;
  accountLevel: AccountLevels;
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

export interface ICreateUserInterface {
  username: string
  email: string
  password: string
  address: string
  accountLevel: string
}

export interface IUpdateUserInterface {
  username: string
  email: string
  password: string
  address: string
}