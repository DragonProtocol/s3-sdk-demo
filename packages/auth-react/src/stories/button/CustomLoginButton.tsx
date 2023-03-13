import React from "react";
import { AuthToolType } from "../../authorizers";
import UserAvatar from "../../components/avatar/UserAvatar";
import { useUs3rAuthModal } from "../../components/provider/AuthModalContext";
import Us3rAuthProvider, {
  useUs3rAuth,
} from "../../components/provider/Us3rAuthProvider";

const CustomLoginButton: React.VFC = () => {
  const { session, logout } = useUs3rAuth();
  const { openLoginModal } = useUs3rAuthModal();

  return (
    <button
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
      }}
      onClick={() => {
        if (session) {
          logout();
        } else {
          openLoginModal();
        }
      }}
    >
      {!!session && <UserAvatar did={session.did.id} />}
      {!!session && <span>{session.id}</span>}

      <span style={{ color: "blue" }}>
        {session ? "click to logout" : "click to login"}
      </span>
    </button>
  );
};

const authToolTypes = [
  AuthToolType.metamask_wallet,
  AuthToolType.phantom_wallet,
];
const AppWrapper: React.VFC = () => {
  return (
    <Us3rAuthProvider authConfig={{ authToolTypes }}>
      <CustomLoginButton />
    </Us3rAuthProvider>
  );
};

export default AppWrapper;
