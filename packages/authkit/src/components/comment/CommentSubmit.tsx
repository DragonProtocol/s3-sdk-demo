import { useState } from "react";
import styled from "styled-components";
import { Box, Button } from "rebass/styled-components";
import { useUs3rProfileContext } from "@us3r-network/profile";

import { useUs3rAuthModal } from "../provider/AuthModalContext";

const CommentContainer = styled(Box)`
  background-color: #14171a;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 0.5rem;
  padding: 10px;
`;

const CommentInput = styled.input`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  flex-grow: 1;
  background: none;
  border: none;
  outline: none;
  color: #fff;
`;

const SubmitBtn = styled(Button)`
  background: none;
  display: flex;
  align-items: center;
  padding: 6px 8px;
  gap: 4px;
  width: 95px;
  height: 32px;

  background: #1a1e23;
  border: 1px solid #39424c;
  border-radius: 12px;

  > span {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-align: center;

    color: #718096;
  }
`;

export default function CommentSubmit({
  submitAction,
  ...otherProps
}: {
  submitAction: (comment: string) => void;
}) {
  const [commentText, setCommentText] = useState("");
  const { sessId } = useUs3rProfileContext()!;
  const { openLoginModal } = useUs3rAuthModal();
  return (
    <CommentContainer {...otherProps}>
      <CommentInput
        placeholder="Give a Comment"
        value={commentText}
        onChange={(e) => {
          setCommentText(e.target.value);
        }}
      />
      <SubmitBtn
        onClick={() => {
          if (!sessId) {
            openLoginModal();
            return;
          }
          submitAction(commentText);
        }}
      >
        <Send />
        <span>Comment</span>
      </SubmitBtn>
    </CommentContainer>
  );
}

function Send() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2368_13957)">
        <path
          d="M13.8858 9.92897L9.99674 13.8181M10.143 14.084L13.4238 20.6669C13.6816 21.1841 13.8104 21.4427 13.9763 21.5154C14.1203 21.5786 14.2857 21.5704 14.4227 21.4931C14.5804 21.4042 14.6829 21.1341 14.8878 20.5938L21.3871 3.45947C21.5871 2.93212 21.6871 2.66845 21.6296 2.49857C21.5797 2.35098 21.4638 2.23511 21.3162 2.18518C21.1464 2.1277 20.8827 2.22772 20.3553 2.42775L3.21505 8.92928C2.67641 9.13359 2.40709 9.23574 2.31815 9.39325C2.24092 9.53004 2.23246 9.69518 2.29531 9.83914C2.36768 10.0049 2.62515 10.1341 3.14008 10.3924L9.78569 13.7258C9.87413 13.7702 9.91835 13.7923 9.95666 13.822C9.99065 13.8482 10.0211 13.8788 10.0473 13.9128C10.0768 13.9512 10.0989 13.9955 10.143 14.084Z"
          stroke="#718096"
          stroke-width="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2368_13957">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
