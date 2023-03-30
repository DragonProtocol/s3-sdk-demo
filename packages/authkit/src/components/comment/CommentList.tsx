import { Thread, useUs3rThreadContext, VoteType } from "@us3r-network/thread";
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
  const { getThreadInfo, createNewComment } = useUs3rThreadContext()!;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchThreadInfo = useCallback(
    async (threadId: string) => {
      try {
        const data = await getThreadInfo(threadId);
        setThreadInfo(data);
      } catch (error) {
        console.error(error);
      }
    },
    [getThreadInfo]
  );

  useEffect(() => {
    if (!threadId) return;
    if (!mounted) return;
    fetchThreadInfo(threadId);
  }, [getThreadInfo, threadId, mounted]);

  const submitNewComment = useCallback(
    async (commentText: string) => {
      await createNewComment({ text: commentText, threadId: threadId });
      await fetchThreadInfo(threadId);
    },
    [createNewComment, threadId, fetchThreadInfo]
  );

  return (
    <CommentListContainer>
      <CountBox>
        <VoteBtn threadId={threadId} />
        <CountItem>
          <CommentIcon />
          <span> {threadInfo?.commentsCount}</span>
        </CountItem>
        <FavorBtn threadId={threadId} />
      </CountBox>

      <CommentSubmit
        submitAction={async (text) => {
          await submitNewComment(text);
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
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#FFFFFF"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM20 4v13.17L18.83 16H4V4h16zM6 12h12v2H6zm0-3h12v2H6zm0-3h12v2H6z" />
    </svg>
  );
}
