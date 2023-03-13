import { AccountType, Authorizer, AuthToolType } from "../../authorizer";
import iconUrl from "./icon.svg";

export const PhantomWalletAuthorizer: Authorizer = {
  accountType: AccountType.SOLANA,
  authToolType: AuthToolType.phantom_wallet,
  name: "Phantom Wallet",
  iconUrl,
  buttonVariant: "phantomWallet",
};
