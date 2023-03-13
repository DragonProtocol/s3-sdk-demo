import { Us3rAuth } from "@us3r-network/auth";
type Us3rAuthInstance = InstanceType<typeof Us3rAuth>;
export type Us3rAuthSession = Us3rAuthInstance["session"];

export const getUserDisplayName = (session: Us3rAuthSession) => {
  return session ? `${session.id.slice(0, 8)}..${session.id.slice(-4)}` : "";
};
