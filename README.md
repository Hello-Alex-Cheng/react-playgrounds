# React Playgrounds
一个React游乐场，进行实验和探索的性质，玩转 React 生态。

# 环境
- node > v14.16.0

- use firebase tools > v16.13.0

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

> https://firebase.google.com/docs/reference/js/auth?hl=zh-cn

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

## CRUD

- 查询数据

```js
import { db } from '@/config/firebase'
import { getDocs, collection } from 'firebase/firestore'

export default function FirebaseMovies() {
  // 拿到数据库中的集合 ref 
  const movieCollectionRef = collection(db, 'movies')
  const [movieList, setMovieList] = useState<IMoive[]>([])

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef)
      const result = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as IMoive[]

      setMovieList(result)
    } catch (error: any) {
      message.error(error.message)
    }
  }

  useEffect(() => {
    getMovieList()
  }, [])

  return (
    ...
  )
}
```

- 添加数据

```js
import { db } from '@/config/firebase'
import { addDoc, collection } from 'firebase/firestore'

export default function FirebaseMovies() {
  const movieCollectionRef = collection(db, 'movies')

  // values 为表单数据
  const addMovie = async (values: IMoive) => {
    try {
      await addDoc(movieCollectionRef, values)
      
      // 添加成功之后，查询列表更新数据
      getMovieList()
    } catch (error: any) {
      message.error(error.message)
    }
  }

  return (
    ...
  )
}
```

- 删除数据

根据 `doc.id` 来删除数据

```js
import { db } from '@/config/firebase'
import { doc, deleteDoc } from 'firebase/firestore'

export default function FirebaseMovies() {

  const deleteMovie = (id: string) => {
    Modal.error({
      title: '删除',
      content: '删除后无法恢复，是否要删除？',
      maskClosable: true,
      async onOk() {
        try {
          const movieDoc = doc(db, 'movies', id)
          await deleteDoc(movieDoc)

          getMovieList()

          message.success('delete success!')
        } catch (error: any) {
          message.error(error.message)
        }
      },
      okText: '确定',
    })
  }

  return (
    ...
  )
}
```

- 更新(编辑)数据

根据 `doc.id` 编辑数据

```js
import { db } from '@/config/firebase'
import { doc, updateDoc } from 'firebase/firestore'

const updateMovie = async (id: string) => {
  try {
    const movieDoc = doc(db, 'movies', id)
    await updateDoc(movieDoc, {
      date: Math.random()
    })

    getMovieList()
    message.success('update success!')
  } catch (error: any) {
    message.error(error.message)
  }
}
```

## database 权限控制

`wirte` 是 `create`、`update`、`delete`的缩写，这些操作我们可以配置，只有用户登录才能操作

```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow write: if request.auth !== null;
      allow read: if true; // 任何人都可以读取数据
    }
  }
}
```

还可以更加细粒度一点，我们将 `write` 拆分开，`create` 操作必须携带 userId

```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow create: if request.auth !== null && request.auth.uid == request.resouce.data.userId;
      allow update, delete: if request.auth != null
      allow read: if true; // 任何人都可以读取数据
    }
  }
}
```

# Storage
存储和检索由用户生成的文件（如图片、音频和视频），无需服务器端代码

```js
// config/firebase.ts
import { getStorage } from 'firebase/storage'
export const storage = getStorage(app)
```

# 部署到 firebase

安装命令行工具 `npn install -g firebase-tools`

然后登录

> firebase login
>
> firebase init
>
> firebase deploy
