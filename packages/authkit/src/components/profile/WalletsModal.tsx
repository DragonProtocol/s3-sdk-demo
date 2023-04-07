import Modal from "../modal/Modal";
import { Button, Flex } from "rebass/styled-components";
import { useCallback, useState } from "react";
import styled from "styled-components";
import Loading from "../loading";
import { GraphQLError } from "graphql";

export interface WalletsEditModalProps {
  open: boolean;
  onClose: () => void;
  updateWallet: (wallet: string) => Promise<void>;
}

export default function WalletEditModal({
  open,
  onClose,
  updateWallet,
}: WalletsEditModalProps) {
  const [tempWallet, setTempWallet] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [updating, setUpdating] = useState(false);

  const saveAction = useCallback(async () => {
    try {
      setUpdating(true);
      await updateWallet(tempWallet);
      onClose();
    } catch (error) {
      const errMsg = (error as ReadonlyArray<GraphQLError>)[0].toJSON().message;
      setErrMsg(errMsg);
    } finally {
      setUpdating(false);
    }
  }, [tempWallet]);

  return (
    <Modal title={"Add New Wallet"} isOpen={open} onClose={onClose}>
      <ContainerBox className="us3r-EditWalletsModal__options">
        <TextBox>
          <input
            type="text"
            placeholder="wallet"
            value={tempWallet}
            onChange={(e) => {
              setTempWallet(e.target.value);
              setErrMsg("");
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
  /* background: #1b1e23; */
  width: 380px;

  .err {
    color: red;
    margin: 0;
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
  border-radius: 12px;
  background: #ffffff;
  color: #14171a;
`;
