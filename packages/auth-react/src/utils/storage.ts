import { AuthToolType } from "../authorizers";
export const SessionKey = "did";
export const SessionAuthWithKey = "session-auth-with";
export const AuthLastWithKey = "us3r-auth-last";

export const removeSessionStorage = () => {
  localStorage.removeItem(SessionKey);
};
export const getAuthLastFromStorage = (): AuthToolType => {
  return localStorage.getItem(AuthLastWithKey) as AuthToolType;
};
export const setAuthLastToStorage = (authToolType: AuthToolType) => {
  localStorage.setItem(AuthLastWithKey, authToolType);
};
