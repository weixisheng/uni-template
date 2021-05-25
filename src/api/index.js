const install = (Vue, vm) => {
  const fetch = (url, param, config) => Vue.prototype.$post(url, param, config)
  /* 接口统一用小驼峰式命名 */
  const getVip = param =>
    fetch('User/GetVip', param, { loadingText: '请求数据中...' })

  Vue.prototype.$api = {
    getVip
  }
}
export default install
