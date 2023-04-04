import styled, { StyledComponentPropsWithRef } from "styled-components";
import { Text } from "rebass/styled-components";
import { Profile, useUs3rProfileContext } from "@us3r-network/profile";
import { useEffect, useMemo, useState } from "react";
import { shortPubKey } from "../../utils";

type Props = StyledComponentPropsWithRef<"div"> & {
  did: string;
  name?: string;
};
export default function Username({ did, name, ...otherProps }: Props) {
  const { getProfileWithDid } = useUs3rProfileContext()!;
  const [didProfile, setDidProfile] = useState<Profile>();
  useEffect(() => {
    if (name) return;
    getProfileWithDid(did)
      .then((data) => {
        setDidProfile(data.profile);
      })
      .catch(console.error);
  }, [did, getProfileWithDid]);

  const pubkey = useMemo(() => {
    const key = did.split(":").pop();
    if (key) {
      return shortPubKey(key);
    }
    return "did:pkh:0";
  }, []);

  return (
    <NicknameText {...otherProps}>
      {name || didProfile?.name || pubkey}
    </NicknameText>
  );
}

const NicknameText = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
`;
