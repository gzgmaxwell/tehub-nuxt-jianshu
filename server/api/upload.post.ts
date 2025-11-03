/**
 * 1、判断用户是否登录
 * 2、上传头像
 */

import { getDB } from '../utils/db/mysql'
import { getLoginUid, responseJson } from '../utils/helper'
// @ts-ignore
import path from 'path'
// @ts-ignore
import * as fs from 'fs'

/***
 * 上传头像
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
  const body = await readMultipartFormData(event)
  console.log('🚀 ~ body:', body)

  if (body) {
    if (
      body[0].type !== 'image/jpeg' &&
      body[0].type !== 'image/png' &&
      body[0].type !== 'image/jpg'
    ) {
      return responseJson(1, '请上传jpg/png/jpeg类型的图片', {})
    }
    // 图片名称
    const fileName = Date.now() + '-' + body[0].filename
    // 图片路径
    const filePath = path.join('./public', 'img', fileName)
    // 图片数据
    const buffer = body[0].data

    fs.writeFile(filePath, buffer, err => {
      if (err) {
        console.log(err)
      } else {
      }
    })

    // 存储图片路径
    const avatarUrl = '/img/' + fileName

    const con = getDB()
    try {
      // 插入users
      const [rows] = await con.execute(
        'UPDATE `users` SET `avatar`=? WHERE `id`=?',
        [avatarUrl, uid]
      )
      // 释放连接
      await con.end()

      if (rows.affectedRows === 0) {
        return responseJson(1, '上传头像失败~', {})
      }

      return responseJson(0, 'ok~', { avatar: avatarUrl })
    } catch (e) {
      // 释放连接
      await con.end()
      console.log('error', e)
      // @ts-ignore
      setResponseStatus(event, 500)
      return responseJson(1, '服务器错误', {})
    }
  }

  return responseJson(1, '请上传头像~', {})
})
