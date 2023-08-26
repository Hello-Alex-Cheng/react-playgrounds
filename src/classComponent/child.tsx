import React from "react";
import ReactDOM from "react-dom";
import { ThemeContext } from './common'

interface IState {
  list: Array<number>
  random: number
  me: {
    name: string
  }
}

export default class Child extends React.PureComponent<{}, IState> {

  static contextType = ThemeContext;

  constructor(props: {}) {
    super(props)
    this.state = {
      random: Math.random(),
      list: [1,2,3],
      me: {
        name: 'alex'
      }
    }
  }

  // shouldComponentUpdate(nextProps: Readonly<{}>, nextState: Readonly<IState>, nextContext: any): boolean {
  //   console.log('???', nextState.list === this.state.list)
  //   if (nextState.list === this.state.list) {
  //     return false
  //   }

  //   return true
  // }

  // componentDidMount(): void {
  //   console.log('子组件 componentDidMount')
  // }

  // componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
  //   console.log('子组件 componentDidUpdate', prevProps, prevState)
  // }

  // componentWillUnmount(): void {
  //   console.log('子组件 componentWillUnmount')
  // }

  renderChild() {
    return 'Child component'
  }

  onPushList() {
    this.state.list.push(4)

    this.setState({
      list: this.state.list
    })


    // this.setState({
    //   list: this.state.list.concat(4)
    // })
  }

  render(): React.ReactNode {
    return <>
      <h1>Child Component</h1>
      <button onClick={this.onPushList.bind(this)}>push list</button>

      <button onClick={() => {
        this.state.me.name = '0999999'
        this.setState({
          me: this.state.me
        })
      }}>change name</button>

      {this.state.me.name}

      <ul>
        {
          this.state.list.map(i => <li key={i}>{i}</li>)
        }
      </ul>
    </>
    // return ReactDOM.createPortal(
    //   <>
    //     <h1>Child Component</h1>
    //   </>,
    //   document.body
    // )
  }
}
