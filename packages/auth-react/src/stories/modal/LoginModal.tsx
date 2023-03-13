import React from "react";
import { AuthToolType } from "../../authorizers";
import { useUs3rAuthModal } from "../../components/provider/AuthModalContext";
import Us3rAuthProvider from "../../components/provider/Us3rAuthProvider";
import { ThemeType } from "../../themes";
const authToolTypes = [
  AuthToolType.metamask_wallet,
  AuthToolType.phantom_wallet,
];
type LoginModalProps = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};
const LoginModal: React.VFC<LoginModalProps> = ({
  theme,
  setTheme,
}: LoginModalProps) => {
  const { openLoginModal, loginModalOpen } = useUs3rAuthModal();

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
      }}
    >
      <button
        onClick={() => {
          openLoginModal();
        }}
      >
        {loginModalOpen ? "login modal is open" : "open login modal"}
      </button>
      <div>
        <label>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
          />
          dark
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={theme === "light"}
            onChange={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
          />
          light
        </label>
      </div>
    </div>
  );
};
const AppWrapper: React.VFC = () => {
  const [theme, setTheme] = React.useState<ThemeType>("light");
  return (
    <Us3rAuthProvider
      authConfig={{ authToolTypes }}
      themeConfig={{ themeType: theme }}
    >
      <LoginModal theme={theme} setTheme={setTheme} />
    </Us3rAuthProvider>
  );
};

export default AppWrapper;
