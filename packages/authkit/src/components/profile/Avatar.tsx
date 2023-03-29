import styled from "styled-components";
import { uploadImage } from "../../utils/updateFile";

export default function Avatar({
  avatar,
  updateAvatar,
  editing = false,
}: {
  avatar: string;
  updateAvatar: (url: string) => void;
  editing?: boolean;
}) {
  return (
    <AvatarBox>
      {editing && (
        <div className="avatar-select">
          <label htmlFor="avatar-input">Select File</label>
          <input
            id="avatar-input"
            type="file"
            onChange={async (e) => {
              const target = e.target as HTMLInputElement;
              const file = target.files && target.files[0];
              if (!file) return;
              const resp = await uploadImage(file);
              const body = await resp.json();
              updateAvatar(body.url);
            }}
          />
        </div>
      )}
      {avatar && <img src={avatar} alt="" />}
    </AvatarBox>
  );
}

const AvatarBox = styled.div`
  position: relative;
  .avatar-select {
    background-color: rgba(128, 128, 128, 0.865);
    display: none;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
  }

  &:hover {
    .avatar-select {
      display: block;
    }
  }

  input {
    display: none;
  }
`;
