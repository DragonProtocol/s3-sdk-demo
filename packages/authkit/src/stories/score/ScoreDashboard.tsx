import React from "react";
import { ScoreDashboard } from "@us3r-network/authkit";
import App from "../app/App";

const Page: React.VFC = () => {
  return (
    <App>
      <ScoreDashboard
        text={"The Comment"}
        name={"nickname"}
        did="the did"
        date="date"
      />
    </App>
  );
};

export default Page;