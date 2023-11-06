import React, { Suspense, useState } from 'react'
import { Button, message } from 'antd'
import ErrorBoundary from './ErrorBoundary'
import Baisc from './basic'
import Trigger from './trigger'
import styles from './index.module.less'


import { SWRConfig, mutate } from 'swr'

const Swr = () => {

  const [showBasic, setShowBasic] = useState(true)

  return (
    <SWRConfig value={{
      onError: (error, key) => {
        if (error.status !== 403 && error.status !== 404) {
          // 我们可以把错误发送给 Sentry，
          // 或显示一个通知 UI。
          message.error(error.message)
        }
      }
    }}>
      <h1>SWR</h1>
      <hr />

      {/* 验证 revalidateOnMount， */}
      <Button onClick={() => setShowBasic(!showBasic)}>Toggle</Button>
      <Button onClick={() => {
        // 通知所有拥有这个 key SWR 重新验证
        mutate(`https://jsonplaceholder.typicode.com/users/${1}`, {
          name: '立即更新的数据'
        })
      }}>global mutate</Button>

      {
        showBasic ? (
          <ErrorBoundary>
            {/* <Suspense> 允许在子组件完成加载前展示后备方案。 */}
            <Suspense fallback={<h1>Suspense Loading...</h1>}>
              <Baisc />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <div>Empty...</div>
        )
      }
      

      <Trigger />
    </SWRConfig>
  )
}

export default Swr
