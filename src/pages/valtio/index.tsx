import React, { Suspense } from 'react'
import {
  Card,
  Divider,
  Button,
  Spin,
  Input,
} from 'antd'
import {
  user as USER_STATE,
  synchronously as synchronously_state,
  synchronouslyDrive,
} from './state'
import { useSnapshot, subscribe } from 'valtio'
import { auth } from '@/config/firebase'
import CodeBlock from '@/components/CodeBlock'
import styles from './index.module.less'

import Post from './post'

const Index = () => {

  // 快照
  const userStateSnap = useSnapshot(USER_STATE)

  // 订阅
  // const unsubscribe = subscribe(USER_STATE, () => {
  //   console.log('state has changed to ', USER_STATE)
  // })

  if (userStateSnap.dom) {
    userStateSnap.dom.setAttribute('style', 'background-color: #ccc')
  }
  return (
    <>
      <CodeBlock color='green'>
        {JSON.stringify(userStateSnap, null, 2)}
      </CodeBlock>
      <div>
        <Button onClick={() => {
          console.log('auth ', auth.currentUser)
          USER_STATE.updateAge(Math.random())
        }}>修改 age</Button>
        <Button onClick={() => {
          USER_STATE.updateNameAsync('你好啊，异步修改 name')
        }}>异步修改 name</Button>
        {/* <Button onClick={() => unsubscribe()}>取消订阅</Button> */}
      </div>
    </>
  )
}

const UpdateSynchronously = () => {

  // 必须要加 sync，否则从已有的字符中间输入，光标总是会跳到末尾
  const { value } = useSnapshot(synchronously_state, { sync: true })
  const { doubled, ...rest } = useSnapshot(synchronouslyDrive)

  console.log('rest, ', rest)

  return (
    <>
      <p>{value}</p>

      <p>使用派生代理 derive {doubled}</p>

      <Input
        value={value}
        onChange={e => synchronously_state.value = +e.target.value}
      />
    </>
  )
}

const ValtioDemo = () => {
  return (
    <div className={styles.valtioContainer}>
      <Card title="valtio state" extra={<a href="#">More</a>}>
        <Suspense fallback={<h1>Loading data...</h1>}>
          <Index />
        </Suspense>
      </Card>
      <hr />
      <Card
        title="配合 React Suspense 异步加载数据"
        extra={<a href="#">More</a>}
        bodyStyle={{ minHeight: '200px' }}
      >
        <Suspense fallback={
          <Spin spinning size='large' tip='Loading...' wrapperClassName={styles.spinWrapper}>{' '}</Spin>
        }>
          <Post />
        </Suspense>
      </Card>
      <hr />
      <Card
        title="同步更新"
        extra={<a href="#">More</a>}
      >
        <UpdateSynchronously />
      </Card>
    </div>
  )
}

export default ValtioDemo
