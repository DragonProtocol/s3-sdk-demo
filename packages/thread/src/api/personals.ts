import { ComposeClient } from "@composedb/client";

export async function queryPersonalThreadList(
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
        viewer {
          threadList(first: ${first}, after: "${after}") {
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
      }
    `);
  if (res.errors) {
    throw res.errors;
  }
  return (res.data?.viewer as any).threadList;
}

export async function queryPersonalFavorList(
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
        viewer {
          favorList(first: ${first}, after: "${after}") {
            edges {
              node {
                id
                revoke
                creator {
                  id
                }
                thread {
                  id
                  url
                  date
                  type
                  creator {
                    id
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              startCursor
              endCursor
            }
          }
        }
      }
    `);
  if (res.errors) {
    throw res.errors;
  }
  return (res.data?.viewer as any).favorList;
}

export async function queryPersonalScoreList(
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
        viewer {
          scoreList(first: ${first}, after: "${after}") {
            edges {
              node {
                id
                text
                value
                revoke
                thread {
                  id
                  url
                  date
                  type
                  creator {
                    id
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              startCursor
              endCursor
            }
          }
        }
      }
    `);
  if (res.errors) {
    throw res.errors;
  }
  return (res.data?.viewer as any).scoreList;
}

export async function queryPersonalCommentList(
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
        viewer {
          commentList(first: ${first}, after: "${after}") {
            edges {
              node {
                id
                text
                revoke
                thread {
                  id
                  url
                  date
                  type
                  creator {
                    id
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              startCursor
              endCursor
            }
          }
        }
      }
    `);
  if (res.errors) {
    throw res.errors;
  }
  return (res.data?.viewer as any).commentList;
}

export async function queryPersonalVoteList(
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
        viewer {
          voteList(first: ${first}, after: "${after}") {
            edges {
              node {
                id
                type
                revoke
                thread {
                  id
                  url
                  date
                  type
                  creator {
                    id
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              startCursor
              endCursor
            }
          }
        }
      }
    `);
  if (res.errors) {
    throw res.errors;
  }
  return (res.data?.viewer as any).voteList;
}
