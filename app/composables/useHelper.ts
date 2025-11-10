import { v4 as uuidV4 } from 'uuid'
export const getUUID = () => {
  return uuidV4()
}

// 获取当前时间戳
export const getTimestamp = () => {
  return new Date().getTime()
}
