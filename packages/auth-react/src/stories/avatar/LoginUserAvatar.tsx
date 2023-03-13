import React from "react";
import { AuthToolType } from "../../authorizers";
import UserAvatar from "../../components/avatar/UserAvatar";
import Us3rAuthProvider, {
  useUs3rAuth,
} from "../../components/provider/Us3rAuthProvider";

const Avatar: React.VFC = () => {
  const { session } = useUs3rAuth();
  return <UserAvatar did={session?.id} title={session?.id} />;
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
