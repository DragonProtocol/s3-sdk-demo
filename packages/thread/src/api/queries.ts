import { ComposeClient } from "@composedb/client";
import { Thread } from "./types";

export async function queryThreadList(
  relationComposeClient: ComposeClient,
  {
    first = 10,
    after = "",
  }: {
    first: number;
    after?: string;
  }
) {
  const res = await relationComposeClient.executeQuery(`
      query {
        threadIndex(first: ${first}, after: "${after}") {
          edges {
            node {
              id
              url
              date
              type
              creator {
                id
              }
              votesCount
              commentsCount
              favorsCount
              scoresCount
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
        }
      }
    `);
  if (res.errors) {
    throw res.errors;
  }
  return (res.data as any).threadIndex;
}

export async function queryThreadListDesc(
  relationComposeClient: ComposeClient,
  {
    last = 10,
    before = "",
  }: {
    last: number;
    before?: string;
  }
) {
  const res = await relationComposeClient.executeQuery(`
      query {
        threadIndex(last: ${last}, before: "${before}") {
          edges {
            node {
              id
              url
              date
              type
              creator {
                id
              }
              votesCount
              commentsCount
              favorsCount
              scoresCount
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
        }
      }
    `);
  if (res.errors) {
    throw res.errors;
  }
  return (res.data as any).threadIndex;
}

export async function queryThreadInfo(
  relationComposeClient: ComposeClient,
  streamId: string
): Promise<Thread> {
  const res = await relationComposeClient.executeQuery(`
      query {
        node(id: "${streamId}") {
          id
          ...on Thread {
            id
            url
            date
            votesCount
            votes (first: 1000) {
              edges {
                node {
                  id
                  type
                  revoke
                  creator {
                    id
                  }
                }
              }
            }
            commentsCount
            comments (first: 1000) {
              edges {
                node {
                  id
                  text
                  revoke
                  creator {
                    id
                  }
                }
              }
            }
            favorsCount
            favors (first: 1000) {
              edges {
                node {
                  id
                  revoke
                  creator {
                    id
                  }
                }
              }
            }
            scoresCount
            scores (first: 1000) {
              edges {
                node {
                  id
                  text
                  value
                  revoke
                  creator {
                    id
                  }
                }
              }
            }
            creator {
              id
            }
          }
        }
      }
    `);
  if (res.errors) {
    throw res.errors;
  }
  return (res.data as any).node;
}
