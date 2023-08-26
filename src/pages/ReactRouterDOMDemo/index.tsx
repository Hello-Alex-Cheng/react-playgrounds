import React, { Suspense } from 'react'
import { Tabs, TabPaneProps, Spin } from 'antd'
import {
  useNavigate,
  Outlet,
  useLocation,
  useMatch,
  useMatches,
  useResolvedPath,
  useNavigation,
  useNavigationType,
  useOutlet,
} from 'react-router-dom'

interface Tab extends Omit<TabPaneProps, 'tab'> {
  key: string;
  label: React.ReactNode;
}

const items: Tab[] = [
  {
    label: 'basic',
    key: 'basic',
    children: (<Outlet />)
  },
  {
    label: 'basic-data-router',
    key: 'basic-data-router',
    children: (<Outlet />)
  },
  {
    label: 'user',
    key: 'user',
    children: (<Outlet />)
  },
]

const Home = (props: any) => {
  const location = useLocation()
  const navigate = useNavigate()
  const navigation = useNavigation()
  const navigationType = useNavigationType()
  const match = useMatch({
    path: '/react-router-dom/basic/three',
    // end: true
  })
  const handleTabChanged = (key: string) => {
    navigate(key)
  }
  const matches = useMatches()
  const resolved = useResolvedPath(location.pathname)

  // console.log(location)
  // console.log(match, resolved)
  // console.log(matches)
  // console.log(navigate.state)
  console.log(useOutlet())

  return (
    <Spin spinning={navigation.state === 'loading'}>
      <Tabs
        // activeKey={current!.key}
        type='card'
        tabPosition='left'
        items={items}
        onChange={handleTabChanged}
      />
    </Spin>
  )
}

export default Home
