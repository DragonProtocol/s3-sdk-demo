import styled from "styled-components";
import { useUs3rProfileContext, Wallet } from "@us3r-network/profile";
import { useCallback, useEffect, useState } from "react";
import Avatar from "./Info";
import Wallets from "./Wallets";
import Tags from "./Tags";

type ProfileData = {
  id?: string;
  name?: string;
  avatar?: string;
  bio?: string;
  tags?: string[];
  wallets?: Wallet[];
};
type Profile = {
  id: string;
  profile: ProfileData;
};

export default function Profile({ did }: { did: string }) {
  const { getProfileWithDid, updateProfile } = useUs3rProfileContext()!;

  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [tags, setTags] = useState<Array<string>>();
  const [wallets, setWallets] = useState<Wallet[]>();

  const getProfile = useCallback(async () => {
    if (!did) return;
    try {
      const data: Profile = await getProfileWithDid(did);
      const currWallet = data.id.split(":").pop() || "";
      const wallets = data.profile.wallets || [];
      setName(data.profile.name || "");
      setAvatar(data.profile.avatar || "");
      setBio(data.profile.bio || "");
      setTags(data.profile.tags || []);
      setWallets(
        wallets.length
          ? [...wallets]
          : [
              {
                address: currWallet,
                primary: true,
                chain: data.id.startsWith("did:pkh:eip") ? "EVM" : "SOLANA",
              },
              ...wallets,
            ]
      );
    } catch (error) {
      console.log(error);
    }
  }, [getProfileWithDid, did]);

  const updateProfileAction = useCallback(
    async (data: ProfileData) => {
      await updateProfile({
        name: data.name || name,
        avatar: data.avatar || avatar,
        bio: data.bio || bio,
        tags: data.tags || (tags ? [...tags] : []),
        wallets: data.wallets || (wallets ? [...wallets] : []),
      });
      await getProfile();
    },
    [name, avatar, wallets, bio, tags, updateProfile]
  );

  useEffect(() => {
    if (mounted) {
      getProfile();
    }
  }, [mounted, getProfile]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ProfileBox>
      <NameBox>
        <Avatar
          name={name}
          bio={bio}
          avatar={avatar}
          updateInfo={(avatar, name, bio) => {
            updateProfileAction({
              name,
              avatar,
              bio,
            });
          }}
        />
      </NameBox>

      <Wallets
        wallets={wallets || []}
        updateWallets={(wallets) => {
          updateProfileAction({
            wallets,
          });
        }}
      />

      <Tags
        tags={tags || []}
        updateTags={(tags) => {
          updateProfileAction({
            tags,
          });
        }}
      />
    </ProfileBox>
  );
}

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 360px;
`;
