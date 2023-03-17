import {
  Thread,
  useUs3rThreadContext,
  Vote,
  VoteType,
} from "@us3r-network/thread";
import { useCallback, useEffect, useState } from "react";
import { Box } from "rebass/styled-components";

import styled from "styled-components";
import FavorBtn from "../favor/FavorBtn";
import VoteBtn from "../vote/VoteBtn";
import CommentCard from "./CommentCard";
import CommentSubmit from "./CommentSubmit";

const CommentListContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  background: #1b1e23;
  color: #fff;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: 20px;
  gap: 20px;
`;

const ListBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;

  hr {
    padding: 0;
    margin: 0;
    border: none;
    border-bottom: 1px solid #39424c;
  }
`;

const CountBox = styled(Box)`
  display: flex;
  gap: 20px;
`;

const CountItem = styled(Box)`
  width: 194px;
  height: 32px;
  background: #1a1e23;
  border: 1px solid #39424c;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export default function CommentList({ threadId }: { threadId: string }) {
  const [threadInfo, setThreadInfo] = useState<Thread>();
  const { getThreadInfo, createNewComment, createNewFavor, createNewVote } =
    useUs3rThreadContext()!;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!threadId) return;
    if (!mounted) return;
    getThreadInfo(threadId)
      .then((data) => {
        setThreadInfo(data);
      })
      .catch(console.error);
  }, [getThreadInfo, threadId, mounted]);

  const submitNewComment = useCallback(
    async (commentText: string) => {
      await createNewComment({ text: commentText, threadId: threadId });
      await getThreadInfo(threadId);
    },
    [createNewComment, threadId, getThreadInfo]
  );

  const submitNewFavor = useCallback(async () => {
    await createNewFavor({ threadId: threadId });
    await getThreadInfo(threadId);
  }, [createNewFavor, threadId, getThreadInfo]);

  const submitNewVote = useCallback(async () => {
    await createNewVote({ threadId: threadId, type: VoteType.UP_VOTE });
    await getThreadInfo(threadId);
  }, [createNewVote, threadId, getThreadInfo]);

  return (
    <CommentListContainer>
      <CountBox>
        <VoteBtn
          voteCount={threadInfo?.votesCount || 0}
          threadId={threadId}
          voteAction={submitNewVote}
        />
        <CountItem>
          <CommentIcon />
          <span> {threadInfo?.commentsCount}</span>
        </CountItem>
        <FavorBtn
          favorCount={threadInfo?.favorsCount || 0}
          threadId={threadId}
          favorAction={submitNewFavor}
        />
      </CountBox>

      <CommentSubmit
        submitAction={(text) => {
          submitNewComment(text);
        }}
      />
      <ListBox>
        {threadInfo?.comments.edges.map((item) => {
          return (
            <Box key={item.node.id}>
              <CommentCard did={item.node.creator.id} text={item.node.text} />
              <hr />
            </Box>
          );
        })}
      </ListBox>
    </CommentListContainer>
  );
}

function CommentIcon() {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.75 8.75H6.75833M10.5 8.75H10.5083M14.25 8.75H14.2583M8.75 16L9.96667 17.6222C10.1476 17.8635 10.2381 17.9841 10.349 18.0272C10.4461 18.065 10.5539 18.065 10.651 18.0272C10.7619 17.9841 10.8524 17.8635 11.0333 17.6222L12.25 16C12.4943 15.6743 12.6164 15.5114 12.7654 15.3871C12.9641 15.2213 13.1986 15.104 13.4504 15.0446C13.6393 15 13.8429 15 14.25 15C15.4149 15 15.9973 15 16.4567 14.8097C17.0693 14.556 17.556 14.0693 17.8097 13.4567C18 12.9973 18 12.4149 18 11.25V6.5C18 5.09987 18 4.3998 17.7275 3.86502C17.4878 3.39462 17.1054 3.01217 16.635 2.77248C16.1002 2.5 15.4001 2.5 14 2.5H7C5.59987 2.5 4.8998 2.5 4.36502 2.77248C3.89462 3.01217 3.51217 3.39462 3.27248 3.86502C3 4.3998 3 5.09987 3 6.5V11.25C3 12.4149 3 12.9973 3.1903 13.4567C3.44404 14.0693 3.93072 14.556 4.54329 14.8097C5.00272 15 5.58515 15 6.75 15C7.15715 15 7.36072 15 7.54959 15.0446C7.80141 15.104 8.03593 15.2213 8.23458 15.3871C8.38357 15.5114 8.50571 15.6743 8.75 16ZM7.16667 8.75C7.16667 8.98012 6.98012 9.16667 6.75 9.16667C6.51988 9.16667 6.33333 8.98012 6.33333 8.75C6.33333 8.51988 6.51988 8.33333 6.75 8.33333C6.98012 8.33333 7.16667 8.51988 7.16667 8.75ZM10.9167 8.75C10.9167 8.98012 10.7301 9.16667 10.5 9.16667C10.2699 9.16667 10.0833 8.98012 10.0833 8.75C10.0833 8.51988 10.2699 8.33333 10.5 8.33333C10.7301 8.33333 10.9167 8.51988 10.9167 8.75ZM14.6667 8.75C14.6667 8.98012 14.4801 9.16667 14.25 9.16667C14.0199 9.16667 13.8333 8.98012 13.8333 8.75C13.8333 8.51988 14.0199 8.33333 14.25 8.33333C14.4801 8.33333 14.6667 8.51988 14.6667 8.75Z"
        stroke="#718096"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
