# @us3r-network/profile

The @us3r-network/profile package provides some easy ways to communicate with Ceramic. Developers can get profile with `profile`, set profile with `updateProfile`, and and others profile with `getProfileWithDid`. 

For writing to Ceramic, developers should first connect the wallet using the `connectUs3r` method.

## Install

```
npm install @us3r-network/profile
```

## Usage

Your need a Ceramic Node first. We provide some public nodes for developers to use.

```tsx
import { Us3rProfileProvider } from "@us3r-network/profile";

const ceramicHost =
  process.env.REACT_APP_CERAMIC_HOST || "http://13.215.254.225:7007";

function App() {
  return (
    <Us3rProfileProvider ceramicHost={ceramicHost}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Us3rProfileProvider>
  );
}
```

```tsx
...
const { sessId, profile, connectUs3r, updateProfile, getProfileWithDid } = useUs3rProfileContext()!;

...
  const authComposeClients = useCallback(() => {
    if (us3rAuthValid && us3rAuth.valid) {
      us3rAuth.authComposeClients([
        threadComposeClient,
        relationsComposeClient,
      ]);
    }
  }, [relationsComposeClient, threadComposeClient, us3rAuth, us3rAuthValid]);


...
  <button
    onClick={async () => {
      await connectUs3r();
      authComposeClients();
    }}
  >
    login with metamask
  </button>
  <button
    onClick={async () => {
      await connectUs3r("phantom");
      authComposeClients();
    }}
  >
    login with phantom
  </button>
...
...
```

with `connectUs3r()` method, the profile will can be read and write.