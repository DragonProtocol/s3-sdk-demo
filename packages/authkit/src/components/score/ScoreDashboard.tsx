import styled from 'styled-components'
import { Box, BoxProps, Text, Flex } from 'rebass/styled-components'

import { useGetThreadScoreInfo } from './hook'
import ScoreRate from './ScoreRate'

const _ScoreCount = 5

export const Score = ({
  score,
  scoreCount,
  threadId,
}: {
  score?: number
  scoreCount?: number
  threadId?: string
}) => {
  const { scoreAvg } = useGetThreadScoreInfo(threadId)

  return (
    <>
      <ScoreText showScoreCount={Boolean(scoreCount)}>
        <ScoreNum>{score || scoreAvg || 0}</ScoreNum>
        {scoreCount && <ScoreCount>/{scoreCount}</ScoreCount>}
      </ScoreText>
      <ScoreRate value={score || scoreAvg || 0} count={5} />
    </>
  )
}

export const ScoreMin = ({ threadId }: { threadId?: string }) => {
  const { scoreAvg } = useGetThreadScoreInfo(threadId)
  
  return (
    <Flex>
      <ScoreRate value={1} count={1} />
      <ScoreNumMin>{scoreAvg}</ScoreNumMin>
    </Flex>
  )
}

export default function ScoreDashboard({
  score,
  scoreCount = _ScoreCount,
  scoreTotal,
  scoreRankPercents,
  ...otherProps
}: {
  score: number
  scoreCount: number
  scoreTotal?: string
  scoreRankPercents: Array<number>
} & BoxProps) {
  return (
    <ScoreDashboardContainer {...otherProps}>
      <ScoreBox>
        <Score score={score} scoreCount={scoreCount} />
        {scoreTotal && <ScoreTotal>{scoreTotal} global ratings</ScoreTotal>}
      </ScoreBox>
      <ScoreRank>
        {Array.from({ length: scoreCount }, (_, i) => i + 1)
          .reverse()
          .map((counter, index) => (
            <ScoreRankItem key={`score_${counter}`}>
              <span className="score-prefix">{counter} star</span>
              <ScoreProgress percent={scoreRankPercents?.[index] || 0} />
              <span className="score-suffix">
                {scoreRankPercents?.[index] || 0} %
              </span>
            </ScoreRankItem>
          ))}
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
    content: '';
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

const ScoreText = styled(Box)<{ showScoreCount: boolean }>`
  display: flex;
  align-items: baseline;
  margin-bottom: -10px;

  justify-content: ${(props) => (props?.showScoreCount ? 'left' : 'center')};
`

const ScoreRank = styled(Box)`
  display: flex;
  flex-direction: column;
  /* gap: 0.1rem; */

  flex-grow: 0.4;
  row-gap: 10px;
`
const ScoreRankItem = styled(Box)`
  display: flex;
  .score-prefix {
    margin-right: 10px;
    white-space: nowrap;
    color: #718096;
    opacity: 0.8;
    line-height: 10px;
    min-width: 44px;
  }
  .score-suffix {
    color: white;
    margin-left: 10px;
    white-space: nowrap;
    font-size: 14px;
    line-height: 10px;
    width: 50px;
  }
  /* gap: 0.3rem; */
`
const ScoreProgress = styled(Box)<{ percent: number }>`
  width: 100%;
  height: 10px;
  background: #1b1e23;
  border-radius: 12px;
  position: relative;
  &::after {
    content: '';
    width: ${(props) => `${props.percent}%`};
    height: 10px;
    background: #cf9523;
    border-radius: 12px;
    transform: matrix(-1, 0, 0, 1, 0, 0);
    position: absolute;
    left: 0;
    top: 0;
  }
`

const ScoreNumMin = styled(Text)`
  font-family: 'Rubik';
  font-weight: bolder;
  font-size: 15px;
  line-height: 23px;
  text-align: center;
  color: #ffd700;
  margin-left: 2px;
`

const ScoreNum = styled(Text)`
  font-family: 'Rubik';
  font-style: italic;
  font-weight: bolder;
  font-size: 40px;
  line-height: 47px;
  text-align: center;
`

const ScoreCount = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #718096;
  margin-left: 5px;
  /* opacity: 0.8; */
`

const ScoreTotal = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #718096;
  opacity: 0.8;
`
