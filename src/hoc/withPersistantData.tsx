import React from 'react'

const withPersistantData = (key: string) => (WrappedComponent: React.FC<{data: any}>) => {
  class Wrapper extends React.Component<{}, {data: any}> {
    constructor(props: {} | Readonly<{}>) {
      super(props)
      this.state = {
        data: null
      }
    }

    componentDidMount() {
      this.setState({
        data: localStorage.getItem(key)
      })
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />
    }
  }

  // Wrapper.staticName = WrappedComponent.staticName

  return Wrapper
}

export default withPersistantData
