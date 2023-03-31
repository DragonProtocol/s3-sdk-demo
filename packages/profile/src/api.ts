import { ComposeClient } from "@composedb/client";
import { Wallet, WalletChainType } from ".";

export async function queryPersonalProfile(
  profileComposeClient: ComposeClient
) {
  const profile = await profileComposeClient.executeQuery(`
    query {
      viewer {
        profile {
          id
          bio
          name
          tags
          avatar
          wallets {
            chain
            address
            primary
          }
        }
      }
    }
  `);
  return profile;
}

export async function mutationUpdatePersonalProfile(
  profileComposeClient: ComposeClient,
  {
    name,
    avatar,
    wallets,
    bio,
    tags,
  }: {
    name: string;
    avatar: string;
    wallets?: Wallet[];
    bio?: string;
    tags?: string[];
  }
) {
  const query = `
  mutation($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      document {
        id
        name
      }
    }
  }
  `;
  const update = await profileComposeClient.executeQuery(query, {
    input: {
      content: {
        name,
        avatar,
        wallets,
        bio,
        tags,
      },
    },
  });
  return update;
}

export async function mutationPersonalProfile(
  profileComposeClient: ComposeClient,
  {
    name,
    avatar,
    wallets,
    bio,
    tags,
  }: {
    name: string;
    avatar: string;
    wallets: Wallet[];
    bio: string;
    tags: string[];
  }
) {
  const query = `
  mutation($input: CreateProfileInput!) {
    createProfile(input: $input) {
      document {
          id
          name
      }
    }
  }
  `;
  const update = await profileComposeClient.executeQuery(query, {
    input: {
      content: {
        name,
        avatar,
        wallets,
        bio,
        tags,
      },
    },
  });
  return update;
}

export async function queryProfileWithDid(
  profileComposeClient: ComposeClient,
  did: string
) {
  const query = `
    query ($id: ID!) {
      node(id: $id) {
        ...on CeramicAccount {
          id
          profile {
            id
            bio
            name
            tags
            avatar
            wallets {
              chain
              address
              primary
            }
          }
        }
      }
    }
  `;
  const res = await profileComposeClient.executeQuery(query, {
    id: did,
  });

  return res;
}
