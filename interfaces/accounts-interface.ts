import mongoose from "mongoose";

export interface IAccount {
   accountId: string;
   user: mongoose.Schema.Types.ObjectId
}

export interface ICreateAccount {

}

export interface IUpdateAccount {
    
}