import React from "react";
import { Username } from "@us3r-network/authkit";
import App from "../app/App";

const Avatar = () => {
  return (
    <Username
      did={"did:pkh:eip155:137:0x4630cf0fa55f83e11e43286ff04fc6930e1eb095"}
    />
  );
};

const Page: React.VFC = () => {
  return (
    <App>
      <Avatar />
    </App>
  );
};

export default Page;
