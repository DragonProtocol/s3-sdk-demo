# @us3r-network/profile

The @us3r-network/profile package provides some easy ways to communicate with Ceramic. Developers can get profile with `profile`, set profile with `updateProfile`, and and others profile with `getProfileWithDid`. 

For writing to Ceramic, developers should first connect the wallet using the `connectUs3r` method.

## Usage

```tsx
function App() {
  return (
    <Us3rProfileProvider
      ceramicHost={
        process.env.REACT_APP_CERAMIC_HOST || "http://13.215.254.225:7007"
      }
    >
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
```