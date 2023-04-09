import { useState } from "react";
import { StyledComponentPropsWithRef } from "styled-components";
import { Button, Text, Image } from "rebass//styled-components";
import { AuthToolType } from "../../authorizers";
import { useUs3rAuthModal } from "../provider/AuthModalContext";
import { useUs3rAuth } from "../provider/Us3rAuthProvider";
import { useRainbowKitAuth } from "../provider/RainbowKitAuthProvider";

export type LoginWithAuthorizerButtonProps =
  StyledComponentPropsWithRef<"button"> & {
    authToolType: AuthToolType;
  };

export default function LoginWithAuthorizerButton({
  children,
  authToolType,
  ...otherProps
}: LoginWithAuthorizerButtonProps) {
  const { getAuthorizer, lastAuthToolType, loginWithAuthorizer } =
    useUs3rAuth();
  const { loginModalOpen, closeLoginModal } = useUs3rAuthModal();
  const authorizer = getAuthorizer(authToolType);
  const [loading, setLoading] = useState(false);
  const { login: loginWithRainbowKit } = useRainbowKitAuth();

  if (!authorizer) return null;
  const { name, iconUrl, buttonVariant } = authorizer;

  return (
    <Button
      variant={buttonVariant || "primary"}
      onClick={() => {
        if (authToolType === AuthToolType.rainbowKit) {
          if (loginModalOpen) closeLoginModal();
          loginWithRainbowKit();
          return;
        }
        setLoading(true);
        loginWithAuthorizer(authToolType)
          .then(() => {
            if (loginModalOpen) closeLoginModal();
          })
          .finally(() => {
            setLoading(false);
          });
      }}
      disabled={loading}
      className="us3r-LoginWithAuthorizerButton"
      {...otherProps}
    >
      <Image
        variant={"icon"}
        src={iconUrl}
        className="us3r-LoginWithAuthorizerButton__icon"
      />

      <Text
        variant={buttonVariant}
        className="us3r-LoginWithAuthorizerButton__name"
      >
        {loading ? "Logging ..." : name}
      </Text>
      {authToolType === lastAuthToolType && (
        <Text
          variant="loginLastText"
          sx={{
            marginLeft: "auto",
          }}
          className="us3r-LoginWithAuthorizerButton__last"
        >
          Last
        </Text>
      )}
    </Button>
  );
}
