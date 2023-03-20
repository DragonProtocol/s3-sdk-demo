import React from 'react'
import { ReviewScoreCardList } from '@us3r-network/authkit'
import App from '../app/App'

const Page: React.VFC = () => {
  return (
    <App>
      <ReviewScoreCardList
        scoreList={[
          {
            score: 5,
            comment: 'comment',
            did: 'did',
            name: 'name',
            key: 'key',
          },
        ]}
      />
    </App>
  )
}

export default Page
