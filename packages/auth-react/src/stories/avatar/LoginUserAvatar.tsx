import React from "react";
import { useUs3rAuth, UserAvatar } from "@us3r-network/auth-react";
import App from "../app/App";

const Avatar = () => {
  const { session } = useUs3rAuth();
  return <UserAvatar did={session?.id} title={session?.id} />;
};

const Page: React.VFC = () => {
  return (
    <App>
      <Avatar />
    </App>
  );
};

export default Page;
