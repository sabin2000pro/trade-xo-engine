import mongoose from "mongoose";
import { KycStatus } from "../enums/users/user-kyc-statuses";
import { UserRole } from "../enums/users/user-roles";
import { IAddress } from "./address-interface";
import { UserStatus } from "../enums/users/user-status";
import { AccountLevels } from "../enums/account-levels";

export interface IUser {
  accounts: mongoose.Schema.Types.ObjectId[]; // The accounts that belong to the specified user
  wallets: mongoose.Schema.Types.ObjectId[]; // The wallets that a given user has
  username: string | null; // Username of the user
  email: string | null; // E-mail of the user
  emailVerifiedAt: Date,
  password: string | null; // Password of the user
  address: IAddress | null; // The address of the user using the trading platform
  profilePicture?: string | null;
  emailLower: string | null;
  dateOfBirth: Date | null; // user's date of birth
  lastLoginAt?: Date | null; // The time at which the user last logged in
  preferredLanguage: string | null;
  timeZone: string | null; // The Timezone of the User
  lastLoginIpAddress: string; // Helps with Fraud Detection,
  failedLoginAttempts: number;
  loginCount: number; // How many ttimes the user has logged into the system
  depositsCount: number; // How many deposits the user has placed
  tradesCount: number; // How many trades the particular user has placed
  withdrawalsCount: number; // How many withdrawals the user with particular ID has made
  totalDepositAmount: number; // The total number of deposits the user has placed .
  totalWithdrawalAmount: number;
  openPositionsCount: number; // The total number of positions the user has open
  createdAt?: Date | null; // The date at which the user was created at
  updatedAt?: Date | null; // The date at which the user has been last updated at
  deletedAt?: Date | null; // The date at which the user was last deleted at
  role: UserRole; // The user's role in the system
  userStatus: UserStatus; // The user's status within the trading platform
  kycStatus: KycStatus; // The user's KYC status when uploading their verification document(s)
  accountLevel: AccountLevels; // The level which the user's account is (Bronze, Gold)
  isBanned: boolean; // is the user account banned
  isPhoneVerified: boolean;
  isTwoFactorMandatory: boolean;
  isDemoAccount: boolean;
  isDepositsAllowed: boolean;
  isNotificationsMuted: boolean;
  isTradingEnabled: boolean;
  isTermsAccepted: boolean;
  isSuspiciousFlagged: boolean;
  isAccountLocked: boolean;
  isProfileComplete: boolean;
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