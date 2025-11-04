interface MyFetchOptions {
  headers?: Record<string, string>
  [key: string]: any
}
export const useHttpFetch = (url: string, opt: MyFetchOptions) => {
  const token = useCookie('accessToken')
  // 添加请求头 token
  const headers = {
    ...opt.headers,
    ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
  }
  opt.headers = headers

  return useFetch(url, {
    ...opt,
    baseURL: 'http://localhost:3000/',
    onRequest({ request, options }) {
      console.log('🚀 ~ onRequest ~ request:', request)
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
    },
    onResponse({ request, response, options }) {
      // Process the response data
      console.log("🚀 ~ onResponse ~ response:", response)
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
      console.log('error', response.status)
    }
  })
}

// 定义接口
export const userInfoFetch = (opt: MyFetchOptions) => {
  return useHttpFetch('/api/user/info', opt)
}

// 注册
export const registerFetch = (opt: MyFetchOptions) => {
  return useHttpFetch('/api/auth/register', opt)
}
// 登录
export const loginFetch = (opt: MyFetchOptions) => {
  return useHttpFetch('/api/auth/login', opt)
}
