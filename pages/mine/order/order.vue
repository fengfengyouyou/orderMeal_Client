<template>
	<view class="container">
			<view class="order-item" v-for="(e,i) in orderList" :key="i" @click="openDetail(e)">
				<view class="order-num">
					订单号：<text>{{e._id}}</text>
				</view>
				<view class="order-info">
					<view class="order-name-join">
						{{e.goodsList|joinName}}
					</view>
					<view>
						<text class="totalNum">x{{e.totalNumer}}</text>
						<text class="order-totalPrice">￥{{e.totalPrice}}</text>
					</view>
				</view>
				<view class="order-time">
					{{e.createTime}}
				</view>
			</view>
		<uni-load-more :status="more" :showIcon="true">
		</uni-load-more>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	import {
		uniLoadMore
	} from '@dcloudio/uni-ui'
	
	export default {
		data() {
			return {
				numPage:0,
				dataList:[],
				more:'more'
			}
		},
		components:{
			uniLoadMore
		},
		computed:{
			...mapState(['orderList','orderCount'])
		},
		filters:{
			joinName(arr){
				let str = arr.reduce((x,y)=>x+y.name+'、','')
				str = str.substring(0,str.length-1)
				return str.substr(0,9)
			}
		},
		onLoad() {
			this.initialize()
		},
		async onReachBottom(){
			console.log(this.orderList.length,this.orderCount)
			if(this.orderList.length<this.orderCount){
				this.more = 'loading'
			}else{
				this.more = 'noMore'
				return
			}
			try{
				this.numPage++
				await this.getList()
			}catch(err){
				this.more = 'more'
			}
			console.log('加载更多')
		},
		async onPullDownRefresh() {
			await this.initialize()
			uni.stopPullDownRefresh();
		},
		methods: {
			...mapActions(['getOrderList']),
			...mapMutations(['SET_VALUE']),
			initialize(){
				this.numPage = 0
				this.SET_VALUE({key:'orderList',value:[]})
				this.getList()
			},
			async getList(){
				await this.getOrderList({
					params:{
						condition:{
							pageNum:this.numPage
						}
					},
					stateName:'orderList'
				})
				// this.dataList=this.dataList.concat(this.orderList)
			},
			openDetail(obj){
				this.SET_VALUE({key:'handleOrder',value:obj})
				uni.navigateTo({
					url:"../order_detail/order_detail"
				})
			}
			
		}
	}
</script>
<style lang="scss" scoped>
	.order-item{
		padding: 40rpx 20rpx;
		background-color: #f8f8f8;
		margin: 8rpx 0;
	}
	.order-info{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.order-num, .order-time{
		color: #666;
	}
	.totalNum{
		color: #666;
		margin-right: 40rpx;
	}
	.order-totalPrice{
		color: green;
	}
</style>
