import React from "react";
import { Username } from "@us3r-network/authkit";
import App from "../app/App";
import { useUs3rProfileContext } from "@us3r-network/profile";

const Avatar = () => {
  const { sessId } = useUs3rProfileContext()!;
  return <Username did={sessId} />;
};

const Page: React.VFC = () => {
  return (
    <App>
      <Avatar />
    </App>
  );
};

export default Page;
