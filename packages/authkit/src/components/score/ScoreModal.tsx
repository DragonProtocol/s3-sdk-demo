import { useState } from 'react'

import { Flex, Button } from 'rebass/styled-components'
import styled from 'styled-components'
import { Input } from 'antd'

import Modal from '../modal/Modal'
import UserAvatar from '../avatar/UserAvatar'
import ScoreRate from './ScoreRate'

const { TextArea } = Input

export interface ScoreModal {
  open: boolean
  onClose: () => void
  submitAction: ({ comment, score }: { comment: string; score: number }) => void
  did: string
}

function ScoreModal({ open, onClose, did, submitAction }: ScoreModal) {
  const [score, setScore] = useState(0)
  const [comment, setComment] = useState('')

  return (
    <ScoreModalWrapper>
      <Modal
        title={'Rating & Review'}
        isOpen={open}
        onClose={onClose}
        contentClassName="us3r-ScoreModal__content"
      >
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
          className="us3r-ScoreModal__options"
        >
          <ReviewScoreUserAvatar did={did} />
          <ScoreRate value={score} count={5} onChange={setScore} />
          <TextArea
            maxLength={140}
            value={comment}
            style={{ width: '100%', height: 160, resize: 'none' }}
            onChange={(e) => setComment(e?.target?.value)}
            placeholder="Comment"
          />
          <Flex
            sx={{
              justifyContent: 'space-between',
              columnGap: '10px',
              width: '100%',
            }}
          >
            <CloseBtn variant="outline" mr={2} onClick={onClose}>
              Cancel
            </CloseBtn>
            <SubmitBtn
              onClick={() => {
                submitAction({ comment, score })
              }}
            >
              Submit
            </SubmitBtn>
          </Flex>
        </Flex>
      </Modal>
    </ScoreModalWrapper>
  )
}
export default ScoreModal

const ReviewScoreUserAvatar = styled(UserAvatar)`
  width: 120px;
  height: 120px;
`
const ScoreModalWrapper = styled.div`
  .us3r-ScoreModal__content {
    background: #1a1e23;

    .Us3r-Modal__title,
    .Us3r-Modal__close {
      color: white;
    }
  }

  .ant-input {
    background: transparent;
    color: #718096;
    border: 1px solid #39424c;
    border-radius: 12px;
    ::placeholder {
      color: #718096;
      opacity: 1;
    }
  }
`
const CloseBtn = styled(Button)`
  flex-grow: 1;
  border: 1px solid #39424c;
  box-shadow: none;
  border-radius: 12px;
  font-weight: normal;
  color: #718096;
  justify-content: center;

  height: 40px;
`
const SubmitBtn = styled(Button)`
  flex-grow: 1;
  border-radius: 12px;
  font-weight: normal;
  color: black;
  background: white;
  justify-content: center;

  height: 40px;
`
