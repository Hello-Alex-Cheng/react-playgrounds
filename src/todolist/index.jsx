import React, { useState } from "react";
import { connect } from 'react-redux'
import { clearInputValue } from './utils'

const TodoList = (props) => {
  const [inputValue, setValue] = useState('')

  return (
    <>
      <div>
        <input type="text" value={inputValue} onChange={e => setValue(e.target.value)} />

        <button onClick={() => {
          props.add_todo({
            type: 'ADD_TODO',
            text: inputValue,
          })

          clearInputValue(setValue, '')
        }}>添加</button>
      </div>

      <ul>
        {
          props.todos.map((item, idx) => 
            <li
              key={item.id}
              style={{ textDecoration: item.complete ? 'line-through' : 'none'}}
              onClick={() => props.toggle_todo(idx)}
            >
              {item.text} <button onClick={e => {
                e.stopPropagation()

                props.delete_todo(idx)
              }}>删除</button>
            </li>
          )
        }
      </ul>
    </>
  )
}


const mapStateToProps = (state, ownProps) => {

  console.log('ownProps ', ownProps)
  
  return {
    todos: state.todos
  }
};

// const mapDispatchToProps = {
//   increment,
//   decrement,
// }

const mapDispatchToProps = (dispatch) => {
  return {
    add_todo: todo => dispatch(todo),
    toggle_todo: index => dispatch({
      type: 'TOGGLE_TODO',
      index
    }),
    delete_todo: index => dispatch({
      type: 'DELETE_TODO',
      index
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
