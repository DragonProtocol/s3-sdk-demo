import React, { useCallback } from "react";
import { createContext, useContext } from "react";
import { ComposeClient } from "@composedb/client";
import { RuntimeCompositeDefinition } from "@composedb/types";

import { definition as threadDefinition } from "./definition/thread-definition";
import { definition as relationsDefinition } from "./definition/relations-definition";

import { Page } from "@ceramicnetwork/common";
import {
  queryThreadList,
  mutationNewThread,
  CreateResult,
  queryPersonalThreadList,
  queryThreadInfo,
  mutationNewComment,
} from "./api";
import { Thread, VoteType } from "./api/types";
import {
  mutationNewFavor,
  mutationNewScore,
  mutationNewVote,
} from "./api/mutations";
import { queryThreadListDesc } from "./api/queries";

export { Thread, VoteType } from "./api/types";

const ThreadCeramicContext = createContext<{
  threadComposeClient: ComposeClient;
  relationsComposeClient: ComposeClient;
  getThreadList: ({ first = 10, after = "" }) => Promise<Page<Thread>>;
  getThreadListDesc: ({ last = 10, before = "" }) => Promise<Page<Thread>>;
  getThreadInfo: (streamId: string) => Promise<Thread>;
  getPersonalThreadList: ({ first = 10, after = "" }) => Promise<Page<Thread>>;

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

  createNewVote: ({
    type,
    threadId,
  }: {
    type: VoteType;
    threadId: string;
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

  createNewFavor: ({ threadId }: { threadId: string }) => Promise<CreateResult>;
} | null>(null);

export const Us3rThreadProvider = ({
  ceramicHost,
  children,
}: React.PropsWithChildren & {
  ceramicHost: string;
}) => {
  const threadComposeClient = new ComposeClient({
    ceramic: ceramicHost,
    definition: threadDefinition as RuntimeCompositeDefinition,
  });
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

  const createNewFavor = useCallback(
    async ({ threadId }: { threadId: string }) => {
      return await mutationNewFavor(relationsComposeClient, { threadId });
    },
    [relationsComposeClient]
  );

  const createNewVote = useCallback(
    async ({ threadId, type }: { threadId: string; type: VoteType }) => {
      return await mutationNewVote(relationsComposeClient, { threadId, type });
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

  return (
    <ThreadCeramicContext.Provider
      value={{
        threadComposeClient,
        relationsComposeClient,
        getThreadList,
        getThreadListDesc,
        getThreadInfo,
        getPersonalThreadList,
        createNewThread,
        createNewComment,
        createNewFavor,
        createNewVote,
        createNewScore,
      }}
    >
      {children}
    </ThreadCeramicContext.Provider>
  );
};

export const useUs3rThreadContext = () => useContext(ThreadCeramicContext);
