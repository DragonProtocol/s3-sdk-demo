import React from "react";
import { Profile } from "@us3r-network/authkit";
import App from "../app/App";

const Page: React.VFC = () => {
  return (
    <App>
      <Profile did="did:pkh:eip155:1:0x4630cf0fa55f83e11e43286ff04fc6930e1eb095" />
    </App>
  );
};

export default Page;
