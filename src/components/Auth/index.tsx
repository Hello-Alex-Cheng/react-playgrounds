import React, { useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
} from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

import { GoogleCircleFilled } from '@ant-design/icons'
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  User,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import { auth, googleProvider } from '../../config/firebase'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { Form_Values, IUserinfo } from './interface'

export default function Auth() {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinish = async (values: Form_Values) => {
    const { email, password } = values
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      console.log('sigin res ', res)
      if (res.user) {
        message.success(`注册成功! uid:${res.user.uid}`)
      }
    } catch (error: any) {
      console.log('error ', error)
      message.error(error.message)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }

  interface Iuserinfo extends User { accessToken?: string; }

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      const userinfo: Iuserinfo | null = auth.currentUser
      console.log('signInWithGoogle user info ', auth.currentUser)

      if (userinfo && userinfo.accessToken) {
        localStorage.setItem('token', userinfo.accessToken)
        navigate('/')
      }

    } catch (error: any) {
      message.error(error.message)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('token')
      navigate('/login')
    } catch (error: any) {
      message.error(error.message)
    }
  }

  const handleLogin = async () => {
    const values = form.getFieldsValue()
    if (!(values.email && values.password)) {
      return message.error('need email and password!')
    }

    // SignInWithEmailAndPassword（身份验证、电子邮件、密码）:	使用电子邮件和密码异步登录。
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password)

      auth.onAuthStateChanged((user: Iuserinfo | null) => {
        console.log(user)
        if (user && user.accessToken) {
          localStorage.setItem('token', user.accessToken)
          navigate('/')
        }
      })
    } catch (error: any) {
      message.error(error.message)
    }
  }

  const location = useLocation()
  const token = localStorage.getItem('token')
  const from = location.state?.from?.pathname || '/'

  if (token) {
    return <Navigate to={from} replace />
  }

  return (
    <div style={{
      width: '600px',
      position: 'absolute',
      left: '50%',
      marginLeft: '-300px',
      top: '10%'
    }}>
      <Form
        name="Registry"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
        >
          <Input autoComplete='email' />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, type: 'string', whitespace: true, message: 'Please input your password!' }]}
        >
          <Input.Password autoComplete='current-password' />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            size='small'
            shape="circle"
            icon={<GoogleCircleFilled rev='1' />}
            onClick={signInWithGoogle}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={handleLogin}>
            Login
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' danger onClick={logout}>
            Logout
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
