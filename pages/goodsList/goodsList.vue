<template>
	<view class="list_box">
		<!-- 菜单左边 -->
		<view class="left">
			<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
				<view class="item" v-for="(item,index) in leftArray" :key="index" :class="{ 'active':index==leftIndex }"
				 :data-index="index" @tap="leftTap">{{item||'默认'}}</view>
			</scroll-view>
		</view>
		<view class="main">
			<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }" @scroll="mainScroll" :scroll-into-view="scrollInto"
			 scroll-with-animation="true" @touchstart="mainTouch" id="scroll-el">
				<block v-for="(item,index) in mainArray" :key="index">
					<view class="item" :id="'item-'+index">
						<view class="title">
							<view>{{item.type||'默认'}}</view>
						</view>
						<view class="goods" v-for="(item2,index2) in item.list" :key="index2" @click.stop="openDetail(item2)">
							<image :src="item2.image?item2.image?url_config+item2.image:'/static/taitea.jpg':'/static/taitea.jpg'" mode=""></image>
							<view class="goods-detail">
								<view>{{item2.name}}</view>
								<view class="describe">{{item2.describe}}</view>
								<view class="handle-box">
									<text class="money">¥{{item2.price}}</text>
									<i class="fa fa-plus-circle add-icon" @click.stop="openSize(item2)"></i>
								</view>
							</view>
						</view>
					</view>
				</block>

			</scroll-view>
		</view>
		<view class="bottom" id="cart">
			<view class="shopping-car">
				<view class="cart-icon-box" @click="isShowCar=!isShowCar">
					<uni-badge :text="cartNumer" class="badge" type="error"></uni-badge>
					<i class="fa fa-shopping-cart cart-icon"></i>
				</view>
				<view class="total-price">
					¥ {{totalPrice}}
				</view>
			</view>
			<button class="submit-btn can-submit" @click="submitOrder" v-if="cartArr.length">去结算</button>
			<button class="submit-btn" v-else>去结算</button>
			<view class="car-box" v-show="isShowCar">
				<view class="car-header">
					<text class="car-header-title">
						已选商品
					</text>
					<text class="delete-all" @click="clearCart">
						<i class="fa fa-trash-o"></i>删除
					</text>
				</view>
				<view class="car-content">
					<view class="car-goods" v-for="(e,i) in cartArr" :key="i">
						<view class="car-goods-left">
							<view class="car-goods-name">
								{{e.name}}
							</view>
							<view class="car-goods-attr">
								{{e.attribute|joinAttr}}
							</view>
						</view>
						<view class="car-goods-right">
							<view class="car-goods-price">
								￥{{e.totalPrice}}
							</view>
							<view class="car-goods-num">
								<uni-number-box :value="e.num" :obj="e" :index="i" @change="numberChange"></uni-number-box>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="goodsSize" type="bottom">
			<view class="popup-box">
				<view class="goods-size-box">
					<view class="popup-header">
						<image :src="currentGoods.image&&(url_config+currentGoods.image)" mode=""></image>
						<text>{{currentGoods.name||'--'}}</text>
					</view>
					<view class="handle-box">
						<text class="money">¥{{currentGoods.price||'--'}}</text>
					</view>
					<view class="conditions-box">
						<view class="conditions-item" v-for="(e,i) in currentGoods.attribute" :key="i">
							<view class="conditions-title">
								{{e.title}}
							</view>
							<radio-group @change="radioChange(e,$event)">
								<view class="radio-box">
									<label class="" v-for="(item, index) in e.tagArr" :key="index">
										<radio :value="item.id" :checked="item.id==e.condition" class="hidden-radio" />
										<view class="radio-text" :class="{active:e.condition==item.id}">{{item.name}}</view>
									</label>
								</view>
							</radio-group>
						</view>
					</view>
					<view class="sure-btn">
						<button type="primary" @click="addCart">选好了</button>
					</view>
				</view>

			</view>
		</uni-popup>
		<uni-popup ref="goodsDetail" type="bottom">
			<view class="popup-box">
				<image :src="currentGoods.image&&(url_config+currentGoods.image)" mode="" class="show-img"></image>
				<view class="goods-info">
					<text>{{currentGoods.name||'--'}}</text>
					<view class="handle-box">
						<text class="money">¥{{currentGoods.price||'--'}}</text>
						<i class="fa fa-plus-circle add-icon" @click.stop="openSize(currentGoods)"></i>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		uniBadge,
		uniPopup
	} from '@dcloudio/uni-ui'
	import uniNumberBox from '../../components/uni-number-box/uni-number-box.vue'
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		components: {
			uniBadge,
			uniPopup,
			uniNumberBox
		},
		data() {
			return {
				scrollHeight: '500px',
				isShowCar: false,
				options: [{
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png',
					text: '购物车',
					info: 2
				}],
				currentGoods: {},
				buttonGroup: [{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}],
				leftArray: [],
				mainArray: [],
				topArr: [],
				leftIndex: 0,
				isMainScroll: false,
				scrollInto: '',
				// tipsTop: '0px',
				url_config:'',
				cartArr:[]
			};
		},
		computed: {
			...mapState(['goodsList']),
			totalPrice(){
				if(this.cartArr.length>0){
					let num = this.cartArr.reduce((x,y)=>x+y.totalPrice*1,0)
					return num
				}else{
					return 0
				}
			},
			cartNumer(){
				return this.cartArr.length + ''
			}
		},
		filters:{
			joinAttr(arr){
				return arr.reduce((x,y,i)=>{
					if(i<arr.length-1){
						return x+y.condition+'/'
					}else{
						return x+y.condition
					}
				},'')
			}
		},
		onLoad(e) {
			this.url_config = getApp().globalData.url_config
			var _this = this
			uni.getSystemInfo({
				success: async (res) => {
					// let cartHeight = 
					let cart = await this.getElementInfo('#cart')
					/* 设置当前滚动容器的高，若非窗口的告诉，请自行修改 */
					this.scrollHeight = `${res.windowHeight-cart.height}px`;
					// console.log('gaodu', res.windowHeight)
				}
			});
			this.initialize()
		},
		async onPullDownRefresh() {
			await this.initialize()
			uni.stopPullDownRefresh();
		},
		methods: {
			...mapActions(['getGoodsList','addOrder']),
			async initialize() {
				await this.getGoodsList({
					params: {},
					stateName: 'goodsList'
				})
				this.getListData();
			},
			radioChange: function(obj, e) {
				// console.log(obj,e.target.value)
				obj.condition = e.target.value
				// console.log(obj.condition)
				// for (let i = 0; i < this.items.length; i++) {
				// 	if (this.items[i].value === evt.target.value) {
				// 		this.current = i;
				// 		break;
				// 	}
				// }
			},
			openSize(info) {
				this.currentGoods = info
				this.$refs.goodsDetail.close()
				this.$refs.goodsSize.open()
			},
			openDetail(info) {
				this.currentGoods = info
				this.$refs.goodsSize.close()
				this.$refs.goodsDetail.open()
			},
			addCart(){
				let obj = Object.assign({num:1,totalPrice:this.currentGoods.price},this.currentGoods)
				this.cartArr.push(obj)
				console.log(this.cartArr)
				this.$refs.goodsSize.close()
				this.$refs.goodsDetail.close()
			},
			numberChange(val,obj,i){
				console.log(val,obj,i)
				if(val<1){
					this.cartArr.splice(i,1)
				}else{
					obj.totalPrice = obj.price*val
					// let arr = JSON.parse(JSON.stringify(this.cartArr))
					// arr[i]=obj
					this.cartArr.splice(i,1,obj)
					console.log(obj.totalPrice)
				}
			},
			clearCart(){
				this.cartArr = []
			},
			async submitOrder(){
				let req = {
					goodsList:this.cartArr,
					totalPrice:this.totalPrice,
					totalNumer:this.cartArr.length
				}
				let res = await this.addOrder({
					params: req
				})
				if(!res){
					this.clearCart()
				}
				// console.log(this.cartArr)
			},
			/* 获取列表数据 */
			getListData() {
				let copyList = JSON.parse(JSON.stringify(this.goodsList)).map(e=>{
					e.attribute.forEach((p,n)=>{
						// console.log(p.valueArr,p.valueArr.constructor===String)
						let arr = p.valueArr.constructor===String?p.valueArr.split('/'):p.valueArr
						e.attribute[n] = {
							title: p.type,
							condition: arr[0],
							tagArr: arr.map(m=>({
								name:m,
								id:m
							}))
						}
					})
					return e
				})
				let left = [],
					main = []
				copyList.forEach((e, i) => {                 
					if (left.indexOf(e.type) == -1) {
						left.push(e.type)
					}
				})
				left.forEach((e, i) => {
					let arr = copyList.filter(p => p.type === e)
					main.push({
						type: e,
						list: arr
					})
				})
				console.log(left, main)
				this.leftArray = left
				this.mainArray = main
				this.$nextTick(() => {
					this.getElementTop();
				});
			},
			//获取距离顶部的高度
			getScrollTop(selector) {
				return new Promise((resolve, reject) => {
					let query = uni.createSelectorQuery().in(this);
					query.select(selector + '').boundingClientRect(data => {
						resolve(data.top)
					}).exec();
				})
			},
			getElementInfo(selector) {
				return new Promise((resolve, reject) => {
					let query = uni.createSelectorQuery().in(this);
					query.select(selector + '').boundingClientRect(data => {
						resolve(data)
					}).exec();
				})
			},
			/* 获取元素顶部信息 */
			async getElementTop() {
				/* Promise 对象数组 */
				let p_arr = [];

				/* 遍历数据，创建相应的 Promise 数组数据 */
				for (let i = 0; i < this.mainArray.length; i++) {
					const resu = await this.getScrollTop(`#item-${i}`)
					p_arr.push(resu)
				}

				// console.log('p_arr', p_arr)

				/* 主区域滚动容器的顶部距离 */
				this.getScrollTop("#scroll-el").then((res) => {

					let top = res;

					// #ifdef H5
					top += 43; //因固定提示块的需求，H5的默认标题栏是44px
					// #endif

					/* 所有节点信息返回后调用该方法 */
					Promise.all(p_arr).then((data) => {
						// console.log('滚动', data)
						this.topArr = data;
					});
				})
			},

			/* 主区域滚动监听 */
			mainScroll(e) {
				if (!this.isMainScroll) {
					return;
				}
				let top = e.detail.scrollTop;
				let index = -1;

				if (top >= this.topArr[this.topArr.length - 1]) {
					index = this.topArr.length - 1;
				} else {
					index = this.topArr.findIndex((item, index) => {
						return this.topArr[index + 1] >= top;
					});
				}
				this.leftIndex = (index < 0 ? 0 : index);
			},
			/* 主区域触摸 */
			mainTouch() {
				this.isMainScroll = true;
			},
			/* 左侧导航点击 */
			leftTap(e) {
				let index = e.currentTarget.dataset.index;
				this.isMainScroll = false;
				this.leftIndex = Number(index);
				this.scrollInto = `item-${index}`;
			}
		}
	}
