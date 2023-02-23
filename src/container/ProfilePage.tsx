import { useEffect, useState } from "react";
import { useProfile } from "../hooks/useProfile";

export default function Profile() {
  const { getProfile, updateProfile, profile } = useProfile();

  const [name, setName] = useState("");

  useEffect(() => {
    getProfile();
  }, [getProfile]);
  useEffect(() => {
    setName(profile?.name || "");
  }, [profile]);
  return (
    <div>
      <h3>Profile</h3>
      <div>
        <input
          title="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <button
          onClick={() => {
            updateProfile(name);
          }}
        >
          updateProfile
        </button>
      </div>
    </div>
  );
}
