import LoginWithAuthorizerButton from "../login-button/LoginWithAuthorizerButton"
import { Flex } from "rebass/styled-components"
import styled from "styled-components"

import Modal from "../modal/Modal"
import UserAvatar from "../avatar/UserAvatar"
import ScoreRate from "./ScoreRate"

// import { useUs3rAuth } from "../provider/Us3rAuthProvider";

export interface ScoreModal {
  open: boolean
  onClose: () => void
}

function ScoreModal({ open, onClose }: ScoreModal) {
  //   const { authorizers, lastAuthToolType } = useUs3rAuth();

  return (
    <Modal title={"Rating & Review"} isOpen={open} onClose={onClose}>
      <Flex
        sx={{
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
        className="us3r-ScoreModal__options"
      >
        <ReviewScoreUserAvatar did={""} />
        <ScoreRate disabled defaultValue={4} count={5} />
        <AuthProcessModalBtns className="signature-btns">
          <CloseBtn
            //   onClick={() => closeModal()}
            className="signature-btn-cancel"
          >
            Cancel
          </CloseBtn>

          <RetryBtn onClick={() => {}} className="signature-btn-retry">
            Retry
          </RetryBtn>
        </AuthProcessModalBtns>
      </Flex>
    </Modal>
  )
}
export default ScoreModal

const ReviewScoreUserAvatar = styled(UserAvatar)`
  width: 120px;
  height: 120px;
`
const AuthProcessModalBtns = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 24px;
`
const CloseBtn = styled.div`
  width: 120px;
  height: 48px;
`
const RetryBtn = styled.div`
  width: 120px;
  height: 48px;
`
