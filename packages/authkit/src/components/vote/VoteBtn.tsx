import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Box, Button } from "rebass/styled-components";
import { useUs3rProfileContext } from "@us3r-network/profile";
import { Edge, Page } from "@ceramicnetwork/common";
import { useUs3rAuthModal } from "../provider/AuthModalContext";
import { useUs3rThreadContext, Vote } from "@us3r-network/thread";

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

export default function VoteBtn({
  threadId,
  voteAction,
  voteCount,
}: {
  threadId: string;
  voteCount: number;
  voteAction: () => Promise<void>;
}) {
  const { sessId } = useUs3rProfileContext()!;
  const { openLoginModal } = useUs3rAuthModal();
  const { getPersonalVoteList } = useUs3rThreadContext()!;

  const [personalVotes, setPersonalVotes] = useState<Page<Vote>>();

  const fetchPersonalVote = useCallback(async () => {
    try {
      const data = await getPersonalVoteList({ first: 1000 });
      setPersonalVotes(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchPersonalVote();
  }, []);

  const hasVoted = useMemo(() => {
    if (!personalVotes) return false;
    const include = personalVotes.edges.filter(({ node }) => {
      node.thread?.id === threadId;
    });
    return !!include;
  }, [personalVotes, threadId]);

  return (
    <BtnBox
      onClick={async () => {
        if (hasVoted) return;
        if (!sessId) {
          openLoginModal();
          return;
        }
        await voteAction();
        fetchPersonalVote();
      }}
    >
      <span>👏</span>
      <span>{voteCount}</span>
    </BtnBox>
  );
}
