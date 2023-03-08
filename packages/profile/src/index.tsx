import React, { useCallback, useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { ComposeClient } from "@composedb/client";
import { RuntimeCompositeDefinition } from "@composedb/types";

import { AuthChain, Us3rAuth } from "@us3r-network/auth";
import { definition as profileDefinition } from "./definition/profile-definition";
import {
  mutationPersonalProfile,
  queryPersonalProfile,
  queryProfileWithDid,
} from "./api";

const CeramicContext = createContext<{
  getProfileWithDid: (did: string) => Promise<any>;
  updateProfile: (name: string) => Promise<void>;
  connectUs3r: (chain?: AuthChain) => Promise<void>;
  sessId: string;
  profile?: {
    name: string;
  };
} | null>(null);

export const us3rAuth = new Us3rAuth();

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

  const [sessId, setSessId] = useState("");
  const [profile, setProfile] = useState<{
    name: string;
  }>();

  const getPersonalProfile = useCallback(async () => {
    if (!profileComposeClient.context.isAuthenticated) {
      throw new Error("authorized with wallet first");
    }

    const profile = await queryPersonalProfile(profileComposeClient);
    if (profile.errors) {
      throw profile.errors;
    }
    return (profile?.data?.viewer as any)?.newGenericProfile;
  }, []);

  const updatePersonalProfile = useCallback(async (name: string) => {
    if (!profileComposeClient.context.isAuthenticated) {
      throw new Error("authorized with wallet first");
    }
    const update = await mutationPersonalProfile(profileComposeClient, {
      name,
    });
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
    async (chain?: AuthChain) => {
      await us3rAuth.connect(chain);
      us3rAuth.authComposeClients([profileComposeClient]);
      const profile = await getPersonalProfile();
      setSessId(us3rAuth.session?.id || "");
      setProfile(profile);
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
    }
  }, [getPersonalProfile]);

  const updateProfile = useCallback(
    async (name: string) => {
      await updatePersonalProfile(name);
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
        getProfileWithDid,

        updateProfile,
        connectUs3r,
        sessId,
        profile,
      }}
    >
      {children}
    </CeramicContext.Provider>
  );
};

export const useUs3rProfileContext = () => useContext(CeramicContext);
