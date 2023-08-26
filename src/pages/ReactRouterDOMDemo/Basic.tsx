import React, { useState } from 'react'
import { Radio } from 'antd'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import CodeBlock from '@/components/CodeBlock'

const CodeBlockContent = `
<Routes>
  <Route path='' element={<Navigate to='one' />}></Route>
  <Route path='one' element={<One />} />
  <Route path='two' element={<h1>Baisc two</h1>} />
  <Route path='three' element={<h1>Baisc three</h1>} />
</Routes>
`

const One = () => {
  return (
    <>
      <h1>Baisc One</h1>
      <CodeBlock color='blue'>{CodeBlockContent}</CodeBlock>
    </>
  )
}

const Basic = () => {
  const [size, setSize] = useState('large')
  const navigate = useNavigate()

  return (
    <>
      <h1>Basic Router</h1>

      <Radio.Group value={size} onChange={e => {
        navigate(e.target.value)
      }}>
        <Radio.Button value="one">one</Radio.Button>
        <Radio.Button value="two">two</Radio.Button>
        <Radio.Button value="three">three</Radio.Button>
      </Radio.Group>
      <hr />

      <Routes>
        <Route path='' element={<Navigate to='one' />}></Route>
        <Route path='one' element={<One />} />
        <Route path='two' element={<h1>Baisc two</h1>} />
        <Route path='three' element={<h1>Baisc three</h1>} />
      </Routes>
    </>
  )
}

export default Basic
