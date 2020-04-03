<template>
	<view class="content">
		<view class="title">
			{{news.title}}
		</view>
		<view class="art-content">
			<rich-text :nodes="news.content"></rich-text>
		</view>
		<picker mode="selector" value= '0' :range="city" @change="cityChange">
			<view>picker</view>
		</picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsId: "",
				news: {},
				city: ['卢文峰', '是傻逼', '深圳', '广州']
			};
		},
		onLoad(e) {
			console.log(e)
			this.newsId = e.newsId
			this.initialize()
		},
		methods: {
			// 选择城市
			cityChange(item) {
				console.log(item)
			},
			initialize() {
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/news/36kr/' + this.newsId,
					method: 'GET',
					data: {},
					success: res => {
						console.log(res)
						this.news = res.data
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 10upx 2%;
		width: 96%;
		flex-wrap: warp;
	}

	.title {
		line-height: 2em;
		text-align: center;
	}
	.art-content {
		line-height: 2em;
	}
</style>
