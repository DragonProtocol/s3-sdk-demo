import React, { useEffect, useState } from "react";
import { StyledComponentPropsWithRef } from "styled-components";
import multiavatar from "@multiavatar/multiavatar";
import { Image } from "rebass/styled-components";
import { Profile, useUs3rProfileContext } from "@us3r-network/profile";

type UserAvatarProps = StyledComponentPropsWithRef<"img"> & {
  did: string;
};
const getUserAvatarSrc = (did: string) =>
  `data:image/svg+xml;utf-8,${encodeURIComponent(multiavatar(did))}`;

export default function UserAvatar({ did, ...otherProps }: UserAvatarProps) {
  const defaultAvatarUrl = getUserAvatarSrc(did || "did:pkh:0");
  const { getProfileWithDid } = useUs3rProfileContext()!;
  const [didProfile, setDidProfile] = useState<Profile>();
  useEffect(() => {
    getProfileWithDid(did)
      .then((data) => {
        setDidProfile(data.profile);
      })
      .catch(console.error);
  }, [did, getProfileWithDid]);
  const avatarSrc = didProfile?.avatar || defaultAvatarUrl;
  return (
    <Image
      variant={"avatar"}
      className="us3r-User__avatar"
      src={avatarSrc}
      onError={(el: React.SyntheticEvent<HTMLImageElement, Event>) => {
        el.currentTarget.src = defaultAvatarUrl;
      }}
      {...otherProps}
    />
  );
}
