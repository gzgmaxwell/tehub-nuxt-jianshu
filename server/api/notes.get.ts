import { getDB } from '../utils/db/mysql'
import { responseJson } from '../utils/helper'

/***
 * 文章
 */
export default defineEventHandler(async event => {
  // 获取数据
  const params = await getQuery(event)

  const con = getDB()
  try {
    // 获取文章
    const [rows] = await con.query('SELECT * FROM `notes` LIMIT ? OFFSET ?', [
      Number(params.pageSize),
      (Number(params.page) - 1) * Number(params.pageSize)
    ])

    // 释放连接
    await con.end()

    return responseJson(0, 'ok', { list: rows })
  } catch (e) {
    // 释放连接
    await con.end()
    // @ts-ignore
    setResponseStatus(event, 500)
    return responseJson(1, '服务器错误', {})
  }
})
