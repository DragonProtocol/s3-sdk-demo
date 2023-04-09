import "./App.css";
import { useUs3rProfileContext } from "@us3r-network/profile";
import { UserAvatar, Username } from "@us3r-network/authkit";
import { useRainbowKitAuth } from "@us3r-network/rainbowkit-auth";

function App() {
  const { sessId, us3rAuth } = useUs3rProfileContext()!;
  const { login, logout } = useRainbowKitAuth();

  return (
    <div className="App">
      <p>
        <button
          onClick={() => {
            if (sessId) {
              console.log("aaa");
              logout();
            } else {
              console.log("bbb");
              login();
            }
          }}
        >
          {sessId ? "Logout" : "Login"}
        </button>
      </p>

      <table border={1}>
        <tr>
          <td>UserAvatar</td>
          <td>
            <UserAvatar did={sessId} />
          </td>
        </tr>
        <tr>
          <td>Username</td>
          <td>
            <Username did={sessId} />
          </td>
        </tr>

        <tr>
          <td>sessId</td>
          <td>{sessId}</td>
        </tr>
        <tr>
          <td>sessionStr</td>
          <td>{us3rAuth.session?.serialize()}</td>
        </tr>
      </table>
    </div>
  );
}

export default App;
