import { AccountType, Authorizer, AuthToolType } from "../../authorizer";
import iconUrl from "./icon.svg";

export const RainbowKitAuthorizer: Authorizer = {
  accountType: AccountType.EVM,
  authToolType: AuthToolType.rainbowKit,
  name: "RainbowKit",
  iconUrl,
  buttonVariant: "",
};
