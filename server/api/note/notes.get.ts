import Joi from 'joi'
import { getDB } from '../../utils/db/mysql'
import { getLoginUid, responseJson } from '../../utils/helper'

/***
 * 获取用户文集下的文章接口
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
  const params = await getQuery(event)
  console.log('params', params)
  // 校验数据joi
  const schema = Joi.object({
    notebookId: Joi.number().required()
  })
  try {
    const value = await schema.validateAsync(params)
  } catch (err) {
    return responseJson(1, '参数错误', {})
  }

  const con = getDB()
  try {
    // 查询文章和文集的关联表
    let notebookRows: Array<{ note_id: string; [key: string]: any }> = []
    const [rows] = await con.query(
      'SELECT `note_id` FROM `notebook_notes` WHERE `notebook_id`=?',
      [params.notebookId]
    )
    console.log('🚀 ~ rows:', rows)
    // @ts-ignore
    notebookRows = rows
    console.log('notebookRows', notebookRows)

    // 查询文章
    if (notebookRows.length < 1) {
      return responseJson(0, '无数据', { list: [] })
    }
    // 遍历文章id
    const noteIdList: string[] = notebookRows.map((v: any) => v.note_id)

    // 查询文章表
    const [notesRows] = await con.query(
      'SELECT id,title FROM `notes` WHERE `uid`=? AND id IN (?) ORDER BY `id` DESC',
      [uid, noteIdList]
    )
    console.log('notesRows', notesRows)
    // 释放连接
    await con.end()

    return responseJson(0, 'ok', { list: notesRows })
  } catch (e) {
    // 释放连接
    await con.end()
    // @ts-ignore
    setResponseStatus(event, 500)
    return responseJson(1, '服务器错误', {})
  }
})
