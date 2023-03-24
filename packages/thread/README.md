# @us3r-network/thread

The @us3r-network/thread package provides some easy ways to create thread, and some options with thread, like comment,vote,favor,score.

## Install

```
npm i @us3r-network/thread
```

## Usage

Wrapper app with `Us3rThreadProvider`, `Us3rThreadProvider` provides `threadComposeClient` `relationsComposeClient` witch communication with Ceramic. The methods like `getThreadInfo` `createNewComment` `createNewFavor` `createNewVote` `createNewScore` can create the comment vote in ceramic.

```tsx

...
import { Us3rProfileProvider } from "@us3r-network/profile";
import { Us3rThreadProvider } from "@us3r-network/thread";

...

const ceramicHost =
  process.env.REACT_APP_CERAMIC_HOST || "http://13.215.254.225:7007";
...
    <Us3rProfileProvider ceramicHost={ceramicHost}>
      <Us3rThreadProvider ceramicHost={ceramicHost}>
        <App>
      </Us3rThreadProvider>
    </Us3rProfileProvider>
...
```

```tsx
...
  const { sessId, profile, connectUs3r, us3rAuth, us3rAuthValid } =
    useUs3rProfileContext()!;
  const { threadComposeClient, relationsComposeClient } =
    useUs3rThreadContext()!;

  const authComposeClients = useCallback(() => {
    if (us3rAuthValid && us3rAuth.valid) {
      us3rAuth.authComposeClients([
        threadComposeClient,
        relationsComposeClient,
      ]);
    }
  }, [relationsComposeClient, threadComposeClient, us3rAuth, us3rAuthValid]);
...
```

```tsx
...
  const {
    getThreadInfo,
    createNewComment,
    createNewFavor,
    createNewVote,
    createNewScore,
  } = useUs3rThreadContext()!;
...
```

In order to express how to use it more clearly, we have prepared a [demo](https://github.com/DragonProtocol/s3-sdk-demo/tree/main/packages/demo)