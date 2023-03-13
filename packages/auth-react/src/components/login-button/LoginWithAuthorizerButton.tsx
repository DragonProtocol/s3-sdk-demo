import { useState } from "react";
import styled, { StyledComponentPropsWithRef } from "styled-components";
import { Button, Text, Image } from "rebass//styled-components";
import { AuthToolType } from "../../authorizers";
import { useUs3rAuthModal } from "../provider/AuthModalContext";
import { useAuthorizer } from "../provider/AuthorizerContext";

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
    useAuthorizer();
  const { loginModalOpen, closeLoginModal } = useUs3rAuthModal();
  const authorizer = getAuthorizer(authToolType);
  if (!authorizer) return null;
  const { name, iconUrl, buttonVariant } = authorizer;
  const [loading, setLoading] = useState(false);

  return (
    <Button
      variant={buttonVariant}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
      onClick={() => {
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
      <AuthorizerIcon
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

const AuthorizerIcon = styled(Image)`
  width: 24px;
  height: 24px;
`;
