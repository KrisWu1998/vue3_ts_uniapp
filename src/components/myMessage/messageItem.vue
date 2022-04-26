<template>
  <view class="messageItem-card-wrap" @tap="confirm">
    <view class="messageItem-box">
      <view class="messageItem-box-left">
        <image
          :src="iconUrl"
          mode="aspectFit"
          style="width: 48rpx; height: 48rpx"
        >
        </image>
        <view 
          v-if="!info.isRead"
          class="messageItem-box-left-icon" 
        />
      </view>
      <view class="messageItem-box-right">
        <view class="item-box-r-top">
          <text class="item-box-r-t-left">
            {{ info.title }}
          </text>
          <text class="item-box-r-t-right">
            {{ info. time}}
          </text>
        </view>
        <view class="item-box-r-bottom">
          {{ info.content }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    iconUrl: {
      type: String,
      default: ''
    }
  },
  setup () {
    const methods = reactive({
      confirm () {

      }
    });
    return {
      ...toRefs(methods)
    }
  }

})
</script>

<style lang="less" scoped>
.messageItem-card-wrap {
  display: flex;
  padding: 24rpx 0 0 30rpx;
  background: #FFF;
  .messageItem-box {
    display: flex;
    width: 100%;
    padding: 0 30rpx 32rpx 0;
    border-bottom: 1rpx solid rgba(242, 242, 242, 1);
    box-sizing: border-box;
    .messageItem-box-left {
      position: relative;
      width: 48rpx;
      height: 48rpx;
      margin-right: 20rpx;
      .messageItem-box-left-icon {
        position: absolute;
        top: -4rpx;
        right: -12rpx;
        width: 16rpx;
        height: 16rpx;
        background: orange;
        border-radius: 50%;
      }
    }
    .messageItem-box-right {
      width: calc(100% - 68rpx);
      .item-box-r-top {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .item-box-r-t-left {
          font-size: 32rpx;
          color: #333333;
        }
        .item-box-r-t-right {
          font-size: 24rpx;
          color: rgba(153, 153, 153, 1);
        }
      }
      .item-box-r-bottom {
        width: 100%;
        margin-top: 20rpx;
        font-size: 24rpx;
        color: #999999;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>