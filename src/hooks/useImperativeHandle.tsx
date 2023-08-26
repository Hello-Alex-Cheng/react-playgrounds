import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'

// React.forwardRef 会创建一个React组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  // useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    alert () {
      alert(1)
    }
  }));
  return <input ref={inputRef} {...props} />;
})

const UseRef = () => {
  const inputEle = React.createRef()

  const btnClick = () => {
    // inputEle.current.focus()
    inputEle.current.alert()
  }


  return (
    <>
      <h1>UseImperativeHandle</h1>
      <FancyInput ref={inputEle} />
      <button onClick={() => btnClick()}>操作</button>
    </>
  )
}

export default UseRef
