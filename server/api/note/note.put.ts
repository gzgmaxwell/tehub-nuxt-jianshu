import Joi from 'joi'
import { getDB } from '../../utils/db/mysql'
import { getLoginUid, responseJson } from '../../utils/helper'

/***
 * 修改文章
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
    noteId: Joi.number().required(),
    title: Joi.string().allow(''),
    content_md: Joi.string().allow(''),
    state: Joi.number().required()
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
      'UPDATE  `notes` SET `title`=?,`content_md`=?,`state`=? WHERE `id`=? AND `uid`=?',
      [body.title, body.content_md, body.state, body.noteId, uid]
    )
    // 释放连接
    await con.end()

    if (rows.affectedRows === 0) {
      return responseJson(1, '修改失败', {})
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
