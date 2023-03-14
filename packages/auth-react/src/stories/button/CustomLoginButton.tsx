import React from "react";
import {
  useUs3rAuth,
  useUs3rAuthModal,
  UserAvatar,
} from "@us3r-network/auth-react";
import App from "../app/App";
import { useUs3rProfileContext } from "@us3r-network/profile";

const CustomLoginButton: React.VFC = () => {
  const { sessId } = useUs3rProfileContext()!;
  const { logout } = useUs3rAuth();
  const { openLoginModal } = useUs3rAuthModal();

  return (
    <button
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
      }}
      onClick={() => {
        if (sessId) {
          logout();
        } else {
          openLoginModal();
        }
      }}
    >
      {!!sessId && <UserAvatar did={sessId} />}
      {!!sessId && <span>{sessId}</span>}

      <span style={{ color: "blue" }}>
        {sessId ? "click to logout" : "click to login"}
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
