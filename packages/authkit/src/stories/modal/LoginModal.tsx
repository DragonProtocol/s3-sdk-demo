import { useUs3rAuthModal } from "@us3r-network/authkit";
import App, { useAppContext } from "../app/App";

const TestLoginModal = () => {
  const { theme, setTheme } = useAppContext();
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

const Page: React.VFC = () => {
  return (
    <App>
      <TestLoginModal />
    </App>
  );
};

export default Page;
