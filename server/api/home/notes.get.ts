import { getDB } from '../../utils/db/mysql'
import { responseJson, trimMarkdown, getFirstImage } from '../../utils/helper'

/***
 * 文章
 */
export default defineEventHandler(async event => {
  // 获取数据
  const params = await getQuery(event)

  const con = getDB()
  try {
    // 获取文章
    const [notesData] = await con.query(
      'SELECT notes.id AS id,notes.title,notes.content_md,notes.uid,users.nickname FROM `notes` LEFT JOIN `users` ON notes.uid = users.id WHERE `state`=? LIMIT ? OFFSET ?',
      [
        2,
        Number(params.pageSize),
        (Number(params.page) - 1) * Number(params.pageSize)
      ]
    )
    notesData.map((v: any) => {
      v.subTitle = trimMarkdown(v.content_md, 300)
      v.cover = getFirstImage(v.content_md)
      v.like = 45
      v.content_md = ''
      v.flag = false
    })

    // 释放连接
    await con.end()

    return responseJson(0, 'ok', { list: notesData })
  } catch (e) {
    // 释放连接
    await con.end()
    // @ts-ignore
    setResponseStatus(event, 500)
    return responseJson(1, '服务器错误', {})
  }
})
