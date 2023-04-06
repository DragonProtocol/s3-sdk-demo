import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Box } from "rebass/styled-components";
import { useUs3rProfileContext } from "@us3r-network/profile";
import { useUs3rAuthModal } from "../provider/AuthModalContext";
import { Thread, useUs3rThreadContext, VoteType } from "@us3r-network/thread";
import Loading from "../loading";

const BtnBox = styled(Box)`
  width: 194px;
  height: 32px;
  background: #1a1e23;
  border: 1px solid #39424c;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
`;

export default function VoteBtn({ threadId }: { threadId: string }) {
  const { sessId } = useUs3rProfileContext()!;
  const { openLoginModal } = useUs3rAuthModal();
  const { getThreadInfo, createNewVote, updateVote } = useUs3rThreadContext()!;
  const [threadInfo, setThreadInfo] = useState<Thread>();

  // const [personalVotes, setPersonalVotes] = useState<Page<Vote>>();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const submitNewVote = useCallback(async () => {
    await createNewVote({ threadId: threadId, type: VoteType.UP_VOTE });
    await fetchThreadInfo(threadId);
  }, [createNewVote, threadId, fetchThreadInfo]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    threadId && fetchThreadInfo(threadId);
  }, [threadId, mounted]);

  const userVote = useMemo(() => {
    const userVote = threadInfo?.votes.edges.find(
      (item) => item.node.creator.id === sessId
    );
    return userVote;
  }, [threadInfo, threadId, sessId]);

  const hasVoted = useMemo(() => {
    return userVote && !userVote.node.revoke;
  }, [userVote]);

  return (
    <BtnBox
      className="us3r-content-vote"
      onClick={async () => {
        if (userVote) {
          await updateVote({
            voteId: userVote.node.id,
            threadId: threadId,
            type: VoteType.DOWN_VOTE,
            revoke: !userVote.node.revoke,
          });
          threadId && fetchThreadInfo(threadId);
          return;
        }
        if (!sessId) {
          openLoginModal();
          return;
        }
        setLoading(true);
        await submitNewVote();
        setLoading(false);
        threadId && fetchThreadInfo(threadId);
      }}
    >
      {(loading && <Loading />) || (
        <>{(hasVoted && <ThumbUpBlackIcon />) || <ThumbUpIcon />}</>
      )}

      <span>{threadInfo?.votesCount || 0}</span>
    </BtnBox>
  );
}

function ThumbUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#FFFFFF"
    >
      <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
      <path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z" />
    </svg>
  );
}

function ThumbUpBlackIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#FFFFFF"
    >
      <path d="M18 21H8V8l7-7 1.25 1.25q.175.175.288.475.112.3.112.575v.35L15.55 8H21q.8 0 1.4.6.6.6.6 1.4v2q0 .175-.038.375-.037.2-.112.375l-3 7.05q-.225.5-.75.85T18 21ZM6 8v13H2V8Z" />
    </svg>
  );
}

function ThumbUp() {
  return <span>👏</span>;
}
