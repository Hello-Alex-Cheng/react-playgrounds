import React, {useState} from 'react'
import { Skeleton, Button } from 'antd'


import { fetchImmutableUser, fetchUser } from '@/utils/swrRequest'
import usePersistentPooling from '@/utils/usePersistentPooling'

const Basic = () => {
  const [userId, setUserId] = useState(1)
  const [isPause, setPause] = useState(false)
  const { data, isLoading, error, mutate } = fetchUser(userId, {
    isPaused() {
      return isPause
    },
    fallbackData: {
      name: '程浩伦' // 请求未成功时，此请求的初始化数据
    }
  })

  if (isLoading) return <Skeleton />

  // throw new Error('手动报错') // ErrorBoundary 捕获

  return (
    <div style={{ padding: '24px', backgroundColor: '#888', margin: '24px 0' }}>
      <Button onClick={() => setPause(!isPause)}>Pause {`'${isPause}'`}</Button>

      <p>username: {data.name}</p>

      <Button onClick={() => {
        setUserId(userId + 1)
      }}>修改id</Button>
  
      <Button onClick={() => mutate()}>手动加载</Button>
    </div>
  )
}

export default Basic
