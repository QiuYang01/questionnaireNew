// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementui)

import axios from 'axios'
Vue.prototype.axios = axios

import QS from 'qs'
Vue.prototype.qs = QS;

import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  store:store,
  components: { App },
  template: '<App/>'
})
