import {
  ReactNode,
  useCallback,
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import {
  Authorizer,
  AuthToolType,
  getAuthorizerBaseInfo,
} from "../../authorizers";
import {
  getAuthLastFromStorage,
  setAuthLastToStorage,
} from "../../utils/storage";
import { useUs3rAuth } from "./Us3rAuthProvider";

interface AuthorizerContextValue {
  authorizers: Authorizer[];
  lastAuthToolType: AuthToolType;
  updateLastAuthorizer: (authToolType: AuthToolType) => void;
  getAuthorizer: (authToolType: AuthToolType) => Maybe<Authorizer>;
  loginWithAuthorizer: (authToolType: AuthToolType) => Promise<void>;
}
const authLast = getAuthLastFromStorage();
const defaultContextValue: AuthorizerContextValue = {
  authorizers: [],
  lastAuthToolType: authLast,
  updateLastAuthorizer: () => {},
  getAuthorizer: () => undefined,
  loginWithAuthorizer: () => Promise.resolve(),
};
export const AuthorizerContext = createContext(defaultContextValue);

export interface AuthorizerProviderProps {
  children: ReactNode;
  authToolTypes: AuthToolType[];
}
export default function AuthorizerProvider({
  children,
  authToolTypes,
}: AuthorizerProviderProps) {
  const { us3rAuthClient, setSession } = useUs3rAuth();
  const [authorizers, setAuthorizers] = useState<Authorizer[]>([]);
  const [lastAuthToolType, setLastAuthToolType] =
    useState<AuthToolType>(authLast);

  useEffect(() => {
    const authorizers = authToolTypes.map((authToolType) =>
      getAuthorizerBaseInfo(authToolType)
    );
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
      if (!us3rAuthClient) {
        throw Error("us3rAuthClient is not loaded");
      }
      switch (authToolType) {
        case AuthToolType.metamask_wallet:
          await us3rAuthClient.connect("metamask");
          break;
        case AuthToolType.phantom_wallet:
          await us3rAuthClient.connect("phantom");
          break;
        default:
          throw Error("Unsupported authToolType");
      }
      setSession(us3rAuthClient.session);
      updateLastAuthorizer(authToolType);
    },
    [us3rAuthClient, setSession, updateLastAuthorizer]
  );

  const providerValue = useMemo(
    () => ({
      authorizers,
      lastAuthToolType,
      updateLastAuthorizer,
      getAuthorizer,
      loginWithAuthorizer,
    }),
    [
      authorizers,
      lastAuthToolType,
      updateLastAuthorizer,
      getAuthorizer,
      loginWithAuthorizer,
    ]
  );
  return (
    <AuthorizerContext.Provider value={providerValue}>
      {children}
    </AuthorizerContext.Provider>
  );
}

export function useAuthorizer() {
  const context = useContext(AuthorizerContext);
  if (!context) {
    throw Error(
      "useAuthorizer can only be used within the AuthorizerProvider component"
    );
  }
  return context;
}
