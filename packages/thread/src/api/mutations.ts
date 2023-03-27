import { ComposeClient } from "@composedb/client";
import { VoteType } from "./types";

export type CreateResult = {
  document: {
    id: string;
  };
};

export async function mutationNewThread(
  relationComposeClient: ComposeClient,
  { url, type }: { url: string; type: string }
): Promise<CreateResult> {
  const createMutation = `
      mutation createThread($input: CreateThreadInput!) {
        createThread(input: $input) {
          document {
            id
          }
        }
      }
    `;
  const res = await relationComposeClient.executeQuery(createMutation, {
    input: {
      content: { url, type, date: new Date().toISOString() },
    },
  });
  if (res.errors) {
    throw res.errors;
  }
  return (res.data as any).createThread;
}

export async function mutationNewComment(
  relationComposeClient: ComposeClient,
  { text, threadId }: { text: string; threadId: string }
): Promise<CreateResult> {
  const createMutation = `
      mutation CreateComment($input: CreateCommentInput!) {
        createComment(input: $input) {
          document {
            id
          }
        }
      }
    `;
  const res = await relationComposeClient.executeQuery(createMutation, {
    input: {
      content: {
        threadID: threadId,
        text: text,
      },
    },
  });
  if (res.errors) {
    throw res.errors;
  }

  return (res.data as any).createComment;
}

export async function mutationUpdateComment(
  relationComposeClient: ComposeClient,
  {
    text,
    threadId,
    commentId,
  }: { text: string; threadId: string; commentId: string }
): Promise<CreateResult> {
  const createMutation = `
      mutation UpdateComment($input: UpdateCommentInput!) {
        updateComment(input: $input) {
          document {
            id
          }
        }
      }
    `;
  const res = await relationComposeClient.executeQuery(createMutation, {
    input: {
      id: commentId,
      content: {
        threadID: threadId,
        text: text,
      },
    },
  });
  if (res.errors) {
    throw res.errors;
  }

  return (res.data as any).createComment;
}

export async function mutationNewFavor(
  relationComposeClient: ComposeClient,
  { threadId }: { threadId: string }
): Promise<CreateResult> {
  const createMutation = `
      mutation CreateFavor($input: CreateFavorInput!) {
        createFavor(input: $input) {
          document {
            id
          }
        }
      }
    `;
  const res = await relationComposeClient.executeQuery(createMutation, {
    input: {
      content: {
        threadID: threadId,
      },
    },
  });
  if (res.errors) {
    throw res.errors;
  }

  return (res.data as any).createFavor;
}

export async function mutationNewScore(
  relationComposeClient: ComposeClient,
  { text, value, threadId }: { text: string; value: number; threadId: string }
): Promise<CreateResult> {
  const createMutation = `
      mutation CreateScore($input: CreateScoreInput!) {
        createScore(input: $input) {
          document {
            id
          }
        }
      }
    `;
  const res = await relationComposeClient.executeQuery(createMutation, {
    input: {
      content: {
        threadID: threadId,
        text: text,
        value,
      },
    },
  });
  if (res.errors) {
    throw res.errors;
  }

  return (res.data as any).createScore;
}

export async function mutationUpdateScore(
  relationComposeClient: ComposeClient,
  {
    text,
    value,
    threadId,
    scoreId,
  }: { text: string; value: number; threadId: string; scoreId: string }
): Promise<CreateResult> {
  const createMutation = `
  mutation UpdateScore($input: UpdateScoreInput!) {
    updateScore(input: $input) {
      document {
        id
      }
    }
  }
`;
  const res = await relationComposeClient.executeQuery(createMutation, {
    input: {
      id: scoreId,
      content: {
        threadID: threadId,
        text: text,
        value,
      },
    },
  });
  if (res.errors) {
    throw res.errors;
  }

  return (res.data as any).createScore;
}

export async function mutationNewVote(
  relationComposeClient: ComposeClient,
  { type, threadId }: { type: VoteType; threadId: string }
): Promise<CreateResult> {
  const createMutation = `
      mutation CreateVote($input: CreateVoteInput!) {
        createVote(input: $input) {
          document {
            id
          }
        }
      }
    `;
  const res = await relationComposeClient.executeQuery(createMutation, {
    input: {
      content: {
        threadID: threadId,
        type: type === VoteType.DOWN_VOTE ? "DOWN_VOTE" : "UP_VOTE",
      },
    },
  });
  if (res.errors) {
    throw res.errors;
  }

  return (res.data as any).createVote;
}
