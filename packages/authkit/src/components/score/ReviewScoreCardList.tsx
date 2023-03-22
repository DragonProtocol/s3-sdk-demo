import { useEffect, useState } from 'react'

import { Box, Text } from 'rebass/styled-components'
import ReviewScoreCard, { ReviewScoreCardProps } from './ReviewScoreCard'
import { useInView } from 'react-intersection-observer'

import { useGetThreadScoreInfo } from './hook'

export default function ReviewScoreCardList({
  scoreList,
  threadId,
  ...otherProps
}: {
  threadId?: string
  scoreList?: Array<ReviewScoreCardProps & { key: string }>
}) {
  const [page, setPage] = useState<number>(1)
  const { ref: inviewRef, inView } = useInView({
    threshold: 0,
  })
  const { scoreList: threadScoreList } = useGetThreadScoreInfo(threadId)

  useEffect(() => {
    if (inView) {
      setPage((curPage) => curPage + 1)
    }
  }, [inView])

  return (
    <Box
      {...otherProps}
      sx={{
        display: 'grid',
        gridGap: 3,
        gridTemplateColumns: 'repeat(auto-fit, minmax(282px, 1fr))',
      }}
    >
      {(scoreList || threadScoreList || [])
        ?.slice(0, page * 6)
        ?.map((item: any) => (
          <ReviewScoreCard {...item} />
        ))}
      <div style={{ height: '30px' }} ref={inviewRef} />
    </Box>
  )
}
