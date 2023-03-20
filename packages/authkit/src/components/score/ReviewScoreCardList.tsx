import styled from 'styled-components'
import { Box, Text } from 'rebass/styled-components'
import UserAvatar from '../avatar/UserAvatar'
import ScoreRate from './ScoreRate'
import ReviewScoreCard, { ReviewScoreCardProps } from './ReviewScoreCard'

export default function ReviewScoreCardList({
  scoreList,
  ...otherProps
}: {
  scoreList: Array<ReviewScoreCardProps & { key: string }>
}) {
  return (
    <Box
      {...otherProps}
      sx={{
        display: 'grid',
        gridGap: 3, // theme.space[3]
        gridTemplateColumns: 'repeat(auto-fit, minmax(370px, 1fr))',
        // gridTemplateColumns: 'repeat(auto-fit, minmax(128px, 1fr))',
      }}
    >
      {scoreList?.map((item) => (
        <ReviewScoreCard {...item} />
      ))}
    </Box>
  )
}
