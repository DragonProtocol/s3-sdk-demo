import Modal from "../modal/Modal";
import { Button, Flex } from "rebass/styled-components";
import { uploadImage } from "../../utils/updateFile";
import { useCallback, useState } from "react";
import styled from "styled-components";

export interface AvatarEditModalProps {
  open: boolean;
  onClose: () => void;
  info: {
    avatar: string;
    name: string;
    bio: string;
  };
  updateInfo: (url: string, name: string, bio: string) => void;
}

export default function AvatarEditModal({
  open,
  onClose,
  info,
  updateInfo,
}: AvatarEditModalProps) {
  const [tempAvatar, setTempAvatar] = useState(info.avatar || "");
  const [tempName, setTempName] = useState(info.name || "");
  const [tempBio, setTempBio] = useState(info.bio || "");

  const saveAction = useCallback(async () => {
    await updateInfo(tempAvatar, tempName, tempBio);
    onClose();
  }, [tempAvatar, tempBio, tempName]);
  return (
    <Modal title={"Edit Profile"} isOpen={open} onClose={onClose}>
      <ContainerBox className="us3r-EditProfileModal__options">
        <AvatarBox>
          <img src={tempAvatar} alt="" />
          <div>
            <label htmlFor="avatar-input">Select Image</label>
            <input
              id="avatar-input"
              type="file"
              onChange={async (e) => {
                const target = e.target as HTMLInputElement;
                const file = target.files && target.files[0];
                if (!file) return;
                const resp = await uploadImage(file);
                const body = await resp.json();
                setTempAvatar(body.url);
              }}
            />
          </div>
        </AvatarBox>

        <TextBox>
          <input
            type="text"
            placeholder="Name"
            value={tempName}
            onChange={(e) => {
              setTempName(e.target.value);
            }}
          />
        </TextBox>

        <TextBox>
          <input
            type="text"
            placeholder="bio"
            value={tempBio}
            onChange={(e) => {
              setTempBio(e.target.value);
            }}
          />
        </TextBox>

        <SaveBtn onClick={saveAction}>Save</SaveBtn>
      </ContainerBox>
    </Modal>
  );
}

const ContainerBox = styled(Flex)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 10px;
  /* background: #1b1e23; */
  width: 380px;
`;

const AvatarBox = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  > img {
    width: 100%;
    height: 100%;
  }
  > div {
    position: absolute;
    top: 0;
    background: rgb(128, 128, 128, 0.8);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    > input {
      display: none;
    }
    > label {
      cursor: pointer;
    }
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  border: 1px solid #39424c;
  border-radius: 12px;
  overflow: hidden;
  > input {
    padding: 0 10px;
    width: 100%;
    border: none;
    outline: none;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
`;

const SaveBtn = styled(Button)`
  height: 48px;
  display: block;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  background: #ffffff;
  border-radius: 12px;
  color: #14171a;
`;
