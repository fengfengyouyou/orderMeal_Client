<template>
	<view id='root'>
		<view class='logo-box'>
			<image src='/static/taitea.jpg'></image>
		</view>
		<view class='btn-box'>
			<!-- <button class='btn' bindtap='restTapped'>商家入驻</button> -->
			<button class='btn' type='primary' @click='toList'>开始订餐</button>
			<!-- <view class="user-info" v-if="isCanUse">
				<view class="user-name">
					{{nickName||'--'}}
				</view>
				<image :src="avatarUrl" mode=""></image>
			</view> -->
			<!-- #ifdef MP-WEIXIN -->
			<uni-popup ref="popup">
				<!-- <view v-if="!isCanUse" class="popup-box"> -->
				<view class="popup-box">
					<view class='header'>
						<image src='../../static/img/wx_login.png'></image>
					</view>
					<view class='content'>
						<view>申请获取以下权限</view>
						<text>获得你的公开信息(昵称，头像、地区等)</text>
					</view>
					<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
						授权登录
					</button>
				</view>
			</uni-popup>
			
			<view class="popup-box" v-if="!token">
				<view class='header'>
					<image src='../../static/img/wx_login.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>
				<button class='bottom' type='primary' @click="login">
					授权登录
				</button>
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	
	import {
		uniPopup
	} from '@dcloudio/uni-ui'
	export default {
		components:{
			uniPopup
		},
		data() {
			return {
				title: 'Hello',
				news: [],
				SessionKey: '',
				OpenId: '',
				code: '',
				nickName: null,
				avatarUrl: null,
				// isCanUse: uni.getStorageSync('isCanUse') || false //默认为false
			}
		},
		computed:{
			...mapState(['token'])
		},
		onLoad() {
			this.login()
		},
		// onShow(){
		// 	this.getAdress()
		// },
		methods: {
			...mapActions(['userLogin']),
			...mapMutations(['SET_VALUE']),
			// 跳转到商品列表
			toList(){
				uni.switchTab({
					url:'../goodsList/goodsList',
					fail:(err)=>{
						console.log(err)
					}
				})
			},
			// 获取当前位置
			getAdress(){
				uni.getLocation({
				    type: 'wgs84',
				    success: function (res) {
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
				    }
				})
			},
			wxGetUserInfo(infoRes) {
				this.$refs.popup.close()
				console.log(infoRes)
				let {
					detail
				} = infoRes
				this.SET_VALUE({key:'userInfo',value:detail.userInfo})
				this.nickName = detail.userInfo.nickName; //昵称
				this.avatarUrl = detail.userInfo.avatarUrl; //头像
				try {
					// uni.setStorageSync('isCanUse', true); //记录是否第一次授权  false:表示不是第一次授权
					// _this.updateUserInfo();
					this.loginRequest()
					// this.isCanUse = true
				} catch (e) {
					console.log(e)
				}
			},

			//登录
			login() {
				let _this = this;
				uni.showLoading({
					title: '登录中...'
				});
				// //#ifdef H5
				// 	console.log(123)
				// 	var url = encodeURIComponent('http://10.8.32.19:8080/#/');
				// 	window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3037145c2a4b4644&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
				// //#endif
				//#ifndef H5
				// 1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success(loginRes) {
						let code = loginRes.code;
						_this.code = code
						console.log('code', code)
						uni.getUserInfo({
							provider: 'weixin',
							success(infoRes) {
								// console.log('infoRes',infoRes.userInfo)
								//获取用户信息后向调用信息更新方法
								_this.SET_VALUE({key:'userInfo',value:infoRes.userInfo})
								_this.nickName = infoRes.userInfo.nickName; //昵称
								_this.avatarUrl = infoRes.userInfo.avatarUrl; //头像
								// _this.updateUserInfo(); //调用更新信息方法
								//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
								_this.loginRequest()
							},
							fail(err) {
								console.log('uni.getUserInfo失败',err)
								_this.$refs.popup.open()
								// throw new Error('登录失败，需要重新登录')
							}
						});
						uni.hideLoading();

					},
					fail(err) {
						console.log('uni.login失败',err)
						_this.$refs.popup.open()
					}
				});
				//#endif

			},
			// 登录请求
			async loginRequest() {
				await this.userLogin({
					params: {
						code: this.code,
						nickName: this.nickName,
						avatarUrl: this.avatarUrl
					},
					stateName: 'token'
				})
				console.log('token',this.token)
			}
		}
	}
</script>

<style scoped lang="scss">
	/**index.wxss**/
	// #root {
	// 	display: flex;
	// 	flex-direction: column;
	// 	justify-content: space-between;
	// 	height: 100vh;
	// }

	// .btn-box {
	// 	margin-bottom: 60rpx;
	// }
	.popup-box {
		background-color: #fff;
		padding: 30rpx;
		// box-sizing: border-box;
		border-radius:8rpx;
	}
	.logo-box {
		text-align: center;
		/* border: 1px solid red; */
		image{
			width: 100%;
		}
	}

	.header {
		// margin: 90rpx 0 90rpx 50rpx;
		// border-bottom: 1px solid #ccc;
		margin-bottom: 40rpx;
		text-align: center;
		// width: 650rpx;
		// height: 300rpx;
		// line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 40rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 30rpx;
	}

	.bottom {
		border-radius: 80rpx;
		// margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
