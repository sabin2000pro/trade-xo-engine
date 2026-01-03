import { ITwoFactorMethodTypes } from "../models/users-model";

export interface ITwoFactorSchema {
    isEnabled: boolean;
    method?: ITwoFactorMethodTypes;
    backupCodesHash: string;
  }