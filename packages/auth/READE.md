# @us3r-network/auth

The @us3r-network/auth package is the basis of us3r-network, it has a `connect` method to connect to the wallet and establish a session with Ceramic. With `authComposeClients` method for give authorization to composeClint.

The package is pretty basic, you may need @us3r-network/profile.

```tsx
...
  const connectUs3r = useCallback(
    async (chain?: AuthChain) => {
      await us3rAuth.connect(chain);
      us3rAuth.authComposeClients([profileComposeClient]);
      const profile = await getPersonalProfile();
      setSessId(us3rAuth.session?.id || "");
      setProfile(profile);
    },
    [getPersonalProfile]
  );
...
```
