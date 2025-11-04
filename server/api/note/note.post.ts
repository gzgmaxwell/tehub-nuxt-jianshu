import Joi from 'joi'
import { getDB } from '../../utils/db/mysql'
import { getLoginUid, responseJson, genTitle } from '../../utils/helper'

/***
 * 创建文章
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
    notebookId: Joi.number().required()
  })

  try {
    const value = await schema.validateAsync(body)
  } catch (err) {
    return responseJson(1, '参数错误', {})
  }

  const con = getDB()
  try {
    // 创建文章
    const [rows] = await con.execute(
      'INSERT INTO `notes` (`title`,`content_md`,`state`,`uid`) VALUE (?,?,?,?)',
      [genTitle(), '', 1, uid]
    )

    if (rows.affectedRows === 0) {
      return responseJson(1, '创建失败', {})
    }
    console.log('333333', rows)

    // 关联文集表
    const [rows2] = await con.execute(
      'INSERT INTO `notebook_notes` (`notebook_id`,`note_id`) VALUE (?,?)',
      [body.notebookId, rows.insertId]
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
