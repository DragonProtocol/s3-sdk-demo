import "./App.css";
import { useEffect } from "react";
import {
  Us3rAuthProvider,
  useUs3rAuth,
} from "@us3r-network/auth-with-rainbowkit";
import S3DataModelProvider, {
  useS3DataModelContext,
} from "@us3r-network/data-model-provider";
import S3ProfileModel from "@us3r-network/data-model-profile";

const CERAMIC_HOST = process.env.CERAMIC_HOST || "http://13.215.254.225:7007";

const s3Profile = new S3ProfileModel(CERAMIC_HOST);

function App() {
  return (
    <Us3rAuthProvider>
      <S3DataModelProvider models={[s3Profile]}>
        <AuthWrap />
      </S3DataModelProvider>
    </Us3rAuthProvider>
  );
}

function AuthWrap() {
  const { session, ready, status, signIn, signOut } = useUs3rAuth();

  const isAuthorized = session?.isAuthorized();

  const { authModelWithSess, disconnectModelFromSess } =
    useS3DataModelContext();

  useEffect(() => {
    if (!ready) return;
    if (session) {
      authModelWithSess(session);
    } else {
      disconnectModelFromSess();
    }
  }, [ready, session, authModelWithSess, disconnectModelFromSess]);

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
