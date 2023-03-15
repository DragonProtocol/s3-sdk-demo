import { AuthToolType, LoginWithAuthorizerButton } from "@us3r-network/authkit";
import App from "../app/App";

const Page: React.VFC = () => {
  return (
    <App>
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <LoginWithAuthorizerButton
          authToolType={AuthToolType.metamask_wallet}
        />
        <LoginWithAuthorizerButton authToolType={AuthToolType.phantom_wallet} />
      </div>
    </App>
  );
};

export default Page;
