import React from "react";
import { CommentCard } from "@us3r-network/authkit";
import App from "../app/App";

const Page: React.VFC = () => {
  return (
    <App>
      <CommentCard
        text={"The Comment"}
        name={"nickname"}
        did="the did"
        date="date"
      />
    </App>
  );
};

export default Page;
