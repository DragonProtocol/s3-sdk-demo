import { Box, Text } from 'rebass/styled-components'
import ReviewScoreCard, { ReviewScoreCardProps } from './ReviewScoreCard'

export default function ReviewScoreCardList({
  scoreList,
  reviewPage: page = 1,
  reviewPageSize: pageSize = 5,
  ...otherProps
}: {
  scoreList: Array<ReviewScoreCardProps & { key: string }>
  reviewPage?: number
  reviewPageSize?: number
}) {
  return (
    <Box
      {...otherProps}
      sx={{
        display: 'grid',
        gridGap: 3,
        gridTemplateColumns: 'repeat(auto-fit, minmax(370px, 1fr))',
      }}
    >
      {scoreList?.slice((page - 1) * pageSize, page * pageSize)?.map((item) => (
        <ReviewScoreCard {...item} />
      ))}
    </Box>
  )
}
