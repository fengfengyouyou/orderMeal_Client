<template>
	<view class="container">
		<form @submit="formSubmit" @reset="formReset" class="form-box">
			<view class="form-item">
				<text>商品名称：</text>
				<input class="input-area" type="text" v-model="goodsInfo.name" placeholder="请输入商品名称" />
			</view>
			<view class="form-item">
				<text>商品类目：</text>
				<input class="input-area" type="text" v-model="goodsInfo.type" placeholder="请输入商品类目" />
			</view>
			<view class="form-item">
				<text>商品价格：</text>
				<input class="input-area" type="number" v-model="goodsInfo.price" placeholder="请输入商品价格" />
			</view>
			<view class="form-item">
				<text>图片展示：</text>
				<image :src="goodsInfo.image&&url_config+goodsInfo.image||goodsImg" mode="" @click="chooseImg" class="show-img"></image>
				<progress :percent="percent" stroke-width="16" v-if="isUpload" border-radius="10" show-info></progress>
			</view>
			<view class="form-item">
				<view class="attr-header">
					<text>商品属性：</text>
					<button type="primary" @click="addAttr"><i class="fa fa-plus"></i> 添加类型</button>
				</view>
				<view class="attr-item" v-for="(e,i) in goodsInfo.attribute" :key="i">
					<input class="attr-item-input" type="text" v-model="e.type" placeholder="请输入条件类型" />
					<input class="attr-item-input" type="text" v-model="e.valueArr" placeholder="请输入具体条件,用'/'隔开" />
					<!-- <button type="primary" class="attr-item-input" @click="saveAttr"><i class="fa fa-plus"></i>保存</button> -->
				</view>
			</view>
			<view class="uni-btn-v">
				<button form-type="submit">Submit</button>
				<button type="default" form-type="reset">Reset</button>
			</view>
		</form>
	</view>
</template>

<script>
	import httpUrl from '@/common/config.js'
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {
				goodsInfo: {
					name: '',
					price: '',
					attribute: [],
					image: '',
					type:''
				},
				goodsImg: '/static/plus.png',
				percent: 0,
				isUpload: false,
				domainName:httpUrl,
				url_config:''
			}
		},
		computed:{
			...mapState(['handleGoods'])
		},
		onLoad(){
			this.url_config = getApp().globalData.url_config
			this.goodsInfo={
				...this.goodsInfo,
				...this.handleGoods
			}
			console.log(this.goodsInfo)
			console.log(getApp().globalData.url_config)
		},
		methods: {
			...mapActions(['updateGoods']),
			async formSubmit() {
				console.log(this.goodsInfo)
				let res = await this.updateGoods({
					params:this.goodsInfo
				})
				console.log('来了',res)
			},
			formReset() {

			},
			addAttr() {
				this.goodsInfo.attribute.push({
					type: '',
					valueArr: []
				})
			},
			chooseImg() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res);
						this.goodsImg = res.tempFilePaths
						const tempFilePaths = res.tempFilePaths;

						this.isUpload = true
						const uploadTask = uni.uploadFile({
							url: httpUrl+'/file/upload',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {},
							success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data)
								console.log(data);
								this.goodsInfo.image = data.filePath
							},
							complete: () => {
								this.isUpload = false
								this.percent = 0
							}
						});
						uploadTask.onProgressUpdate((res) => {
							this.percent = res.progress;
							// console.log('上传进度' + res.progress);
							// console.log('已经上传的数据长度' + res.totalBytesSent);
							// console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
						});
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	input {
		border: 1px solid #999;
	}

	.container {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.form-box {
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.attr-item {
		padding: 30rpx 0;
		border-bottom: 2rpx solid #666;
	}

	// .form-item{
	// 	display: flex;
	// 	justify-content: space-between;
	// 	.input-area{
	// 		flex: 1;
	// 	}
	// }
	.show-img {
		width: 100%;
	}

	.attr-header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		button {
			display: inline-block;
			margin: 0;
		}
	}

	.attr-item-input {
		margin-top: 20rpx;
	}
</style>
