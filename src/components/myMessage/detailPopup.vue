<template>
  <van-popup 
    v-model:show="isShow"
    position="bottom" 
    round
    style="height: 837rpx"
  >
    <view class="message-detail-popup">
      <view class="message-detail-content">
        <scroll-view
          :scroll-y="true"
          style="height: 100%">
          <view class="message-detail-content-title"
          >
            {{ info.title }}
          </view>
          <view class="message-detail-content-body">
            {{ info.content }}
          </view>
        </scroll-view>
      </view>
      <view class="message-detail-bottom">
        <view class="message-detail-bottom-delete" @click="close">
          删除
        </view>
        <view class="message-detail-bottom-submit" @click="close">
          确定
        </view>
      </view>
    </view>
  </van-popup>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  setup () {
    const state = reactive({
      isShow: false,
      info: {}
    });
    const methods = reactive({
      open (info) {
        state.info = {};
        state.isShow = true;
        state.info = info;
      },
      close () {
        state.isShow = false;
      }
    });
    return {
      ...toRefs(state),
      ...toRefs(methods)
    }
  }

})
</script>

<style lang="less" scoped>
.message-detail-popup {
  display: flex !important;
  flex-direction: column !important;
  height: 100%;
  .message-detail-content {
    flex: 1;
    padding: 75rpx 30rpx 44rpx 30rpx;
    box-sizing: border-box;
    overflow: scroll;
    .message-detail-content-titl {
      font-size: 36rpx;
      color: #333333;
    }
    .message-detail-content-body {
      margin: 20rpx 0;
      font-size: 28rpx;
      color: #999999;
    }
  }
  .message-detail-bottom {
    display: flex;
    height: 100rpx;
    .message-detail-bottom-delete {
      padding: 32rpx 79rpx;
      font-size: 36rpx;
      color: #BFBFBF;
      background: #F2F2F2;
    }
    .message-detail-bottom-submit {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      /* padding: 32rpx 224rpx; */
      font-size: 36rpx;
      color: #FFF;
      background: #00C8BE;
      box-sizing: border-box;
    }
  }
}

</style>