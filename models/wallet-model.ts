import mongoose from "mongoose";

type Money = mongoose.Types.Decimal128 | string;
const D = mongoose.Schema.Types.Decimal128;

// Wallet Types
export type WalletKind =
  | "FIAT"
  | "CRYPTO"
  | "MARGIN"
  | "FUNDING"
  | "STAKING"
  | "REWARDS"
  | "ESCROW"
  | "FEE"
  | "SETTLEMENT"
  | "INSURANCE"
  | "COLLATERAL"
  | "LIQUIDITY"
  | "TREASURY"
  | "CHARITY";

// Wallet Statuses
export type WalletStatus =
  | "ACTIVE"
  | "FROZEN"
  | "CLOSED"
  | "SUSPENDED"
  | "MAINTENANCE";

export type WalletCustodyType = "HOT" | "WARM" | "COLD" | "EXTERNAL";
export type WalletProviders = "INTERNAL" | "FIREBLOCKS" | "CUSTODIAN" | "BANK";

export type WalletTransactionPolicy =
  | "DEPOSIT_ONLY"
  | "WITHDRAW_ONLY"
  | "INTERNAL_ONLY";

export interface IWalletBalance {
  total: Money;
  available: Money;
  locked: Money;
  pending: Money;
  interestAccrued: Money;
  cumulativeDeposits: Money; // Runs a total of all the confirmed deposits into the wallet
  cumulativeWithdrawals: Money; // Runs a total of all withdrawals made / helps to track the lifetime flow of funds
  lifetimePnL: Money;
  reservedForFees: Money; // Amount earmarked for transactions or trading fees. Prevents orders from failing due to a missing fee conversion
  marginRequirement: Money;
  creditLine: Money;
  lastReconciledAt: Date;
  snapshotVersion: number;
  isNegativeBalance: boolean;
  isWalletFrozen: boolean;
  isDepositRestricted: boolean;
  isWithdrawalRestricted: boolean;
  isTradingRestricted: boolean; // Wallet cannot be used for trades / margin
  isFeeExempt: boolean;
  isPrimary: boolean; // If the wallet is the user's primary wallet
  isOverdraftAllowed: boolean; // True if the overdrafts are allowed
  isInMarginCall: boolean; // Wallet is flagged as part of a margin call event
  isInLiquidation: boolean;
  isInactive: boolean;
  isInsured: boolean;
  isSuspicious: boolean;
  isReconciliationPending: boolean;
  isLockedForCompliance: boolean;
  hasPendingDeposits: boolean;
  hasPendingWithdrawals: boolean;
  isWhitelistEnforced: boolean; // Withdrawals restricted to whitelisted addresses
  isBlacklisted: boolean; // Wallet flagged as blacklisted
  isDormant: boolean; // True if there is no activity in the wallet for 180 days for example.
  isSanctioned: boolean;
  isHighRiskJurisdiction: boolean;
  isTaxWitholdingEnabled: boolean;
  isJointWallet: boolean;
  isMultiSigEnabled: boolean;
  isColdStorage: boolean;
  isHotWallet: boolean;
  isTreasuryManaged: boolean;
  isFeeWallet: boolean; // Wallet is designated for collecting platform fees
  isSettlementWallet: boolean; // Wallet is used for clearing / settlements
  isRewardsEligible: boolean;
  isAirdropEligible: boolean;
  isDefaultCurrency: boolean;
  isUnderReview: boolean; // Wallet currently under review
  isAMLFlagged: boolean;
  isKYCIncomplete: boolean;
  isKYCApproved: boolean;
  isPnLPositive: boolean;

  createdAt: Date; // When the wallet was first created
  updatedAt: Date;
  deleteAt?: Date | null;
  lastDepositAt?: Date | null; // When there was a last deposit made to the wallet
  lastWithdrawalAt?: Date | null;
  lastTradePlacedAt?: Date | null;
  lastTransferAt?: Date | null;
  lastInterestAccruedAt?: Date | null;
  freezeStartedAt?: Date | null; // When the Wallet is frozen
  freezeEndedAt?: Date | null; // When the wallet was unfrozen
  suspendedAt?: Date | null;
  resumedAt?: Date | null;
  closedAt?: Date | null;

  lastComplianceCheckAt?: Date | null;
  nextComplianceReviewAt?: Date | null;
  flaggedSuspiciousAt?: Date | null;
  marginCallTriggeredAt?: Date | null;
  marginCallResolvedAt?: Date | null;
  overdraftRevokedAt?: Date | null;
  liquidationStartedAt?: Date | null;
  liquidationEndedAt?: Date | null; // The time at which the Wallet completed liquidation
  overdraftGrantedAt?: Date | null;
  stakingStartedAt?: Date | null;
  stakingEndedAt?: Date | null;
  promoLockStartedAt?: Date | null;
  promoLockEndedAt?: Date | null;
  lastAirdropAt?: Date | null;
  nextScheduledSweepAt?: Date | null;
}

