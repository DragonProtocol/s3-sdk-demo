import React from "react";
import {
  useUs3rAuth,
  useUs3rAuthModal,
  UserAvatar,
} from "@us3r-network/auth-react";
import App from "../app/App";

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

const Page: React.VFC = () => {
  return (
    <App>
      <CustomLoginButton />
    </App>
  );
};

export default Page;
