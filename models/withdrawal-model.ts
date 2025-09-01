import mongoose from "mongoose";

type Money = mongoose.Schema.Types.Decimal128;

export type WithdrawalStatus =
  | "PENDING"
  | "REVIEW"
  | "PROCESSING"
  | "CONFIRMED"
  | "CANCELLED"
  | "FAILED";

export type WithdrawalMethod =
  | "BANK_WIRE"
  | "CARD"
  | "ONCHAIN"
  | "INTERNAL_TRANSFER"
  | "MANUAL_PAYOUT";

export interface IWithdrawal {
  _id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId; // User who requested the Withdrawal
  walletId: mongoose.Schema.Types.ObjectId; // The wallet from which the money is being withdrawn
  accountId?: mongoose.Schema.Types.ObjectId;
  currency: string // ISO Code (USD / EUR / GBP)
  amount: Money // Gross amount requested
  providerFee: Money // Bank / Card / Processor Fee 
  platformFee: Money // Your own fee if applicable
  totalFees: Money // Sum of all the fees if applicable
  netAmount: Money // The amount actually leaving the platform (Amount - TotalFees)

  withdrawalMethod: WithdrawalMethod
  withdrawalStatus: WithdrawalStatus
  destinationAddress: string | null
  bankAccountNumber: string | null
  bankSortCode: string | null
  beneficiaryName: string | null
  beneficiaryReference: string | null

  exchangeRate?: number | null
  paymentProvider: string | null
  requiredConfirmations: number | null
  requestedAt: Date

  approvedAt: Date | null
  broadcastedAt: Date | null
  confirmedAt: Date | null
  failedAt: Date | null
  canceledAt: Date | null
  expiresAt: Date | null

  isManualReviewRequired: boolean
  isAMLFlagged: boolean
  isKYCRequired: boolean
  isWhitelistedDestination: boolean
}

export const WithdrawalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please specify the User ID of this Withdrawal"]
  },

  walletId: {

  },

  accountId: {},
});

const Withdrawal = mongoose.model("Withdrawal", WithdrawalSchema);
export default Withdrawal;
