import React, { useEffect, Suspense } from 'react'
import { useSnapshot } from 'valtio'

import { post as POST_STATE } from './state'
import { Empty, Button } from 'antd'
import CodeBlock from '@/components/CodeBlock'

const Post = () => {

  const snap = useSnapshot(POST_STATE)

  const fetchList = async function() {
    POST_STATE.fetchList()
  }

  return (
    <>
      <Button onClick={() => fetchList()}>加载数据</Button>
      <Button onClick={() => POST_STATE.list = []}>清空数据</Button>

      <hr />
        {
          snap.list.length ?  <CodeBlock color='green'>
            {JSON.stringify(snap.list, null, 4)}
          </CodeBlock> : <Empty description='暂无数据' />
        }
    </>
  )
}

export default Post
