import React, { useCallback, useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { ComposeClient } from "@composedb/client";
import { RuntimeCompositeDefinition } from "@composedb/types";

import { AuthChain, Us3rAuth } from "@us3r-network/auth";
import { definition as profileDefinition } from "./definition/profile-runtime-composite";
import {
  mutationPersonalProfile,
  queryPersonalProfile,
  queryProfileWithDid,
} from "./api";

export type WalletChainType = "EVM" | "SOLANA";
export type Profile = {
  name?: string;
  avatar?: string;
  wallets?: Wallet[];
  bio?: string;
  tags?: string[];
};
export type Wallet = {
  chain: WalletChainType;
  address: string;
  primary: boolean;
};

const CeramicContext =
  createContext<{
    us3rAuth: Us3rAuth;
    us3rAuthValid: boolean;
    getProfileWithDid: (did: string) => Promise<any>;
    updateProfile: (data: Profile) => Promise<void>;
    connectUs3r: (chain?: AuthChain, provider?: any) => Promise<void>;
    disconnect: () => Promise<void>;
    sessId: string;
    profile?: Profile;
  } | null>(null);

const us3rAuth = new Us3rAuth();
export const Us3rProfileProvider = ({
  ceramicHost,
  children,
}: React.PropsWithChildren & {
  ceramicHost: string;
}) => {
  const profileComposeClient = new ComposeClient({
    ceramic: ceramicHost,
    definition: profileDefinition as RuntimeCompositeDefinition,
  });
  const [us3rAuthValid, setUs3rAuthValid] = useState(false);
  const [sessId, setSessId] = useState("");
  const [profile, setProfile] = useState<Profile>();

  const getPersonalProfile = useCallback(async () => {
    if (!profileComposeClient.context.isAuthenticated()) {
      throw new Error("authorized with wallet first");
    }

    const profile = await queryPersonalProfile(profileComposeClient);
    if (profile.errors) {
      throw profile.errors;
    }
    return (profile?.data?.viewer as any)?.profile;
  }, []);

  const updatePersonalProfile = useCallback(async (data: Profile) => {
    if (!profileComposeClient.context.isAuthenticated()) {
      throw new Error("authorized with wallet first");
    }
    const update = await mutationPersonalProfile(profileComposeClient, data);
    if (update.errors) {
      throw update.errors;
    }
  }, []);

  const getProfileWithDid = useCallback(async (did: string) => {
    const res = await queryProfileWithDid(profileComposeClient, did);
    if (res.errors) {
      throw res.errors;
    }
    return res?.data?.node as any;
  }, []);

  const connectUs3r = useCallback(
    async (chain?: AuthChain, provider?: any) => {
      await us3rAuth.connect(chain, provider);
      us3rAuth.authComposeClients([profileComposeClient]);
      const profile = await getPersonalProfile();
      setSessId(us3rAuth.session?.id || "");
      setProfile(profile);
      setUs3rAuthValid(true);
    },
    [getPersonalProfile]
  );

  const restoreUs3r = useCallback(async () => {
    await us3rAuth.restoreFromLocal();
    if (us3rAuth.valid) {
      us3rAuth.authComposeClients([profileComposeClient]);
      const profile = await getPersonalProfile();
      setProfile(profile);
      setSessId(us3rAuth.session?.id || "");
      setUs3rAuthValid(true);
    }
  }, [getPersonalProfile]);

  const disconnect = useCallback(async () => {
    await us3rAuth.disconnect([profileComposeClient]);
    setSessId("");
    setProfile({ name: "" });
  }, [profileComposeClient]);

  const updateProfile = useCallback(
    async (data: Profile) => {
      await updatePersonalProfile(data);
      const profile = await getPersonalProfile();
      setProfile(profile);
    },
    [getPersonalProfile]
  );

  useEffect(() => {
    restoreUs3r();
  }, []);

  return (
    <CeramicContext.Provider
      value={{
        us3rAuth,
        us3rAuthValid,
        getProfileWithDid,

        updateProfile,
        connectUs3r,
        sessId,
        disconnect,
        profile,
      }}
    >
      {children}
    </CeramicContext.Provider>
  );
};

export const useUs3rProfileContext = () => useContext(CeramicContext);