import React, { createContext, useCallback, useContext } from "react";
import { DIDSession } from "did-session";
import { Model } from "./Model";

export { Model } from "./Model";

const ModelsContext =
  createContext<{
    authModelWithSess: (sess: DIDSession) => void;
    disconnectModelFromSess: () => void;
  } | null>(null);

export default function S3DataModelProvider({
  models,
  children,
}: React.PropsWithChildren & { models: Model[] }) {
  const authModelWithSess = useCallback(
    (sess: DIDSession) => {
      models.forEach((item) => {
        item.authComposeClient(sess);
      });
    },
    [models]
  );
  const disconnectModelFromSess = useCallback(() => {
    models.forEach((item) => {
      item.resetComposeClient();
    });
  }, [models]);

  // TODO model picker ?

  return (
    <ModelsContext.Provider
      value={{
        authModelWithSess,
        disconnectModelFromSess,
      }}
    >
      {children}
    </ModelsContext.Provider>
  );
}

export const useS3DataModelContext = () => {
  const modelCtx = useContext(ModelsContext);
  if (!modelCtx) {
    throw new Error("init data-model-provider first");
  }
  return modelCtx;
};
