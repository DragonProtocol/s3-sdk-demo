import styled from "styled-components";
import { Box, Text } from "rebass/styled-components";
import UserAvatar from "../avatar/UserAvatar";

const CommentContainer = styled(Box)`
  display: flex;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: 10px 0;
`;

const CommentContent = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0.5rem;
`;

const CommentUserAvatar = styled(UserAvatar)`
  width: 48px;
  height: 48px;
`;

export default function CommentCard({
  text,
  name,
  did,
}: {
  text: string;
  name: string;
  did: string;
}) {
  return (
    <CommentContainer>
      <CommentUserAvatar did={did} />
      <CommentContent>
        <Text>{name || did || "did:pkh:0"}</Text>
        <Text>{text}</Text>
      </CommentContent>
    </CommentContainer>
  );
}
