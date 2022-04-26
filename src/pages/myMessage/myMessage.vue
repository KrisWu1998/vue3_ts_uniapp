<template>
	<view class="myMessage-box">
		<!-- 头部返回 -->
		<view class="back" @tap="handleGoBack()">
			<van-icon name="arrow-left" size="20" style="margin-right: 4rpx"/>
			返回
			<view class="back-title">
				消息
			</view>
		</view>
		<!-- 选项卡 -->
 		<Tabs
			:tabs="tabs"
			v-model:activeIndex="activeIndex"
			class="tabs-box"
		/>
		<!-- 已读操作栏 -->
		<view class="handle-box">
			<view
				v-for="(item, index) in handleList"
				:key="index"
				class="handle-item"
				@tap="handleRead(index)"
			>
				<image 
					:src="item.url"
					class="handle-item-icon"
				/>
				{{ item.label }}
			</view>
  	</view>
		<!-- 消息列表 -->
		<view style="flex: 1; overflow: hidden">
			<van-pull-refresh
				v-model="loading"
				:disabled="!!domScrollTop"
				@refresh="onRefresh"
				class="content-pull-box"
				>
				<view 
					v-for="(tabsItem, tabsIndex) in tabs"
					:key="tabsIndex"
					v-show="activeIndex === tabsIndex"
					@scroll="handleScroll($event)"
					class="myMessage-content-wrap">
					<view v-if="globalData[tabsItem.id].length">
						<MessageItem
							v-for="(itemInfo, itemIndex) in globalData[tabsItem.id]"
							:key="itemIndex"
							:info="itemInfo"
							:iconUrl="iconUrlList[tabsItem.id]"
							@tap="handleDetail(itemInfo)"
						/>
						<!-- <view class="no-more">没有更多了</view> -->
					</view>
					<EmptyPage
						v-else
					/>
				</view>
			</van-pull-refresh>
		</view>
		<DetailPopup 
			ref="DetailPopup"
		/>
	</view>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from 'vue'
