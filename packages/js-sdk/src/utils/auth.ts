import { DIDSession } from "did-session";
import { SolanaWebAuth, getAccountIdByNetwork } from "@didtools/pkh-solana";
import { EthereumWebAuth, getAccountId } from "@didtools/pkh-ethereum";
import type { CeramicApi } from "@ceramicnetwork/common";
import type { ComposeClient } from "@composedb/client";

export const authWithPhantom = async (
  ceramic: CeramicApi,
  compose: ComposeClient[]
) => {
  // for production you will want a better place than localStorage for your sessions.
  const sessionStr = localStorage.getItem("did");
  let session: DIDSession | undefined;

  if (sessionStr) {
    session = await DIDSession.fromSession(sessionStr);
  }
  if (!session || (session.hasSession && session.isExpired)) {
    const solProvider = (window as any).phantom.solana;
    const address = await solProvider.connect();
    const accountId = getAccountIdByNetwork(
      "devnet",
      address.publicKey.toString()
    );
    const authMethod = await SolanaWebAuth.getAuthMethod(
      solProvider,
      accountId
    );
    session = await DIDSession.authorize(authMethod, {
      resources: ["ceramic://*"],
    });
    localStorage.setItem("did", session.serialize());
  }

  // console.log("session.did", session.did, session.id);
  compose.forEach((item) => {
    if (!session) return;
    item.setDID(session.did);
  });
  ceramic.did = session.did;
  return session.id;
};

export const authWithEthereum = async (
  ceramic: CeramicApi,
  compose: ComposeClient[]
) => {
  // for production you will want a better place than localStorage for your sessions.
  const sessionStr = localStorage.getItem("did");
  let session: DIDSession | undefined;

  if (sessionStr) {
    session = await DIDSession.fromSession(sessionStr);
  }

  if (!session || (session.hasSession && session.isExpired)) {
    const ethProvider = (window as any).ethereum;
    // request ethereum accounts.
    const addresses = await ethProvider.enable({
      method: "eth_requestAccounts",
    });
    const accountId = await getAccountId(ethProvider, addresses[0]);
    const authMethod = await EthereumWebAuth.getAuthMethod(
      ethProvider,
      accountId
    );
    session = await DIDSession.authorize(authMethod, {
      resources: ["ceramic://*"],
    });
    localStorage.setItem("did", session.serialize());
  }
  // console.log("session.did", session.did, session.id);
  compose.forEach((item) => {
    if (!session) return;
    item.setDID(session.did);
  });
  ceramic.did = session.did;
  return session.id;
};
