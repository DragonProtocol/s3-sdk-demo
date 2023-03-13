import React from "react";
import { StyledComponentPropsWithRef } from "styled-components";
import multiavatar from "@multiavatar/multiavatar";
import { Image } from "rebass/styled-components";

type UserAvatarProps = StyledComponentPropsWithRef<"img"> & {
  did?: string;
};
const getUserAvatarSrc = (did: string) =>
  `data:image/svg+xml;utf-8,${encodeURIComponent(multiavatar(did))}`;

export default function UserAvatar({ did, ...otherProps }: UserAvatarProps) {
  const defaultAvatarDid = did || "did:key:0";
  return (
    <Image
      variant={"avatar"}
      className="us3r-User__avatar"
      src={getUserAvatarSrc(defaultAvatarDid)}
      onError={(el: React.SyntheticEvent<HTMLImageElement, Event>) => {
        el.currentTarget.src = getUserAvatarSrc(defaultAvatarDid);
      }}
      {...otherProps}
    />
  );
}
