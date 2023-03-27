import styled from 'styled-components'
import { Box, Text,Flex } from 'rebass/styled-components'
import UserAvatar from '../avatar/UserAvatar'
import ScoreRate from './ScoreRate'
import UserName from '../username'

export interface ReviewScoreCardProps {
  value: number
  comment: string
  did: string
  name: string
  date?: string
  scoreCount?: number
  onEdit?: (comment: string, score: number) => void
}

export default function ReviewScoreCard({
  value,
  comment,
  did,
  name,
  date,
  scoreCount,
  onEdit,
}: ReviewScoreCardProps) {
  return (
    <ReviewScoreContainer>
      <Flex
      justifyContent="space-between"
      >
      <ScoreRate value={value} count={scoreCount || 5} />
      {onEdit && (
        <Edit onClick={() => onEdit(comment, value)}>
          <svg
            className="rating-svg"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
          >
            <path
              d="M512 928l-4.352-0.298667a32 32 0 0 1 0-63.402666L512 864h362.666667a32 32 0 0 1 4.352 63.701333l-4.352 0.298667H512z m194.304-783.061333a32 32 0 0 1 37.632-0.298667l4.010667 3.413333 170.666666 170.666667 3.114667 3.584a32 32 0 0 1 0.298667 37.632l-3.413334 4.010667-554.666666 554.666666-3.84 3.285334a32 32 0 0 1-13.738667 5.717333L341.333333 928H170.666667l-4.352-0.298667a32 32 0 0 1-27.349334-27.349333L138.666667 896v-170.666667l0.426666-5.034666a32 32 0 0 1 5.674667-13.738667l3.285333-3.84 554.666667-554.666667 3.584-3.114666zM597.333333 343.936L202.666667 738.56v125.397333h125.397333L722.730667 469.333333 597.333333 343.936z m128-128L642.602667 298.666667 768 424.064 850.730667 341.333333 725.333333 215.936z"
              fill="#718096"
            ></path>
          </svg>
          Edit
        </Edit>
      )}
      </Flex>
      <ReviewScoreComment>{comment}</ReviewScoreComment>
      <ReviewScoreBottom>
        <UserInfoBox>
          <ReviewScoreUserAvatar did={did} />
          <UserInfo>
            <UserName did={did} />
            {/* <div>1000</div> */}
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

const Edit = styled(Box)`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  /* #718096 */

  color: #718096;
  cursor: pointer;

  svg{
    margin-bottom: -3px;
  }
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
