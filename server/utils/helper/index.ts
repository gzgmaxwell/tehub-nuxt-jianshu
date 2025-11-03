export const responseJson = (code: number, msg: string, data: object) => {
  let resp = { code: code, msg: msg, data: data }
  return resp
}
