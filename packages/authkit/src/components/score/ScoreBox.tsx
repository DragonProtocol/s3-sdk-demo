import { useCallback, useEffect, useState } from 'react'
import { Thread, useUs3rThreadContext } from '@us3r-network/thread'
import { useUs3rProfileContext } from '@us3r-network/profile'
import { Box } from 'rebass/styled-components'
import styled from 'styled-components'

import {
  ScoreLine,
  ScoreDashboard,
  ReviewScoreCardList,
  ScoreModal,
} from './index'

const defaultScoreModalProps = {
  open: false,
  defaultComment: '',
  defaultScore: 0,
}

export default function ScoreBox({ threadId }: { threadId: string }) {
  const [isScoreModalShow, setIsScoreModalShow] = useState<boolean>(false)
  const [threadInfo, setThreadInfo] = useState<Thread>()
  const [scoreInfo, setScoreInfo] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)

  const [scoreModalProps, setScoreModalProps] = useState<any>(
    defaultScoreModalProps
  )

  const { getThreadInfo, createNewScore } = useUs3rThreadContext()!
  const { sessId } = useUs3rProfileContext()!

  const submitNewScore = useCallback(
    async (params: any) => {
      if (!threadId) return
      await createNewScore({ threadId, ...params })
      await getThreadInfo(threadId)
    },
    [createNewScore, threadId, getThreadInfo]
  )

  const handleGetThreadInfo = useCallback(
    async (threadId: string) => {
      if (!threadId) return
      setLoading(true)
      getThreadInfo(threadId)
        .then((data) => {
          setThreadInfo(data)
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    },
    [getThreadInfo, threadId]
  )

  useEffect(() => {
    handleGetThreadInfo(threadId)
  }, [getThreadInfo, threadId])

  useEffect(() => {
    if (threadInfo) {
      const scoreValues = threadInfo?.scores?.edges?.map(
        (score) => (score?.node as any)?.value
      )

      const scoreSum = scoreValues?.reduce((acc, curValue) => {
        acc += curValue || 0
        return acc
      }, 0)
      const scoreTotal = threadInfo?.scoresCount

      const scoreAvg = Math.min(Math.round(scoreSum / scoreTotal), 5)

      const scoreRankMap = Object.fromEntries(
        Array.from({ length: 5 }, (_, i) => i + 1)?.map((cur) => [cur, 0])
      )

      scoreValues.map((score) => {
        if (score <= 5) {
          scoreRankMap[score] += 1
        }
        return score
      })

      const scoreRankPercents = Object.values(scoreRankMap)
        ?.reverse()
        ?.map((value) => Math.round((value / scoreTotal) * 100))

      setScoreInfo({ scoreAvg, scoreRankPercents })
    }
  }, [threadInfo])

  return (
    <ScoreBoxContainer>
      {loading ? (
        <LoadingBox>loading...</LoadingBox>
      ) : (
        <>
          <ScoreDashboard
            score={scoreInfo?.scoreAvg || 0}
            scoreCount={5}
            scoreTotal={threadInfo?.scoresCount.toString()}
            scoreRankPercents={scoreInfo?.scoreRankPercents || []}
            mt={10}
            mb={10}
          />
          <ScoreLine
            onRating={() => {
              setScoreModalProps({ ...defaultScoreModalProps, open: true })
            }}
            mb={10}
            disabled={
              sessId in
              (threadInfo?.scores?.edges?.reduce(
                (acc, cur) => ((acc[cur?.node?.creator?.id] = 1), acc),
                {}
              ) || {})
            }
          />
          <ReviewScoreCardList
            scoreList={(
              threadInfo?.scores?.edges?.map((score) => ({
                comment: score?.node?.text,
                value: score?.node?.value,
                key: score?.node?.id,
                name: 'name',
                did: score?.node?.creator?.id,
                onEdit:
                  sessId === score?.node?.creator?.id
                    ? (comment: string, score: number) => {
                        setScoreModalProps({
                          open: true,
                          defaultComment: comment,
                          defaultScore: score,
                        })
                      }
                    : undefined,
              })) || []
            )?.reverse()}
          />
          <ScoreModal
            // open={isScoreModalShow}
            {...scoreModalProps}
            onClose={() => setScoreModalProps(defaultScoreModalProps)}
            submitAction={async ({ comment, score }) => {
              await submitNewScore({ text: comment, value: score })
              setScoreModalProps(defaultScoreModalProps)
              handleGetThreadInfo(threadId)
            }}
            did={sessId}
          />
        </>
      )}
    </ScoreBoxContainer>
  )
}

const ScoreBoxContainer = styled(Box)`
  color: #718096;
`

const LoadingBox = styled(Box)`
  text-align: center;
  padding: 100px 0;
`
