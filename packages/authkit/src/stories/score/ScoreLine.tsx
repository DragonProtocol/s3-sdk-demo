import React from "react";
import { ScoreLine } from "@us3r-network/authkit";
import App from "../app/App";

const Page: React.VFC = () => {
  return (
    <App>
      <ScoreLine
        onRating={() => {}}
        mb={10}
      />
    </App>
  );
};

export default Page;