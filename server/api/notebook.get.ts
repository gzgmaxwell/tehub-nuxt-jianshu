/**
 * 1、判断用户是否登录
 * 2、已登录则获取用户的文集
 */

import { getDB } from '../utils/db/mysql'
import { responseJson } from '../utils/helper'

/***
 * 获取所有文集
 */
export default defineEventHandler(async event => {
  const con = getDB()
  try {
    //获取用户文集
    const [rows] = await con.execute('SELECT * FROM `notebooks`')
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
