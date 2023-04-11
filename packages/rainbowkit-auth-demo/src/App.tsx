import "./App.css";
import { useUs3rAuth } from "@us3r-network/auth-with-rainbowkit";

function App() {
  const { session, ready, status, signIn, signOut } = useUs3rAuth();

  const isAuthorized = session?.isAuthorized();
  return (
    <div className="App">
      <p>
        {ready ? (
          <button
            onClick={() => {
              if (isAuthorized) {
                signOut();
              } else {
                signIn();
              }
            }}
          >
            {isAuthorized ? "Logout" : "Login"}
          </button>
        ) : (
          "u3sr init ..."
        )}
      </p>

      <table border={1}>
        <tr>
          <td>U3srAuth Ready</td>
          <td>{String(ready)}</td>
        </tr>
        <tr>
          <td>Authentication Status</td>
          <td>{status}</td>
        </tr>
        <tr>
          <td>Session Id</td>
          <td>{session?.id}</td>
        </tr>
        <tr>
          <td>Session Str</td>
          <td>{session?.serialize()}</td>
        </tr>
      </table>
    </div>
  );
}

export default App;
