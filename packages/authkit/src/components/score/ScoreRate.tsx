import styled from "styled-components"
import { Box, Text } from "rebass/styled-components"
import { Rate, Progress } from "antd"

const _ScoreCount = 5

export default function ScoreRate(props) {
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
