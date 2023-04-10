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
  useMemo,
  useState,
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
import { Us3rAuth } from "@us3r-network/auth";

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
  us3rAuth: Us3rAuth | undefined;
  auth: () => void;
}
const defaultContextValue: RainbowKitAuthContextValue = {
  us3rAuth: undefined,
  auth: () => {},
};

const RainbowKitAuthContext = createContext(defaultContextValue);

function RainbowKitAuth({ children }: PropsWithChildren) {
  const { openConnectModal } = useConnectModal();

  const [us3rAuth, setUs3rAuth] = useState<Us3rAuth>();
  const { disconnect } = useDisconnect();

  // 监听wagmi的连接状态，当触发连接成功时，启动us3r的授权流程
  useAccount({
    async onConnect({ connector, isReconnected }) {
      try {
        const provider = await connector?.getProvider();
        // !isReconnected 表示不识别自动重连，因为自动重连时，us3r的session可能没有过期，按理不应该重新授权
        if (!isReconnected && provider) {
          const us3rAuth = new Us3rAuth();
          await us3rAuth.connect("ethProvider", provider);

          // 重写us3rAuth.disconnect方法，在us3rAuth.disconnect调用后，接着调用wagmi的disconnect() (这一步是为了保证下一次还可以打开rainbowkit的modal)
          const originalDisconnect = us3rAuth.disconnect.bind(us3rAuth);
          us3rAuth.disconnect = async (...args) => {
            await originalDisconnect(...args);
            disconnect();
          };

          setUs3rAuth(us3rAuth);
        } else {
          disconnect();
        }
      } catch (error) {
        disconnect();
      }
    },
  });

  const auth = useCallback(() => {
    if (openConnectModal) openConnectModal();
  }, [openConnectModal]);

  return (
    <RainbowKitAuthContext.Provider
      value={useMemo(
        () => ({
          us3rAuth,
          auth,
        }),
        [us3rAuth, auth]
      )}
    >
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