import { Dialog, Toast } from 'vant';
import Tabs from '@/components/tabs';
import MessageItem from '@/components/myMessage/messageItem.vue';
import EmptyPage from '@/components/emptyPage';
import DetailPopup from '@/components/myMessage/detailPopup.vue';
export default defineComponent({
	onPullDownRefresh() {
		console.log('refresh');
		setTimeout(function () {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	components: {
		Tabs,
		MessageItem,
		EmptyPage,
		DetailPopup
	},
	setup () {
		const DetailPopup = ref(null);
		const state = reactive({
			domScrollTop: 0,
			loading: false,
			isShowDeleteModal: false, // 控制删除已读Modal
			isShowReadModal: false, // 控制一键已读Modal
			isShowDetail: false, // 查看详情
			activeIndex: 0,
			currentDetailInfo: {}, // 当前查看的详情数据
			tabs: [
				{
					id: 1,
					title: '活动公告',
					number: 3,
				},
				{
					id: 2,
					title: '订单消息',
					number: 1,
				},
			],
			handleList: [
				{
					url: '../../static/delete.png',
					label: '删除已读'
				},
				{
					url: '../../static/clear.png',
					label: '一键已读'
				}
			],
			// 对应消息列表
			globalData: {
				1: [
					{
						id: 11,
						title: '活动通知',
						content: '恭喜获得20个租币，请查收!',
						time: '2020-03-23 14:30',
						isRead: false
					},
					{
						id: 12,
						title: '免费得iPhone11',
						content: '恭喜获得20个租币，请查收!',
						time: '2020-03-23 14:30',
						isRead: false
					},
					{
						id: 13,
						title: '节日赠租币',
						content: '人人租机祝你节日快乐，送88个租币位置送88个租币位置送88个租币位置',
						time: '2020-03-23 14:30',
						isRead: false
					}
				],
				2: [
					{
						id: 21,
						title: '订单已取消',
						content: '订单已成功取消，感谢您的关注',
						time: '2020-03-23 14:30',
						isRead: false
					}
				]
			},
			// 对应消息列表 每条数据显示的icon图标
			iconUrlList: {
				1: '../../static/message-tips.png',
				2: '../../static/message-book.png'
			}
		});
		const methods = reactive({
			handleGoBack () {
				uni.navigateBack({
					delta: 1
				})
			},
			// 已读操作栏
			handleRead (index: number): void {
				const message = index === 1 ? '是否确认要已读全部通知' : '是否确认要删除已读通知';
				const cancelText = index === 1 ? '确认已读' : '确认删除';
				Dialog.confirm({
					width: '540rpx',
					message,
					confirmButtonText: '取消',
					cancelButtonText: cancelText
				})
				.catch(() => {
					this.runningDeleteOrRead(index);
					// on cancel
				});
			},
			// 处理删除、已读
			runningDeleteOrRead (index: number): void {
				const { activeIndex, tabs, globalData } = state;
				const { id } = tabs[activeIndex];
				// const currentData = globalData[id];
				index === 1 ? this.handleAllRead(activeIndex, id) : this.deleteCanRead(activeIndex,id);
			},
			// 删除全部已读
			deleteCanRead (activeIndex: number, id: number): void {
				this.openLoading();
				setTimeout(()=>{
					const { globalData, tabs } = state;
					// 是否存在已读
					const hasCanRead = globalData[id].some((item: any)=>{
						return item.isRead
					});
					if (!hasCanRead) {
						return Toast.loading({
							type: 'fail',
							message: '暂无未有已消息!',
							duration: 1000
						});
					}
					const newList = globalData[id].filter((item: any)=>!item.isRead) || [];
					globalData[id] = newList;
					if (!globalData[id].length) {
						tabs[activeIndex].number = 0;
						Toast.loading({
							type: 'success',
							message: '处理成功!',
							duration: 1000
						});
					}
				}, 1000)
			},
			// 一键已读
			handleAllRead (activeIndex: number, id: number): void {
				this.openLoading();
				setTimeout(()=>{
					const { globalData, tabs } = state;
					// 校验是否存在未读信息;
					const hasNoRead = globalData[id].some((item: any)=>{
						return !item.isRead
					})
					if (!hasNoRead) {
						return Toast.loading({
							type: 'fail',
							message: '暂无未读消息!',
							duration: 1000
						});
					}
					globalData[id].forEach((item: any)=>{
						item.isRead = true;
					});
					tabs[activeIndex].number = 0;
					Toast.loading({
						type: 'success',
						message: '处理成功!',
						duration: 1000
					});
				}, 1000)
				
			},
			handleDetail (info: object) {
				const popupDom = DetailPopup.value;
				popupDom?.open(info);
			},
			openLoading () {
				Toast.loading({
					message: '正在加载中...',
					forbidClick: true,
					duration: 1000
				});
			},
			onRefresh () {
				setTimeout(()=>{
					const { activeIndex, tabs, globalData } = state;
					const { id } = tabs[activeIndex];
					const currentList = globalData[id];
					const pushList = JSON.parse(JSON.stringify(currentList));
					pushList.forEach(item=>item.isRead = false);
					globalData[id].push(...pushList);
					state.loading = false;
				}, 1000)
			},
			handleScroll () {
				const dom = document.querySelector('.myMessage-content-wrap')
				state.domScrollTop = dom?.scrollTop;
			}
		})
		watch(()=>state.activeIndex, (newVal, oldVal) =>{
			state.domScrollTop = 0;
		})

		return {
			DetailPopup,
			...toRefs(state),
			...toRefs(methods)
		}
	}
})
</script>

<style lang="less">
.myMessage-box {
	display: flex;
	flex-direction: column;
	height: 100vh;
	padding-top: 32rpx;
	box-sizing: border-box;
	.back {
		display: flex;
		// justify-content: space-between;
		align-items: center;
		position: relative;
		width: 100%;
		margin-bottom: 56rpx;
		padding: 0 40rpx;
		font-size: 32rpx;
		color: #108EE9;
		box-sizing: border-box;
		.back-title {
			position: absolute;
			left: 45%;
			font-size: 36rpx;
			font-weight: bold;
			color: #000
		}
	}
	.tabs-box {
		padding: 0 40rpx 20rpx 40rpx;
	}
	.handle-box {
		display: flex;
		padding: 30rpx 40rpx;
		font-size: 24rpx;
		color: rgba(153, 153, 153, 1);
		background: rgba(247, 248, 249, 1);
		.handle-item {
			margin-right: 29rpx;
			padding-right: 29.6rpx;
			border-right: 2rpx solid rgba(217, 217, 217, 1);
			&:nth-last-child(1) {
				padding-left: 0;
				border-right: none;
			}
			.handle-item-icon {
				width: 24rpx;
				height: 24rpx;
				margin-right: 4rpx;
			}
		}
	}
	.content-pull-box {
		// flex: 1;
		// min-height: 100%;
		height: 100%;
		// overflow: auto;
		.myMessage-content-wrap {
			height: 100%;
			overflow-y: auto;
			.no-more {
				display: flex;
				justify-content: center;
				margin-top: 40rpx;
				font-size: 24rpx;
				color: #999999;
			}
		}
	}
}
/deep/ .van-dialog {
	border-radius: 14rpx;
	.van-dialog__message {
		padding: 50rpx 32rpx 76rpx 32rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #333333
	}
	.van-dialog__cancel {
		font-size: 36rpx;
		color: #999999;
	}
	.van-dialog__confirm {
		font-size: 36rpx;
		color: #00C8BE;
	}
}
</style>
