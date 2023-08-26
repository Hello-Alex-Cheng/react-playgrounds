# 环境
- node > v14.16.0

# React 学习项目

- class component
- ahooks
- esm
- HOC
- react-router
- Valtio
- Redux
- antd
- Vite
- `Firebase`


# Firebase

> npm install -g firebase-tools

## 将配置项放到项目中

> src/config/firebase.ts

## Authentication

使用 `Authentication`，选择项目的登录授权方式。

- Google

- Facebook

- Github

- Twitter

- 原生提供方（电子邮件地址/密码、电话、匿名）


先试用原生提供方 `email` 登录方式：

```js
// firebase.ts
import { getAuth } from 'firebase/auth'
export const auth = getAuth(app)

// components/auth.tsx
import { createUserWithEmailAndPassword,  } from 'firebase/auth'
import { auth } from '../../config/firebase'

// 表单提交
const onFinish = async (values: Form_Values) => {
  const { email, password } = values
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (res.user) {
      message.success(`注册成功! uid:${res.user.uid}`)
    }
  } catch (error: any) {
    message.error(error.message)
  }
}
```

Google Login

```js
// firebase.ts
import { GoogleAuthProvider } from 'firebase/auth'
export const googleProvider = new GoogleAuthProvider()

// components/auth.tsx
import {
  signInWithPopup,
} from 'firebase/auth'

const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider)
  } catch (error: any) {
    message.error(error.message)
  }
}
```

我们可以在 `auth` 中获取当前用户的所有信息

```js
import { auth } from '../../config/firebase'

console.log(auth.currentUser)
console.log(auth.currentUser?.photoURL)
```

# Firestore Database

尽量使用 `Firestore Database`，而不是 `Realtime Database`


# 部署到 firebase

> firebase login
>
> firebase init
>
> firebase deploy
