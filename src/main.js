// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementui)

import axios from 'axios'
Vue.prototype.axios = axios

import QS from 'qs'
Vue.prototype.qs = QS;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  components: { App },
  template: '<App/>'
})
