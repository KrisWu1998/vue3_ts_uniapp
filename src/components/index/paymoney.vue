<template>
  <view class="paymoney-box">
    <view class="title">租币当钱花</view>
    <scroll-view scroll-x="true" class="item-wrap">
      <image
        v-for="(item, index) in info"
        :key="index"
        :src="item"
        class="item"
      />
    </scroll-view>
  </view>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      info: [
        '../../static/shop.png',
        '../../static/task.png',
        '../../static/getMoney.png',
        '../../static/shop.png',
        '../../static/task.png',
        '../../static/getMoney.png',
      ]
    });
    const methods = reactive({
      getUrl (url) {
        return `url(${new URL(url, import.meta.url).href})`;
      },
    })
    return {
      ...toRefs(state),
      ...toRefs(methods)
    }
  },
})
</script>

<style lang="less" scoped>
.paymoney-box {
  background: #FFF;
  padding: 0 30rpx;
  padding-bottom: 30rpx;
  .title {
    margin-bottom: 30rpx;
    font-size: 36rpx;
    font-weight: bold;
    color: #222222;
  }
  .item-wrap {
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
    .item {
      width: 200rpx;
      height: 240rpx;
      margin-right: 10rpx;
      :nth-last-child(1) {
        margin-right: 0;
      }
    }
  }
}
</style>
