import { useUs3rProfileContext } from "@us3r-network/profile";
import { useUs3rThreadContext } from "@us3r-network/thread";
import { useCallback, useEffect, useState } from "react";

export default function Profile() {
  const { sessId, profile, updateProfile } = useUs3rProfileContext()!;
  const { relationsComposeClient, getPersonalThreadList } =
    useUs3rThreadContext()!;

  const [name, setName] = useState("");

  const updateProfileAction = useCallback(async () => {
    await updateProfile(name);
  }, [name, updateProfile]);

  useEffect(() => {
    setName(profile?.name || "");
    if (relationsComposeClient.context.isAuthenticated()) {
      getPersonalThreadList({}).then((data) => {
        console.log(data);
      });
    }
  }, [profile, getPersonalThreadList, relationsComposeClient.context]);

  return (
    <div className="container max-w-5xl mx-auto">
      <h3>Profile</h3>
      <div>
        <p>{sessId}</p>
        <input
          title="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <button onClick={updateProfileAction}>updateProfile</button>
      </div>
    </div>
  );
}
