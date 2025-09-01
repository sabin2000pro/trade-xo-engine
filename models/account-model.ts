import mongoose, { Document } from "mongoose";

export interface IAccount {}

export interface IAccountDocument extends IAccount, Document {}

export const AccountSchema = new mongoose.Schema<IAccount>(
  {},
  { timestamps: true }
);

const Account = mongoose.model("Account", AccountSchema);
export default Account;
