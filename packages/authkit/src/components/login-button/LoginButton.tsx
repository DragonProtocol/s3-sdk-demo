import { ButtonHTMLAttributes } from "react";
import { Text } from "rebass/styled-components";
import UserAvatar from "../avatar/UserAvatar";
import { useUs3rAuthModal } from "../provider/AuthModalContext";
import { Button } from "rebass/styled-components";
import { useUs3rProfileContext } from "@us3r-network/profile";
import Username from "../username";

export type LoginButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function LoginButton({ onClick, ...otherProps }: LoginButtonProps) {
  const { sessId } = useUs3rProfileContext()!;
  const { openLoginModal } = useUs3rAuthModal();
  return (
    <Button
      variant="primary"
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
      {sessId ? (
        <>
          <UserAvatar did={sessId} className="us3r-LoginButton__avatar" />
          <Text className="us3r-LoginButton__text us3r-LoginButton__text--login">
            <Username did={sessId} />
          </Text>
        </>
      ) : (
        <Text
          variant={"heading"}
          className="us3r-LoginButton__text us3r-LoginButton__text--logout"
        >
          Login
        </Text>
      )}
    </Button>
  );
}
export default LoginButton;
