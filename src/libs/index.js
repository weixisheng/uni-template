import http from './request/index'

const install = Vue => {
  Vue.prototype.$http = http
  Vue.prototype.$get = http.get
  Vue.prototype.$post = http.post
}

export default {
  install
}
