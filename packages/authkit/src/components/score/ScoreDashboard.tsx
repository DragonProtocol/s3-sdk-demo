import styled from "styled-components"
import { Box, Text } from "rebass/styled-components"
import { Rate, Progress } from "antd"

const _ScoreCount = 5

export default function ScoreDashboard({
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
    <ScoreDashboardContainer>
      <ScoreBox>
        <ScoreText>
          <Score>4.5</Score>
          <ScoreTotal>/{_ScoreCount}.0</ScoreTotal>
        </ScoreText>
        <Rate disabled defaultValue={2} count={_ScoreCount} />
        <ScoreCount>1,244 global ratings</ScoreCount>
      </ScoreBox>
      <ScoreRank>
        {Array.from({ length: _ScoreCount }, (_, i) => i + 1).reverse().map(
          (counter) => (
            <ScoreRankItem key={`score_${counter}`}>
              <span className="score-prefix">{counter} star</span>
              <Progress
                percent={50}
                status="active"
                strokeColor="#CF9523"
                trailColor="#1B1E23"
              />
            </ScoreRankItem>
          )
        )}
      </ScoreRank>
    </ScoreDashboardContainer>
  )
}

const ScoreDashboardContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #14171a;
  color: #fff;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: 32px 20px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 32px;
    left: 50%;
    transform: translate(-50%);
    width: 1px;
    height: calc(100% - 64px);
    background: #39424c;
  }
`

const ScoreBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .ant-rate-star-zero .ant-rate-star-second {
    color: #718096;
  }
`

const ScoreText = styled(Box)`
  display: flex;
  align-items: baseline;
  margin-bottom: -10px;
`

const ScoreRank = styled(Box)`
  display: flex;
  flex-direction: column;
  /* gap: 0.1rem; */

  flex-grow: 0.4;
`
const ScoreRankItem = styled(Box)`
  display: flex;
  .score-prefix {
    margin-right: 10px;
    white-space: nowrap;
    color: #718096;
    opacity: 0.8;
  }
  .ant-progress-text {
    color: white;
  }
  .ant-progress-line {
    margin-bottom: 2px;
  }
  /* gap: 0.3rem; */
`

const Score = styled(Text)`
  font-family: "Rubik";
  font-style: italic;
  font-weight: bolder;
  font-size: 40px;
  line-height: 47px;
  text-align: center;
`

const ScoreTotal = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #718096;
  margin-left: 5px;
  /* opacity: 0.8; */
`

const ScoreCount = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #718096;
  opacity: 0.8;
`
