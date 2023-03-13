import { ButtonHTMLAttributes } from "react";
import { Text } from "rebass/styled-components";
import { getUserDisplayName } from "../../utils";
import UserAvatar from "../avatar/UserAvatar";
import { useUs3rAuthModal } from "../provider/AuthModalContext";
import { useUs3rAuth } from "../provider/Us3rAuthProvider";
import { Button } from "rebass/styled-components";

export type LoginButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function LoginButton({ onClick, ...otherProps }: LoginButtonProps) {
  const { session } = useUs3rAuth();
  const { openLoginModal } = useUs3rAuthModal();
  const nameStr = getUserDisplayName(session);
  return (
    <Button
      variant="primary"
      sx={{
        height: "48px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
          return;
        }
        openLoginModal();
      }}
      className="us3r-LoginButton"
      {...otherProps}
    >
      {session ? (
        <>
          <UserAvatar
            did={session.did.id}
            className="us3r-LoginButton__avatar"
          />
          <Text className="us3r-LoginButton__text us3r-LoginButton__text--login">
            {nameStr}
          </Text>
        </>
      ) : (
        <Text className="us3r-LoginButton__text us3r-LoginButton__text--logout">
          Login
        </Text>
      )}
    </Button>
  );
}
export default LoginButton;
