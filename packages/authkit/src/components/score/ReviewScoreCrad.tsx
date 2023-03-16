import styled from "styled-components"
import { Box, Text } from "rebass/styled-components"
import UserAvatar from "../avatar/UserAvatar"
import ScoreRate from "./ScoreRate"

export default function ReviewScoreCrad({
  text,
  name,
  did,
  date,
}: {
  text: string
  did: string
  name?: string
  date?: string
}) {
  return (
    <ReviewScoreContainer>
      <ScoreRate disabled defaultValue={4} count={5} />
      <ReviewScoreComment>
        The Alpha: Art Gobblers, the NFT project brainchild of Rick & Morty
        co-creator Justin Roiland and Web3 firm Paradigm,
      </ReviewScoreComment>
      <ReviewScoreBottom>
        <UserInfoBox>
          <ReviewScoreUserAvatar did={did} />
          <UserInfo>
            <div className="name">Nicole</div>
            <div>1000</div>
          </UserInfo>
        </UserInfoBox>
        <ScoreDate>12 Jan 2023</ScoreDate>
      </ReviewScoreBottom>
    </ReviewScoreContainer>
  )
}

const ReviewScoreContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  background: #1b1e23;
  color: #fff;
  gap: 0.7rem;
  border-radius: 0.5rem;
  padding: 20px;

  color: #718096;
`

const ReviewScoreComment = styled(Box)`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  /* #718096 */

  color: #718096;
`

const ReviewScoreUserAvatar = styled(UserAvatar)`
  width: 48px;
  height: 48px;
  margin-right: 10px;
`

const ReviewScoreBottom = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const UserInfoBox = styled(Box)`
  display: flex;
  .name {
    font-weight: bolder;
    font-size: 16px;
    line-height: 19px;

    color: #ffffff;
  }
`

const UserInfo = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ScoreDate = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #718096;
`
