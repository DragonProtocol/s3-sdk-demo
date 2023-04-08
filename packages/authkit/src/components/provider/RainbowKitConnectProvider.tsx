import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { PropsWithChildren } from "react";
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
import { useUs3rAuth } from "./Us3rAuthProvider";
import { AuthToolType } from "../../authorizers";

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

function RainbowKitAuthProvider({ children }: PropsWithChildren) {
  const { loginWithAuthorizer } = useUs3rAuth();
  const { disconnect } = useDisconnect();
  useAccount({
    async onConnect({ connector, isReconnected }) {
      const provider = await connector?.getProvider();
      if (!isReconnected && provider) {
        loginWithAuthorizer(AuthToolType.rainbowKit, provider);
        disconnect();
      }
    },
  });

  return <>{children}</>;
}

export default function RainbowKitConnectProvider({
  children,
}: PropsWithChildren) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <RainbowKitAuthProvider>{children}</RainbowKitAuthProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
