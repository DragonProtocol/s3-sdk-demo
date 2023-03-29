import styled from "styled-components";
import { useUs3rProfileContext, Wallet } from "@us3r-network/profile";
import { Text } from "rebass/styled-components";
import { useCallback, useEffect, useState } from "react";
import Avatar from "./Avatar";
import Wallets from "./Wallets";
import Tags from "./Tags";

type Profile = {
  id: string;
  profile: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    tags: string[];
    wallets: Wallet[];
  };
};

export default function Profile({ did }: { did: string }) {
  const { getProfileWithDid, updateProfile } = useUs3rProfileContext()!;

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [editing, setEditing] = useState(false);

  const updateProfileAction = useCallback(async () => {
    await updateProfile({
      name,
      avatar,
      bio,
      tags: [...tags],
      wallets: [...wallets],
    });
  }, [name, avatar, wallets, bio, tags, updateProfile]);

  useEffect(() => {
    getProfileWithDid(did)
      .then((data: Profile) => {
        setName(data.profile.name);
        setAvatar(data.profile.avatar);
        setBio(data.profile.bio);
        setTags(data.profile.tags);
        setWallets(data.profile.wallets);
      })
      .catch(console.error);
  }, [did, getProfileWithDid]);

  return (
    <ProfileBox>
      <NameBox>
        <Avatar
          editing={editing}
          avatar={avatar}
          updateAvatar={(url) => {
            setAvatar(url);
          }}
        />

        <div>
          {(editing && (
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          )) || <NicknameText>{name}</NicknameText>}
        </div>
        <div>
          {(editing && (
            <input
              type="text"
              placeholder="bio"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          )) || <Text>{bio}</Text>}
        </div>
      </NameBox>

      <Wallets
        editing={editing}
        wallets={wallets}
        updateWallets={(wallets) => {
          setWallets(wallets);
        }}
      />

      <Tags
        editing={editing}
        tags={tags}
        updateTags={(tags) => {
          setTags(tags);
        }}
      />
      <div>
        {(editing && (
          <button
            onClick={async () => {
              await updateProfileAction();
              setEditing(false);
            }}
          >
            save
          </button>
        )) || (
          <button
            onClick={() => {
              setEditing(true);
            }}
          >
            Edit
          </button>
        )}
      </div>
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
  input {
    color: black;
  }
`;

const NicknameText = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
`;
