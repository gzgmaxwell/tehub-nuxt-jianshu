interface MyFetchOptions {
  headers?: Record<string, string>
  [key: string]: any
}
export const useHttpFetch = (url: string, opt: MyFetchOptions) => {
  const token = useCookie('token')
  // 添加请求头 token
  const headers = {
    ...opt.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
  opt.headers = headers

  return useFetch(url, {
    ...opt,
    baseURL: '',
    onRequest({ request, options }) {
      console.log('🚀 ~ onRequest ~ request:', request)
    },
    onRequestError({ request, options, error }) {
      console.log('🚀 ~ onRequestError ~ request:', request)
      // Handle the request errors
    },
    onResponse({ request, response, options }) {
      // Process the response data
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
    }
  })
}

// 定义接口
export const userInfoFetch = (opt: MyFetchOptions) => {
  return useHttpFetch('/api/user/info', opt)
}
