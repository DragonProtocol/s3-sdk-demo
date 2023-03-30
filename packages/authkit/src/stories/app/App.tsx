import React, { createContext, PropsWithChildren } from "react";
import {
  Us3rAuthProvider,
  AuthToolType,
  ThemeType,
} from "@us3r-network/authkit";
import { Us3rProfileProvider } from "@us3r-network/profile";
import { Us3rThreadProvider } from "@us3r-network/thread";

const ceramicHost =
  process.env.REACT_APP_CERAMIC_HOST || "http://13.215.254.225:7007";

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
  const [theme, setTheme] = React.useState<ThemeType>("dark");
  return (
    <Us3rProfileProvider ceramicHost={ceramicHost}>
      <Us3rThreadProvider ceramicHost={ceramicHost}>
        <AuthModalContext.Provider value={{ theme, setTheme }}>
          <Us3rAuthProvider
            authConfig={{ authToolTypes }}
            themeConfig={{ themeType: theme }}
          >
            {children}
          </Us3rAuthProvider>
        </AuthModalContext.Provider>
      </Us3rThreadProvider>
    </Us3rProfileProvider>
  );
};

export default App;

export const useAppContext = () => React.useContext(AuthModalContext);
