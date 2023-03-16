import React from "react";
import { CommentList } from "@us3r-network/authkit";
import App from "../app/App";

const Page: React.VFC = () => {
  return (
    <App>
      <CommentList threadId="kjzl6kcym7w8yafknav63k9gkkj84kbk4c8cledtbcu5knjb8rdgzebzc3azohf" />
    </App>
  );
};

export default Page;
