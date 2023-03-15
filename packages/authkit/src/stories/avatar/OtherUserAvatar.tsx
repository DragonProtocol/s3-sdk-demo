import React from "react";
import { UserAvatar } from "@us3r-network/authkit";
import App from "../app/App";

const Avatar: React.VFC = () => {
  const UserList = [
    {
      did: "did:key:001",
    },
    {
      did: "did:key:002",
    },
    {
      did: "did:key:003",
    },
  ];
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {UserList.map((user) => (
        <UserAvatar key={user.did} did={user.did} title={user.did} />
      ))}
    </div>
  );
};

const Page: React.VFC = () => {
  return (
    <App>
      <Avatar />
    </App>
  );
};

export default Page;
