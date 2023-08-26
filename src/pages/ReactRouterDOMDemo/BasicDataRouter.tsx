import React, { useState } from 'react'
import { Radio } from 'antd'
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
  useMatches,
} from 'react-router-dom'

import CodeBlock from '@/components/CodeBlock'

const CodeBlockContent = `
  <Route
    path='basic-data-router/*'
    loader={() => {
      return new Promise(r => {
        setTimeout(() => {
          r({
            message: 'hello world!!!!'
          })
        }, 3000);
      })
    }}
    element={<BasicDataRouter />}
  />

  <RouterProvider
    router={router}
    fallbackElement={<p>Component Loading...</p>}
  />
`

const LazyCompBlockContent = `
  const sleep = () => {
    return new Promise((r) => {
      setTimeout(() => {
        r(1);
      }, 3000);
    });
  };

  const About = React.lazy(async () => {
    await sleep();
    return import('./pages/About');
  });

  ...

  <Route
    path="about"
    element={
      <React.Suspense fallback={<>Loading...</>}>
        <About />
      </React.Suspense>
    }
  />
`

const BasicDataRouter = () => {

  const data = useLoaderData() as ({ message: string})

  return (
    <>
      <h1>Basic Data Router</h1>

      <hr />

      <p>Loader Meaage: {data.message}</p>

      <p>Loading 状态，是根据 `useNavigation` 中的 state 来判断的。</p>

      <CodeBlock color='blue'>{CodeBlockContent}</CodeBlock>

      <hr />

      <p>下面是通过 `React.lazy` 和 `Suspense` 懒加载路由组件的例子。</p>
      <CodeBlock color='blue'>{LazyCompBlockContent}</CodeBlock>
    </>
  )
}

export default BasicDataRouter
