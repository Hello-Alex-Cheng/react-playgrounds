import useSWR, { Middleware, SWRHook, Fetcher } from 'swr'
import useSWRImmutable from 'swr/immutable'

const myMiddleware: Middleware = (useSWRNext: SWRHook) => {
  return (key, fetcher, config) => {
    // hook 运行之前...

    // 将日志记录器添加到原始 fetcher。
    const extendedFetcher = (...args) => {
      console.log('SWR Request:', key)
      return fetcher(...args)
    }
 
    // 处理下一个中间件，如果这是最后一个，则处理 `useSWR` hook。
    const swr = useSWRNext(key, extendedFetcher, config)
 
    // hook 运行之后...
    // 可以在这里处理下响应结果
    console.log('运行之后 ', swr)
    return swr
  }
}

const fetcher: Fetcher<any, string> = async url => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // 创建一个错误对象并附加额外的信息
      const error = new Error(`Request failed with status ${response.status}`);
      error.info = await response.json()
      error.status = response.status
      throw error
    }

    return response.json();
  } catch (error) {
    // 如果是网络错误，给错误对象添加一个标记
    if (error.name === "TypeError") {
      error.isNetworkError = true;
    }
    // 抛出包含附加信息的错误
    throw error;
  }
}

export const fetchUser = (id: number, config = {}) => {
  return useCustomSWR(`https://jsonplaceholder.typicode.com/users/${id}`, config)
}

function useCustomSWR(url, config = {}) {
  const { data, error, mutate, isValidating } = useSWR(url, fetcher, {
    suspense: true, // 启用 React Suspense 模式
    // 以下3个都为 false 的话，相当于使用了 useSWRImmutable，标记不可变数据。
    // revalidateIfStale: false, // 即使存在陈旧数据，也自动重新验证
    // revalidateOnFocus: true, // 窗口聚焦时自动重新验证
    // revalidateOnReconnect: true, // 浏览器恢复网络时，自动重新验证
    // revalidateOnMount: true, // 在挂载组件时启用或禁用自动重新验证
    // refreshWhenHidden: true, // 窗口不可见时，重新验证（如果启用了refreshInterval）

    // shouldRetryOnError: false, // 默认为true, fetcher 有错误时重试
    // errorRetryCount: 2, // 比如将 userId 改为 11，接口返回 404，错误重试请求就会请求 2 次。（两次是不包含最开始出错的请求）
    // errorRetryInterval: 200, // 错误请求时间间隔

    refreshInterval: 500, // 定期重新请求
    
    refreshWhenOffline: true, // 离线轮询？？自定义轮询 hooks

    // focusThrottleInterval: 5000, // 在一段时间内只重新验证一次（以毫秒为单位）

    // keepPreviousData: true, // 在新数据加载完成之前使用上一次缓存过的数据 

    // isPaused() {
    //   return isPause // 动态修改 isPaused 方法的返回值，如果为 true，会暂停请求，之后不论是重新验证还是手动触发都不会发起请求。
    // }

    use: [myMiddleware],

    ...config,
  });

  return {
    data,
    isLoading: !error && !data,
    error: error,
    mutate,
    isValidating
  };
}

/** @name 标记不可变数据 */
function useImmutableSWR(url, config = {}) {
  const { data, error, mutate, isValidating } = useSWRImmutable(url, fetcher, {
    suspense: true, // 启用 React Suspense 模式
    ...config,
  });

  return {
    data,
    isLoading: !error && !data,
    error: error,
    mutate,
    isValidating
  };
}

/** @name 资源是不可变的，禁用所有重新请求 */
export const fetchImmutableUser = (id: number, config = {}) => {
  return useImmutableSWR(`https://jsonplaceholder.typicode.com/users/${id}`, config)
}
