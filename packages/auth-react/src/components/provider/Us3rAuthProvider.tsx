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
import { Us3rAuth } from "@us3r-network/auth";
import { removeSessionStorage } from "../../utils/storage";
import { getTheme, Theme, ThemeType } from "../../themes";
import { AuthToolType } from "../../authorizers";
import ModalProvider from "./AuthModalContext";
import AuthorizerProvider from "./AuthorizerContext";
import type { Us3rAuthSession } from "../../utils";

export interface Us3rAuthContextValue {
  us3rAuthClient: Us3rAuth | undefined;
  session: Us3rAuthSession | undefined;
  setSession: (session: Us3rAuthSession) => void;
  logout: () => void;
}

const us3rAuthClient = new Us3rAuth();

const defaultContextValue: Us3rAuthContextValue = {
  us3rAuthClient: us3rAuthClient,
  session: undefined,
  setSession: () => {},
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
  const [session, setSession] = useState(us3rAuthClient?.session);

  useEffect(() => {
    (async () => {
      await us3rAuthClient.restoreFromLocal();
      setSession(us3rAuthClient.session);
    })();
  }, []);

  const logout = useCallback(() => {
    removeSessionStorage();
    setSession(undefined);
    if (us3rAuthClient) {
      us3rAuthClient.session = undefined;
      us3rAuthClient.valid = false;
    }
  }, [us3rAuthClient]);

  // TODO: 后期从控制台数据拿取authConfig
  const { authToolTypes } = authConfig;

  const providerValue = useMemo(
    () => ({
      us3rAuthClient,
      session,
      setSession,
      logout,
    }),
    [session, setSession, logout]
  );

  return (
    <Us3rAuthContext.Provider value={providerValue}>
      <ThemeProvider theme={getTheme(themeConfig)}>
        <AuthorizerProvider authToolTypes={authToolTypes ?? []}>
          <ModalProvider>{children}</ModalProvider>
        </AuthorizerProvider>
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
