import React, { useCallback } from "react";
import { createContext, useContext } from "react";
import { ComposeClient } from "@composedb/client";
import { RuntimeCompositeDefinition } from "@composedb/types";

import { definition as relationsDefinition } from "./definition/thread-runtime-composite";

import { Page } from "@ceramicnetwork/common";
import {
  queryThreadList,
  mutationNewThread,
  CreateResult,
  queryPersonalThreadList,
  queryThreadInfo,
  mutationNewComment,
} from "./api";
import { Favor, Comment, Score, Thread, Vote, VoteType } from "./api/types";
import {
  mutationNewFavor,
  mutationNewScore,
  mutationNewVote,
  mutationUpdateComment,
  mutationUpdateFavor,
  mutationUpdateScore,
  mutationUpdateVote,
} from "./api/mutations";
import { queryThreadListDesc } from "./api/queries";
import {
  queryPersonalCommentList,
  queryPersonalFavorList,
  queryPersonalScoreList,
  queryPersonalVoteList,
} from "./api/personals";

export { Thread, Comment, Score, Vote, Favor, VoteType } from "./api/types";

const ThreadCeramicContext =
  createContext<{
    relationsComposeClient: ComposeClient;
    getThreadList: ({ first = 10, after = "" }) => Promise<Page<Thread>>;
    getThreadListDesc: ({ last = 10, before = "" }) => Promise<Page<Thread>>;
    getThreadInfo: (streamId: string) => Promise<Thread>;
    getPersonalThreadList: ({
      first = 10,
      after = "",
    }) => Promise<Page<Thread>>;
    getPersonalCommentList: ({
      first = 10,
      after = "",
    }) => Promise<Page<Comment>>;
    getPersonalFavorList: ({ first = 10, after = "" }) => Promise<Page<Favor>>;
    getPersonalScoreList: ({ first = 10, after = "" }) => Promise<Page<Score>>;
    getPersonalVoteList: ({ first = 10, after = "" }) => Promise<Page<Vote>>;

    createNewThread: ({
      url,
      type = "",
    }: {
      url: string;
      type?: string;
    }) => Promise<CreateResult>;

    createNewComment: ({
      text,
      threadId,
    }: {
      text: string;
      threadId: string;
    }) => Promise<CreateResult>;

    updateComment: ({
      text,
      threadId,
      commentId,
      revoke = false,
    }: {
      commentId: string;
      text: string;
      threadId: string;
      revoke?: boolean;
    }) => Promise<CreateResult>;

    createNewVote: ({
      type,
      threadId,
    }: {
      type: VoteType;
      threadId: string;
    }) => Promise<CreateResult>;

    updateVote: (data: {
      voteId: string;
      type: VoteType;
      threadId: string;
      revoke?: boolean;
    }) => Promise<CreateResult>;

    createNewScore: ({
      value,
      text,
      threadId,
    }: {
      value: number;
      text: string;
      threadId: string;
    }) => Promise<CreateResult>;

    updateScore: ({
      value,
      text,
      threadId,
      scoreId,
      revoke = false,
    }: {
      scoreId: string;
      value: number;
      text: string;
      threadId: string;
      revoke?: boolean;
    }) => Promise<CreateResult>;

    createNewFavor: ({
      threadId,
    }: {
      threadId: string;
    }) => Promise<CreateResult>;

    updateFavor: ({
      favorId,
      threadId,
      revoke = false,
    }: {
      favorId: string;
      threadId: string;
      revoke?: boolean;
    }) => Promise<CreateResult>;
  } | null>(null);

