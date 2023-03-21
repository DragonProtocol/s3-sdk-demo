import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext,
} from "react";
import { ThemeProvider } from "styled-components";

import { getTheme, Theme, ThemeType } from "../../themes";
import {
  Authorizer,
  AuthToolType,
  getAuthorizerBaseInfo,
} from "../../authorizers";
import ModalProvider from "./AuthModalContext";
import { useUs3rProfileContext } from "@us3r-network/profile";
import { useUs3rThreadContext } from "@us3r-network/thread";
import {
  getAuthLastFromStorage,
  setAuthLastToStorage,
} from "../../utils/storage";

export interface Us3rAuthContextValue {
  authorizers: Authorizer[];
  lastAuthToolType: AuthToolType;
  updateLastAuthorizer: (authToolType: AuthToolType) => void;
  getAuthorizer: (authToolType: AuthToolType) => Maybe<Authorizer>;
  loginWithAuthorizer: (authToolType: AuthToolType) => Promise<void>;
  logout: () => void;
}

const authLast = getAuthLastFromStorage();

const defaultContextValue: Us3rAuthContextValue = {
  authorizers: [],
  lastAuthToolType: authLast,
  updateLastAuthorizer: () => {},
  getAuthorizer: () => undefined,
  loginWithAuthorizer: () => Promise.resolve(),
  logout: () => {},
};

const Us3rAuthContext = createContext(defaultContextValue);

export interface Us3rAuthProviderProps {
  children: ReactNode;
  authConfig: {
    appName?: string;
    authToolTypes?: AuthToolType[];
  };
  themeConfig?: {
    themeType?: ThemeType;
    darkTheme?: Theme;
    lightTheme?: Theme;
  };
}

export default function Us3rAuthProvider({
  children,
  authConfig,
  themeConfig,
}: Us3rAuthProviderProps) {
  // TODO: 后期从控制台数据拿取authConfig
  const { authToolTypes } = authConfig;

  const { us3rAuth, us3rAuthValid, connectUs3r, disconnect } =
    useUs3rProfileContext()!;
  const { threadComposeClient, relationsComposeClient } =
    useUs3rThreadContext()!;

  const [authComposeClientsValid, setAuthComposeClientsValid] = useState(false);
  const authComposeClients = useCallback(() => {
    if (us3rAuthValid && us3rAuth.valid) {
      us3rAuth.authComposeClients([
        threadComposeClient,
        relationsComposeClient,
      ]);
      setAuthComposeClientsValid(true);
    }
  }, [relationsComposeClient, threadComposeClient, us3rAuth, us3rAuthValid]);

  useEffect(() => {
    authComposeClients();
  }, [authComposeClients]);

  const [authorizers, setAuthorizers] = useState<Authorizer[]>([]);
  const [lastAuthToolType, setLastAuthToolType] =
    useState<AuthToolType>(authLast);

  useEffect(() => {
    const authorizers =
      authToolTypes?.map((authToolType) =>
        getAuthorizerBaseInfo(authToolType)
      ) || [];
    setAuthorizers(authorizers);
  }, [authToolTypes]);

  const updateLastAuthorizer = useCallback(
    (authToolType: AuthToolType) => {
      setAuthLastToStorage(authToolType);
      setLastAuthToolType(authToolType);
    },
    [setLastAuthToolType]
  );

  const getAuthorizer = useCallback(
    (authToolType: AuthToolType) => {
      return authorizers.find(
        (authorizer) => authorizer.authToolType === authToolType
      );
    },
    [authorizers]
  );

  const loginWithAuthorizer = useCallback(
    async (authToolType: AuthToolType) => {
      switch (authToolType) {
        case AuthToolType.metamask_wallet:
          await connectUs3r("metamask");
          break;
        case AuthToolType.phantom_wallet:
          await connectUs3r("phantom");
          break;
        default:
          throw Error("Unsupported authToolType");
      }
      authComposeClients();
      updateLastAuthorizer(authToolType);
    },
    [connectUs3r, updateLastAuthorizer, authComposeClients]
  );

  const logout = useCallback(async () => {
    await disconnect();
  }, [disconnect]);

  const providerValue = useMemo(
    () => ({
      authorizers,
      lastAuthToolType,
      updateLastAuthorizer,
      getAuthorizer,
      loginWithAuthorizer,
      logout,
      authComposeClientsValid,
    }),
    [
      authorizers,
      lastAuthToolType,
      updateLastAuthorizer,
      getAuthorizer,
      loginWithAuthorizer,
      logout,
      authComposeClientsValid,
    ]
  );

  return (
    <Us3rAuthContext.Provider value={providerValue}>
      <ThemeProvider theme={getTheme(themeConfig)}>
        <ModalProvider>{children}</ModalProvider>
      </ThemeProvider>
    </Us3rAuthContext.Provider>
  );
}
export function useUs3rAuth() {
  const context = useContext(Us3rAuthContext);
  if (!context) {
    throw Error(
      "useUs3rAuth can only be used within the Us3rAuthProvider component"
    );
  }
  return context;
}
