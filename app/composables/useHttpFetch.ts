import { callWithNuxt } from '#app'

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

  const nuxtApp = useNuxtApp()

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
      console.log('🚀 ~ onResponse ~ response:', response)
    },
    async onResponseError({ request, response, options }) {
      // Handle the response errors
      console.log('error', response.status)
      // https://github.com/nuxt/nuxt/issues/14771
      // 未登录401状态
      if (response.status === 401) {
        await callWithNuxt(nuxtApp, navigateTo, [
          '/sign_in',
          { replace: true, redirectCode: 401 }
        ])
      } else if (response.status === 500) {
        console.log('服务器报错！！')
      }
    }
  })
}

// 定义接口
// export const userInfoFetch = (opt: MyFetchOptions) => {
//   return useHttpFetch('/api/user/info', opt)
// }

// 注册
export const registerFetch = (opt: MyFetchOptions) => {
  return useHttpFetch('/api/auth/register', opt)
}
// 登录
export const loginFetch = (opt: MyFetchOptions) => {
  return useHttpFetch('/api/auth/login', opt)
}

// 文集接口
export const notebookFetch = (opt: MyFetchOptions) => {
  return useHttpFetch('/api/note/notebook', opt)
}

// 获取文章
export const notesFetch = (opt: MyFetchOptions) => {
  return useHttpFetch('/api/note/notes', opt)
}
// 文章接口
export const noteFetch = (opt: MyFetchOptions) => {
  return useHttpFetch('/api/note/note', opt)
}

// 文章图片上传腾讯云
export const cosAuthFetch = (opt: MyFetchOptions) => {
  return useHttpFetch('/api/cos/auth', opt)
}

// 获取文章列表
export const homeNotesFetch = (opt: MyFetchOptions) => {
  return useHttpFetch('/api/home/notes', opt)
}

// // 获取文章详情
// export const noteDetailFetch = (opt: MyFetchOptions) => {
//   return useHttpFetch('/api/home/detail', opt)
// }
// // 上传头像到腾讯云
// export const uploadCosFetch = (opt: MyFetchOptions) => {
//   return useHttpFetch('/api/uploadCos', opt)
// }
// // 修改用户信息
// export const editUserFetch = (opt: MyFetchOptions) => {
//   return useHttpFetch('/api/auth/user', opt)
// }
