import React from "react";
import { AuthToolType } from "../../authorizers";
import { Us3rAuthProvider } from "../../components/index";
import LoginButton from "../../components/login-button/LoginButton";
const authToolTypes = [
  AuthToolType.metamask_wallet,
  AuthToolType.phantom_wallet,
];
const Button: React.VFC = () => {
  return (
    <Us3rAuthProvider authConfig={{ authToolTypes }}>
      <LoginButton />
    </Us3rAuthProvider>
  );
};
export default Button;
