import styled from "styled-components";
import { Box, Text } from "rebass/styled-components";
import UserAvatar from "../avatar/UserAvatar";

const CommentContainer = styled(Box)`
  display: flex;
  background: #1b1e23;
  color: #fff;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: 10px 0;
`;

const CommentContent = styled(Box)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0.5rem;
`;

const CommentContentHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const NicknameText = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
`;

const ContentText = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;

const DateText = styled(Text)`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #718096;
`;

const CommentUserAvatar = styled(UserAvatar)`
  width: 48px;
  height: 48px;
`;

export default function CommentCard({
  text,
  name,
  did,
  date,
}: {
  text: string;
  name: string;
  did: string;
  date?: string;
}) {
  return (
    <CommentContainer>
      <CommentUserAvatar did={did} />
      <CommentContent>
        <CommentContentHeader>
          <NicknameText>{name || did || "did:pkh:0"}</NicknameText>
          {date && <DateText>{date}</DateText>}
        </CommentContentHeader>
        <ContentText>{text}</ContentText>
      </CommentContent>
    </CommentContainer>
  );
}
