import React from 'react'

interface IProps {
  color?: string;
}

const CodeBlock = (props: React.PropsWithChildren<IProps>) => {
  return (
    <pre style={{ color: props.color }}>
      {props.children}
    </pre>
  )
}

export default CodeBlock
