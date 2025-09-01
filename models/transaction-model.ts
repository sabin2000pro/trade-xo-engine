import mongoose from "mongoose";

// In accounting (Trading / Fintech systems), every transaction made is represented in Double-Entry book keeping.
// This means that every movement of value has a DEBIT and a CREDIT entry

// Debit (DR): Increases assets (Funds going into a wallet)
// Credit (CR): Decreases assets (Funds leaving a wallet).
// For Example: A user deposits 100 USDT into their trading wallet.
// Debit: Wallet (Asset increases +100)
// Credit: Bank settlement account (asset decreases -100);

// A Journal Line is a single item that represents one side of a transaction. Together, multiple Journal Lines form a balanced Transaction
// Sum of debits = sum of credits

export type TransactionType =
  | "DEPOSIT"
  | "WITHDRAWAL"
  | "FEE"
  | "ADJUSTMENT"
  | "YIELD_PAYOUT"
  | "TRADE_FILL"
  | "TRANSFER";

export type TransactionStatus =
  | "PENDING"
  | "POSTED"
  | "SETTLED"
  | "FAILED"
  | "CANCELLED";

export interface ITransaction {
  _id?: mongoose.Types.ObjectId;
  type: TransactionType;
  status: TransactionStatus;
  currency: string;
  totalAmount: string;
  initiatedBy?: mongoose.Schema.Types.ObjectId | null;
  createdAt: Date;
  postedAt?: Date | null;
  settledAt?: Date | null;
  canceledAt?: Date | null;
  failed?: Date | null;
}

export type TransactionJournalSide = "DEBIT" | "CREDIT";

export interface ITransactionDocument extends ITransaction, Document {}

export const TransactionSchema = new mongoose.Schema<ITransaction>({});

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
