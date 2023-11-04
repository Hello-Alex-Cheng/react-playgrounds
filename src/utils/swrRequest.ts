import useSWR from 'swr'

const fetcher = async url => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // 创建一个错误对象并附加额外的信息
      const error = new Error(`Request failed with status ${response.status}`);
      error.info = { statusCode: response.status, statusText: response.statusText };
      error.isHttpResponseError = true;
      throw error;
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


function useCustomSWR(url, config = {}) {
  const { data, error, mutate, isValidating } = useSWR(url, fetcher, {
    ...config,
    // 在这里可以设置一些默认配置，比如刷新间隔、重新验证策略等。
  });

  return {
    data,
    isLoading: !error && !data,
    error: error,
    mutate,
    isValidating
  };
}

export const fetchUser = (id: number) => {
  return useCustomSWR(`https://jsonplaceholder.typicode.com/users/${id}`)
}
