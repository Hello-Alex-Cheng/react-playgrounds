import * as React from 'react'

interface IDemo {
  message: string
}

// React.FunctionComponent => React.FC
const Demo: React.FunctionComponent<IDemo> = ({ message, children }) => {
  return (
    <>
      <div>{message}</div>
      {children}
    </>
  )
}

const Demo1: React.FC<IDemo> = (props) => {
  return (
    <>
      <div>{props.message}</div>
      {props.children}
    </>
  )
}

const Demo2: React.FC = props => props.children
