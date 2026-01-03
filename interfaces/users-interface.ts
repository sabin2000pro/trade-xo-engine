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