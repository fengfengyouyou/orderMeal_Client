<template>
	<view class="container">
		<view class="user-info">
			<image :src="userInfo.avatarUrl" mode="" class="user-img"></image>
			<view class="user-name">{{ userInfo.nickName || '--' }}</view>
		</view>
		<view class="nav-area">
			<navigator url="/pages/mine/goodsAdd/goodsAdd" hover-class="navigator-hover">
				<view class="nav-view">
					<text>添加商品</text>
					<i class="fa fa-angle-right"></i>
				</view>
			</navigator>
			<navigator url="/pages/mine/goodsList/goodsList" hover-class="other-navigator-hover">
				<view class="nav-view">
					<text>商品管理</text>
					<i class="fa fa-angle-right"></i>
				</view>
			</navigator>
			<navigator url="/pages/mine/order/order" hover-class="other-navigator-hover">
				<view class="nav-view">
					<text>订单</text>
					<i class="fa fa-angle-right"></i>
				</view>
			</navigator>
			<view class="nav-view" @click="clearStatus">
				<text>退出登录</text>
			</view>
		</view>
	</view>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {};
	},
	computed: {
		...mapState(['userInfo'])
	},
	onLoad() {
		console.log(this.userInfo);
	},
	methods:{
		...mapActions(['clearStatus'])
	}
};
</script>

<style scoped lang="scss">
.user-info {
	background-color: #f8f8f8;
	text-align: center;
	margin-bottom: 40rpx;
	padding: 40rpx 0;
	.user-name {
		text-align: center;
	}
}
.user-img {
	width: 200rpx;
	height: 200rpx;
	border-radius: 50%;
}
.nav-area {
	background-color: #f8f8f8;
	// border-top: 2rpx solid #555555;
}
.nav-view {
	display: flex;
	border-bottom: 2rpx solid rgba(0, 0, 0, 0.2);
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
	color: #666;
}
</style>
