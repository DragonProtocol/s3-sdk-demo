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
  {
    text,
    threadId,
    revoke = false,
  }: { text: string; threadId: string; revoke?: boolean }
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
        revoke,
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
    revoke = false,
  }: { text: string; threadId: string; commentId: string; revoke?: boolean }
): Promise<CreateResult> {
  const updateMutation = `
      mutation UpdateComment($input: UpdateCommentInput!) {
        updateComment(input: $input) {
          document {
            id
          }
        }
      }
    `;
  const res = await relationComposeClient.executeQuery(updateMutation, {
    input: {
      id: commentId,
      content: {
        threadID: threadId,
        text: text,
        revoke,
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
  { threadId, revoke = false }: { threadId: string; revoke?: boolean }
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
        revoke,
      },
    },
  });
  if (res.errors) {
    throw res.errors;
  }

  return (res.data as any).createFavor;
}

export async function mutationUpdateFavor(
  relationComposeClient: ComposeClient,
  {
    favorId,
    threadId,
    revoke = false,
  }: { favorId: string; threadId: string; revoke?: boolean }
): Promise<CreateResult> {
  const updateMutation = `
      mutation UpdateFavor($input: UpdateFavorInput!) {
        updateFavor(input: $input) {
          document {
            id
          }
        }
      }
    `;
  const res = await relationComposeClient.executeQuery(updateMutation, {
    input: {
      id: favorId,
      content: {
        threadID: threadId,
        revoke,
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
  {
    text,
    value,
    threadId,
    revoke = false,
  }: { text: string; value: number; threadId: string; revoke?: boolean }
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
        revoke,
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
    revoke = false,
  }: {
    text: string;
    value: number;
    threadId: string;
    scoreId: string;
    revoke?: boolean;
  }
): Promise<CreateResult> {
  const updateMutation = `
  mutation UpdateScore($input: UpdateScoreInput!) {
    updateScore(input: $input) {
      document {
        id
      }
    }
  }
`;
  const res = await relationComposeClient.executeQuery(updateMutation, {
    input: {
      id: scoreId,
      content: {
        threadID: threadId,
        text: text,
        value,
        revoke,
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
  {
    type,
    threadId,
    revoke = false,
  }: { type: VoteType; threadId: string; revoke?: boolean }
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
        revoke,
      },
    },
  });
  if (res.errors) {
    throw res.errors;
  }

  return (res.data as any).createVote;
}

export async function mutationUpdateVote(
  relationComposeClient: ComposeClient,
  {
    voteId,
    type,
    threadId,
    revoke = false,
  }: { voteId: string; type: VoteType; threadId: string; revoke?: boolean }
): Promise<CreateResult> {
  const updateMutation = `
  mutation UpdateVote($input: UpdateVoteInput!) {
    updateVote(input: $input) {
      document {
        id
      }
    }
  }
`;
  const res = await relationComposeClient.executeQuery(updateMutation, {
    input: {
      id: voteId,
      content: {
        threadID: threadId,
        type: type === VoteType.DOWN_VOTE ? "DOWN_VOTE" : "UP_VOTE",
        revoke,
      },
    },
  });
  if (res.errors) {
    throw res.errors;
  }

  return (res.data as any).createScore;
}
