import { useState } from "react";
import styled from "styled-components";

import AvatarEditModal from "./InfoModal";
import { Text } from "rebass/styled-components";
import EditIcon from "./EditIcon";

export default function Avatar({
  avatar,
  name,
  bio,
  updateInfo,
}: {
  avatar: string;
  name: string;
  bio: string;
  updateInfo: (url: string, name: string, bio: string) => void;
}) {
  const [edit, setEdit] = useState(false);
  return (
    <InfoContainer>
      <AvatarBox>
        <div className="avatar-box">
          <div className="avatar-select" onClick={() => setEdit(true)}>
            <EditIcon />
          </div>
          <img src={avatar} alt="" />
        </div>
        <div className="name-box">
          <NicknameText>{name}</NicknameText>
        </div>
        <div className="bio-box">
          <BioText>{bio}</BioText>
        </div>
      </AvatarBox>

      <AvatarEditModal
        open={edit}
        onClose={() => setEdit(false)}
        updateInfo={updateInfo}
        info={{
          avatar,
          name,
          bio,
        }}
      />
    </InfoContainer>
  );
}

const InfoContainer = styled.div``;

const NicknameText = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  font-style: italic;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #fff;
`;

const BioText = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  color: #718096;
`;

const AvatarBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  padding: 20px;
  width: 360px;
  background: #1b1e23;
  border-radius: 20px;
  .avatar-box {
    margin: 0 auto;
    position: relative;
    width: 120px;
    height: 120px;

    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .name-box {
    text-align: center;
  }

  .avatar-select {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    display: none;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
  &:hover {
    .avatar-select {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  input {
    display: none;
  }
`;
