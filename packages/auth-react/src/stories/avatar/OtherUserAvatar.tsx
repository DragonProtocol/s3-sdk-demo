import React from "react";
import { AuthToolType } from "../../authorizers";
import UserAvatar from "../../components/avatar/UserAvatar";
import Us3rAuthProvider from "../../components/provider/Us3rAuthProvider";

const Avatar: React.VFC = () => {
  const UserList = [
    {
      did: "did:pkh:001",
    },
    {
      did: "did:pkh:002",
    },
    {
      did: "did:pkh:003",
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
const authToolTypes = [
  AuthToolType.metamask_wallet,
  AuthToolType.phantom_wallet,
];
const AppWrapper: React.VFC = () => {
  return (
    <Us3rAuthProvider authConfig={{ authToolTypes }}>
      <Avatar />
    </Us3rAuthProvider>
  );
};
export default AppWrapper;
