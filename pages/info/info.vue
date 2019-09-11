<template>
	<view class="content">
		<view class="title">
			{{news.title}}
		</view>
		<view class="art-content">
			<rich-text :nodes="news.content"></rich-text>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsId: "",
				news: {}
			};
		},
		onLoad(e) {
			console.log(e)
			this.newsId = e.newsId
			this.initialize()
		},
		methods: {
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
