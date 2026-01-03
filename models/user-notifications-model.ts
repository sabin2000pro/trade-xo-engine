import mongoose from "mongoose";
import { INotificationPreferences } from "../interfaces/notification-preferences-interface";

export const NotificationPrefsSchema = new mongoose.Schema<INotificationPreferences>(
    {

      isEmailChosen: {
        type: Boolean, 
        default: false
      },

      isSmsChosen: {
        type: Boolean,
        default: false
      },

      isInAppChosen: {
        type: Boolean,
        default: false
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
        
      }

    },

    { _id: false }
  );

export const UserNotifications = mongoose.model('Notifications', NotificationPrefsSchema);