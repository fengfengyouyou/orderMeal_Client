import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/common/request.js'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		token: uni.getStorageSync('token'),
		userInfo: {},
		goodsList:[],
		handleGoods:{},
		orderList:[],
		orderCount:0,
		handleOrder:{}
	},
	mutations: {
		SET_VALUE(state, params) {
			state[params.key] = params.value
		}
	},
	actions: {
		async userLogin({ commit, state, dispatch }, { params, stateName }) {
			try{
				let res = await request('/users/login', 'POST', params)
				uni.showToast({
					icon:'success',
					title: '登录成功',
					duration: 2000
				});
				// console.log('返回信息',res)
				uni.setStorageSync('token', res.data.token)
				commit('SET_VALUE',{key:stateName,value:res.data.token})
				return 0
			}catch(err){
				// uni.setStorageSync('token', res.data.token)
				// commit('SET_VALUE',{key:stateName,value:res.data.token})
				dispatch('clearStatus')
				uni.showToast({
					title: '登录失败',
					duration: 2000
				});
			}
		},
		clearStatus({ commit, state }){
			commit('SET_VALUE',{key:'token',value:''})
			commit('SET_VALUE',{key:'userInfo',value:{}})
			uni.removeStorageSync('token')
		},
		async addGoods({ commit, state }, { params, stateName }) {
			try{
				let res = await request('/goods/add', 'POST', params)
				// console.log('返回信息',res)
				uni.showToast({
					icon:'success',
					title: '添加成功',
					duration: 2000
				});
				return 0
			}catch(err){
				uni.showToast({
					title: '请求出错!',
					duration: 2000
				});
			}
		},
		async updateGoods({ commit, state }, { params, stateName }) {
			try{
				let res = await request('/goods/update', 'POST', params)
				// console.log('返回信息',res)
				uni.showToast({
					icon:'success',
					title: '修改成功',
					duration: 2000
				});
				return 0
			}catch(err){
				uni.showToast({
					title: '请求出错!',
					duration: 2000
				});
			}
		},
		async deleteGoods({ commit, state }, { params, stateName }) {
			try{
				let res = await request('/goods/delete', 'POST', params)
				// console.log('返回信息',res)
				uni.showToast({
					icon:'success',
					title: '删除成功',
					duration: 2000
				});
				return 0
			}catch(err){
				uni.showToast({
					title: '请求出错!',
					duration: 2000
				});
			}
		},
		async getGoodsList({ commit, state }, { params={}, stateName='' }={}){
			try{
				let res = await request('/goods/getList','GET',params)
				commit('SET_VALUE',{key:stateName,value:res.data.data})
				// uni.showToast({
				// 	icon:'success',
				// 	title: "修改成功!",
				// 	duration: 2000
				// });
				return 0
			}catch(err){
				uni.showToast({
					title: '请求出错!',
					duration: 2000
				});
			}
		},
		async addOrder({ commit, state }, { params, stateName }) {
			try{
				let res = await request('/order/add', 'POST', params)
				// console.log('返回信息',res)
				uni.showToast({
					icon:'success',
					title: '添加成功',
					duration: 2000
				});
				return 0
			}catch(err){
				uni.showToast({
					title: '请求出错!',
					duration: 2000
				});
				return 1
			}
		},
		async getOrderList({ commit, state }, { params={}, stateName='' }={}){
			try{
				let res = await request('/order/get','GET',params)
				let list = state.orderList.concat(res.data.data)
				commit('SET_VALUE',{key:stateName,value:list})
				commit('SET_VALUE',{key:'orderCount',value:res.data.totalNum})
				return 0
			}catch(err){
				uni.showToast({
					title: '请求出错!',
					duration: 2000
				});
			}
		},
	}
})
export default store
