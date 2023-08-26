import React, { useState, useRef, ReactElement, useMemo, useCallback, forwardRef } from 'react'

const useClientRect = () => {
  const [rect, setRect] = useState(null)
  const ref = useCallback(node => {
    if (node) {
      setRect(node.getBoundingClientRect())
    }
  }, [])

  return [rect, ref]
}


const UseRef = () => {
  const [count, setCount] = useState(0)
  const [rect, ref] = useClientRect()

  // const inputEle = useRef(null)
  const inputEle = React.createRef()

  const btnClick = () => {
    inputEle.current.focus()


    setCount(c => c + 1)
  }


  return (
    <>
      <input ref={inputEle} type="text" />

      <h1 ref={ref}>是 H1 标签 {count}</h1>

      {
        rect && <span>{rect.height}</span>
      }

      <button onClick={() => btnClick()}>操作</button>
    </>
  )
}

export default UseRef
