import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  PlaySquareOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Dropdown, Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.less'
import { auth } from '../config/firebase'
import { User, signOut } from 'firebase/auth'

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to='/react-router-dom'>React Router v6</Link>, 'react-router-dom', <PieChartOutlined rev={''} />),
  getItem(<Link to='/valtio'>valtio</Link>, 'valtio', <DesktopOutlined rev={''} />),
  getItem(<Link to='/movies'>Firebase Movies</Link>, 'movies', <PlaySquareOutlined rev='' />),
  getItem('SWR', 'swr', <UserOutlined rev={''} />, [
    getItem(<Link to='/swr/basic'>基础使用</Link>, 'swr-basic'),
    getItem(<Link to='/swr/special'>主要特性</Link>, 'swr-special'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined rev={''} />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined rev={''} />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userinfo, setUserinfo] = useState<User | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  console.log(location)

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('token')
      navigate('/login')
    } catch (error: any) {
      message.error(error.message)
    }
  }
  
  const userItems = [
    getItem(<span onClick={handleLogout}>Logout</span>, 'logout'),
  ]
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      console.log('auth user', user)
      setUserinfo(user)
    })

    return () => unsubscribe()
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className={styles.logo}>React Learning</div>
        <Menu
          theme="dark"
          selectedKeys={['swr', 'swr-basic']}
          defaultSelectedKeys={['react-router-dom']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: '0 12px',
            backgroundColor: '#69c',
            textAlign: 'right'
          }}>
          <Dropdown
            menu={{items: userItems}}
            placement="bottom"
            arrow
          >
            <Button size='small'>Hi,{auth.currentUser?.displayName || auth.currentUser?.email || '请登录'}</Button>
          </Dropdown>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{location.pathname}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;