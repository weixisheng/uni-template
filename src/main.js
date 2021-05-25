import Vue from 'vue'
import App from './App'
import util from '@/common/util'
/* 可选，api自动注册为全局，直接this.$api.xxx调用 */
import http from '@/libs/index'
import httpInterceptor from '@/libs/http.interceptor.js'
import httpApi from '@/api/index.js'

import store from '@/store/index.js'
Vue.config.productionTip = false
App.mpType = 'app'

Vue.use(util)

const app = new Vue({
  store,
  ...App
})
Vue.use(http)
Vue.use(httpInterceptor, app)
Vue.use(httpApi, app)

app.$mount()
