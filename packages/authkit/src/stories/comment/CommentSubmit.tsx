import React from "react";
import { CommentSubmit } from "@us3r-network/authkit";
import App from "../app/App";

const Page: React.VFC = () => {
  const submitComment = (text: string) => {
    alert(text);
  };
  return (
    <App>
      <CommentSubmit submitAction={submitComment} />
    </App>
  );
};

export default Page;
