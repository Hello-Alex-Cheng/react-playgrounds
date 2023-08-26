import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Dropdown, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from './index.module.less'
import { auth } from '../config/firebase'
import { User } from 'firebase/auth'

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
  getItem('User', 'sub1', <UserOutlined rev={''} />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined rev={''} />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined rev={''} />),
];

const userItems = [
  getItem('Logout', 'logout'),
]

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userinfo, setUserinfo] = useState<User | null>(null)

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
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
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
            <Button size='small'>Hi,{auth.currentUser?.displayName || '请登录'}</Button>
          </Dropdown>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
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