</script>

<style lang="scss">
	.list_box {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
		font-size: 28rpx;

		.left {
			width: 200rpx;
			background-color: #f6f6f6;
			line-height: 80rpx;
			box-sizing: border-box;
			font-size: 32rpx;

			.item {
				padding-left: 20rpx;
				position: relative;
				line-height: 100rpx;

				&:not(:first-child) {
					margin-top: 1px;

					&::after {
						content: '';
						display: block;
						height: 0;
						border-top: #d6d6d6 solid 1px;
						width: 620upx;
						position: absolute;
						top: -1px;
						right: 0;
						transform: scaleY(0.5);
						/* 1px像素 */
					}
				}

				&.active,
				&:active {
					color: #42b983;
					background-color: #fff;
				}
			}
		}

		.main {
			background-color: #fff;
			padding-left: 20rpx;
			width: 0;
			flex-grow: 1;
			box-sizing: border-box;

			.tips {
				line-height: 64rpx;
				font-size: 24rpx;
				font-weight: bold;
				color: #666;
				height: 64rpx;
				position: fixed;
				top: 44px;
				right: 0;
				width: 530rpx;
				z-index: 10;
				background-color: #fff;
				padding-left: 10rpx;
			}

			.title {
				line-height: 64rpx;
				position: relative;
				font-size: 24rpx;
				font-weight: bold;
				color: #666;
				height: 64rpx;
			}

			.item {
				margin-bottom: 20rpx;
			}

			.goods {
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				justify-content: flex-start;
				align-items: center;
				align-content: center;
				margin-bottom: 10rpx;

				&>image {
					width: 120rpx;
					height: 120rpx;
					// margin-right: 16rpx;
				}

				.describe {
					font-size: 24rpx;
					color: #999;
				}
			}
		}
	}


	.goods-detail {
		flex: 1;
		padding: 0 20rpx;
	}

	.money {
		font-size: 24rpx;
		color: #efba21;
	}

	.add-icon {
		color: #c0c0c0;
		font-size: 32rpx;
	}

	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		height: 90rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.car-box {
		position: absolute;
		background-color: #d6d6d6;
		width: 100%;
		bottom: 100%;
		border-bottom: 30rpx solid #eff3f4;
	}

	.car-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #eff3f4;
		padding: 20rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		color: #75787f;

	}

	.car-content {
		padding: 0 20rpx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.shopping-car {
		flex: 1;
		padding-left: 30rpx;
		display: flex;
		height: 100%;
		box-sizing: border-box;
		align-items: center;

		.total-price {
			font-size: 36rpx;
			color: #fff;
			padding-left: 50rpx;
		}
	}

	.cart-icon-box {
		background-color: #776b6b;
		border-radius: 50%;
		width: 90rpx;
		height: 90rpx;
		position: relative;
		top: -20rpx;
		z-index: 100;

		.cart-icon {
			font-size: 60rpx;
			color: #fdfeff;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.badge {
			position: absolute;
			top: 0;
			right: 0;
			transform: translate(40%, -40%);
		}
	}

	.submit-btn {
		border-radius: 0;
		height: 100%;
		width: 200rpx;
		background-color: #776b6b;
		color: #fdfeff;
		&.can-submit{
			background-color: green;
		}

	}

	.handle-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.popup-box {
		background-color: #fff;
	}

	.goods-info {
		padding: 30rpx;
	}

	.popup-header {
		display: flex;
		align-items: center;

		image {
			width: 100rpx;
			height: 100rpx;
		}
	}

	.goods-size-box {
		padding: 20rpx;
	}

	.radio-box {
		display: flex;
		flex-wrap: wrap;

		.radio-text {
			padding: 10rpx 6rpx;
			border-radius: 4rpx;
			background-color: #eef1f6;
			min-width: 60rpx;
			text-align: center;
			font-size: 24rpx;

			&.active {
				background-color: #018762;
				color: #fff;
			}
		}

		.hidden-radio {
			display: none;
		}
	}

	.conditions-box {
		padding-bottom: 40rpx;

		.conditions-title {
			padding: 20rpx 0;
		}
	}

	.sure-btn {
		button {
			background-color: #018762;
		}
	}
	.show-img{
		width: 100%;
		height: 240rpx;
	}
	.car-goods{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.car-goods-left{
			flex: 1;
		}
		.car-goods-right{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
	.car-goods-attr{
		color: #666;
	}
	.car-goods-price{
		color: green;
		padding: 0 20rpx;
	}
</style>
