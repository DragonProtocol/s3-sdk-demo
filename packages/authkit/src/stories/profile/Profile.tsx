import React from "react";
import { Profile } from "@us3r-network/authkit";
import App from "../app/App";
import { useUs3rProfileContext } from "@us3r-network/profile";

const ProfileWrap = () => {
  const { sessId } = useUs3rProfileContext()!;
  return <Profile did={sessId} />;
};

const Page: React.VFC = () => {
  return (
    <App>
      <ProfileWrap />
    </App>
  );
};

export default Page;
