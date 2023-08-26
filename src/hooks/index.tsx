import React, { useState, useEffect, useContext } from 'react'

import UseContext from './useContext'
import UseReducer from './useReducer'
import UseCallback from './useCallback'
import UseRef from './useRef'
import UseImperativeHandle from './useImperativeHandle'

const Hooks = () => {

  return (
    <>
      <UseContext />
      <UseReducer />
      <UseCallback />
      <UseRef />
      <UseImperativeHandle />
    </>
  )
}

export default Hooks
