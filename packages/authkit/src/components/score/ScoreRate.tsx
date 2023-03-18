import styled from 'styled-components'
import { Box } from 'rebass/styled-components'
import { Rate, RateProps } from 'antd'

export default function ScoreRate(props: RateProps) {
  return (
    <ScoreRateContainer>
      <Rate {...props} />
    </ScoreRateContainer>
  )
}

const ScoreRateContainer = styled(Box)`
  .ant-rate-star-zero .ant-rate-star-second {
    color: #718096;
  }
`
