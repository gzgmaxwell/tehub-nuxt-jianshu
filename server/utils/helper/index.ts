export const responseJson = (code: number, msg: string, data: object) => {
  let resp = { code: code, msg: msg, data: data }
  return resp
}

export const getLoginUid = (event: any) => {
  return event.context.auth ? event.context.auth.uid : 0
}
