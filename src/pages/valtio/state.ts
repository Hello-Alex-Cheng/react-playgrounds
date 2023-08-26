import { proxy, ref } from 'valtio'
import { derive } from 'valtio/utils'

const POST_LIST = [
  {
    title: 'Valtio',
    description: 'React state manage package.'
  },
  {
    title: 'ReactJS',
    description: 'JavaScript package.'
  },
]

type POST_LIST_TYPE = typeof POST_LIST

export const user = proxy<{
  age: number;
  username: Promise<any>;
  updateAge: (age: number) => void;
  updateNameAsync: (name: string) => void;
  dom: HTMLElement
}>({
  age: 18,
  username: new Promise(resovle => {
    setTimeout(() => {
      resovle('alex.cheng')
    }, 2000);
  }),
  updateAge(age: number) {
    user.age = age
  },
  updateNameAsync(name: string) {
    // 异步修改 username，触发 React Suspense 组件。
    user.username = new Promise(resovle => {
      setTimeout(() => {
        resovle(name)
      }, 2000);
    })
  },
  dom: ref(document.body)
})

function fetchPostListByAPI() {
  return new Promise<POST_LIST_TYPE>(resolve => {
    setTimeout(() => {
      resolve(POST_LIST)
    }, 3000);
  })
}

export const post = proxy<{
  list: Promise<POST_LIST_TYPE> | any[];
  updateList: (list: POST_LIST_TYPE) => void;
  fetchList: () => void;
}>({
  list: [],
  updateList(list) {
    post.list = list
  },
  async fetchList() {
    post.list = fetchPostListByAPI()
  },
})

// 同步状态
export const synchronously = proxy<{
  value: number
}>({
  value: 1
})

// 同步-派生代理
export const synchronouslyDrive = derive({
  doubled: get => get(synchronously).value * 2,
})
