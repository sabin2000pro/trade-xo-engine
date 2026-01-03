import { ObjectId } from "mongoose";
import { MarginCallStatuses } from "../models/users-model";

export interface IMarginCall {
    isMarginCalled: boolean; // Determines if the user has been margin called
    marginCalledAt?: Date | null; // The date at which the user potentially has been margin called
    marginDeficitAmount?: number;
    marginCallStatus?: MarginCallStatuses;
    marginCallIds: ObjectId[]; // History links keep small
    isTradingRestricted: boolean; // Block new orders from being placed when true
    isWithdrawalRestricted: boolean; // Is the user's withdrawal restricted (cannot place any withdraw orders)
  }