export const ThunkStatus = {
  Idle: "idle",
  Pending: "pending",
  Fulfilled: "fulfilled",
  Rejected: "rejected",
} as const;

type ThunkStatusKey = keyof typeof ThunkStatus;
export type ThunkStatusType = (typeof ThunkStatus)[ThunkStatusKey];
