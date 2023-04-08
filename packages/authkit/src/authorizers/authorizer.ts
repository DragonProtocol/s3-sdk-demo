export enum AccountType {
  SOLANA = "SOLANA",
  EVM = "EVM",
}
export enum AuthToolType {
  rainbowKit = "rainbowKit",
  metamask_wallet = "metamask_wallet",
  phantom_wallet = "phantom_wallet",
}
export type Authorizer = {
  // 授权者的账户类型
  accountType: AccountType;
  // 使用什么工具授权的
  authToolType: AuthToolType;
  // 授权者显示名称
  name: string;
  // 符合授权者的图标地址
  iconUrl: string;
  // 授权者按钮在主题系统中的variant
  buttonVariant?: string;
};
