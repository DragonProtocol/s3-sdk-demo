import { DIDSession } from "did-session";
import { SolanaWebAuth, getAccountIdByNetwork } from "@didtools/pkh-solana";
import { EthereumWebAuth, getAccountId } from "@didtools/pkh-ethereum";
import type { ComposeClient } from "@composedb/client";

export type AuthChain = "metamask" | "phantom";

const SessionKey = "did";
const SessionAuthWithKey = "session-auth-with";

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

  public async connect(chain: AuthChain = "metamask") {
    if (!chain || chain === "metamask") {
      await this.authWithMetamask();
      this.valid = true;
    }
    if (chain === "phantom") {
      await this.authWithPhantom();
      this.valid = true;
    }
  }

  public async authWithPhantom(
    network: "mainnet" | "testnet" | "devnet" = "devnet"
  ) {
    const solProvider = (window as any).phantom.solana;
    const address = await solProvider.connect();
    const accountId = getAccountIdByNetwork(
      network,
      address.publicKey.toString()
    );
    const authMethod = await SolanaWebAuth.getAuthMethod(
      solProvider,
      accountId
    );
    this.session = await DIDSession.authorize(authMethod, {
      resources: ["ceramic://*"],
    });
    localStorage.setItem(SessionKey, this.session.serialize());
    localStorage.setItem(SessionAuthWithKey, "phantom");
  }

  public async authWithMetamask() {
    const ethProvider = (window as any).ethereum;
    const addresses = await ethProvider.enable({
      method: "eth_requestAccounts",
    });
    const accountId = await getAccountId(ethProvider, addresses[0]);
    const authMethod = await EthereumWebAuth.getAuthMethod(
      ethProvider,
      accountId
    );
    this.session = await DIDSession.authorize(authMethod, {
      resources: ["ceramic://*"],
    });
    localStorage.setItem("did", this.session.serialize());
    localStorage.setItem(SessionAuthWithKey, "metamask");
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
    localStorage.removeItem("did");
    this.session = undefined;
    this.valid = false;
    const session = await DIDSession.fromSession();
    composeClients.forEach((item) => {
      item.setDID(session.did);
    });
  }
}
