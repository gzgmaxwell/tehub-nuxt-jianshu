# tehub-nuxt-jianshu
[Nuxt3 实战全栈开发简书](https://tehub.com/course/bIpRGyDdBh)

## Nuxt documentation

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Setup

Make sure to install dependencies:

```bash
npm install

npm run dev

npm run build

npm run preview
```

## 关联文档
[腾讯云对象存储](https://cloud.tencent.com/document/product/436/8629)
[https://github.com/unplugin/unplugin-icons](https://github.com/unplugin/unplugin-icons)
[图标集](https://icones.js.org/)
[编辑器](https://github.com/pd4d10/bytemd)
[qcloud-cos-sts-sdk](https://github.com/tencentyun/qcloud-cos-sts-sdk/blob/master/nodejs/demo/demo.js)
[JavaScript SDK](https://cloud.tencent.com/document/product/436/11459)

## 数据库操作流程
安装docker desktop
// 此语句在window 中 用window Powershell 打开后切换路径到非C:\WINDOWS\system32 路径下执行或者使用绝对路径
docker run -d --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -v "${PWD}/db:/var/lib/mysql" mysql:8.0; 
docker exec -it mysql mysql -uroot -p123456
CREATE DATABASE jbook CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES; //显示数据库
use jbook
执行建表语句
