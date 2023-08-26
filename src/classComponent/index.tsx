import React from "react";
import Child from "./child";

import { ThemeContext } from './common'

interface IState {
  count: number
  show: boolean
}

interface IProps {
  name: string
}

class ClassDemo extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      count: 0,
      show: true
    }

    this.add = this.add.bind(this)

    // console.log('父组件 constructor')
  }

  // componentDidMount(): void {
  //   console.log('父组件 componentDidMount')
  // }

  // componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
  //   console.log('父组件 componentDidUpdate', prevProps, prevState)
  // }

  // componentWillUnmount(): void {
  //   console.log('父组件 componentWillUnmount')
  // }

  add(e: React.MouseEvent) {

    console.log(e)
    console.log(e.currentTarget)
    console.log(e.nativeEvent.currentTarget)

    this.setState({ count: this.state.count + 1}, () => {
      console.log(this.state.count)
    })
  }

  render() {
    // console.log('父组件 render')
    
    return (
      <ThemeContext.Provider value={'dark'}>
        <p>通过 ip 访问：vite --host 192.168.3.18</p>
        <h1>Class Component{this.state.count}</h1>
        <button onClick={this.add}>add</button>
        <button onClick={() => this.setState({
          show: !this.state.show
        })}>切换</button>

        <hr />

        {
          this.state.show && <Child ref={child => {
            // 
            // console.log('拿到 child 实例 ', child)
  
            // 调用 child 上的方法
            // console.log('拿到 child 实例 ', child?.renderChild())
          }} />
        }
      </ThemeContext.Provider>
    )
  }
}

export default ClassDemo
