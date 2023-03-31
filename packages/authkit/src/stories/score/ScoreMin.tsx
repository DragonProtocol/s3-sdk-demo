import React from 'react'
import { ScoreMin } from '@us3r-network/authkit'
import App from '../app/App'

const Page: React.VFC = () => {
  return (
    <App>
      <ScoreMin score={5} />
    </App>
  )
}

export default Page
