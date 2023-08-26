import React from 'react'
import { Empty, Button } from 'antd';
import { useNavigate } from 'react-router-dom'
import styles from './index.module.less'

const NoMatch: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.noMatch}>
      <div>
        <Empty description={false} />
        <h1>404</h1>
        <Button type='primary' size='small' onClick={() => navigate('/')}>返回首页</Button>
      </div>
    </div>
  )
}

export default NoMatch;