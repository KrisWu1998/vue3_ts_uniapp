<template>
	<view class="recommend-box">
		<view class="title">
			租屋推荐
		</view>
		<view class="item-wrap">
			<Item 
				v-for="(item, index) in info"
				:key="index"
				:data="item"
				:index="index"
			/>
		</view>
		<view class="bottom">
			<view v-if="loading">正在加载中...</view>
			<view v-else class="more" @tap="handleMore">
				查看更多
				<image 
					style="width: 16rpx; height: 26rpx; margin-left: 10rpx"
					src="../../static/arrows-right.png"
				/>
			</view>
		</view>
	</view>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import Item from './recommendItem.vue';
export default defineComponent({
	components: {
		Item
	},
	setup () {
		const state = reactive({
			info: [
				{
					title: '顶配 iPhone Xs 256g 跳楼大减价',
					tags: '免押金',
					money: '6.88',
					day: '30',
					url: '../../static/recommend-1.png'
				},
				{
					title: 'iPhone 6s 64g 电池贼耐用',
					tags: '免押金',
					money: '6.88',
					day: '30',
					url: '../../static/recommend-2.png'
				},
				{
					title: '顶配 iPhone Xs 256g 跳楼大减价',
					tags: '免押金',
					money: '6.88',
					day: '30',
					url: '../../static/recommend-1.png'
				},
				{
					title: 'iPhone 6s 64g 电池贼耐用',
					tags: '免押金',
					money: '6.88',
					day: '30',
					url: '../../static/recommend-2.png'
				},
			],
			loading: false
		});

		const methods = reactive({
			handleMore () {
				state.loading = true;
				setTimeout(()=>{
					const list = JSON.parse(JSON.stringify(state.info));
					state.info.push(...list);
					state.loading = false;
				}, 1000)
			}
		})
		return {
			...toRefs(state),
			...toRefs(methods)
		}
	}
})
</script>

<style lang="less" scoped>
.recommend-box {
	padding-top: 50rpx;
	background: #F7F8F9;
	.title {
		padding: 0 0 24rpx 30rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #222222
	}
	.item-wrap {
		display: flex;
		flex-wrap: wrap;
		padding: 0 24rpx;
	}
	.bottom {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-top: 10rpx;
		.more {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 268rpx;
			height: 61rpx;
			font-size: 30rpx;
			color: #999999;
			border: 2rpx solid #999999;
			border-radius: 30.5rpx;
			box-sizing: border-box;
		}
	}
}
</style>