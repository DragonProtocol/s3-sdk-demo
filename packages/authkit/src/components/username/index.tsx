import styled from "styled-components";
import { Text } from "rebass/styled-components";
import { useUs3rProfileContext } from "@us3r-network/profile";
import { useEffect, useMemo, useState } from "react";
import { shortPubKey } from "../../utils";

export default function Username({
  did,
  name,
}: {
  did: string;
  name?: string;
}) {
  const { getProfileWithDid } = useUs3rProfileContext()!;
  const [didProfile, setDidProfile] =
    useState<{
      newGenericProfile?: {
        name: string;
      };
    }>();
  useEffect(() => {
    if (name) return;
    getProfileWithDid(did)
      .then((data) => {
        setDidProfile(data);
      })
      .catch(console.error);
  }, [did, getProfileWithDid]);

  const pubkey = useMemo(() => {
    const key = did.split(":").pop();
    console.log({ key });
    if (key) {
      return shortPubKey(key);
    }
    return "did:pkh:0";
  }, []);

  return (
    <NicknameText>
      {name || didProfile?.newGenericProfile?.name || pubkey}
    </NicknameText>
  );
}

const NicknameText = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
`;