export interface IWalletLimits {
  remainingDailyDeposits: number; // Number of deposits left for N period of time
  remainingDailyWithdrawals: number; // Number of withdrawals left
  maxConcurrentWithdrawals: number;
  maxConcurrentDeposits: number;
  isDynamicLimitsEnabled: boolean; // Whether the system can auto-adjust limits
  isLimitTemporarilyRaised: boolean;

  dailyDepositLimit?: string | null;
  dailyWithdrawalLimit?: string | null;
  perTxMin?: string | null;
  perTxMax?: string | null;
  openHoldsLimit?: number | null;
  temporaryLimitExpiresAt?: Date | null;
  lastLimitReviewedAt?: Date | null;
  nextLimitReviewedAt?: Date | null;
  limitResetAt?: Date | null;
}

export interface IWalletFeePolicy {
  depositFixed?: string | null;
  withdrawalFixed?: string | null;
  withdrawalPercent?: number | null;
  markerFeeBps?: number | null;
  takerFeeBps?: number | null;
}

export interface IWalletAddress {
  address: string;
  memoTag?: string;
  networkId?: mongoose.Types.ObjectId | null;
  assetId?: mongoose.Types.ObjectId | null;
  derivationPath?: string;
  xpubRef: string;
  assignedAt: Date;
  lastUsedAt?: Date | null;
  isActive: boolean;
}

export interface IWalletActivity {
  depositsCount?: number;
  withdrawalsCount?: number;
  transfersCount?: number;
}

export interface IWallet {
  _id?: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId; // The user which the wallet belongs to
  accountId?: mongoose.Schema.Types.ObjectId;
  networkId?: mongoose.Schema.Types.ObjectId | null;
  assetId?: mongoose.Schema.Types.ObjectId | null;

  walletKind: WalletKind;
  walletCustodyType: WalletCustodyType;
  walletProvider: WalletProviders;
  walletTransactionPolicy: WalletTransactionPolicy;
  walletStatus: WalletStatus;
  walletBalance: IWalletBalance;
  walletLimits: IWalletLimits;
  walletFeePolicy: IWalletFeePolicy;
  walletAddress: IWalletAddress;
  walletActivity: IWalletActivity;

  currency: string; // USD or GBP
  balance: IWalletBalance;
  limits?: IWalletLimits;

  addresses?: IWalletAddress[];
  activity?: IWalletActivity;
  updatedAt: Date;
  createdAt: Date;
}

export interface IWalletDocument extends IWallet, Document {}

export const WalletBalanceSchema = new mongoose.Schema<IWalletBalance>(
  {
    total: {
      type: D,
      required: [true, "Please specify the wallet total"],
      default: "0",
    },

    available: {
      type: D,
      required: [true, "Please specify the available balance of the Wallet"],
      default: "0",
    },

    locked: {
      type: D,
      default: 0,
    },

    pending: {
      type: D,
      default: 0,
    },

    cumulativeDeposits: {
      type: D,
      default: "0",
    },

    cumulativeWithdrawals: {
      type: D,
      default: "0",
    },

    lifetimePnL: {
      type: D,
      default: "0",
    },

    reservedForFees: {
      type: D,
      default: "0",
    },

    marginRequirement: {
      type: D,
      default: "0",
    },

    creditLine: {

    },

    lastReconciledAt: {

    }

  },
  {
    _id: false,

    toJSON: {
      virtuals: true,
      transform(_doc, ret: any) {
        ret.available = ret.available?.toString();
        ret.locked = ret.locked?.toString();
      },
    },
  }
);

export const WalletLimitsSchema = new mongoose.Schema<IWalletLimits>({

});

export const WalletFeePolicySchema = new mongoose.Schema<IWalletFeePolicy>({});

export const WalletAddressSchema = new mongoose.Schema<IWalletAddress>({});

export const WalletActivitySchema = new mongoose.Schema<IWalletActivity>({});

export const WalletSchema = new mongoose.Schema<IWallet>({});

// Virtual Properties (Links)
WalletSchema.virtual("transactions", {
  ref: "Transactions",
});

WalletSchema.virtual("withdrawals", {
  ref: "Withdrawals",
});

WalletSchema.virtual("deposits", {
  ref: "Deposits",
});

const Wallet = mongoose.model("Wallet", WalletSchema);
export default Wallet;
