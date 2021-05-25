/**
 * 页面跳转
 * @param {String} type 路由跳转类型
 */
const route = type => url =>
  typeof url === 'string' ? uni[type]({ url }) : uni[type](url)
const navigate = url => {
  route('navigateTo')(url)
}
const switchTab = url => {
  route('switchTab')(url)
}
const redirect = url => {
  route('redirectTo')(url)
}

const goBack = (delta = 1) => {
  uni.navigateBack({
    delta
  })
}
/**
 * 提示
 * @param {String} title 提示内容
 * @param {Object} param1 参数配置
 *
 * eg: this.$msg('提示信息')
 *      this.$msg('提示信息', { icon: 'success' })
 */
const msg = (title, { icon = 'none', duration = 2000, mask = true } = {}) => {
  title &&
    uni.showToast({
      title,
      duration,
      mask,
      icon
    })
}
/**
 * 获取page
 * @param {Number} delta 相对当前页面层级数
 */
const getPage = (delta = 0) => {
  const pages = getCurrentPages()
  const page = pages[pages.length - delta - 1]
  // #ifdef H5
  return page
  // #endif
  // #ifndef H5
  // eslint-disable-next-line no-unreachable
  return page.$vm
  // #endif
}
const ck = (res = {}, showMsg = false, message = '') => {
  if (res.return_code === '0') {
    return true
  } else {
    if (res.return_code !== '80003') {
      showMsg && msg(message || res.return_msg)
    }
    return false
  }
}

const install = Vue => {
  Vue.prototype.$navigate = navigate
  Vue.prototype.$switch = switchTab
  Vue.prototype.$redirect = redirect
  Vue.prototype.$goBack = goBack
  Vue.prototype.$msg = msg
  Vue.prototype.$getPage = getPage
  Vue.prototype.$ck = ck
}
export default {
  install
}
