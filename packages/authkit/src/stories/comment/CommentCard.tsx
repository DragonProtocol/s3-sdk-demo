import React from "react";
import { CommentCard } from "@us3r-network/authkit";
import App from "../app/App";

const Page: React.VFC = () => {
  return (
    <App>
      <CommentCard text={"The Comment"} />
    </App>
  );
};

export default Page;
