import Vue from 'vue'
import App from './App'
import './common/font-awesome.css'
import store from './store/index.js'
Vue.config.productionTip = false
import api from './api/index.js'
import url from './common/config.js'
Vue.prototype.$api = api
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
