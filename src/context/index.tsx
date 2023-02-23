import { createContext, useContext } from "react";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { ComposeClient } from "@composedb/client";

import { definition as profileDefinition } from "../__generated__/profile-definition";
import { definition as postCommentDefinition } from "../__generated__/post-comment-relation-definition";
import { RuntimeCompositeDefinition } from "@composedb/types";

const ceramicHost = "http://13.215.254.225:7007"; //"http://localhost:7007"
const ceramic = new CeramicClient(ceramicHost);

const profileComposeClient = new ComposeClient({
  ceramic: ceramicHost,
  // cast our definition as a RuntimeCompositeDefinition
  definition: profileDefinition as RuntimeCompositeDefinition,
});

const postCommentComposeClient = new ComposeClient({
  ceramic: ceramicHost,
  // cast our definition as a RuntimeCompositeDefinition
  definition: postCommentDefinition as RuntimeCompositeDefinition,
});

const CeramicContext = createContext({
  ceramic: ceramic,
  profileComposeClient: profileComposeClient,
  postCommentComposeClient: postCommentComposeClient,
});

export const CeramicWrapper = ({ children }: any) => {
  return (
    <CeramicContext.Provider
      value={{
        ceramic,
        profileComposeClient,
        postCommentComposeClient,
      }}
    >
      {children}
    </CeramicContext.Provider>
  );
};

export const useCeramicContext = () => useContext(CeramicContext);
