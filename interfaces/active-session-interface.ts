export interface IActiveSession {
  sessionId: string;
  createdAt: Date;
  lastSeenAt: Date;
  ip: string;
  userAgent?: string;
  locationHint?: string;
}