export const Us3rThreadProvider = ({
  ceramicHost,
  children,
}: React.PropsWithChildren & {
  ceramicHost: string;
}) => {
  const relationsComposeClient = new ComposeClient({
    ceramic: ceramicHost,
    definition: relationsDefinition as RuntimeCompositeDefinition,
  });

  const getThreadList = useCallback(
    async ({ first = 10, after = "" }) => {
      const data = await queryThreadList(relationsComposeClient, {
        first,
        after,
      });
      return data;
    },
    [relationsComposeClient]
  );

  const getThreadListDesc = useCallback(
    async ({ last = 10, before = "" }) => {
      const data = await queryThreadListDesc(relationsComposeClient, {
        last,
        before,
      });
      return data;
    },
    [relationsComposeClient]
  );

  const getPersonalThreadList = useCallback(
    async ({ first = 10, after = "" }) => {
      const data = await queryPersonalThreadList(relationsComposeClient, {
        first,
        after,
      });
      return data;
    },
    [relationsComposeClient]
  );

  const getPersonalCommentList = useCallback(
    async ({ first = 10, after = "" }) => {
      const data = await queryPersonalCommentList(relationsComposeClient, {
        first,
        after,
      });
      return data;
    },
    [relationsComposeClient]
  );

  const getPersonalFavorList = useCallback(
    async ({ first = 10, after = "" }) => {
      const data = await queryPersonalFavorList(relationsComposeClient, {
        first,
        after,
      });
      return data;
    },
    [relationsComposeClient]
  );

  const getPersonalScoreList = useCallback(
    async ({ first = 10, after = "" }) => {
      const data = await queryPersonalScoreList(relationsComposeClient, {
        first,
        after,
      });
      return data;
    },
    [relationsComposeClient]
  );

  const getPersonalVoteList = useCallback(
    async ({ first = 10, after = "" }) => {
      const data = await queryPersonalVoteList(relationsComposeClient, {
        first,
        after,
      });
      return data;
    },
    [relationsComposeClient]
  );

  const createNewThread = useCallback(
    async ({ url, type = "" }: { url: string; type?: string }) => {
      return await mutationNewThread(relationsComposeClient, {
        url,
        type,
      });
    },
    [relationsComposeClient]
  );

  const getThreadInfo = useCallback(
    async (streamId: string) => {
      return await queryThreadInfo(relationsComposeClient, streamId);
    },
    [relationsComposeClient]
  );

  const createNewComment = useCallback(
    async ({ text, threadId }: { text: string; threadId: string }) => {
      return await mutationNewComment(relationsComposeClient, {
        text,
        threadId,
      });
    },
    [relationsComposeClient]
  );

  const updateComment = useCallback(
    async ({
      text,
      threadId,
      commentId,
      revoke,
    }: {
      text: string;
      threadId: string;
      commentId: string;
      revoke?: boolean;
    }) => {
      return await mutationUpdateComment(relationsComposeClient, {
        text,
        threadId,
        commentId,
        revoke,
      });
    },
    [relationsComposeClient]
  );

  const createNewFavor = useCallback(
    async ({ threadId }: { threadId: string }) => {
      return await mutationNewFavor(relationsComposeClient, { threadId });
    },
    [relationsComposeClient]
  );

  const updateFavor = useCallback(
    async ({
      favorId,
      threadId,
      revoke,
    }: {
      favorId: string;
      threadId: string;
      revoke?: boolean;
    }) => {
      return await mutationUpdateFavor(relationsComposeClient, {
        favorId,
        threadId,
        revoke,
      });
    },
    [relationsComposeClient]
  );

  const createNewVote = useCallback(
    async ({ threadId, type }: { threadId: string; type: VoteType }) => {
      return await mutationNewVote(relationsComposeClient, { threadId, type });
    },
    [relationsComposeClient]
  );

  const updateVote = useCallback(
    async ({
      voteId,
      threadId,
      type,
      revoke,
    }: {
      voteId: string;
      type: VoteType;
      threadId: string;
      revoke?: boolean;
    }) => {
      return await mutationUpdateVote(relationsComposeClient, {
        voteId,
        threadId,
        type,
        revoke,
      });
    },
    [relationsComposeClient]
  );

  const createNewScore = useCallback(
    async ({
      threadId,
      text,
      value,
    }: {
      threadId: string;
      text: string;
      value: number;
    }) => {
      return await mutationNewScore(relationsComposeClient, {
        threadId,
        text,
        value,
      });
    },
    [relationsComposeClient]
  );

  const updateScore = useCallback(
    async ({
      scoreId,
      threadId,
      text,
      value,
      revoke,
    }: {
      scoreId: string;
      threadId: string;
      text: string;
      value: number;
      revoke?: boolean;
    }) => {
      return await mutationUpdateScore(relationsComposeClient, {
        threadId,
        text,
        value,
        scoreId,
        revoke,
      });
    },
    [relationsComposeClient]
  );

  return (
    <ThreadCeramicContext.Provider
      value={{
        relationsComposeClient,
        getThreadList,
        getThreadListDesc,
        getThreadInfo,
        getPersonalThreadList,
        getPersonalCommentList,
        getPersonalFavorList,
        getPersonalScoreList,
        getPersonalVoteList,
        createNewThread,
        createNewComment,
        updateComment,
        createNewFavor,
        updateFavor,
        createNewVote,
        updateVote,
        createNewScore,
        updateScore,
      }}
    >
      {children}
    </ThreadCeramicContext.Provider>
  );
};

export const useUs3rThreadContext = () => useContext(ThreadCeramicContext);
