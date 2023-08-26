import React from 'react'
import { useRequest } from 'ahooks'

export default function UseRequestDemo() {

  const getUsername = async () => {
    const res = await fetch('https://cnodejs.org/api/v1/topics')
    return res.json()
  }

  const { data, error, loading } = useRequest(getUsername)

  console.log('error ', error)
  console.log('data ', data)

  return (
    <div>
      <h3>UseRequestDemo</h3>
      {loading ? <span style={{ color: 'red' }}>Loading...</span> : null}
      {error ? <span style={{ color: 'red' }}>{error}...</span> : null}
      {data && data.data.length && data.data.map(item => {
        return (
          <div key={item.id} dangerouslySetInnerHTML={{
            __html: item.content
          }}>
            
          </div>
        )
      })}
    </div>
  )
}
