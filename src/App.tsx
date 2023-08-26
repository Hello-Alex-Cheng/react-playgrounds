import React from 'react'
import { connect } from 'react-redux'
import logo from './logo.svg'
import LayoutComp from './layout'
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

// import './App.css'
// import TodoList from './todolist'
// import UseRequestDemo from '@/ahooks-demo/useRequest'

import ReactRouterDOMDemo from './pages/ReactRouterDOMDemo'
import Baisc from './pages/ReactRouterDOMDemo/Basic'
import BasicDataRouter from './pages/ReactRouterDOMDemo/BasicDataRouter'

import Auth from '@/components/Auth'

import User from './pages/User'
import UserDetail from './pages/User/details'
import NoMatch from './pages/404'

import ValtioDemo from './pages/valtio'

interface IProps {
  todos: []
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Navigate to='/react-router-dom'/>} />
      <Route path='/' element={<LayoutComp />}>
        {/* 子路由 */}
        <Route path='react-router-dom' element={<ReactRouterDOMDemo />}>
          <Route path='' element={<Navigate to='/react-router-dom/basic'/>} />
          <Route path='basic/*' element={<Baisc />}>
          </Route>
          <Route
            path='basic-data-router/*'
            loader={() => {
              return new Promise(r => {
                setTimeout(() => {
                  r({
                    message: 'hello world!!!!'
                  })
                }, 3000);
              })
            }}
            element={<BasicDataRouter />}
          />
          <Route path='user' element={<User />}>
            <Route path='details' element={<UserDetail />}></Route>
            <Route
              path=':userId'
              element={<UserDetail />}
            />
          </Route>
        </Route>
        <Route path='valtio' element={<ValtioDemo />}></Route>
      </Route>
      <Route path='/login' element={<Auth />} />
      <Route path='*' element={<NoMatch />}></Route>
    </>
  )
)

function App(props: IProps) {

  // console.log('app console ', props.todos)
  // const snap = useSnapshot(state)

  return (
    // <HashRouter basename='/'>
    //   {/* 如果觉得这样写麻烦，也可以通过 useRoutes 配置路由表 */}
    //   <Routes>
    //     {/* Navigate重定向 */}
    //     <Route path='/' element={<Navigate to='/react-router-dom'/>} />

    //     <Route path='/' element={<LayoutComp />}>
    //       {/* 子路由 */}
    //       <Route path='react-router-dom' element={<ReactRouterDOMDemo />}>
    //         <Route path='' element={<Navigate to='/react-router-dom/basic'/>} />
    //         <Route path='basic/*' element={<Baisc />}></Route>
    //         <Route path='basic-data-router/*' element={<BasicDataRouter />}></Route>
    //       </Route>
    //       <Route path='user' element={<User />}>
    //         <Route path='details' element={<UserDetail />}></Route>
    //       </Route>
    //       <Route
    //         path='user/:userId'
    //         element={<UserDetail />}
    //       />
    //     </Route>
    //     <Route path='*' element={<NoMatch />}></Route>
    //   </Routes>
    // </HashRouter>

    <RouterProvider router={router} fallbackElement={<p>Component Loading...</p>} />
  )
}


if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

const mapStatetoProps = (state: IProps) => {

  console.log('redux state ', state)
  return {
    todos: state.todos
  }
}

export default connect(mapStatetoProps)(App)
