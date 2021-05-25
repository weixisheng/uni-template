import { httpPost } from './index'

export const getVip = param => httpPost('User/GetVip', param)
export const login = param =>
  httpPost('Login/Login', param, { needToken: false })
