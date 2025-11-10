import dayjs from 'dayjs'

// 响应数据格式
export const responseJson = (code: number, msg: string, data: object) => {
  let resp = { code: code, msg: msg, data: data }
  return resp
}

// 获取登录用户id
export const getLoginUid = (event: any) => {
  return event.context.auth ? event.context.auth.uid : 0
}

// 获取当前时间
export const genTitle = () => {
  // let currentDate = new Date()
  // let year = currentDate.getFullYear()
  // let month = ('0' + (currentDate.getMonth() + 1)).slice(-2)
  // // getDay 获取星期几
  // let day = ('0' + currentDate.getDate()).slice(-2)
  // return year + '-' + month + '-' + day

  return '文章 ' + dayjs().format('YYYY-MM-DD HH:mm:ss')
}

// 截取文章
export const trimMarkdown = (content: string, maxLength: number = 200) => {
  let strippedContent = content.replace(/#|\*|_|`/g, '')
  if (strippedContent.length > maxLength) {
    strippedContent = strippedContent.substr(0, maxLength) + '...'
  }
  return strippedContent
}

// 获取文章第一张图片
export const getFirstImage = (content: string) => {
  const regex = /!\[.*\]\((.*)\)/
  const match = content.match(regex)
  if (match) {
    return match[1]
  }
  return null
}
