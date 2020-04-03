<template>
	<view class="container">
		<view class="order-static">
			<view class="order-num order-item">
				订单号：
				<text class="item-text">{{ handleOrder._id }}</text>
			</view>
			<view class="order-time order-item">
				创建时间：
				<text class="item-text">{{ handleOrder.createTime }}</text>
			</view>
			<view class="order-price order-item">
				总价：
				<text class="item-text">￥{{ handleOrder.totalPrice }}</text>
			</view>
		</view>
		<view class="order-goods" v-for="(e, i) in handleOrder.goodsList" :key="i" @click="openDetail(e)">
			<view class="order-info">
				<view class="order-info-text">
					<view>
						{{ e.name }}
						<text class="totalNum">x{{ e.num }}</text>
					</view>
					<view class="order-name-join">{{ e.attribute | joinAttr }}</view>
					<view>
						<text class="order-totalPrice">￥{{ e.totalPrice }}</text>
					</view>
				</view>
				<image :src="url_config + e.image" mode="" class="goods-img"></image>
			</view>
		</view>
	</view>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			url_config: ''
		};
	},
	computed: {
		...mapState(['handleOrder'])
	},
	filters: {
		joinAttr(arr) {
			let condition = arr.reduce((x, y, i) => {
				if(y.condition){
					if (i < arr.length - 1) {
						return x + y.condition + '/';
					} else {
						return x + y.condition;
					}
				}else{
					return x
				}
			}, '');
			return condition || '默认'
		}
	},
	onLoad() {
		this.url_config = getApp().globalData.url_config;
		console.log(this.handleOrder);
	}
};
</script>

<style lang="scss" scoped>
.order-static {
	background-color: #f8f8f8;
	margin-bottom: 30rpx;
	padding: 20rpx;
}
.order-item {
	color: #666;
}
.item-text {
	color: #333;
}
.order-goods {
	background-color: #f8f8f8;
	border-bottom: 1rpx solid #999;
}
.order-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
}
.goods-img {
	width: 160rpx;
	height: 160rpx;
}
.totalNum {
	margin-left: 40rpx;
}
.order-totalPrice {
	color: #efba21;
	font-size: 36rpx;
}
.order-info-text {
	height: 160rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
</style>
