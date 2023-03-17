import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Box } from "rebass/styled-components";
import { useUs3rProfileContext } from "@us3r-network/profile";
import { Page } from "@ceramicnetwork/common";
import { useUs3rAuthModal } from "../provider/AuthModalContext";
import { Favor, useUs3rThreadContext } from "@us3r-network/thread";

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
  favorAction,
  favorCount,
}: {
  threadId: string;
  favorCount: number;
  favorAction: () => Promise<void>;
}) {
  const { sessId } = useUs3rProfileContext()!;
  const { openLoginModal } = useUs3rAuthModal();
  const { getPersonalFavorList } = useUs3rThreadContext()!;

  const [personalFavors, setPersonalFavors] = useState<Page<Favor>>();

  const fetchPersonalFavors = useCallback(async () => {
    try {
      const data = await getPersonalFavorList({ first: 1000 });
      setPersonalFavors(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchPersonalFavors();
  }, []);

  const hasFavored = useMemo(() => {
    if (!personalFavors) return false;
    const include = personalFavors.edges.filter(({ node }) => {
      node.thread?.id === threadId;
    });
    return !!include;
  }, [personalFavors, threadId]);

  return (
    <BtnBox
      onClick={async () => {
        if (hasFavored) return;
        if (!sessId) {
          openLoginModal();
          return;
        }
        await favorAction();
        fetchPersonalFavors();
      }}
    >
      <FavorIcon />
      <span>{favorCount}</span>
    </BtnBox>
  );
}

function FavorIcon() {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.4944 4.27985C8.82825 2.332 6.04987 1.80804 3.96233 3.59168C1.87478 5.37532 1.58089 8.35748 3.22025 10.467C4.58326 12.2209 8.70823 15.9201 10.0602 17.1174C10.2114 17.2513 10.287 17.3183 10.3753 17.3446C10.4523 17.3676 10.5365 17.3676 10.6135 17.3446C10.7017 17.3183 10.7773 17.2513 10.9286 17.1174C12.2805 15.9201 16.4055 12.2209 17.7685 10.467C19.4079 8.35748 19.1498 5.35656 17.0264 3.59168C14.903 1.8268 12.1605 2.332 10.4944 4.27985Z"
        stroke="#718096"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
