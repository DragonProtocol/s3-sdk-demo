import { useCallback, useEffect, useState } from 'react'
import { Thread, useUs3rThreadContext } from '@us3r-network/thread'

export const useGetThreadScoreInfo = (threadId?: string) => {
  const { getThreadInfo } = useUs3rThreadContext()!
  const [threadInfo, setThreadInfo] = useState<Thread>()
  const [scoreInfo, setScoreInfo] = useState({})
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!threadId) return
    setLoading(true)
    getThreadInfo(threadId)
      .then((data) => {
        setThreadInfo(data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
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

      const scoreList = threadInfo?.scores?.edges?.map((score) => ({
        comment: score?.node?.text,
        value: score?.node?.value,
        key: score?.node?.id,
        name: 'name',
        did: score?.node?.creator?.id,
      }))?.reverse()

      setScoreInfo({ scoreAvg, scoreList })
    }
  }, [threadInfo])

  return scoreInfo
}
