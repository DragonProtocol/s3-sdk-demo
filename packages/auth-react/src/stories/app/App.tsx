import React, { createContext, PropsWithChildren } from "react";
import {
  Us3rAuthProvider,
  AuthToolType,
  ThemeType,
} from "@us3r-network/auth-react";

interface AppContextValue {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}
export const AuthModalContext = createContext<AppContextValue>({
  theme: "light",
  setTheme: () => {},
});

const authToolTypes = [
  AuthToolType.metamask_wallet,
  AuthToolType.phantom_wallet,
];
const App: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = React.useState<ThemeType>("light");
  return (
    <AuthModalContext.Provider value={{ theme, setTheme }}>
      <Us3rAuthProvider
        authConfig={{ authToolTypes }}
        themeConfig={{ themeType: theme }}
      >
        {children}
      </Us3rAuthProvider>
    </AuthModalContext.Provider>
  );
};

export default App;

export const useAppContext = () => React.useContext(AuthModalContext);
