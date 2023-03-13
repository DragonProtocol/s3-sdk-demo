# @us3r-network/auth-react

## Components

- `Us3rAuthProvider`

  use example

  ```jsx
    // src/app.tsx

    import React from "react";
    import { Us3rAuthProvider, AuthToolType, lightTheme, darkTheme } from "@us3r-network/auth-react";

    const authConfig = {
        authToolTypes: [
            AuthToolType.metamask_wallet,
            AuthToolType.phantom_wallet,
        ]
    }

    const [theme, setTheme] = useState('light')
    const themeConfig = {
        themeType: theme,
        lightTheme:{...lightTheme, colors:{...}},
        darkTheme:{...darkTheme, colors:{...}}
    }

    const App = ({ children }) => {
        return (
            <Us3rAuthProvider authConfig={authConfig} themeConfig={themeConfig}>
                {children}
            </Us3rAuthProvider>
        );
    };

    export default App;
  ```

- `UserAvatar`

  use example

  ```jsx
  // src/TestUserAvatar.tsx

  import { useUs3rAuth } from "@us3r-network/auth-react";

  const TestUserAvatar = () => {
    const { session } = useUs3rAuth();
    return <UserAvatar did={session?.did.id} title={session?.did.id} />;
  };

  export default TestUserAvatar;
  ```

- `LoginButton`

  use example

  ```jsx
  // src/TestLoginButton.tsx

  import { LoginButton } from "@us3r-network/auth-react";

  export default <LoginButton />;
  ```

- `LoginWithAuthorizerButton`

  use example

  ```jsx
  // src/TestLoginWithAuthorizerButton.tsx

  import {
    LoginWithAuthorizerButton,
    AuthToolType,
  } from "@us3r-network/auth-react";

  export default (
    <>
      <LoginWithAuthorizerButton authToolType={AuthToolType.metamask_wallet} />
      <LoginWithAuthorizerButton authToolType={AuthToolType.phantom_wallet} />
    </>
  );
  ```

## Examples

The following examples are provided in the [src/stories/] folder of this repo.

- `stories/avatar`
- `stories/button`
- `stories/modal`

### Running examples

To run an example locally, install dependencies.

```bash
yarn install
```

Then run the dev script.

```bash
yarn storybook
```
