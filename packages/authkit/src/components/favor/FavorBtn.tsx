import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Box } from "rebass/styled-components";
import { useUs3rProfileContext } from "@us3r-network/profile";
import { Page } from "@ceramicnetwork/common";
import { useUs3rAuthModal } from "../provider/AuthModalContext";
import { Favor, Thread, useUs3rThreadContext } from "@us3r-network/thread";
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

export default function FavorBtn({ threadId }: { threadId: string }) {
  const { sessId, us3rAuthValid } = useUs3rProfileContext()!;
  const { openLoginModal } = useUs3rAuthModal();
  const { getPersonalFavorList, createNewFavor, getThreadInfo } =
    useUs3rThreadContext()!;

  const [personalFavors, setPersonalFavors] = useState<Page<Favor>>();
  const [loading, setLoading] = useState(false);
  const [threadInfo, setThreadInfo] = useState<Thread>();
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

  const fetchPersonalFavors = useCallback(async () => {
    if (!us3rAuthValid) return;
    try {
      const data = await getPersonalFavorList({ first: 1000 });
      setPersonalFavors(data);
    } catch (error) {
      console.error(error);
    }
  }, [us3rAuthValid]);

  const submitNewFavor = useCallback(async () => {
    await createNewFavor({ threadId: threadId });
    await fetchThreadInfo(threadId);
  }, [createNewFavor, threadId, fetchThreadInfo]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    fetchPersonalFavors();
    threadId && fetchThreadInfo(threadId);
  }, [fetchPersonalFavors, threadId, mounted]);

  const hasFavored = useMemo(() => {
    if (!personalFavors) return false;
    const include = personalFavors.edges.filter(({ node }) => {
      return node.thread?.id === threadId;
    });
    return include.length > 0;
  }, [personalFavors, threadId]);

  return (
    <BtnBox
      onClick={async () => {
        if (hasFavored) {
          console.log({ hasFavored });
          return;
        }
        if (!sessId) {
          openLoginModal();
          return;
        }
        setLoading(true);
        await submitNewFavor();
        setLoading(false);
        fetchPersonalFavors();
      }}
    >
      {(loading && <Loading />) || (
        <>{(hasFavored && <FavorWhiteIcon />) || <FavorIcon />}</>
      )}
      <span>{threadInfo?.favorsCount || 0}</span>
    </BtnBox>
  );
}

function FavorIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#FFFFFF"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
    </svg>
  );
}

function FavorWhiteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#FFFFFF"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
