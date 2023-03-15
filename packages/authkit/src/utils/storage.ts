import { AuthToolType } from "../authorizers";
export const AuthLastWithKey = "us3r-auth-last";

export const getAuthLastFromStorage = (): AuthToolType => {
  return localStorage.getItem(AuthLastWithKey) as AuthToolType;
};
export const setAuthLastToStorage = (authToolType: AuthToolType) => {
  localStorage.setItem(AuthLastWithKey, authToolType);
};
