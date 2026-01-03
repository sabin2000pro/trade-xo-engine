import mongoose, { ObjectId } from "mongoose";

export interface INotificationPreferences {
  isEmailChosen?: boolean;
  isSmsChosen?: boolean;
  isInAppChosen?: boolean;
  user: mongoose.Schema.Types.ObjectId
}