import mongoose from "mongoose";

const D = mongoose.Schema.Types.Decimal128;

export type DepositMethod =
  | "BANK_WIRE"
  | "CARD"
  | "ONCHAIN"
  | "INTERNAL_TRANSFER"
  | "MANUAL_ADJUSTMENT";

export type DepositStatus =
  | "PENDING"
  | "REVIEW"
  | "CONFIRMED"
  | "FAILED"
  | "CANCELLED";

export type DepositSource = "USER" | "ADMIN" | "SYSTEM";

export interface IDeposit {
  _id: mongoose.Types.ObjectId; // ID Of the Deposit
  userId: mongoose.Types.ObjectId; // The User ID to which the Deposit belongs to
  walletId: mongoose.Types.ObjectId; // The Wallet ID of the Deposit that has been placed by the User
  accountId?: mongoose.Types.ObjectId; // The Account ID (Optional) of the Deposit
  currency: string; // Currency type USD / GBP
  amount: mongoose.Schema.Types.Decimal128 | string | null; // Amount deposited
  depositMethod: DepositMethod; // The deposit method used to add funds (Bank Transfer , Card etc)
  depositStatus: DepositStatus; // The current status of the Deposit
  feeCharged?: mongoose.Schema.Types.Decimal128 | string | null; // Fee incurred by the deposit
  idempotencyKey?: string | null;
  correlationId?: string | null;
  provider?: string | null;
  bankReference?: string | null;
  networkId?: mongoose.Types.ObjectId | null;
  depositAddress?: string | null; // The address of the deposit
  confirmations?: number | null;
  arrivedAt?: Date | null; // The date at which the Deposit arrived
  confirmedAt?: Date | null;
  canceledAt?: Date | null;
  failedAt?: Date | null;

  isCancelled?: boolean | null;
  isArrived?: boolean | null;
  isFailed?: boolean | null;
  isManualReviewRequired: boolean;
  isKYCRequired: boolean;
  isTestDeposit: boolean;
  isChargebackRisk: boolean;
  isRefundable: boolean;
  isBlockedForTrading: boolean;

  riskScore: number;
  bonusAmount: number;
  networkFee: number;
  providerFee: number;
  exchangeRate: number;
  netAmount: number;
  requiredConfirmations: number;
}

export interface IDepositDocument extends IDeposit, Document {}

export const DepositSchema = new mongoose.Schema<IDeposit>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Please specify which User this deposit belongs to"]
  },

  walletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet',
    required: [true, "Please specify which Wallet this deposit belongs to"]
  },

  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },

  currency: {
    type: String,
    required: [true, 'Please specify the currency used for the deposit']
  },

  amount: {
    type: mongoose.Schema.Types.Decimal128
  },

  depositMethod: {
    type: String,
    enum: ["BANK_WIRE", "CARD", "ONCHAIN", "INTERNAL_TRANSFER", "MANUAL_ADJUSTMENT"],
    required: [true, "Please specify the deposit method"]
  },

  depositStatus: {

  }
});

const Deposit = mongoose.model("Deposit", DepositSchema);
export default Deposit;
