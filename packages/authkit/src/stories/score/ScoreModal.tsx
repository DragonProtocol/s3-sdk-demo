import React from 'react'
import { ScoreModal } from '@us3r-network/authkit'
import App from '../app/App'

const Page: React.VFC = () => {
  return (
    <App>
      <ScoreModal
        open={true}
        onClose={() => {}}
        submitAction={() => {}}
        did=""
      />
    </App>
  )
}

export default Page
