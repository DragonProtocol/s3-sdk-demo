import React from 'react'
import { ReviewScoreCard } from '@us3r-network/authkit'
import App from '../app/App'

const Page: React.VFC = () => {
  return (
    <App>
      <ReviewScoreCard score={4} comment="comment" did="did" name="name" />
    </App>
  )
}

export default Page
