import { useS3Context } from "@us3r/js-sdk";
import { useEffect, useState } from "react";
// import usePost from "../hooks/usePost";

export default function Profile() {
  const { getPersonalProfile, updatePersonalProfile } = useS3Context()!;
  const { getPersonalPost, getPersonalComment } = useS3Context();

  const [name, setName] = useState("");

  useEffect(() => {
    if (getPersonalProfile) {
      getPersonalProfile()
        .then((data) => {
          if (data) setName(data.name);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    getPersonalPost && getPersonalPost();
    getPersonalComment && getPersonalComment();
  }, [
    getPersonalComment,
    getPersonalPost,
    getPersonalProfile,
    updatePersonalProfile,
  ]);

  // useEffect(() => {
  //   setName(profile?.name || "");
  // }, [profile]);

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
            updatePersonalProfile && updatePersonalProfile(name);
          }}
        >
          updateProfile
        </button>
      </div>
    </div>
  );
}
