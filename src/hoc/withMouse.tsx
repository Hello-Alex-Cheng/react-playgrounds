import React from "react";

interface IState {
  mouse: {
    x: number
    y: number
  }
}

const withMouse = function(Comp: React.FC<IState>) {

  class MouseComponent extends React.Component<{}, IState> {

    constructor(props: {}) {
      super(props)

      this.state = {
        mouse: {
          x: 0,
          y: 0
        }
      }
    }

    onMouseMove(event: React.MouseEvent) {
      this.setState({
        mouse: {
          x: event.clientX,
          y: event.clientY,
        }
      })
    }

    render() {
      return <div onMouseMove={this.onMouseMove.bind(this)}>
        <Comp {...this.props} mouse={this.state.mouse}/>
      </div>
    }
  }

  return MouseComponent
}

export default withMouse
