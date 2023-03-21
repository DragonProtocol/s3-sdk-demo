import { useEffect, useState } from 'react'

import { Box, Text } from 'rebass/styled-components'
import ReviewScoreCard, { ReviewScoreCardProps } from './ReviewScoreCard'
import { useInView } from 'react-intersection-observer';

export default function ReviewScoreCardList({
  scoreList,
  ...otherProps
}: {
  scoreList: Array<ReviewScoreCardProps & { key: string }>
}) {
  const [page, setPage] = useState<number>(1);
  const { ref: inviewRef, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      setPage((curPage) => curPage + 1);
    }
  }, [inView]);

  return (
    <Box
      {...otherProps}
      sx={{
        display: 'grid',
        gridGap: 3,
        gridTemplateColumns: 'repeat(auto-fit, minmax(282px, 1fr))',
      }}
    >
      {scoreList?.slice(0,page * 6)?.map((item) => (
        <ReviewScoreCard {...item} />
      ))}
      <div style={{ height: '30px' }} ref={inviewRef} />
    </Box>
  )
}
