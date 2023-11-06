import React from 'react'
import { Button } from 'antd'
import { fetchPosts } from '@/utils/swrRequest'

const Trigger = () => {
  const trigger = fetchPosts(1)

  return (
    <div>
      <hr />
      <h1>useSWRMutation Tigger</h1>

      <div>
        <Button onClick={() => trigger('1111')}>trigger</Button>
      </div>
    </div>
  )
}

export default Trigger
