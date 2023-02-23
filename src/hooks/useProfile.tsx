import { useCallback, useState } from "react";
import { useCeramicContext } from "../context";

export type IPFSUrl = string;
export type PositiveInteger = number;
export interface ImageSources {
  original: ImageMetadata;
  alternatives?: ImageMetadata[];
  [k: string]: unknown;
}
export interface ImageMetadata {
  src: IPFSUrl;
  mimeType: string;
  width: PositiveInteger;
  height: PositiveInteger;
  size?: PositiveInteger;
  [k: string]: unknown;
}
interface GenericProfile {
  name?: string;
  image?: ImageSources;
}

export const useProfile = () => {
  const { ceramic, profileComposeClient } = useCeramicContext();
  const [profile, setProfile] = useState<GenericProfile | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [didProfile, setDidProfile] = useState<{
    id: string; // did
    genericProfile: {
      name: string;
    };
  }>();

  const getProfile = useCallback(async () => {
    setLoading(true);
    // console.log("ceramic.did ", ceramic.did);
    if (ceramic.did !== undefined) {
      const profile = await profileComposeClient.executeQuery(`
          query {
            viewer {
              genericProfile {
                id
                name
                image {
                  original {
                    src
                    mimeType
                    width 
                  }
                }
              }
            }
          }
        `);

      if (profile.errors) {
        console.error(profile.errors);
        return;
      }

      //   console.log(profile);
      setProfile((profile?.data?.viewer as any)?.genericProfile);
      setLoading(false);
    }
  }, [ceramic.did, profileComposeClient]);

  const updateProfile = async (name: string) => {
    setLoading(true);
    if (ceramic.did !== undefined) {
      const query = `
        mutation($input: CreateGenericProfileInput!) {
            createGenericProfile(input: $input) {
                document {
                    id
                }
            }
        }
        `;
      const update = await profileComposeClient.executeQuery(query, {
        input: {
          content: {
            name,
          },
        },
      });

      if (update.errors) {
        console.error(update.errors);
        return;
      }
      console.log({ update });
      await getProfile();
      setLoading(false);
    }
  };

  const getProfileWithDid = useCallback(
    async (did: string) => {
      const createPostMutation = `
      query ($id: ID!) {
        node(id: $id) {
          ...on CeramicAccount {
            id
            genericProfile {
              id
              name
            }
          }
        }
      }
      `;
      const res = await profileComposeClient.executeQuery(createPostMutation, {
        id: "did:pkh:solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1:456degdQ55UAMDBRfTtxyxPXoT423XSs1LjS9EEAyS36",
      });

      if (res.errors) {
        console.error(res.errors);
        return;
      }

      setDidProfile(res?.data?.node as any);
    },
    [profileComposeClient]
  );

  return {
    profile,
    loading,
    getProfile,
    updateProfile,

    getProfileWithDid,
    didProfile,
  };
};
