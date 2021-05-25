// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
import { BASE_URL } from '@/config/index.js'
// #ifdef MP
import { authLogin } from '@/libs/request/auth'
// #endif
let count = 0
let pageRefresh = 0 // 页面刷新次数，只需在授权失效调一次
const install = (Vue, vm) => {
  Vue.prototype.$http.setConfig({
    baseUrl: BASE_URL
  })
  // 请求拦截，配置Token等参数
  Vue.prototype.$http.interceptor.request = config => {
    const token = uni.getStorageSync('token')
    config.header['AuthToken'] = token

    return config
  }
  // 响应拦截，判断状态码是否通过
  Vue.prototype.$http.interceptor.response = res => {
    if (count > 0 || pageRefresh > 0) return res.data
    if (res.statusCode === 200) {
      // #ifdef MP
      if (
        res.data.return_code === '80002' ||
        res.data.return_code === '80003'
      ) {
        // 未登录 || 登录失效
        count++
        pageRefresh++
        authLogin().then(() => {
          const pages = getCurrentPages()
          const curPage = pages[pages.length - 1]
          curPage.onLoad(curPage.data.options || curPage.options || {})
          curPage.onShow()
          count = 0
        })
      }
      // #endif
      return res.data
    } else return false
  }
}

export default {
  install
}
