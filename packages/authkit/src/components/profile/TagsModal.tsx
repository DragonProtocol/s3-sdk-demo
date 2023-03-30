import Modal from "../modal/Modal";
import { Button, Flex } from "rebass/styled-components";
import { useCallback, useState } from "react";
import styled from "styled-components";

export interface TagsEditModalProps {
  open: boolean;
  onClose: () => void;
  updateTags: (tag: string) => void;
}

export default function TagEditModal({
  open,
  onClose,
  updateTags,
}: TagsEditModalProps) {
  const [tempTag, setTempTag] = useState("");

  const saveAction = useCallback(async () => {
    await updateTags(tempTag);
    onClose();
  }, [tempTag]);
  return (
    <Modal title={"Add New Tag"} isOpen={open} onClose={onClose}>
      <ContainerBox className="us3r-EditWalletsModal__options">
        <TextBox>
          <input
            type="text"
            placeholder="tag"
            value={tempTag}
            onChange={(e) => {
              setTempTag(e.target.value);
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
  border-radius: 12px;
  background: #ffffff;
  color: #14171a;
`;
