<template>
  <view class="popup-box">
    <view class="head">
      <view class="snaps"></view>
    </view>
    <PayMoney />
    <Recommend />
  </view>
</template>

<script>
import { defineComponent } from 'vue'
import PayMoney from './paymoney.vue';
import Recommend from './recommend.vue';
export default defineComponent({
  components: {
    PayMoney,
    Recommend
  },
  setup() {
    
  },
})
</script>

<style lang="less" scoped>
.popup-box {
  position: relative;
  z-index: 999;
  width: 100%;
  padding-bottom: 40rpx;
  background: #F7F8F9;
  border-radius: 48rpx 48rpx 0 0 ;
  overflow: hidden;
  .head {
    position: relative;
    width: 100%;
    height: 60rpx;
    background: #FFF;
    .snaps{
      position: absolute;
      top: 20rpx;
      left: 50%;
      width: 60rpx;
      height: 10rpx;
      margin-left: -30rpx;
      background: #E2E2E2;
      border-radius: 5rpx;
    }
  }
}
</style>