import { ComposeClient } from "@composedb/client";

export async function queryPersonalProfile(
  profileComposeClient: ComposeClient
) {
  const profile = await profileComposeClient.executeQuery(`
        query {
          viewer {
            newGenericProfile {
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
  return profile;
}

export async function mutationUpdatePersonalProfile(
  profileComposeClient: ComposeClient,
  { name }: { name: string }
) {
  const query = `
  mutation($input: UpdateNewGenericProfileInput!) {
      updateNewGenericProfile(input: $input) {
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
      },
    },
  });
  return update;
}

export async function mutationPersonalProfile(
  profileComposeClient: ComposeClient,
  { name }: { name: string }
) {
  const query = `
  mutation($input: CreateNewGenericProfileInput!) {
    createNewGenericProfile(input: $input) {
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
                newGenericProfile {
                  id
                  name
                  image {
                      original {
                          src
                      }
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
