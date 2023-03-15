import { AccountType, Authorizer, AuthToolType } from "../../authorizer";
import iconUrl from "./icon.svg";

export const MetamaskWalletAuthorizer: Authorizer = {
  accountType: AccountType.EVM,
  authToolType: AuthToolType.metamask_wallet,
  name: "MetaMask Wallet",
  iconUrl,
  buttonVariant: "metamaskWallet",
};
