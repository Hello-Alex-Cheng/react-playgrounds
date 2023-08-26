import { legacy_createStore as createStore, combineReducers } from 'redux'


let todoID = 0

const initialState = {
  todos: [
    {
      id: todoID,
      text: '这是默认的 Todo',
      complete: true
    }
  ]
}

const todosReducer = (state = initialState.todos, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: ++todoID,
          text: action.text,
          complete: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            complete: !todo.complete
          })
        }
        return todo
      })
    case 'DELETE_TODO':
      return state.filter((_, idx) => idx !== action.index)
    default:
      return state;
  }
}

// function todoApp(state = initialState, action) {
//   return {
//     todos: todosReducer(state.todos, action)
//   }
// }

const todoApp = combineReducers({
  todos: todosReducer
})

const cacheState = localStorage.getItem('cacheState')

console.log(JSON.parse(cacheState))
// 第一个参数是 reducer，第二个参数是 initialState
const store = createStore(todoApp, cacheState ? JSON.parse(cacheState) : initialState)


store.subscribe(() => {
  console.log('getState ', store.getState())
  localStorage.setItem('cacheState', JSON.stringify(store.getState()))
})

export default store