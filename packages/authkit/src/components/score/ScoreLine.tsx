import styled from 'styled-components'
import { Box, BoxProps } from 'rebass/styled-components'
import { Rate, Progress } from 'antd'

import { useUs3rProfileContext } from '@us3r-network/profile'
import { useUs3rAuthModal } from '../provider/AuthModalContext'

import ScoreRate from './ScoreRate'

export default function ScoreLine({
  onRating,
  ...otherProps
}: { onRating: () => void } & BoxProps) {
  const { sessId } = useUs3rProfileContext()!
  const { openLoginModal } = useUs3rAuthModal()!

  return (
    <ScoreLineContainer {...otherProps}>
      <ScoreRate  value={0} />
      <RatingButton
        onClick={() => {
          if (!sessId) {
            openLoginModal()
            return
          }

          onRating?.()
        }}
      >
        <svg
          className="rating-svg"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2820"
          width="20"
          height="20"
        >
          <path
            d="M512 928l-4.352-0.298667a32 32 0 0 1 0-63.402666L512 864h362.666667a32 32 0 0 1 4.352 63.701333l-4.352 0.298667H512z m194.304-783.061333a32 32 0 0 1 37.632-0.298667l4.010667 3.413333 170.666666 170.666667 3.114667 3.584a32 32 0 0 1 0.298667 37.632l-3.413334 4.010667-554.666666 554.666666-3.84 3.285334a32 32 0 0 1-13.738667 5.717333L341.333333 928H170.666667l-4.352-0.298667a32 32 0 0 1-27.349334-27.349333L138.666667 896v-170.666667l0.426666-5.034666a32 32 0 0 1 5.674667-13.738667l3.285333-3.84 554.666667-554.666667 3.584-3.114666zM597.333333 343.936L202.666667 738.56v125.397333h125.397333L722.730667 469.333333 597.333333 343.936z m128-128L642.602667 298.666667 768 424.064 850.730667 341.333333 725.333333 215.936z"
            fill="#718096"
            p-id="2821"
          ></path>
        </svg>
        Rating and Review
      </RatingButton>
    </ScoreLineContainer>
  )
}

const ScoreLineContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #14171a;
  color: #fff;
  padding: 10px 20px;
  border: 1px solid #39424c;
  border-radius: 10px;
`

const RatingButton = styled(Box)`
  display: flex;

  color: #718096;

  cursor: pointer;

  .rating-svg {
    margin-right: 5px;
  }
`
