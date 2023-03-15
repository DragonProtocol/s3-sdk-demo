# @us3r-network/thread

The @us3r-network/thread package provides some easy ways to create thread, and some options with thread, like comment,vote,favor,score.

## Usage

Wrapper app with `Us3rThreadProvider`, `Us3rThreadProvider` provides `threadComposeClient` `relationsComposeClient` witch communication with Ceramic. The methods like `getThreadInfo` `createNewComment` `createNewFavor` `createNewVote` `createNewScore` can create the comment vote in ceramic.

```tsx
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
