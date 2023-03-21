import styled from 'styled-components'
import { Box, Text } from 'rebass/styled-components'
import UserAvatar from '../avatar/UserAvatar'
import ScoreRate from './ScoreRate'

export interface ReviewScoreCardProps {
  value: number
  comment: string
  did: string
  name: string
  date?: string
  scoreCount?: number
}

export default function ReviewScoreCard({
  value,
  comment,
  did,
  name,
  date,
  scoreCount,
}: ReviewScoreCardProps) {
  return (
    <ReviewScoreContainer>
      <ScoreRate value={value} count={scoreCount || 5} />
      <ReviewScoreComment>{comment}</ReviewScoreComment>
      <ReviewScoreBottom>
        <UserInfoBox>
          <ReviewScoreUserAvatar did={did} />
          <UserInfo>
            <div className="name">{name}</div>
            <div>1000</div>
          </UserInfo>
        </UserInfoBox>
        {date && <ScoreDate>{date}</ScoreDate>}
      </ReviewScoreBottom>
    </ReviewScoreContainer>
  )
}

const ReviewScoreContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  background: #14171a;
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
