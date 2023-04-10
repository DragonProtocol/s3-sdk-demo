import "./App.css";
import { useRainbowKitAuth } from "@us3r-network/rainbowkit-auth";

function App() {
  const { us3rAuth, auth } = useRainbowKitAuth();

  const isAuthorized = us3rAuth && us3rAuth.session?.isAuthorized();
  return (
    <div className="App">
      <p>
        <button
          onClick={() => {
            if (isAuthorized) {
              us3rAuth.disconnect([]);
            } else {
              auth();
            }
          }}
        >
          {isAuthorized ? "Logout" : "Login"}
        </button>
      </p>

      <table border={1}>
        <tr>
          <td>sessId</td>
          <td>{us3rAuth?.session?.id}</td>
        </tr>
        <tr>
          <td>sessionStr</td>
          <td>{us3rAuth?.session?.serialize()}</td>
        </tr>
      </table>
    </div>
  );
}

export default App;
