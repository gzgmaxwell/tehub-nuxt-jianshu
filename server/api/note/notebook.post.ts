import Joi from 'joi'
import { getDB } from '../../utils/db/mysql'
import { getLoginUid, responseJson } from '../../utils/helper'

/***
 * 创建文集
 */
export default defineEventHandler(async event => {
  // 获取用户id，判断是否登录
  let uid = getLoginUid(event)
  if (uid === 0) {
    // @ts-ignore
    setResponseStatus(event, 401)
    return responseJson(1, '请先登录', {})
  }

  // 获取数据
  const body = await readBody(event)
  // 数据校验
  const schema = Joi.object({
    name: Joi.string().required()
  })

  try {
    const value = await schema.validateAsync(body)
  } catch (err) {
    return responseJson(1, '参数错误', {})
  }

  const con = getDB()
  try {
    //创建文集
    const [rows] = await con.execute(
      'INSERT INTO `notebooks` (`name`,`uid`) value (?,?)',
      [body.name, uid]
    )
    // 释放连接
    await con.end()
    if (rows.affectedRows === 0) {
      return responseJson(1, '创建失败', {})
    }

    return responseJson(0, 'ok', {})
  } catch (e) {
    // 释放连接
    await con.end()
    // @ts-ignore
    setResponseStatus(event, 500)
    return responseJson(1, '服务器错误', {})
  }
})
