/**
 * 1、判断用户是否登录
 * 2、上传头像到腾讯云
 */

import { getDB } from '../utils/db/mysql'
import { getLoginUid, responseJson } from '../utils/helper'
import COS from 'cos-nodejs-sdk-v5'
import { getUUID } from '~/composables/useHelper'

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

    const config = useRuntimeConfig()
    // 初始化
    const cos = new COS({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey
    })

    // 图片名称
    const fileName = Date.now() + '-' + body[0].filename
    // 图片数据
    const buffer = body[0].data
    // 图片后缀
    const ext = fileName.slice(fileName.lastIndexOf('.') + 1)

    // key
    let key = 'uploads/' + uid + '/avatar/' + getUUID() + '.' + ext
    //请求文件
    const data = await cos.putObject({
      Bucket: config.public.BUCKET /* 必须 */,
      Region: config.public.REGION /* 必须 */,
      Key: key /* 必须 */,
      Body: buffer // 上传文件对象
    })
    console.log('~~~~data', data)

    // 存储图片路径
    const avatarUrl = `https://${data.Location}`

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
