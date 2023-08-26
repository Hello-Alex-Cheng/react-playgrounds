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

## 每次刷新页面 auth 对象为 null?

当导航到新页面时，正在重新加载 `Firebase` 身份验证 SDK。此时 Firebase 会自动刷新当前用户的身份验证状态，但这可能需要往返服务器。我们使用 `firebase.auth.currentUser` 获取当前登录人信息，刷新显然还没有完成。

出于这个原因，应该使用`onAuthStateChange`来监听更改，如获取当前登录用户的文档中所示：

```js
import { auth } from '../config/firebase'
import { User } from 'firebase/auth'

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
    setUserinfo(user)
  })

  return () => unsubscribe()
}, [])
```

# Firestore Database

尽量使用 `Firestore Database`，而不是 `Realtime Database`

`create database`

`start collection`

为了方便查看效果，我们先手动创建一条数据。`add document`

然后我们到 `config/firebase` 中配置 `db`

```js
// connect db
import { getFirestore } from 'firebase/firestore'
export const db = getFirestore(app)
```

去组件中使用

```js
import { db } from '@/config/firebase'
import { getDocs, collection } from 'firebase/firestore'

const getMovieList = async () => {
  const movieCollectionRef = collection(db, 'movies')
  const data = await getDocs(movieCollectionRef)

  console.log(data)
}

useEffect(() => {
  getMovieList()
}, [])
```

此时我们刷新页面，很有可能拿不到数据，因为当我们创建数据库时，没有开放权限。`Uncaught (in promise) FirebaseError: Missing or insufficient permissions.`

我们回到 firebase 数据库中，修改 rule，修改后 `发布`。
```js
// rule

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
这样任何人都可以访问和修改了，暂时先这样，后面再补上特定的权限规则。

再刷新页面，我们就能拿到数据了。不过返回的数据有点杂，我们还需要进一步处理，才能拿到我们想要的数据。




# 部署到 firebase

> firebase login
>
> firebase init
>
> firebase deploy
