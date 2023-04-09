import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import {
  configureChains,
  createClient,
  useAccount,
  useDisconnect,
  WagmiConfig,
} from "wagmi";
import { arbitrum, goerli, mainnet, optimism, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {
  argentWallet,
  trustWallet,
  omniWallet,
  imTokenWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { useUs3rProfileContext } from "@us3r-network/profile";

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "RainbowKit App",
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other Wallets",
    wallets: [
      argentWallet({ chains }),
      trustWallet({ chains }),
      omniWallet({ chains }),
      imTokenWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
});

export interface RainbowKitAuthContextValue {
  login: () => void;
  logout: () => void;
}
const defaultContextValue: RainbowKitAuthContextValue = {
  login: () => {},
  logout: () => {},
};

const RainbowKitAuthContext = createContext(defaultContextValue);

function RainbowKitAuth({ children }: PropsWithChildren) {
  const { openConnectModal } = useConnectModal();
  const {
    sessId,
    connectUs3r,
    disconnect: disconnectWithProfile,
  } = useUs3rProfileContext()!;

  // 确保us3r未登录时，wagmi也断开连接（为了可以打开rainbowkit的connect modal）
  const { disconnect } = useDisconnect();
  useEffect(() => {
    if (!sessId) {
      disconnect();
    }
  }, [sessId, disconnect]);

  // 监听wagmi的连接状态，当触发连接成功时，启动us3r的授权流程
  useAccount({
    async onConnect({ connector, isReconnected }) {
      try {
        const provider = await connector?.getProvider();
        // !isReconnected 表示不识别自动重连，因为自动重连时，us3r的session可能没有过期，按理不应该重新授权
        if (!isReconnected && provider) {
          await connectUs3r("ethProvider", provider);
        } else {
          disconnect();
        }
      } catch (error) {
        disconnect();
      }
    },
  });

  const login = useCallback(() => {
    if (openConnectModal) openConnectModal();
  }, [openConnectModal]);

  const logout = useCallback(async () => {
    await disconnectWithProfile();
  }, [disconnectWithProfile]);

  const providerValue = useMemo(
    () => ({
      login,
      logout,
    }),
    [login, logout]
  );

  return (
    <RainbowKitAuthContext.Provider value={providerValue}>
      {children}
    </RainbowKitAuthContext.Provider>
  );
}

export default function RainbowKitAuthProvider({
  children,
}: PropsWithChildren) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <RainbowKitAuth>{children}</RainbowKitAuth>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export function useRainbowKitAuth() {
  const context = useContext(RainbowKitAuthContext);
  if (!context) {
    throw Error(
      "useRainbowKitAuth can only be used within the RainbowKitAuthProvider component"
    );
  }
  return context;
}
