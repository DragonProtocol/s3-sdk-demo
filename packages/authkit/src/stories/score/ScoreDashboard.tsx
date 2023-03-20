import React from 'react'
import { ScoreDashboard } from '@us3r-network/authkit'
import App from '../app/App'

const Page: React.VFC = () => {
  return (
    <App>
      <ScoreDashboard
        score={5}
        scoreCount={5}
        scoreTotal="10"
        scoreRankPercents={[10]}
        mt={10}
        mb={10}
      />
    </App>
  )
}

export default Page
