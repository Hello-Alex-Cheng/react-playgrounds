import React, { useReducer } from 'react'

/**
 * useState 的替代方案。它接收一个形如 (state, action) => newState 的 reducer
 * 并返回当前的 state 以及与其配套的 dispatch 方法。
 */

const initialState = {count: 0};

const reducer = (state: typeof initialState, action: Record<string, string>) => {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

const UseReducer = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <p>count: {state.count}</p>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  )
}

export default UseReducer
