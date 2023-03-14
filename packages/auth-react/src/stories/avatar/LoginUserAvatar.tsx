import React from "react";
import { UserAvatar } from "@us3r-network/auth-react";
import App from "../app/App";
import { useUs3rProfileContext } from "@us3r-network/profile";

const Avatar = () => {
  const { sessId } = useUs3rProfileContext()!;
  return <UserAvatar did={sessId} title={sessId} />;
};

const Page: React.VFC = () => {
  return (
    <App>
      <Avatar />
    </App>
  );
};

export default Page;
