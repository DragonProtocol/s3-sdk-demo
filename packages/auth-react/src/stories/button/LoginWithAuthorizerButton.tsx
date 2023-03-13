import React from "react";
import { AuthToolType } from "../../authorizers";
import { Us3rAuthProvider } from "../../components/index";
import LoginWithAuthorizerButton from "../../components/login-button/LoginWithAuthorizerButton";
const authToolTypes = [
  AuthToolType.metamask_wallet,
  AuthToolType.phantom_wallet,
];
const Button: React.VFC = () => {
  return (
    <Us3rAuthProvider authConfig={{ authToolTypes }}>
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <LoginWithAuthorizerButton
          authToolType={AuthToolType.metamask_wallet}
        />
        <LoginWithAuthorizerButton authToolType={AuthToolType.phantom_wallet} />
      </div>
    </Us3rAuthProvider>
  );
};
export default Button;
