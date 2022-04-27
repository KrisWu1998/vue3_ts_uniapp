<template>
  <view class="userInfo-box">
    <!-- 第一行 /  头像 规则 -->
    <view class="userInfo-top">
      <view class="userInfo-top-left">
        <image
          mode="aspectFit"
          :src="userInfo.avatar"
          class="userInfo-avatar"
        />
        <view class="userInfo-tags"> 租币当钱花 </view>
      </view>
      <view class="userInfo-top-right">
        <view class="userInfo-rule">
          <image
            mode="aspectFit"
            src="../../../static/doubt.png"
            class="userInfo-rule-icon"
          />
          规则
        </view>
      </view>
    </view>

    <!-- 第二行 / 可用租币 赚取 -->
    <view class="userInfo-mid">
      <view class="userInfo-mid-left">
        <view class="label">可用租币</view>
        <view class="moneyNum">{{ moneyNum }}</view>
      </view>
      <view class="userInfo-mid-right">
        <image
          mode="aspectFit"
          src="../../../static/addMoney_button.png"
          style="width: 260rpx; height: 112rpx"
        />
      </view>
    </view>

    <!-- 第三行 / 活动卡片 -->
    <scroll-view class="userInfo-bottom" :scroll-x="true">
      <view
        v-for="(item, index) in cardList"
        :key="index"
        class="userInfo-card-item"
        :style="{ backgroundColor: item }"
      >
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  props: {
    userInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const state = reactive({
      moneyNum: 1560,
      cardList: [
        "lightpink",
        "lightblue",
        "lightcoral",
        "orange",
        "lightsteelblue",
      ],
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less" scoped>
.userInfo-box {
  position: relative;
  width: 100%;
  height: 320rpx;
  margin-bottom: 105rpx;
  padding: 20rpx 10rpx 0 30rpx;
  background-image: linear-gradient(#ff8a3c, #ff611c);
  border-bottom-left-radius: 40rpx;
  box-sizing: border-box;
  &::after {
    content: "";
    position: absolute;
    top: 135rpx;
    left: 120rpx;
    width: 240rpx;
    height: 210rpx;
    background: url("@/static/rrz-cion.png") no-repeat;
    background-size: 100% 100%;
  }
  .userInfo-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-bottom: 30rpx;
    .userInfo-top-left {
      flex: 1;
      display: inline-flex;
      align-items: center;
      .userInfo-avatar {
        width: 64rpx;
        height: 64rpx;
        margin-right: 16rpx;
        border-radius: 50%;
      }
      .userInfo-tags {
        padding: 8rpx 10rpx;
        font-size: 24rpx;
        line-height: 1;
        color: rgba(255, 255, 255, 0.8);
        background: rgba(255, 255, 255, 0.1);
      }
    }
    .userInfo-top-right {
      margin-right: 20rpx;
      .userInfo-rule {
        display: inline-flex;
        align-items: center;
        justify-self: self-end;
        float: right;
        font-size: 26rpx;
        color: #fff;
        .userInfo-rule-icon {
          width: 28rpx;
          height: 28rpx;
          margin-right: 10rpx;
        }
      }
    }
  }
  .userInfo-mid {
    display: flex;
    align-items: center;
    .userInfo-mid-left {
      flex: 1;
      align-self: flex-start;
      display: flex;
      flex-direction: column;
      height: 100%;
      .label {
        margin-bottom: 8rpx;
        font-size: 24rpx;
        color: rgba(255, 255, 255, 0.8);
      }
      .moneyNum {
        font-size: 70rpx;
        color: #fff;
      }
    }
  }
  .userInfo-bottom {
    position: absolute;
    left: 0;
    z-index: 10;
    bottom: -68.5rpx;
    width: 100%;
    height: 137rpx;
    padding-left: 30rpx;
    box-sizing: border-box;
    white-space: nowrap;
    .userInfo-card-item {
      display: inline-block;
      position: relative;
      width: 268rpx;
      height: 137rpx;
      margin-right: 20rpx;
      &::after {
        content: "";
        position: absolute;
        z-index: 10;
        right: 0;
        bottom: 0;
        width: 120rpx;
        height: 100rpx;
        background: url("@/static/rrz-cion.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
