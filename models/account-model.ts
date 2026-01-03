import mongoose, { Document } from "mongoose";
import { IAccount } from "../interfaces/accounts-interface";


export interface IAccountDocument extends IAccount, Document {

}

export const AccountSchema = new mongoose.Schema<IAccount>({

  user: {
    types: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  accountId: {
    type: String,
    default: ''
  }

}, {timestamps: true})

const Account = mongoose.model("Account", AccountSchema);
export default Account;