import {
  ReactNode,
  useCallback,
  useState,
  createContext,
  useContext,
} from "react";
import LoginModal from "../login-modal/LoginModal";

interface AuthModalContextValue {
  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}
export const AuthModalContext = createContext<AuthModalContextValue>({
  loginModalOpen: false,
  openLoginModal: () => {},
  closeLoginModal: () => {},
});

export interface AuthModalProviderProps {
  children: ReactNode;
}
export default function AuthModalProvider({
  children,
}: AuthModalProviderProps) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const openLoginModal = useCallback(() => {
    setLoginModalOpen(true);
  }, []);
  const closeLoginModal = useCallback(() => {
    setLoginModalOpen(false);
  }, []);

  return (
    <AuthModalContext.Provider
      value={{
        loginModalOpen,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
      <LoginModal open={loginModalOpen} onClose={closeLoginModal} />
    </AuthModalContext.Provider>
  );
}

export function useUs3rAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw Error(
      "useUs3rAuthModal can only be used within the AuthModalProvider component"
    );
  }
  return context;
}
