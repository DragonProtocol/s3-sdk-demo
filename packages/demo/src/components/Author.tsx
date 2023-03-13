import { useUs3rProfileContext } from "@us3r-network/profile";
import { useEffect, useState } from "react";
import shortPubKey from "../utils/shortPubKey";

export default function Author({ did }: { did: string }) {
  const { getProfileWithDid } = useUs3rProfileContext()!;
  const [didProfile, setDidProfile] = useState<{
    newGenericProfile?: {
      name: string;
    };
  }>();
  useEffect(() => {
    if (getProfileWithDid) {
      getProfileWithDid(did)
        .then((data) => {
          setDidProfile(data);
        })
        .catch(console.error);
    }
  }, [did, getProfileWithDid]);

  //   console.log("didProfile", did, didProfile?.genericProfile.name);

  return (
    <div>
      <span>{didProfile?.newGenericProfile?.name}</span>
      <span style={{ marginLeft: "2px" }}>@{shortPubKey(did)}</span>
    </div>
  );
}
