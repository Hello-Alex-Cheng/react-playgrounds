import React, { useState, useCallback, memo, useMemo } from 'react'

// 通过 memo 缓存组件
// 1. 当 memo 感知 props 没有发生改变时，不会重新 render 组件，如果传入 count进来，Child组件就会重新 render
// 2. 如果我们将 setCount 当做 prop 传入进来，Child 不会重新render
// 3. 如果传入我们自己定义的方法 (fn)进来，Child会重新 render，因为 Demo 组件每次更新 count 后，重新生成了 fn 函数
// 4. 通过 useCallback 包裹我们自己定义的函数，则会缓存 fn 函数，只要 useCallback 依赖项没发生改变（比如传一个空数组），返回的函数都不会改变，最终Child组件也不会重新 render
// 5. 如果 useCallback 依赖项发生了改变，则表示返回了新的 fn 函数，会引起 Child 组件重新 render

// useCallback 用法
// 当 Demo 组件内部 state 发生了改变引起重新 render
// 并且 Child 组件接受了一个来自 Demo 组件自定义的方法（fn）
// 如果不希望 Child 组件重新 render，那么就需要用 useCallback 钩子将自定义方法包裹起来
// 因为 Child 组件 props 里面的 fn 和 useCallback 返回的 fn 指向的是内存中的同一个地址，那么 Child 组件就不会更新
// 因为 useCallback 返回新函数的条件是：依赖项（第二个参数）发生了改变。
// 如果说我们的 Child 组件，本身就是需要根据 count 变化而变化，那么就不需要加这个缓存 API了，反而增加其计算负担。

interface IChild {
  fn: React.Dispatch<React.SetStateAction<number>>
}

const Child = memo((props: IChild) => {
  console.log('Child')
  return (
    <>Child component</>
  )
})

const Demo = () => {
  const [count, setCount] = useState(0)

  const fn = useCallback(() => {
    console.log('is fn')
  }, [])

  const computedCount = useMemo(() => {
    return count * 2
  }, [count])

  return (
    <>
      <h1>useCallback</h1>
      <p>count: {count} | computedCount: {computedCount}</p>
      <button onClick={() => setCount(count => count + 1)}>+</button>

      <Child fn={setCount} />
    </>
  )
}

export default Demo

// 页面结构
// 把不变的组件和变化的组件抽离出来
// 比如可以把 count 相关部分抽离成一个 Count 组件，这样就把变化的 Count 组件和 Child 组件分开了，也不会引起 Child 组件做多余的 render

// 同层级
// <Count />
// <Child prop={fn} />

// 或者是通过 props.children 渲染 Child，也不会造成 Child 重新 render

const Count = (props: any) => {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>useCallback</h1>
      <p>count: {count}</p>
      <button onClick={() => setCount(count => count + 1)}>+</button>

      {/* children 不会重新 render */}
      {props.children}
    </>
  )
}
const Demo1 = () => {
  const fn = () => {}
  return (
    <>
      <Count>
        <Child fn={fn} />
      </Count>
    </>
  )
}


// React 组件性能优化
// 1. 尽可能的保证组件不去发生变化（发生变化的因素：state、props、context）

// 2. React 是如何比较这三者的？
// 内存地址

// 在 Demo 组件中，setCount 会引起 state 变化，从而 Demo 组件重新render，那么 Demo 组件内部的 fn 函数也会重新生成
// 导致传入给 Child 时，fn 和上次的 fn 内存地址不一样，从而判定 Child 组件的 props 发生了变化
// 最终引起了 Child 重新render


// 参考：https://www.bilibili.com/video/BV1eB4y1h7W4?spm_id_from=333.337.search-card.all.click
