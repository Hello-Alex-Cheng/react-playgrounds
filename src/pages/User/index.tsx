import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom'

const User = () => {
  return (
    <>
      <h1>User Page</h1>
      <hr />

      <Link to='11'>Link 去详情</Link> <br />
      <NavLink
        to='11'
        style={({ isActive, isPending}) => {
          console.log('活动? ', isActive, isPending)
          return {
            color: isActive ? 'red' : '#333'
          }
        }}
      >NavLink 去详情</NavLink>


      <hr />
      <p>“ NavLink”是一种特殊的“ Link”，它知道它是“活动的”还是“挂起的”。这在构建导航菜单时非常有用，比如面包屑或一组选项卡，您可以在其中显示当前选择了哪些选项卡。</p>
      <Outlet />
    </>
  )
}

export default User
