/**
 * 1、判断用户是否登录
 * 2、已登录则获取用户的文集
 */

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

  const con = getDB()
  try {
    //获取用户文集
    const [rows] = await con.execute(
      'SELECT * FROM `notebooks` WHERE `uid`=? ORDER BY `id` DESC',
      [uid]
    )
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
