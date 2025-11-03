import mysql from 'mysql2'

// // 创建 MySQL 连接
// let connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'tehub-nuxt-jianshu'
// })

// // 测试连接
// connection.connect(err => {
//   console.log('数据库连接成功~')
// })

// // 连接池
// let pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'tehub-nuxt-jianshu',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// })

// // 测试连接
// pool.getConnection(err => {
//   console.log('数据库连接成功~')
// })

// // @ts-ignore
// export default connection

export const getDB = () => {
  return mysql
    .createPool({
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'tehub-nuxt-jianshu',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    })
    .promise()
}
