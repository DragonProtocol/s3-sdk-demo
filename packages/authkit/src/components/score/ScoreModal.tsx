import { useEffect, useState } from "react"

import { Flex, Button } from "rebass/styled-components"
import { Textarea } from "@rebass/forms"
import styled from "styled-components"

import Modal from "../modal/Modal"
import UserAvatar from "../avatar/UserAvatar"
import ScoreRate from "./ScoreRate"

export interface ScoreModal {
  open: boolean
  onClose: () => void
  submitAction: ({
    comment,
    score,
    scoreId,
  }: {
    comment: string
    score: number
    scoreId?: string
  }) => void
  did: string
  scoreId?: string
  defaultComment?: string
  defaultScore?: number
}

function ScoreModal({
  open,
  onClose,
  did,
  submitAction,
  scoreId,
  defaultComment,
  defaultScore,
}: ScoreModal) {
  const [score, setScore] = useState(0)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (defaultComment) {
      setComment(defaultComment)
    }

    if (defaultScore) {
      setScore(defaultScore)
    }
  }, [defaultScore, defaultComment])

  return (
    <ScoreModalWrapper>
      <Modal
        title={"Rating & Review"}
        isOpen={open}
        onClose={onClose}
        contentClassName="us3r-ScoreModal__content"
      >
        <Flex
          sx={{
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
          className="us3r-ScoreModal__options"
        >
          <ReviewScoreUserAvatar did={did} />
          <ScoreRate
            value={score}
            edit={true}
            count={5}
            onChange={(score: number) => {
              setScore(score)
            }}
          />
          <Comment
            value={comment}
            onChange={(e: any) => setComment(e?.target?.value)}
            placeholder="Comment"
          />
          <Flex
            sx={{
              justifyContent: "space-between",
              columnGap: "10px",
              width: "100%",
            }}
          >
            <CloseBtn variant="outline" mr={2} onClick={onClose}>
              Cancel
            </CloseBtn>
            <SubmitBtn
              onClick={async () => {
                setLoading(true)
                await submitAction({ comment, score, scoreId })
                setLoading(false)
              }}
              disabled={loading || !comment || !score}
            >
              {loading ? (
                <StyledLdsRing>
                  <div />
                  <div />
                  <div />
                  <div />
                </StyledLdsRing>
              ) : (
                "Submit"
              )}
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

const Comment = styled(Textarea)`
  outline: none;
  background: transparent;
  color: #718096 !important;
  border-color: #39424c !important;
  border-radius: 12px;
  height: 100px;
  resize: none;
  ::placeholder {
    color: #718096;
    opacity: 1;
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

  &:disabled {
    cursor: not-allowed;
    pointer-events: auto;
    opacity: 0.5;
  }
`
const StyledLdsRing = styled.div`
  display: inline-block;
  position: relative;
  width: 56px;
  height: 15px;
  cursor: default;

  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    left: 50%;
    width: 15px;
    height: 15px;
    /* margin: 8px; */
    border: 2px solid black;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    margin-left: -15%;
    border-color: black transparent transparent transparent;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
