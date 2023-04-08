import { AuthToolType } from "./authorizer";
import { RainbowKitAuthorizer } from "./evmAccount/rainbowKit/authorizer";
import { MetamaskWalletAuthorizer } from "./evmAccount/metamaskWallet/authorizer";
import { PhantomWalletAuthorizer } from "./solanaAccount/phantomWallet/authorizer";

export * from "./authorizer";

const AuthorizerBaseInfoMap = {
  [AuthToolType.rainbowKit]: RainbowKitAuthorizer,
  [AuthToolType.metamask_wallet]: MetamaskWalletAuthorizer,
  [AuthToolType.phantom_wallet]: PhantomWalletAuthorizer,
};
export const getAuthorizerBaseInfo = (authToolType: AuthToolType) => {
  const authorizer = AuthorizerBaseInfoMap[authToolType];
  if (!authorizer) {
    throw new Error(`There is no authorizer for ${authToolType}`);
  }
  return authorizer;
};
