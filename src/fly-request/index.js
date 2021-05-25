/* eslint-disable */
import { BASE_URL } from '@/config'
// #ifdef MP-WEIXIN
var Fly = require('flyio/dist/npm/wx')
// #endif
// #ifdef H5
var fly = require("flyio")
// #endif
// #ifdef MP-ALIPAY
var Fly = require('flyio/dist/npm/ap')
// #endif
require('promise.prototype.finally').shim()

// #ifndef H5
var fly = new Fly()
var newFly = new Fly()
// #endif

let token = ''
let refreshToken = ''

fly.config.baseURL = BASE_URL
// #ifndef H5
newFly.config.baseURL = BASE_URL
// #endif
fly.config.headers['content-type'] = 'application/json'

fly.interceptors.request.use(async request => {
  console.log(request)
  // request.showLoading && uni.showNavigationBarLoading()
  request.showLoading && uni.showLoading({
    title: request.loadingText
  })
  token = uni.getStorageSync('token')
  if (!token) {
    if (!request.needToken) {
      // 登录接口等，无需token跳过拦截
      return request
    }
    // #ifdef MP
    fly.lock()
    const code = await UNI_LOGIN()
    return AUTH_LOGIN(code).then(r => {
      request.headers['AuthToken'] = r
      token = r
      return request
    })
    .finally(() => fly.unlock()) // 解锁后，会继续发起请求队列中的任务
    // #endif
    // #ifdef H5
    // 可选。跳转登录页或者其他刷新token方式
    uni.hideLoading()
    uni.reLaunch({
      url: '/pages/login/index'
    })
    // #endif
  } else {
    request.headers['AuthToken'] = uni.getStorageSync('token')
    return request
  }
})

fly.interceptors.response.use(
  async function(response) {
    const vm = this
    if (response.status === 200 || response.status === 304) {
      // 请求正常情况。status根据实际项目做增减
      if (response.data.return_code === '80003') {
        // 登录失效。return_code === '80003'这里根据实际项目判断
        this.lock()
        // #ifdef MP
        if (refreshToken) {
          // 如果token更新了，重新发起请求
          response.request.headers['AuthToken'] = refreshToken
          vm.unlock()
          return fly.request(response.request)
        }
        let code = await UNI_LOGIN()
        return AUTH_LOGIN(code)
          .then(r => {
            token = refreshToken = r
          })
          .finally(() => vm.unlock())
          .then(() => {
            // 重置token，以便在使用期间再次失效进入拦截
            // 曲线方法，在一段时间后操作
            setTimeout(() => {
              refreshToken = ''
            }, 10000)
            return fly.request(response.request)
          })
        // #endif
        // ifdef H5
        // 可选。跳转登录页或者其他刷新token方式
        uni.hideLoading()
        uni.reLaunch({
          url: '/pages/login/index'
        })
        // endif
      } else {
        // uni.hideNavigationBarLoading()
        uni.hideLoading()
        // 只将请求结果的data字段返回
        return response.data
      }
    } else {
      // 服务器异常等，可以统一提示
      // uni.showToast({title: '服务器开小差了', icon: 'none'})
    }
  },
  function(err) {
    // uni.hideNavigationBarLoading()
    uni.hideLoading()
    console.log(err)
    return Promise.resolve('请检查网络')
  }
)

const UNI_LOGIN = () => {
  return new Promise((resolve, reject) => {
    uni.login({
      success(res) {
        if (res.code) {
          resolve(res.code)
        }
      }
    })
  })
}
const AUTH_LOGIN = code =>
  new Promise((resolve, reject) => {
    newFly
      .post('/Login/Auth', {
        Code: code
      })
      .then(res => {
        let { return_code, return_data, return_msg } = res.data
        let token = return_data.AuthToken
        if (return_code === '0') {
          uni.setStorageSync('token', token)
          resolve(token)
        } else reject(`auth: ${return_msg}`)
      })
  })

  const fetch = (url, params, options, method = 'post') => {
  // 可选。其他配置如loading
  const DEFAULT_OPTIONS = {
    loading: false,
    loadingText: '数据加载中',
    barLoading: true,
    needToken: true // 默认接口都需要token校验
  }
  const NEW_OPTIONS = Object.assign({}, DEFAULT_OPTIONS, options)
  fly.config.loading = NEW_OPTIONS.loading
  fly.config.loadingText = NEW_OPTIONS.loadingText
  fly.config.barLoading = NEW_OPTIONS.barLoading
  fly.config.needToken = NEW_OPTIONS.needToken

  return fly[method](url, params)
}

export default fetch

export const httpPost = (url, params, options) => fetch(url, params, options)
export const httpGet = (url, params, options) =>
  fetch(url, params, options, 'get')