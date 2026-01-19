import Joi from 'joi'
import { getDB } from '../../utils/db/mysql'
import { getLoginUid, responseJson } from '../../utils/helper'

/***
 * 获取文集
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
  const body:any = await getQuery(event)
  console.log('body', body)
  // // 校验数据joi
  // const schema = Joi.object({
  //   noteId: Joi.number().required()
  // })
  // try {
  //   const value = await schema.validateAsync(body)
  // } catch (err) {
  //   return responseJson(1, '参数错误', {})
  // }

  const con = getDB()
  try {
    //获取用户文集
    // const [rows] = await con.query(
    //   'SELECT * FROM `notes` WHERE `uid`=? AND `id`=?',
    //   [uid, body.noteId]
    // )
     const [rows] = await con.query(
      'SELECT * FROM `notes` WHERE `uid`=? LIMIT ? OFFSET ?',
      [uid, Number(body.pageSize), (body.page - 1) * body.pageSize]
    )
    // 释放连接
    await con.end()

    return responseJson(0, 'ok', {
      list: {
        id: rows[0].id,
        title: rows[0].title,
        content_md: rows[0].content_md,
        state: rows[0].state
      }
    })
  } catch (e) {
    // 释放连接
    await con.end()
    // @ts-ignore
    setResponseStatus(event, 500)
    return responseJson(1, '服务器错误', {})
  }
})
