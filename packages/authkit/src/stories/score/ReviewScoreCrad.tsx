import React from "react";
import { ReviewScoreCrad } from "@us3r-network/authkit";
import App from "../app/App";

const Page: React.VFC = () => {
  return (
    <App>
      <ReviewScoreCrad
        text={"The Comment"}
        name={"nickname"}
        did="the did"
        date="date"
      />
    </App>
  );
};

export default Page;