export interface IApiKey {
    label?: string;
    keyPrefix: string;
    keyHash: string;
    scopes: string[];
    lastUsedAt?: Date | null;
    createdAt: Date;
    expiresAt?: Date | null;
    revokedAt?: Date | null;
  }