import Modal from "../modal/Modal";
import { Button, Flex } from "rebass/styled-components";
import { GraphQLError } from "graphql";
import { uploadImage } from "../../utils/updateFile";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import UserAvatar from "../avatar/UserAvatar";
import Loading from "../loading";

export interface AvatarEditModalProps {
  open: boolean;
  onClose: () => void;
  info: {
    avatar: string;
    name: string;
    bio: string;
    did: string;
  };
  updateInfo: (url: string, name: string, bio: string) => Promise<void>;
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
  const [errMsg, setErrMsg] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setTempAvatar(info.avatar);
    setTempName(info.name);
    setTempBio(info.bio);
  }, [info]);

  useEffect(() => {
    setErrMsg("");
  }, [tempAvatar, tempName, tempBio]);

  const saveAction = useCallback(async () => {
    try {
      setUpdating(true);
      await updateInfo(tempAvatar, tempName, tempBio);
      onClose();
    } catch (error) {
      const errMsg = (error as ReadonlyArray<GraphQLError>)[0].toJSON().message;
      setErrMsg(errMsg);
    } finally {
      setUpdating(false);
    }
  }, [tempAvatar, tempBio, tempName]);
  return (
    <Modal title={"Edit Profile"} isOpen={open} onClose={onClose}>
      <ContainerBox className="us3r-EditProfileModal__options">
        <AvatarBox>
          {(tempAvatar && <img src={tempAvatar} alt="" />) || (
            <UserAvatar did={info.did} />
          )}
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
          <textarea
            placeholder="bio"
            rows={3}
            value={tempBio}
            onChange={(e) => {
              setTempBio(e.target.value);
            }}
          />
        </TextBox>

        {(updating && (
          <SaveBtn>
            <Loading /> Save
          </SaveBtn>
        )) || <SaveBtn onClick={saveAction}>Save</SaveBtn>}
        {errMsg && <p className="err">{errMsg}</p>}
      </ContainerBox>
    </Modal>
  );
}

const ContainerBox = styled(Flex)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 10px;
  width: 380px;

  .err {
    color: red;
    margin: 0;
  }
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
  min-height: 48px;
  border: 1px solid #39424c;
  border-radius: 12px;
  overflow: hidden;
  > input,
  > textarea {
    padding: 0 10px;
    width: 100%;
    border: none;
    outline: none;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
  > textarea {
    resize: none;
    padding: 10px;
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
