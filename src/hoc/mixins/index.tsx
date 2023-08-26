import { Component } from 'react'

const customMixin = {
  componentDidMount() {
    console.log(' --- componentDidMount --- ')
  },
  sayName() {
    console.log(this.state.name)
  }
}

function componentClassMixins(Component, mixin){ /* 继承 */
  for(let key in mixin){
    Component.prototype[key] = mixin[key]
  }
}

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'mixins'
    }
  }

  render() {
    return (
      <div> hello,world
        <button onClick={ this.sayName.bind(this) } > to say </button>
      </div>
    )
  }
}

componentClassMixins(Index, customMixin)

export default Index
