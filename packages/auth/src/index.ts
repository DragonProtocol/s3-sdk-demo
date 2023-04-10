import { DID } from "dids";
import { DIDSession } from "did-session";
import { SolanaWebAuth, getAccountIdByNetwork } from "@didtools/pkh-solana";
import { EthereumWebAuth, getAccountId } from "@didtools/pkh-ethereum";
import type { ComposeClient } from "@composedb/client";

export type AuthChain = "metamask" | "phantom" | "ethProvider" | "solProvider";

export const SessionKey = "did";
export const SessionAuthWithKey = "session-auth-with";

async function authWithEthProvider({
  ethProvider,
  chainId = "1",
  resources,
}: {
  ethProvider: any;
  chainId?: string;
  resources?: string[];
}) {
  const addresses = await ethProvider.enable({
    method: "eth_requestAccounts",
  });
  const accountId = await getAccountId(ethProvider, addresses[0]);
  const authMethod = await EthereumWebAuth.getAuthMethod(
    ethProvider,
    accountId
  );
  accountId.chainId.reference = chainId;
  return await DIDSession.authorize(authMethod, {
    resources: resources || [],
  });
}

async function authWithSolProvider({
  solProvider,
  network = "devnet",
  resources,
}: {
  solProvider: any;
  network?: "mainnet" | "testnet" | "devnet";
  resources?: string[];
}) {
  const address = await solProvider.connect();
  const accountId = getAccountIdByNetwork(
    network,
    address.publicKey.toString()
  );
  const authMethod = await SolanaWebAuth.getAuthMethod(solProvider, accountId);
  return await DIDSession.authorize(authMethod, {
    resources: resources || [],
  });
}

const defaultResources = ["ceramic://*"];

export class Us3rAuth {
  session: DIDSession | undefined;
  valid: boolean;
  constructor() {
    this.valid = false;
  }

  public async restoreFromLocal() {
    const sessionStr = localStorage.getItem(SessionKey);

    if (sessionStr) {
      const session = await DIDSession.fromSession(sessionStr);

      if (!session || (session.hasSession && session.isExpired)) {
        this.session = undefined;
        this.valid = false;
      } else {
        this.session = session;
        this.valid = true;
      }
    }
  }

  public async connect(chain: AuthChain = "metamask", provider?: any) {
    switch (chain) {
      case "metamask":
        this.session = await authWithEthProvider({
          ethProvider: (window as any).ethereum,
          chainId: "1",
          resources: defaultResources,
        });
        break;
      case "phantom":
        this.session = await authWithSolProvider({
          solProvider: (window as any).phantom.solana,
          network: "devnet",
          resources: defaultResources,
        });
        break;
      case "ethProvider":
        this.session = await authWithEthProvider({
          ethProvider: provider,
          chainId: "1",
          resources: defaultResources,
        });
        break;
      case "solProvider":
        this.session = await authWithSolProvider({
          solProvider: provider,
          network: "devnet",
          resources: defaultResources,
        });
        break;
      default:
        return;
    }
    this.valid = true;
    localStorage.setItem(SessionKey, this.session.serialize());
    localStorage.setItem(SessionAuthWithKey, chain);
  }

  public authComposeClients(composeClients: ComposeClient[]) {
    if (!this.session || (this.session.hasSession && this.session.isExpired)) {
      this.valid = false;
      throw new Error("Please login with wallet first!");
    }
    const session = this.session;
    composeClients.forEach((item) => {
      item.setDID(session.did);
    });
  }

  public async disconnect(composeClients: ComposeClient[]) {
    localStorage.removeItem(SessionKey);
    this.session = undefined;
    this.valid = false;
    const did = new DID();
    composeClients.forEach((item) => {
      item.setDID(did);
    });
  }
}
